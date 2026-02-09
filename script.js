// =====================================================
// UNSIS NEXUS - JavaScript Principal
// =====================================================

// =====================================================
// 1. CARGA DE COMPONENTES (HEADER Y FOOTER)
// =====================================================
function loadComponents() {
    // Cargar Header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setActiveLink(); // Marcar link activo
        })
        .catch(error => console.error('Error al cargar header:', error));

    // Cargar Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar footer:', error));

    // Cargar Header de formularios
    fetch('header_forms.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-forms-placeholder').innerHTML = data;
            setActiveLink(); // Marcar link activo
        });

    // Cargar Footer de formularios
    fetch('footer_forms.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-forms-placeholder').innerHTML = data;
        });
}

// =====================================================
// 2. MARCAR ENLACE ACTIVO EN NAVEGACIÓN
// =====================================================
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav__link');

    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
        if (linkPage === currentPage) {
            link.classList.add('nav__link--active');
        }
    });
}

// =====================================================
// 3. TOGGLE DEL MENÚ MÓVIL
// =====================================================
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    const btn = document.querySelector('.header__menu-btn');

    if (!nav || !btn) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    nav.classList.toggle('active');
    btn.setAttribute('aria-expanded', !isExpanded);
}

// =====================================================
// 4. CERRAR MENÚ AL HACER CLIC FUERA
// =====================================================
// function setupMenuClose() {
//     document.addEventListener('click', function (event) {
//         const nav = document.getElementById('main-nav');
//         const btn = document.querySelector('.header__menu-btn');

//         if (!nav || !btn) return;

//         // Si el menú está abierto y el clic es fuera del menú y del botón
//         if (nav.classList.contains('active') &&
//             !nav.contains(event.target) &&
//             !btn.contains(event.target)) {
//             nav.classList.remove('active');
//             btn.setAttribute('aria-expanded', 'false');
//         }
//     });
// }

// =====================================================
// 5. SMOOTH SCROLL PARA ANCHORS
// =====================================================
// function setupSmoothScroll() {
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function (e) {
//             const href = this.getAttribute('href');

//             // Ignorar enlaces que son solo "#"
//             if (href === '#') return;

//             const target = document.querySelector(href);
//             if (target) {
//                 e.preventDefault();
//                 target.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'start'
//                 });
//             }
//         });
//     });
// }

// =====================================================
// 6. LAZY LOADING DE IMÁGENES
// =====================================================
// function setupLazyLoading() {
//     if ('IntersectionObserver' in window) {
//         const imageObserver = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     const img = entry.target;
//                     img.src = img.dataset.src;
//                     img.classList.remove('lazy');
//                     imageObserver.unobserve(img);
//                 }
//             });
//         });

//         const lazyImages = document.querySelectorAll('img.lazy');
//         lazyImages.forEach(img => imageObserver.observe(img));
//     }
// }

// =====================================================
// 7. INICIALIZACIÓN AL CARGAR EL DOM
// =====================================================
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
    // setupMenuClose();
    // setupSmoothScroll();
    // setupLazyLoading();
});

// =====================================================
// 8. MANEJO DE RESIZE (OPCIONAL)
// =====================================================
// let resizeTimer;
// window.addEventListener('resize', function () {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(function () {
//         // Cerrar menú móvil si se redimensiona a desktop
//         if (window.innerWidth >= 768) {
//             const nav = document.getElementById('main-nav');
//             const btn = document.querySelector('.header__menu-btn');

//             if (nav && nav.classList.contains('active')) {
//                 nav.classList.remove('active');
//                 if (btn) btn.setAttribute('aria-expanded', 'false');
//             }
//         }
//     }, 250);
// });
