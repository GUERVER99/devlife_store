// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('show');
});

// Funciones para controlar los modales
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cierra el modal al hacer clic fuera del contenido
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Cambio de imágenes en miniatura
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        const modal = this.closest('.modal-content');
        const mainImg = modal.querySelector('.product-main-image');
        
        // Quitar clase active de todas las miniaturas en este modal
        modal.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        
        // Añadir active a la miniatura clickeada
        this.classList.add('active');
        
        // Cambiar la imagen principal
        mainImg.src = this.src;
    });
});

// Selector de tallas
document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', function() {
        const container = this.closest('.size-options');
        container.querySelectorAll('.size-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Selector de colores
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        const container = this.closest('.color-options');
        container.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Selector de cantidad
document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.parentElement.querySelector('.quantity-input');
        let value = parseInt(input.value);
        
        if (this.classList.contains('minus') && value > 1) {
            input.value = value - 1;
        } else if (this.classList.contains('plus')) {
            input.value = value + 1;
        }
    });
});

// zoom
function setupImageZoom() {
    const zoomLens = document.createElement('div');
    zoomLens.classList.add('zoom-lens');
    document.body.appendChild(zoomLens);

    document.querySelectorAll('.product-main-image').forEach(img => {
        img.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcular porcentajes para el zoom
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            
            // Aplicar transformación suave
            this.style.transformOrigin = `${percentX}% ${percentY}%`;
            this.style.transform = 'scale(2)';
            
            // Mostrar lente de zoom
            zoomLens.style.display = 'block';
            zoomLens.style.backgroundImage = `url(${this.src})`;
            zoomLens.style.backgroundSize = `${rect.width * 2}px ${rect.height * 2}px`;
            zoomLens.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
            zoomLens.style.left = `${e.pageX - 100}px`;
            zoomLens.style.top = `${e.pageY - 100}px`;
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            zoomLens.style.display = 'none';
        });
    });
}

// Llama a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupImageZoom();
});

// Cerrar modales con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
});