document.getElementById('fechaPrestamo').addEventListener('change', function() {
    const fechaPrestamo = new Date(this.value);
    const fechaDevolucion = new Date(fechaPrestamo);
    fechaDevolucion.setMonth(fechaDevolucion.getMonth() + 1);

    const fechaDevolucionInput = document.getElementById('fechaDevolucion');
    fechaDevolucionInput.setAttribute('min', this.value); // Establece el valor mínimo
    fechaDevolucionInput.setAttribute('value', fechaDevolucion.toISOString().split('T')[0]); // Establece el valor por defecto
});