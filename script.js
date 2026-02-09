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
// 4. INICIALIZACIÓN AL CARGAR EL DOM
// =====================================================
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
});

// function verificarCredenciales() {
//     let usuario = document.getElementById("usuario").value;
//     let contrasenya = document.getElementById("password").value;
//     if (usuario === "admin" && contrasenya === "123") {
//         alert("Acceso concedido.");
//         console.log("Acceso concedido.");
//     } else {
//         alert("Acceso denegado.");
//         console.log("Acceso denegado.");
//     }
// }