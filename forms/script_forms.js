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

// =====================================================
// 8. GUARDAR NOTICIA
// =====================================================
function guardarNoticia(event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;
    const enlace = document.getElementById('enlace').value || '#';
    const imagenInput = document.getElementById('imagen');

    // Crear objeto de noticia
    const noticia = {
        id: Date.now(), // ID único basado en timestamp
        titulo: titulo,
        descripcion: descripcion,
        fecha: fecha,
        enlace: enlace,
        imagen: '' // Se llenará después si hay imagen
    };

    // Leer imagen si existe
    if (imagenInput.files && imagenInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            noticia.imagen = e.target.result; // Guardar imagen como base64
            guardarEnLocalStorage(noticia);
        };
        
        reader.readAsDataURL(imagenInput.files[0]);
    } else {
        // Si no hay imagen, usar placeholder
        noticia.imagen = 'images/placeholder.jpg';
        guardarEnLocalStorage(noticia);
    }
}

// =====================================================
// 9. GUARDAR EN LOCALSTORAGE
// =====================================================
function guardarEnLocalStorage(noticia) {
    // Obtener noticias existentes
    let noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    
    // Agregar nueva noticia al inicio
    noticias.unshift(noticia);
    
    // Guardar en localStorage
    localStorage.setItem('noticias', JSON.stringify(noticias));
    
    // Mostrar mensaje de éxito
    mostrarMensaje('¡Noticia publicada exitosamente!', 'success');
    
    // Limpiar formulario
    document.getElementById('form-noticia').reset();
    
    // Opcional: redirigir al inicio después de 2 segundos
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
}

// =====================================================
// 10. MOSTRAR MENSAJE
// =====================================================
function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    
    if (tipo === 'success') {
        mensaje.style.backgroundColor = '#d4edda';
        mensaje.style.color = '#155724';
        mensaje.style.border = '1px solid #c3e6cb';
    } else {
        mensaje.style.backgroundColor = '#f8d7da';
        mensaje.style.color = '#721c24';
        mensaje.style.border = '1px solid #f5c6cb';
    }
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 5000);
}