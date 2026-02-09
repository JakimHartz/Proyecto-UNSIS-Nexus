// =====================================================
// UNSIS NEXUS - JavaScript Formularios
// =====================================================

// =====================================================
// 1. CARGA DE COMPONENTES (HEADER Y FOOTER)
// =====================================================
function loadComponents() {
    // Cargar Header de formularios
    const headerPlaceholder = document.getElementById('header-forms-placeholder');
    if (headerPlaceholder) {
        fetch('/forms/header_forms.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error al cargar header:', error));
    }

    // Cargar Footer de formularios
    const footerPlaceholder = document.getElementById('footer-forms-placeholder');
    if (footerPlaceholder) {
        fetch('/forms/footer_forms.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error al cargar footer:', error));
    }
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
// 7. INICIALIZACIÓN AL CARGAR EL DOM
// =====================================================
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
});

function verificarCredenciales() {
    let usuario = document.getElementById("usuario").value;
    let contrasenya = document.getElementById("password").value;
    if (usuario === "admin" && contrasenya === "123") {
        console.log("Acceso concedido.");
        alert("Acceso concedido.");
        window.location.href = "admin-inicio.html";
        // window.location.href = '/forms/admin-inicio.html';
        // window.location.replace = '/admin-inicio.html';
    } else {
        alert("Acceso denegado.");
        console.log("Acceso denegado.");
    }
}