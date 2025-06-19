// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(1,22,39,0.95)';
        navbar.style.padding = '8px 5%';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        
        // Cambiar color de texto en navbar al hacer scroll
        document.querySelectorAll('.nav-link, .logo-text span').forEach(el => {
            el.style.color = 'var(--blanco)';
        });
        document.querySelector('.logo-text span:last-child').style.color = 'var(--naranja)';
    } else {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.padding = '10px 5%';
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        
        // Restaurar color de texto
        document.querySelectorAll('.nav-link, .logo-text span').forEach(el => {
            el.style.color = '';
        });
    }
});
// Nuevas funciones añadidas

// Efecto hover para las tarjetas de cultura
document.querySelectorAll('.cultura-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.cultura-img').style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', () => {
        item.querySelector('.cultura-img').style.transform = 'scale(1)';
    });
});

// Efecto hover para las tarjetas de destino
document.querySelectorAll('.destino-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('img').style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('img').style.transform = 'scale(1)';
    });
});

// Smooth scrolling para todas las páginas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Cerrar menú móvil si está abierto
        document.querySelector('.nav-menu').classList.remove('active');
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Menú toggle para móviles
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Mapa Interactivo
document.addEventListener('DOMContentLoaded', function() {
    const mapaImg = document.getElementById('mapa-salvador');
    
    function initMap() {
        if (!mapaImg) return;
        
        const containerWidth = document.querySelector('.mapa-container').offsetWidth;
        const imgWidth = mapaImg.naturalWidth || mapaImg.width;
        const scaleFactor = containerWidth / imgWidth;
        
        document.querySelectorAll('area.mapa-punto').forEach(area => {
            // Guardar coordenadas originales si no están guardadas
            if (!area.dataset.originalCoords) {
                area.dataset.originalCoords = area.coords;
            }
            
            // Escalar coordenadas
            const scaledCoords = area.dataset.originalCoords.split(',').map(coord => {
                return Math.round(parseInt(coord) * scaleFactor);
            }).join(',');
            
            area.coords = scaledCoords;
            
            // Eventos interactivos
            area.addEventListener('mouseenter', function() {
                const infoBox = document.getElementById(`${this.dataset.info}-info`);
                positionInfoBox(infoBox, this.coords);
                infoBox.classList.add('active');
            });
            
            area.addEventListener('mouseleave', function() {
                const infoBox = document.getElementById(`${this.dataset.info}-info`);
                infoBox.classList.remove('active');
            });
            
            area.addEventListener('click', function(e) {
                e.preventDefault();
                const infoBox = document.getElementById(`${this.dataset.info}-info`);
                document.querySelectorAll('.info-box').forEach(box => {
                    box.classList.remove('active');
                });
                positionInfoBox(infoBox, this.coords);
                infoBox.classList.add('active');
            });
        });
    }
    
    // Posicionamiento inteligente de las cajas de info
    function positionInfoBox(infoBox, coordsStr) {
        const [x, y] = coordsStr.split(',').map(Number);
        const container = document.querySelector('.mapa-container');
        const containerRect = container.getBoundingClientRect();
        const containerWidth = container.offsetWidth;
        
        // Ajustar posición horizontal
        if (x > containerWidth / 2) {
            infoBox.style.left = 'auto';
            infoBox.style.right = `${containerWidth - x + 20}px`;
        } else {
            infoBox.style.left = `${x + 20}px`;
            infoBox.style.right = 'auto';
        }
        
        // Ajustar posición vertical
        infoBox.style.top = `${y - 50}px`;
    }
    
    // Inicializar mapa cuando la imagen cargue
    if (mapaImg.complete) {
        initMap();
    } else {
        mapaImg.addEventListener('load', initMap);
    }
    
    // Redimensionamiento de ventana
    window.addEventListener('resize', initMap);
    
    // Cerrar info-box al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mapa-punto') && !e.target.closest('.info-box')) {
            document.querySelectorAll('.info-box').forEach(box => {
                box.classList.remove('active');
            });
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        document.querySelector('.nav-menu').classList.remove('active');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carrusel Auto-Slide
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const carrusel = document.querySelector('.carrusel');

if (slides.length > 0 && carrusel) {
    function nextSlide() {
        slides[currentSlide].style.opacity = '0.5';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = '1';
        
        // Scroll suave al slide
        carrusel.scrollTo({
            left: slides[currentSlide].offsetLeft,
            behavior: 'smooth'
        });
    }
    
    // Iniciar todos los slides con opacidad 0 excepto el primero
    slides.forEach((slide, index) => {
        slide.style.opacity = index === 0 ? '1' : '1.0';
    });
    
    // Iniciar carrusel automático
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar al hacer hover
    carrusel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carrusel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Efecto hover en comida
document.querySelectorAll('.comida-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('img').style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.transform = 'scale(1)';
    });
});

// Sistema de valoración con estrellas
document.querySelectorAll('.estrellas i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        const stars = this.parentElement.querySelectorAll('i');
        
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
        
        // Agrega un campo oculto con la valoración (si lo necesitas)
        const form = this.closest('form');
        let hiddenInput = form.querySelector('input[name="rating"]');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'rating';
            form.appendChild(hiddenInput);
        }
        hiddenInput.value = rating;
    });
});

// Sistema de valoración con estrellas
document.querySelectorAll('.estrellas i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        const stars = this.parentElement.querySelectorAll('i');
        
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
        
        // Agrega un campo oculto con la valoración (si lo necesitas)
        const form = this.closest('form');
        let hiddenInput = form.querySelector('input[name="rating"]');
        if (!hiddenInput) {
            hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'rating';
            form.appendChild(hiddenInput);
        }
        hiddenInput.value = rating;
    });
});