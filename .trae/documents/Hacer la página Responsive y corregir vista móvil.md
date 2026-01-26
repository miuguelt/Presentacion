Voy a hacer que la página sea completamente responsive y optimizada para móviles mediante los siguientes cambios en `css/styles.css`:

1.  **Arreglar la Línea de Tiempo (Timeline):**
    *   Actualmente, se divide en 50% y 50%, lo que aplasta el contenido en pantallas pequeñas (como se ve en tu imagen).
    *   **Solución:** En móviles, cambiaré el diseño para que ocupe el 100% del ancho, moviendo la línea vertical a la izquierda y alineando todo el contenido a la derecha de la línea.

2.  **Optimizar la Cabecera (Header):**
    *   Reducir el tamaño de los títulos (`h1` y `h2`) y el padding para que no ocupen toda la pantalla inicial en el celular.

3.  **Ajustar el Área de Contenido:**
    *   Reducir el `padding` de 60px a 20px en móviles para aprovechar mejor el espacio de lectura.

4.  **Tablas y Gráficos Adaptables:**
    *   Ocultar la tabla compleja de "Distribución de Tiempo" en móviles y mostrar en su lugar las "Tarjetas de Tiempo" (que ya existen en el HTML pero están ocultas) para una lectura más fácil.

5.  **Navegación:**
    *   Asegurar que la cuadrícula de navegación (`nav-grid`) se adapte correctamente a pantallas muy estrechas.

**Código CSS a implementar (al final de `styles.css`):**

```css
@media (max-width: 768px) {
    /* 1. Timeline Vertical a la Izquierda */
    .timeline::before {
        left: 20px;
    }
    .timeline-item {
        width: 100%;
        padding-left: 50px;
        padding-right: 0;
        margin-bottom: 30px;
    }
    .timeline-item:nth-child(odd),
    .timeline-item:nth-child(even) {
        left: 0;
        text-align: left;
        padding-left: 50px;
        padding-right: 0;
    }
    .timeline-item:nth-child(odd) .timeline-dot,
    .timeline-item:nth-child(even) .timeline-dot {
        left: 8px;
        right: auto;
    }

    /* 2. Header más compacto */
    header {
        padding: 4rem 1rem 5rem;
    }
    header h1 {
        font-size: 2.2rem;
    }
    header h2 {
        font-size: 1.1rem;
    }

    /* 3. Contenido más amplio */
    .content-area {
        padding: 25px 20px;
    }
    
    /* 4. Mostrar Tarjetas Móviles en lugar de Tabla */
    .chart-table {
        display: none;
    }
    .time-dist-cards {
        display: flex;
    }
    
    /* Ajuste de tarjetas de navegación */
    .nav-grid {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px;
    }
}
```