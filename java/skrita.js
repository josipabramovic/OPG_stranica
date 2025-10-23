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
      observer.unobserve(entry.target);
    }
  });
}, {
   threshold: 0.3,
  rootMargin: '0px 0px -100px 0px' 
});

observer.observe(document.querySelector('.about'));

// Galerija 

const slides = document.querySelectorAll('.carousel img');
    let current = 0;

    function updateCarousel() {
      slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        if (index === current) {
          slide.classList.add('active');
        } else if (index === (current + 1) % slides.length) {
          slide.classList.add('next');
        } else if (index === (current - 1 + slides.length) % slides.length) {
          slide.classList.add('prev');
        }
      });
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      updateCarousel();
    }

    setInterval(nextSlide, 3000); // automatska rotacija svakih 3 sekunde