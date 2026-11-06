// Minimal JS: hamburger, smooth scroll, book buttons, lightbox, form validation
 document.addEventListener('DOMContentLoaded',function(){
  // Hamburger
  const hb=document.getElementById('hamburger');
  const menu=document.getElementById('primary-menu');
  if (hb && menu) {
    hb.addEventListener('click',function(){
      const expanded = hb.getAttribute('aria-expanded') === 'true';
      hb.setAttribute('aria-expanded', String(!expanded));
      hb.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
      menu.style.display = expanded ? '' : 'flex';
    });
  }

  // Smooth scroll for in-page hash anchors only (never tel:, mailto:, https:, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = this.getAttribute('href') || '';
      if(target.length < 2) return;
      e.preventDefault();
      const el = document.querySelector(target);
      if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); }
      if(window.innerWidth<=768 && menu){ menu.style.display = ''; }
      if(hb){ hb.setAttribute('aria-expanded','false'); hb.setAttribute('aria-label','Open menu'); }
    });
  });

  // Book buttons redirect to WhatsApp instantly
  document.querySelectorAll('.book-whatsapp').forEach(button => {
    button.addEventListener('click', function(){
      const url = this.dataset.whatsapp || 'https://wa.me/919871649372';
      window.open(url, '_blank', 'noopener');
    });
  });

  // Gallery lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  if (lb && lbImg) {
    document.querySelectorAll('.gallery-grid img').forEach(img=>{
      img.addEventListener('click', function(){
        lbImg.src = this.src;
        lbImg.alt = this.alt;
        lb.style.display = 'flex';
        lb.setAttribute('aria-hidden','false');
      });
    });
    const closeButton = document.querySelector('.lb-close');
    if (closeButton) closeButton.addEventListener('click',function(){ lb.style.display='none'; lb.setAttribute('aria-hidden','true'); });
    lb.addEventListener('click',function(e){ if(e.target===lb) { lb.style.display='none'; lb.setAttribute('aria-hidden','true'); } });
  }

  // Simple form validation & placeholder submit (no backend)
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value.trim();
      if(!name || !phone){ alert('Please enter your name and phone number.'); return; }
      alert('Thank you! Your enquiry was submitted (demo).');
      form.reset();
    });
  }
});
