 window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1000);
  });
  
 window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  window.addEventListener('scroll', () => {
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});


  // Brojčani counter
function animateNumbers() {
  const numbers = document.querySelectorAll('.number');
  
  numbers.forEach(number => {
    const target = parseInt(number.getAttribute('data-target'));
    const duration = 5000; // 2 sekunde
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        number.textContent = target + '+';
        clearInterval(timer);
      } else {
        number.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Pozovite kada sekcija postane vidljiva
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumbers();
      observer.disconnect();
    }
  });
});
observer.observe(document.querySelector('.stats'));


// Galerija 

const slides = document.querySelectorAll('.carousel img');
let current = 0;

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove('prev', 'active', 'next');
    if(index === current) {
      slide.classList.add('active');
    } else if(index === (current + 1) % slides.length) {
      slide.classList.add('next');
    } else if(index === (current - 1 + slides.length) % slides.length) {
      slide.classList.add('prev');
    }
  });
}

// Automatska rotacija
setInterval(() => {
  current = (current + 1) % slides.length;
  updateCarousel();
}, 3000);

// Prvo pozivanje da se inicijalno postave klase
updateCarousel();


//navigacija

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

//lightbox

document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox');
    overlay.innerHTML = `<img src="${img.src}" alt="">`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
  });
});


// scroll do vrha

const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) scrollBtn.classList.add('show');
  else scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));


// ghjklčć
const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[index].src;
  lightbox.classList.add('show');
}

images.forEach((img, index) => {
  img.addEventListener('click', () => showLightbox(index));
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Zatvaranje klikom izvan slike
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('show');
});

// Tipke na tipkovnici
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') lightbox.classList.remove('show');
});