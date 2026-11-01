const gridLinks = document.getElementById('grid-links');
const mobileGrid = document.getElementById('mobile-grid');
const dialog = document.getElementById('project-dialog');
const media = document.getElementById('project-media');
const title = document.getElementById('project-title');
const description = document.getElementById('project-description');
let current = 0, lastTrigger = null;
function scaleFrames(){document.querySelectorAll('.cover-stage').forEach(stage=>{const frame=stage.querySelector('iframe');frame.style.transform=`scale(${stage.clientWidth/1920})`;});}
function makeButton(project,index){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ouvrir le projet ${project.nom}`);b.addEventListener('click',()=>openProject(index,b));return b;}
projets.forEach((project,index)=>{
 const button=makeButton(project,index), col=index%4, row=Math.floor(index/4);
 Object.assign(button.style,{left:`${(120+col*440)/1920*100}%`,top:`${(192+row*456)/1080*100}%`,width:`${360/1920*100}%`,height:`${390/1080*100}%`});gridLinks.append(button);
 const mobile=mobileGrid.children[index]; if (mobile) mobile.addEventListener('click',()=>openProject(index,mobile));
});
// Les pages 3 à 9 du document sont les moodboards des projets 1 à 7.
const imagesMoodboard = [8, 5, 4, 5, 5, 5, 6].map((count, project) =>
  Array.from({length: count}, (_, i) => `images-moodboards/projet-${String(project + 1).padStart(2, '0')}/${String(i + 1).padStart(2, '0')}.jpg`)
);
function renderProject(index){
 current=(index+projets.length)%projets.length;const p=projets[current];title.textContent=p.nom;document.getElementById('project-number').textContent=`PROJET ${String(current+1).padStart(2,'0')} / ${String(projets.length).padStart(2,'0')}`;
 description.replaceChildren(...descriptionsInDesign[current].map(text=>{const el=document.createElement('p');el.textContent=text;return el;}));media.replaceChildren();
 const slides=[];
 if(p.video) slides.push({type:'video',url:`https://www.youtube.com/embed/${encodeURIComponent(p.video)}${p.videoParams ? `?${p.videoParams}` : ''}`});
 slides.push({type:'moodboard',url:`moodboards/projet-${String(current+1).padStart(2,'0')}.jpg`});
 for(const url of imagesMoodboard[current]) slides.push({type:'image',url});
 let i=0;const frame=document.createElement('div');frame.className='media-frame';const controls=document.createElement('div');controls.className='media-controls';const prev=document.createElement('button'),next=document.createElement('button'),count=document.createElement('span');prev.type=next.type='button';prev.textContent='‹';next.textContent='›';prev.setAttribute('aria-label','Média précédent');next.setAttribute('aria-label','Média suivant');
 const label=document.getElementById('media-label');
 function show(){const slide=slides[i];frame.replaceChildren();let el;if(slide.type==='video'){el=document.createElement('iframe');el.title=`Vidéo : ${p.nom}`;el.src=slide.url;el.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';el.allowFullscreen=true;label.replaceChildren(document.createTextNode('VIDÉO / '));const link=document.createElement('a');link.href=`https://www.youtube.com/watch?v=${encodeURIComponent(p.video)}`;link.target='_blank';link.rel='noopener noreferrer';link.textContent='REGARDER SUR YOUTUBE ↗';label.append(link);}else{el=document.createElement('img');el.src=slide.url;el.alt=slide.type==='moodboard'?`Moodboard : ${p.nom}`:`${p.nom} — image ${i+1} sur ${slides.length}`;label.textContent=slide.type==='moodboard'?'MOODBOARD':'SÉLECTION DE VISUELS';}frame.append(el);count.textContent=`${i+1} / ${slides.length}`;}
 prev.onclick=()=>{i=(i-1+slides.length)%slides.length;show();};next.onclick=()=>{i=(i+1)%slides.length;show();};controls.append(prev,count,next);media.append(frame,controls);show();
}
function openProject(index,trigger){lastTrigger=trigger;renderProject(index);document.body.classList.add('dialog-open');dialog.showModal();document.getElementById('close-dialog').focus();}
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());document.getElementById('previous-project').addEventListener('click',()=>renderProject(current-1));document.getElementById('next-project').addEventListener('click',()=>renderProject(current+1));dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{media.replaceChildren();document.body.classList.remove('dialog-open');lastTrigger?.focus();});window.addEventListener('resize',scaleFrames);scaleFrames();
