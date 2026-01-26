Voy a rediseñar completamente la vista móvil de la Línea de Tiempo para que las tarjetas sean colapsables, ocupen todo el ancho y se vean organizadas, tal como pediste.

**Cambios Propuestos:**

1. **CSS (`css/styles.css`):**

   * **En vista móvil (celular):**

     * Eliminaré la línea vertical central para ganar espacio.

     * Las tarjetas ocuparán el **100% del ancho** de la pantalla.

     * El contenido estará **justificado** para una lectura limpia.

     * **Funcionalidad Colapsable:** Por defecto, solo se mostrará el año y el título. Al tocar la tarjeta, se expandirá para mostrar la descripción y el botón. Esto mantendrá la vista muy organizada.

     * Añadiré un indicador visual (una flechita o icono) para que el usuario sepa que puede tocar para expandir.

2. **JavaScript (`js/main.js`):**

   * Agregaré una pequeña función para detectar clicks en los items de la línea de tiempo (`.timeline-item`) y alternar la clase `expanded`.

3. **HTML:**

   * No necesito cambiar el HTML estructuralmente, solo aprovecharé las clases existentes.

**Resultado Esperado:**
En lugar de una línea de tiempo aplastada, verás una lista limpia de bloques (tarjetas) con los años y títulos. Al tocar uno, se abrirá suavemente mostrando toda la información justificada y ordenada.

Código CSS Clave (Conceptual):

```css
@media (max-width: 768px) {
    /* Ocultar contenido detallado por defecto */
    .timeline-item .norm-summary, 
    .timeline-item p, 
    .timeline-item .btn-norm {
        display: none; 
    }
    
    /* Mostrar cuando esté expandido */
    .timeline-item.expanded .norm-summary,
    .timeline-item.expanded p,
    .timeline-item.expanded .btn-norm {
        display: block;
        animation: fadeIn 0.3s ease;
    }
    
    /* Estilo de tarjeta completa */
    .timeline-item {
        width: 100%;
        margin-bottom: 15px;
        background: white; /* Asegurar fondo blanco */
        /* ...bordes y sombras... */
    }
}
```

