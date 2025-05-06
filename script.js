// ===== FORMAT HELPERS =====
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatCurrency(input) {
  const value = parseFloat(input.value.replace(/[^0-9.-]+/g, ""));
  if (!isNaN(value)) input.value = currencyFormatter.format(value);
}

function clearCurrencyFormat(input) {
  input.value = input.value.replace(/[^0-9.-]+/g, "");
}

function formatPercentage(input) {
  const value = parseFloat(input.value.replace(/[^0-9.-]+/g, ""));
  if (!isNaN(value)) input.value = value.toFixed(2);
}

function clearPercentageFormat(input) {
  input.value = input.value.replace(/[^0-9.-]+/g, "");
}

function getNumber(id) {
  const value = document.getElementById(id).value;
  return parseFloat(value.replace(/[^0-9.-]+/g, ""));
}

// ===== CHART DATA STORAGE =====
let chartDataSets = [];
let chartInstance;

// Replace or insert chart data
function upsertChartData(label, data, color) {
  const index = chartDataSets.findIndex(set => set.label === label);
  if (index >= 0) {
    chartDataSets[index].data = data;
  } else {
    chartDataSets.push({
      label,
      backgroundColor: color,
      data
    });
  }
}

// Render comparison chart
function renderChartComparison() {
  const ctx = document.getElementById("graficaResultados").getContext("2d");

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Ganancia", "Valor Total"],
      datasets: chartDataSets
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: value => "$" + value.toLocaleString()
          }
        }
      }
    }
  });

  document.querySelector(".grafica").style.display = "block";

  // 👉 Update comparison data section
  const comparacion = document.getElementById("comparacionDatos");
  comparacion.innerHTML = ""; // Clear existing cards

  chartDataSets.forEach(set => {
    const [ganancia, total] = set.data;
    const card = document.createElement("div");
    card.className = "comparacion-card";
    card.innerHTML = `
      <h4>${set.label}</h4>
      <p>💰 Ganancia: ${currencyFormatter.format(ganancia)}</p>
      <p>📦 Valor Total: ${currencyFormatter.format(total)}</p>
    `;
    comparacion.appendChild(card);
  });
}

// ===== COMPOUND INTEREST CALCULATOR =====
function calcularInteres() {
  const principal = getNumber("principal1");
  const monthly = getNumber("contribucion1");
  const rate = getNumber("tasaInteres1") / 100;
  const years = getNumber("periodoAnios1");

  if ([principal, monthly, rate, years].some(isNaN)) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const months = years * 12;
  let total = principal;
  for (let i = 0; i < months; i++) {
    total = (total + monthly) * (1 + rate / 12);
  }

  const interest = total - (principal + monthly * months);

  document.getElementById("resultadoInteres1").textContent = `Interés ganado: ${currencyFormatter.format(interest)}`;
  document.getElementById("resultadoTotal1").textContent = `Valor total: ${currencyFormatter.format(total)}`;
  document.getElementById("reporteInteres1").textContent = `Interés ganado: ${currencyFormatter.format(interest)}`;
  document.getElementById("reporteTotal1").textContent = `Valor total: ${currencyFormatter.format(total)}`;

  upsertChartData("Interés Compuesto", [interest, total], "#4f46e5");
  renderChartComparison();
}

// ===== STOCK CALCULATORS =====
function calcularValorFuturoAcciones() {
  calcularStock({
    inversionId: "inversionInicial",
    precioInicioId: "precioInicial",
    precioFinalId: "precioFinal",
    ids: {
      val: "resultadoValorFuturo",
      app: "resultadoApreciacion",
      num: "resultadoNumeroAcciones",
      por: "resultadoPorcentaje",
      repVal: "reporteValorFuturo",
      repApp: "reporteApreciacion",
      repNum: "reporteNumeroAcciones",
      repPor: "reportePorcentaje"
    },
    label: "Acciones 1",
    color: "#10b981"
  });
}

function calcularValorFuturoAcciones3() {
  calcularStock({
    inversionId: "inversionInicial3",
    precioInicioId: "precioInicial3",
    precioFinalId: "precioFinal3",
    ids: {
      val: "resultadoValorFuturo3",
      app: "resultadoApreciacion3",
      num: "resultadoNumeroAcciones3",
      por: "resultadoPorcentaje3",
      repVal: "reporteValorFuturo3",
      repApp: "reporteApreciacion3",
      repNum: "reporteNumeroAcciones3",
      repPor: "reportePorcentaje3"
    },
    label: "Acciones 2",
    color: "#3b82f6"
  });
}

function calcularStock({ inversionId, precioInicioId, precioFinalId, ids, label, color }) {
  const inversion = getNumber(inversionId);
  const precioInicio = getNumber(precioInicioId);
  const precioFinal = getNumber(precioFinalId);

  if ([inversion, precioInicio, precioFinal].some(isNaN)) {
    alert("Completa todos los campos de la calculadora de acciones.");
    return;
  }

  const numAcciones = inversion / precioInicio;
  const valorFuturo = numAcciones * precioFinal;
  const ganancia = valorFuturo - inversion;
  const porcentaje = (ganancia / inversion) * 100;

  document.getElementById(ids.val).textContent = `Valor futuro: ${currencyFormatter.format(valorFuturo)}`;
  document.getElementById(ids.app).textContent = `Ganancia: ${currencyFormatter.format(ganancia)}`;
  document.getElementById(ids.num).textContent = `Número de acciones: ${numAcciones.toFixed(2)}`;
  document.getElementById(ids.por).textContent = `Ganancia %: ${porcentaje.toFixed(2)}%`;

  document.getElementById(ids.repVal).textContent = `Valor futuro: ${currencyFormatter.format(valorFuturo)}`;
  document.getElementById(ids.repApp).textContent = `Ganancia: ${currencyFormatter.format(ganancia)}`;
  document.getElementById(ids.repNum).textContent = `Número de acciones: ${numAcciones.toFixed(2)}`;
  document.getElementById(ids.repPor).textContent = `Ganancia %: ${porcentaje.toFixed(2)}%`;

  upsertChartData(label, [ganancia, valorFuturo], color);
  renderChartComparison();
}
