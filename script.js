// =====================================================
// UNSIS NEXUS - JavaScript Principal
// =====================================================

// =====================================================
// 1. CARGA DE COMPONENTES (HEADER Y FOOTER)
// =====================================================
function loadComponents() {
    // Cargar Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                setActiveLink();
            })
            .catch(error => console.error('Error al cargar header:', error));
    }

    // Cargar Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
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
// 4. CARGAR NOTICIAS DINÁMICAS
// =====================================================
function cargarNoticias() {
    // Obtener noticias de localStorage
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    
    // Si no hay noticias guardadas, no hacer nada
    if (noticias.length === 0) {
        return;
    }
    
    // Obtener el contenedor de noticias
    const gridNoticias = document.querySelector('.grid-noticias');
    
    if (!gridNoticias) {
        return;
    }
    
    // Limpiar noticias existentes (opcional, o agregar al inicio)
    // gridNoticias.innerHTML = '';
    
    // Crear HTML para cada noticia y agregarla al INICIO
    noticias.forEach(noticia => {
        const article = document.createElement('article');
        article.className = 'noticia-card';
        
        article.innerHTML = `
            <img src="${noticia.imagen}" 
                 alt="Imagen de ${noticia.titulo}"
                 onerror="this.src='images/placeholder.jpg'">
            <h3>${noticia.titulo}</h3>
            <p>${noticia.descripcion}</p>
            <a href="${noticia.enlace}" class="btn-rojo">Ver más</a>
        `;
        
        // Agregar la noticia al INICIO del grid
        gridNoticias.insertBefore(article, gridNoticias.firstChild);
    });
}

// =====================================================
// 5. INICIALIZACIÓN AL CARGAR EL DOM
// =====================================================
document.addEventListener('DOMContentLoaded', function () {
    loadComponents();
    cargarNoticias(); // Cargar noticias dinámicas
});
