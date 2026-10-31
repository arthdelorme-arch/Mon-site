#!/usr/bin/env python3
"""Importe un export HTML5 InDesign dans le portfolio local."""
import argparse
import json
import re
import shutil
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
DEST = ROOT / "export-indesign"
MANIFEST = ROOT / "pages-indesign.js"


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        self.refs.extend(value for key, value in attrs
                         if key in ("src", "href") and value)


def inspect_export(source):
    folder = source / "publication-web-resources" / "html"
    if not folder.is_dir():
        raise ValueError("Dossier publication-web-resources/html introuvable dans l'export.")
    found = {}
    for path in folder.glob("publication*.html"):
        match = re.fullmatch(r"publication(?:-(\d+))?\.html", path.name)
        if not match:
            raise ValueError(f"Nom de page inattendu : {path.name}")
        number = int(match.group(1)) if match.group(1) else 0
        if number in found:
            raise ValueError(f"Numéro de page en double : {path.name}")
        found[number] = path
    if not found or sorted(found) != list(range(len(found))):
        raise ValueError("Pages absentes ou numérotation discontinue dans l'export.")
    for page in found.values():
        parser = References()
        parser.feed(page.read_text(encoding="utf-8"))
        for ref in parser.refs:
            url = urlsplit(ref)
            if url.scheme or url.netloc or not url.path:
                continue
            target = (page.parent / unquote(url.path)).resolve()
            if not target.is_relative_to(source) or not target.is_file():
                raise ValueError(f"Ressource locale introuvable ou hors export : {page.name} → {ref}")
    return [found[i].name for i in range(len(found))]


def main():
    parser = argparse.ArgumentParser(description="Actualiser le site depuis un export HTML5 InDesign.")
    parser.add_argument("export", type=Path, help="dossier de l'export contenant publication-web-resources")
    args = parser.parse_args()
    source = args.export.expanduser().resolve()
    if not source.is_dir() or source == DEST or source.is_relative_to(DEST) or DEST.is_relative_to(source):
        raise ValueError("Choisis un dossier d'export séparé du dossier export-indesign du site.")
    pages = inspect_export(source)
    with tempfile.TemporaryDirectory(prefix=".import-", dir=ROOT) as temporary:
        staged = Path(temporary) / "export"
        shutil.copytree(source, staged, symlinks=False)
        inspect_export(staged.resolve())
        backup = Path(temporary) / "ancien-export"
        old_manifest = MANIFEST.read_bytes() if MANIFEST.exists() else None
        try:
            if DEST.exists():
                DEST.rename(backup)
            staged.rename(DEST)
            content = "// Généré par actualiser.py : ne pas modifier à la main.\nconst indesignPages = " + json.dumps(pages, ensure_ascii=False) + ";\n"
            MANIFEST.write_text(content, encoding="utf-8")
        except Exception:
            if DEST.exists():
                shutil.rmtree(DEST)
            if backup.exists():
                backup.rename(DEST)
            if old_manifest is not None:
                MANIFEST.write_bytes(old_manifest)
            raise
    print(f"Import terminé : {len(pages)} pages. Vérifie les vidéos et l'aperçu du site.")
    print("Attention : les liens manquants dans InDesign ne sont pas détectables avec certitude dans l'export.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError) as error:
        print(f"Import annulé : {error}", file=sys.stderr)
        sys.exit(1)
