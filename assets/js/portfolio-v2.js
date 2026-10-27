(()=>{
 'use strict';
 const btn=document.querySelector('[data-menu-toggle]'),menu=document.querySelector('[data-nav]');
 const closeMenu=()=>{btn?.setAttribute('aria-expanded','false');menu?.classList.remove('open');};
 btn?.addEventListener('click',()=>{const isOpen=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!isOpen));menu?.classList.toggle('open',!isOpen)});
 menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 document.addEventListener('click',e=>{if(menu&&!menu.contains(e.target)&&!btn?.contains(e.target))closeMenu()});
 document.querySelectorAll('[data-year]').forEach(e=>e.textContent=String(new Date().getFullYear()));
 const filters=[...document.querySelectorAll('[data-filter]')];
 const projects=[...document.querySelectorAll('[data-category]')];
 filters.forEach(btn=>btn.addEventListener('click',()=>{
  const selected=btn.dataset.filter;
  filters.forEach(item=>{const active=item===btn;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});
  projects.forEach(card=>{const match=selected==='all'||card.dataset.category.split(' ').includes(selected);card.classList.toggle('case-hidden',!match);card.hidden=!match});
 }));
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:0.08});
  document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
 }else document.querySelectorAll('.fade-in').forEach(el=>el.classList.add('visible'));
 const form=document.querySelector('[data-contact-form]');
 form?.addEventListener('submit',async e=>{
  e.preventDefault();
  if(!form.reportValidity())return;
  const input=new FormData(form);
  const fullName=String(input.get('name')||'').trim().slice(0,120);
  const email=String(input.get('email')||'').trim().slice(0,254);
  const service=String(input.get('service')||'').slice(0,140);
  const message=String(input.get('message')||'').trim().slice(0,5000);
  const status=document.getElementById('form-status');
  if(!fullName||!email||!message){if(status)status.textContent='Please complete the required fields.';return}
  const endpoint=window.PORTFOLIO_CONTACT_ENDPOINT;
  if(endpoint && /^https:\/\//.test(endpoint)){
   const submit=form.querySelector('[type=submit]');submit.disabled=true;
   if(status)status.textContent='Sending your inquiry…';
   try{
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:fullName,email,service,message})});
    if(!response.ok)throw new Error('contact');
    if(status)status.textContent='Your inquiry was delivered. Thank you.';
    form.reset();return;
   }catch(err){if(status)status.textContent='Secure delivery is unavailable. Opening your email app instead.'}
   finally{submit.disabled=false}
  }
  const subject='Consulting inquiry — '+(service||'Healthcare operations');
  const body='Name: '+fullName+'\nEmail: '+email+'\nTopic: '+service+'\n\n'+message;
  const link='mailto:muhammadaftabshaukat@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  if(status)status.textContent='Your email application should open with a prepared message. Please press Send there to deliver it. If it does not open, email muhammadaftabshaukat@gmail.com directly.';
  window.location.href=link;
 });
})();
