// ============================================
// KSTP PREMIUM - JAVASCRIPT
// Animations & Interactions
// W2K-Digital 2025
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === MENU MOBILE ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation des barres du menu burger
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // === HEADER STICKY AVEC SCROLL ===
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // === LIEN ACTIF DANS LA NAVIGATION ===
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // === SMOOTH SCROLL POUR LES ANCRES ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // === FILTRES PRODUITS ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // === ANIMATION AU SCROLL (Fade In) ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.card, .product-card, .section-header');
    animateElements.forEach(el => observer.observe(el));
    
    // ===================================================
    // CAROUSEL CHAMPAGNES THOMAS PAVY (MANUEL UNIQUEMENT)
    // Pas d'auto-scroll - Navigation manuelle seulement
    // ===================================================
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (slides.length > 0) {
        let currentSlide = 0;

        // Afficher une slide spécifique
        function showSlide(index) {
            // Sécurité : vérifier les limites
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            slides.forEach(function(slide) {
                slide.classList.remove('active');
            });
            indicators.forEach(function(ind) {
                ind.classList.remove('active');
            });
            
            slides[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
            currentSlide = index;
        }

        // Changer de slide (direction : -1 ou +1)
        function changeSlide(direction) {
            showSlide(currentSlide + direction);
        }

        // Bouton précédent
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                changeSlide(-1);
            });
        }
        
        // Bouton suivant
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                changeSlide(1);
            });
        }
        
        // Indicateurs (points cliquables)
        indicators.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
            });
        });

        // Navigation clavier (flèches gauche/droite)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });

        // Support swipe tactile mobile
        var touchStartX = 0;
        var touchEndX = 0;

        var carouselContainer = document.querySelector('.carousel-container');

        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            carouselContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                // Swipe gauche = slide suivante
                if (touchEndX < touchStartX - 50) {
                    changeSlide(1);
                }
                // Swipe droite = slide précédente
                if (touchEndX > touchStartX + 50) {
                    changeSlide(-1);
                }
            });
        }

        // Exposer globalement au cas où
        window.changeSlide = changeSlide;
        window.goToSlide = showSlide;
    }
    
    // ===================================================
    // AFFICHAGE CONDITIONNEL CHAMPAGNES THOMAS PAVY
    // Formulaire contact - checkboxes champagnes
    // ===================================================
    
    const typeProduits = document.getElementById('type_produits');
    const champagnesDetails = document.getElementById('champagnes-thomas-pavy-details');

    if (typeProduits && champagnesDetails) {
        typeProduits.addEventListener('change', function() {
            if (this.value === 'champagnes_thomas_pavy') {
                champagnesDetails.style.display = 'block';
            } else {
                champagnesDetails.style.display = 'none';
            }
        });
    }
    
    // === VALIDATION FORMULAIRE ===
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const formData = new FormData(contactForm);
            let isValid = true;
            let errorMessage = '';
            
            // Validation des champs
            const societe = formData.get('societe');
            const email = formData.get('email');
            const tel = formData.get('tel');
            const typeProduit = formData.get('type_produits');
            const paysLivraison = formData.get('pays_livraison');
            const message = formData.get('message');
            
            if (!societe || societe.trim() === '') {
                isValid = false;
                errorMessage += 'Le nom de société est requis.\n';
            }
            
            if (!email || !validateEmail(email)) {
                isValid = false;
                errorMessage += 'Email valide requis.\n';
            }
            
            if (!tel || tel.trim() === '') {
                isValid = false;
                errorMessage += 'Le téléphone est requis.\n';
            }
            
            if (!typeProduit || typeProduit === '') {
                isValid = false;
                errorMessage += 'Veuillez sélectionner un type de produit.\n';
            }
            
            if (!paysLivraison || paysLivraison.trim() === '') {
                isValid = false;
                errorMessage += 'Le pays de livraison est requis.\n';
            }
            
            if (!message || message.trim().length < 10) {
                isValid = false;
                errorMessage += 'Le message doit contenir au moins 10 caractères.\n';
            }
            
            if (isValid) {
                alert('✅ Merci ! Votre demande de devis a été envoyée avec succès.\n\nNous vous répondrons dans les plus brefs délais.');
                contactForm.reset();
                // Cacher les détails champagnes après reset
                if (champagnesDetails) {
                    champagnesDetails.style.display = 'none';
                }
            } else {
                alert('❌ Erreur de validation :\n\n' + errorMessage);
            }
        });
    }
    
    // Fonction de validation email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // === EFFET PARALLAX SUR HERO (léger) ===
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // === COUNTER ANIMATION (si besoin sur stats) ===
    function animateCounter(element, target, duration) {
        duration = duration || 2000;
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // === LAZY LOADING IMAGES ===
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // === BOUTON RETOUR EN HAUT ===
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #8B0000, #B22222);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(139, 0, 0, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px)';
        scrollTopBtn.style.boxShadow = '0 6px 20px rgba(139, 0, 0, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0)';
        scrollTopBtn.style.boxShadow = '0 4px 15px rgba(139, 0, 0, 0.3)';
    });
    
    // === PRELOADER (optionnel) ===
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });
    
});

// === FONCTIONS UTILES GLOBALES ===

// Débounce pour optimiser les événements
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle pour limiter l'exécution
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
