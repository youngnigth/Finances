        var grafica;

        // Función para formatear campo de texto como moneda al perder foco
        function formatCurrency(input) {
            var value = input.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.');
            input.value = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }

        // Función para borrar formato al enfocar campo de texto
        function clearCurrencyFormat(input) {
            input.value = input.value.replace(/[^0-9.,]/g, '');
        }

        // Función para formatear campo de texto como porcentaje al perder foco
        function formatPercentage(input) {
            var value = input.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.');
            input.value = parseFloat(value).toFixed(2) + '%';
        }

        // Función para borrar formato de porcentaje al enfocar campo de texto
        function clearPercentageFormat(input) {
            input.value = input.value.replace(/[^0-9.,]/g, '');
        }

        // Función para calcular interés compuesto
        function calcularInteres() {
            var principal = parseFloat(document.getElementById('principal1').value.replace(/[^0-9.]/g, ''));
            var contribucion = parseFloat(document.getElementById('contribucion1').value.replace(/[^0-9.]/g, ''));
            var tasaInteres = parseFloat(document.getElementById('tasaInteres1').value.replace(/[^0-9.]/g, '')) / 100;
            var periodoAnios = parseInt(document.getElementById('periodoAnios1').value);

            var montoTotal = principal;
            for (var i = 0; i < periodoAnios; i++) {
                montoTotal += contribucion * 12;
                montoTotal *= 1 + tasaInteres;
            }

            var interesGanado = montoTotal - principal - (contribucion * 12 * periodoAnios);
            document.getElementById('resultadoInteres1').innerText = 'Interés ganado: ' + interesGanado.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            document.getElementById('resultadoTotal1').innerText = 'Monto total: ' + montoTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

            document.getElementById('reporteInteres1').innerText = document.getElementById('resultadoInteres1').innerText;
            document.getElementById('reporteTotal1').innerText = document.getElementById('resultadoTotal1').innerText;

            actualizarGrafica(principal + (contribucion * 12 * periodoAnios), montoTotal, 'Calculadora 1');
        }

        // Función para calcular valor futuro de acciones
        function calcularValorFuturoAcciones() {
            var inversionInicial = parseFloat(document.getElementById('inversionInicial').value.replace(/[^0-9.]/g, ''));
            var precioInicial = parseFloat(document.getElementById('precioInicial').value.replace(/[^0-9.]/g, ''));
            var precioFinal = parseFloat(document.getElementById('precioFinal').value.replace(/[^0-9.]/g, ''));

            var numeroAcciones = inversionInicial / precioInicial;
            var valorFuturo = numeroAcciones * precioFinal;
            var apreciacion = valorFuturo - inversionInicial;
            var porcentajeApreciacion = (apreciacion / inversionInicial) * 100;

            document.getElementById('resultadoValorFuturo').innerText = 'Valor futuro: ' + valorFuturo.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            document.getElementById('resultadoApreciacion').innerText = 'Apreciación: ' + apreciacion.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            document.getElementById('resultadoNumeroAcciones').innerText = 'Número de acciones: ' + numeroAcciones.toLocaleString('en-US');
            document.getElementById('resultadoPorcentaje').innerText = 'Porcentaje de apreciación: ' + porcentajeApreciacion.toFixed(2) + '%';

            document.getElementById('reporteValorFuturo').innerText = document.getElementById('resultadoValorFuturo').innerText;
            document.getElementById('reporteApreciacion').innerText = document.getElementById('resultadoApreciacion').innerText;
            document.getElementById('reporteNumeroAcciones').innerText = document.getElementById('resultadoNumeroAcciones').innerText;
            document.getElementById('reportePorcentaje').innerText = document.getElementById('resultadoPorcentaje').innerText;

            actualizarGrafica(inversionInicial, valorFuturo, 'Calculadora 2');
        }

        // Función para calcular valor futuro de acciones en la tercera calculadora
        function calcularValorFuturoAcciones3() {
            var inversionInicial3 = parseFloat(document.getElementById('inversionInicial3').value.replace(/[^0-9.]/g, ''));
            var precioInicial3 = parseFloat(document.getElementById('precioInicial3').value.replace(/[^0-9.]/g, ''));
            var precioFinal3 = parseFloat(document.getElementById('precioFinal3').value.replace(/[^0-9.]/g, ''));

            var numeroAcciones3 = inversionInicial3 / precioInicial3;
            var valorFuturo3 = numeroAcciones3 * precioFinal3;
            var apreciacion3 = valorFuturo3 - inversionInicial3;
            var porcentajeApreciacion3 = (apreciacion3 / inversionInicial3) * 100;

            document.getElementById('resultadoValorFuturo3').innerText = 'Valor futuro: ' + valorFuturo3.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            document.getElementById('resultadoApreciacion3').innerText = 'Apreciación: ' + apreciacion3.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            document.getElementById('resultadoNumeroAcciones3').innerText = 'Número de acciones: ' + numeroAcciones3.toLocaleString('en-US');
            document.getElementById('resultadoPorcentaje3').innerText = 'Porcentaje de apreciación: ' + porcentajeApreciacion3.toFixed(2) + '%';

            document.getElementById('reporteValorFuturo3').innerText = document.getElementById('resultadoValorFuturo3').innerText;
            document.getElementById('reporteApreciacion3').innerText = document.getElementById('resultadoApreciacion3').innerText;
            document.getElementById('reporteNumeroAcciones3').innerText = document.getElementById('resultadoNumeroAcciones3').innerText;
            document.getElementById('reportePorcentaje3').innerText = document.getElementById('resultadoPorcentaje3').innerText;

            actualizarGrafica(inversionInicial3, valorFuturo3, 'Calculadora 3');
        }

        // Función para actualizar gráfica
        function actualizarGrafica(inicial, final, tipoCalculadora) {
            if (grafica) {
                grafica.destroy();
            }

            var ctx = document.getElementById('graficaResultados').getContext('2d');
            grafica = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Inicial', 'Final'],
                    datasets: [{
                        label: tipoCalculadora,
                        data: [inicial, final],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Función para mostrar gráfica de interés compuesto
        function mostrarGraficaInteres() {
            calcularInteres();
        }

        // Función para mostrar gráfica de valor futuro de acciones
        function mostrarGraficaValorFuturo() {
            calcularValorFuturoAcciones();
        }

        // Función para mostrar gráfica de valor futuro de acciones en la tercera calculadora
        function mostrarGraficaValorFuturo3() {
            calcularValorFuturoAcciones3();
        }