function showSection(sectionId, cardElement) {
    document.querySelectorAll('.content-area').forEach(el => {
        el.classList.remove('active-content');
        el.style.display = 'none';
    });
    document.querySelectorAll('.nav-card').forEach(el => {
        el.classList.remove('active');
    });
    const activeSection = document.getElementById(sectionId);
    activeSection.style.display = 'block';
    setTimeout(() => {
        activeSection.classList.add('active-content');
        // Scroll al contenido con un pequeño offset para que no quede pegado al borde
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 10);
    cardElement.classList.add('active');
}

function toggleCheck(element) {
    element.classList.toggle('checked');
    const svg = element.querySelector('svg');
    if (element.classList.contains('checked')) svg.style.display = 'block';
    else svg.style.display = 'none';
}

// Script para agregar dinámicamente el botón de "Volver al Menú"
// Script para agregar el botón flotante "Volver al Menú"
document.addEventListener('DOMContentLoaded', () => {
    const fab = document.createElement('button');
    fab.innerHTML = '⬆️';
    fab.title = 'Volver al Menú';

    // Estilos del botón flotante (Elegante y minimalista)
    Object.assign(fab.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--sena-green)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: '1000',
        display: 'none', // Oculto inicialmente
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        opacity: '0.9'
    });

    // Hover effects
    fab.onmouseover = () => {
        fab.style.transform = 'translateY(-3px)';
        fab.style.boxShadow = '0 6px 16px rgba(57, 169, 0, 0.4)';
        fab.style.opacity = '1';
    };
    fab.onmouseout = () => {
        fab.style.transform = 'translateY(0)';
        fab.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        fab.style.opacity = '0.9';
    };

    // Funcionalidad
    fab.onclick = () => {
        document.querySelector('.nav-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    document.body.appendChild(fab);

    // Mostrar/Ocultar basado en el scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fab.style.display = 'flex';
        } else {
            fab.style.display = 'none';
        }
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();
            const contentSections = document.querySelectorAll('.content-area');
            const navCards = document.querySelectorAll('.nav-card');
            let hasResults = false;

            // Remove previous highlights
            document.querySelectorAll('.highlight').forEach(el => {
                const parent = el.parentNode;
                parent.replaceChild(document.createTextNode(el.textContent), el);
                parent.normalize(); // Merge text nodes
            });

            if (searchTerm.length < 3) {
                // Reset view if search is too short
                contentSections.forEach(section => {
                    section.style.display = 'none';
                    section.classList.remove('active-content');
                });
                // Restore active section if any
                const activeCard = document.querySelector('.nav-card.active');
                if (activeCard) {
                    const sectionId = activeCard.getAttribute('onclick').match(/'([^']+)'/)[1];
                    showSection(sectionId, activeCard);
                }
                return;
            }

            contentSections.forEach(section => {
                const text = section.innerText.toLowerCase();
                if (text.includes(searchTerm)) {
                    section.style.display = 'block';
                    section.classList.add('active-content');
                    hasResults = true;
                    // Highlight logic could be complex, simple visibility is safer for now
                } else {
                    section.style.display = 'none';
                    section.classList.remove('active-content');
                }
            });

            // Optional: Filter nav cards too
            navCards.forEach(card => {
                const title = card.querySelector('.nav-title').innerText.toLowerCase();
                if (title.includes(searchTerm)) {
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0.5';
                }
            });
        });
    }
});

// PDF Modal Logic
function openPdfModal(fileUrl, title) {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    const modalTitle = document.getElementById('modalTitle');
    const downloadBtn = document.getElementById('downloadBtn');

    if (!modal || !frame) return;

    // Check if it's a PDF or other file type that browser can render
    // For Office files (.docx, .xlsx), we might need a viewer or just fallback to download
    // Since we can't easily embed office docs locally without an external service, 
    // we will check extension.
    if (fileUrl.match(/\.(docx|xlsx)$/i)) {
        // Fallback for office files: just download or alert
        // Ideally we would use Microsoft Office Viewer but it requires public URL
        const confirmDownload = confirm("Este archivo (.docx/.xlsx) no se puede previsualizar en el navegador. ¿Deseas descargarlo?");
        if (confirmDownload) {
            window.open(fileUrl, '_blank');
        }
        return;
    }

    modalTitle.textContent = title || 'Vista Previa';
    frame.src = fileUrl;
    // Set accessible title for iframe
    frame.setAttribute('title', 'Vista previa de ' + (title || 'documento'));

    downloadBtn.href = fileUrl;
    modal.style.display = 'flex'; // Flex to center content
}

// Close Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('pdfModal');
    const span = document.getElementsByClassName("close-modal")[0];

    if (modal && span) {
        span.onclick = function () {
            modal.style.display = "none";
            document.getElementById('pdfFrame').src = ""; // Clear src to stop video/audio if any
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.getElementById('pdfFrame').src = "";
            }
        }
    }
});
// Normative Cards Toggle
function toggleCard(card) {
    // Close other cards (optional, for accordion effect)
    document.querySelectorAll('.normative-card').forEach(c => {
        if (c !== card) c.classList.remove('active');
    });
    
    card.classList.toggle('active');
}
