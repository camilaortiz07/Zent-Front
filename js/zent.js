/* ===================================================
   ZENT — Gastos Hormiga | JavaScript Principal
   =================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── DATOS SIMULADOS ─────────────────────────── */
  const gastos = [
    { id:1,  nombre:'Café Starbucks',   categoria:'cafe',      monto:12500,  fecha:'2025-06-18', estado:'paid',       emoji:'☕', tipo:'Café & Bebidas' },
    { id:2,  nombre:'Uber al trabajo',  categoria:'transport', monto:8200,   fecha:'2025-06-18', estado:'paid',       emoji:'🚗', tipo:'Transporte' },
    { id:3,  nombre:'Almuerzo Rappi',   categoria:'food',      monto:22000,  fecha:'2025-06-17', estado:'paid',       emoji:'🍔', tipo:'Comida' },
    { id:4,  nombre:'Netflix',          categoria:'digital',   monto:17900,  fecha:'2025-06-17', estado:'recurring',  emoji:'🎬', tipo:'Digital' },
    { id:5,  nombre:'Farmacia',         categoria:'health',    monto:34000,  fecha:'2025-06-16', estado:'paid',       emoji:'💊', tipo:'Salud' },
    { id:6,  nombre:'Snack tienda',     categoria:'food',      monto:3500,   fecha:'2025-06-16', estado:'paid',       emoji:'🍩', tipo:'Comida' },
    { id:7,  nombre:'Spotify',          categoria:'digital',   monto:9900,   fecha:'2025-06-15', estado:'recurring',  emoji:'🎵', tipo:'Digital' },
    { id:8,  nombre:'Bus urbano',       categoria:'transport', monto:2400,   fecha:'2025-06-15', estado:'paid',       emoji:'🚌', tipo:'Transporte' },
    { id:9,  nombre:'Manicure',         categoria:'beauty',    monto:28000,  fecha:'2025-06-14', estado:'paid',       emoji:'💅', tipo:'Belleza' },
    { id:10, nombre:'Agua Postobón',    categoria:'food',      monto:2000,   fecha:'2025-06-14', estado:'paid',       emoji:'🥤', tipo:'Comida' },
    { id:11, nombre:'Amazon Prime',     categoria:'digital',   monto:14900,  fecha:'2025-06-13', estado:'recurring',  emoji:'📦', tipo:'Digital' },
    { id:12, nombre:'Parqueadero',      categoria:'transport', monto:6000,   fecha:'2025-06-13', estado:'paid',       emoji:'🅿️', tipo:'Transporte' },
    { id:13, nombre:'Cine Procinal',    categoria:'leisure',   monto:18000,  fecha:'2025-06-12', estado:'paid',       emoji:'🎭', tipo:'Entretenimiento' },
    { id:14, nombre:'Café oficina',     categoria:'cafe',      monto:4500,   fecha:'2025-06-12', estado:'paid',       emoji:'☕', tipo:'Café & Bebidas' },
    { id:15, nombre:'Domicilio pizza',  categoria:'food',      monto:42000,  fecha:'2025-06-11', estado:'paid',       emoji:'🍕', tipo:'Comida' },
  ];

  const totalesPorCategoria = {};
  gastos.forEach(g => {
    totalesPorCategoria[g.categoria] = (totalesPorCategoria[g.categoria] || 0) + g.monto;
  });

  /* ─── RENDER TABLA ────────────────────────────── */
  const tbody = document.getElementById('gastos-tbody');
  if (tbody) {
    function tagClass(cat) {
      const map = { cafe:'tag-coffee', transport:'tag-transport', food:'tag-food',
                    digital:'tag-digital', health:'tag-health', leisure:'tag-leisure',
                    beauty:'tag-beauty' };
      return map[cat] || 'tag-other';
    }

    function estadoLabel(e) {
      const map = { paid:'Pagado', recurring:'Recurrente', pending:'Pendiente' };
      return map[e] || e;
    }

    function renderTabla(lista) {
      tbody.innerHTML = '';
      lista.forEach(g => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div class="d-flex align-items-center gap-2">
              <div class="expense-icon" style="background:var(--sand-100)">${g.emoji}</div>
              <div>
                <div class="expense-name">${g.nombre}</div>
                <div class="expense-sub">${g.fecha}</div>
              </div>
            </div>
          </td>
          <td><span class="tag ${tagClass(g.categoria)}">${g.tipo}</span></td>
          <td><span class="amount-negative">−$${g.monto.toLocaleString('es-CO')}</span></td>
          <td><span class="status-dot ${g.estado}">${estadoLabel(g.estado)}</span></td>
          <td>
            <button class="btn-outline py-1 px-2" style="font-size:11px" onclick="eliminarGasto(${g.id})">✕</button>
          </td>`;
        tbody.appendChild(tr);
      });
    }

    window.eliminarGasto = function(id) {
      const idx = gastos.findIndex(g => g.id === id);
      if (idx > -1) {
        gastos.splice(idx, 1);
        renderTabla(gastos);
        actualizarKPIs();
        showToast('Gasto eliminado', 'warning');
      }
    };

    renderTabla(gastos);

    /* Búsqueda */
    const searchInput = document.getElementById('search-gastos');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const q = this.value.toLowerCase();
        const filtrados = gastos.filter(g =>
          g.nombre.toLowerCase().includes(q) || g.tipo.toLowerCase().includes(q)
        );
        renderTabla(filtrados);
      });
    }
  }

  /* ─── ACTUALIZAR KPIs ─────────────────────────── */
  function actualizarKPIs() {
    const total = gastos.reduce((s, g) => s + g.monto, 0);
    const recurrente = gastos.filter(g => g.estado === 'recurring').reduce((s, g) => s + g.monto, 0);
    const hoy = new Date().toISOString().split('T')[0];
    const gastoHoy = gastos.filter(g => g.fecha === hoy).reduce((s,g) => s + g.monto, 0);

    const el = id => document.getElementById(id);
    if (el('kpi-total'))       el('kpi-total').textContent       = '$' + total.toLocaleString('es-CO');
    if (el('kpi-recurrente'))  el('kpi-recurrente').textContent  = '$' + recurrente.toLocaleString('es-CO');
    if (el('kpi-transacciones')) el('kpi-transacciones').textContent = gastos.length;
    if (el('kpi-hoy'))         el('kpi-hoy').textContent         = '$' + gastoHoy.toLocaleString('es-CO');
  }
  actualizarKPIs();

  /* ─── GRÁFICA DONA ────────────────────────────── */
  const ctxDona = document.getElementById('chartDona');
  if (ctxDona) {
    new Chart(ctxDona, {
      type: 'doughnut',
      data: {
        labels: ['Comida', 'Transporte', 'Digital', 'Café', 'Salud', 'Entret.', 'Belleza'],
        datasets: [{
          data: [
            totalesPorCategoria.food || 0,
            totalesPorCategoria.transport || 0,
            totalesPorCategoria.digital || 0,
            totalesPorCategoria.cafe || 0,
            totalesPorCategoria.health || 0,
            totalesPorCategoria.leisure || 0,
            totalesPorCategoria.beauty || 0
          ],
          backgroundColor: ['#247A7A','#E8785F','#4DB8B8','#C0503A','#4BB8A8','#D9614A','#B09970'],
          borderWidth: 0,
          hoverOffset: 8
        }]
      },
      options: {
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'DM Sans', size: 11 },
              padding: 14,
              color: '#4A6464',
              boxWidth: 10,
              boxHeight: 10,
              borderRadius: 3,
              useBorderRadius: true
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => `  $${ctx.raw.toLocaleString('es-CO')}`
            }
          }
        }
      }
    });
  }

  /* ─── GRÁFICA BARRAS SEMANAL ──────────────────── */
  const ctxBar = document.getElementById('chartBar');
  if (ctxBar) {
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [
          {
            label: 'Esta semana',
            data: [14500, 32000, 26400, 48000, 19500, 55000, 12000],
            backgroundColor: 'rgba(36,122,122,.75)',
            borderRadius: 7,
            borderSkipped: false,
          },
          {
            label: 'Semana anterior',
            data: [18000, 24000, 31000, 38000, 22000, 42000, 8000],
            backgroundColor: 'rgba(176,153,112,.45)',
            borderRadius: 7,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              font: { family: 'DM Sans', size: 11 },
              color: '#4A6464',
              boxWidth: 10, boxHeight: 10,
              borderRadius: 3, useBorderRadius: true,
              padding: 12
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` $${ctx.raw.toLocaleString('es-CO')}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'DM Sans', size: 11 }, color: '#7A9898' },
            border: { display: false }
          },
          y: {
            grid: { color: 'rgba(13,46,46,.05)' },
            ticks: {
              font: { family: 'DM Sans', size: 11 },
              color: '#7A9898',
              callback: v => '$' + (v/1000).toFixed(0) + 'k'
            },
            border: { display: false }
          }
        }
      }
    });
  }

  /* ─── GRÁFICA LÍNEA MENSUAL ───────────────────── */
  const ctxLine = document.getElementById('chartLine');
  if (ctxLine) {
    new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['Ene','Feb','Mar','Abr','May','Jun'],
        datasets: [{
          label: 'Gasto mensual',
          data: [320000, 285000, 410000, 375000, 398000, 225000],
          borderColor: '#247A7A',
          backgroundColor: 'rgba(36,122,122,.08)',
          borderWidth: 2.5,
          tension: .4,
          fill: true,
          pointBackgroundColor: '#247A7A',
          pointRadius: 4,
          pointHoverRadius: 7
        },{
          label: 'Presupuesto',
          data: [350000,350000,350000,350000,350000,350000],
          borderColor: '#E8785F',
          borderWidth: 1.5,
          borderDash: [6,4],
          pointRadius: 0,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', align: 'end',
            labels: {
              font: { family: 'DM Sans', size: 11 },
              color: '#4A6464',
              boxWidth: 10, boxHeight: 10,
              borderRadius: 3, useBorderRadius: true,
              padding: 12
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => ` $${ctx.raw.toLocaleString('es-CO')}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'DM Sans', size: 11 }, color: '#7A9898' },
            border: { display: false }
          },
          y: {
            grid: { color: 'rgba(13,46,46,.05)' },
            ticks: {
              font: { family: 'DM Sans', size: 11 },
              color: '#7A9898',
              callback: v => '$' + (v/1000).toFixed(0) + 'k'
            },
            border: { display: false }
          }
        }
      }
    });
  }

  /* ─── MODAL AGREGAR GASTO ─────────────────────── */
  const formGasto = document.getElementById('form-gasto');
  if (formGasto) {
    formGasto.addEventListener('submit', function(e) {
      e.preventDefault();
      const nombre    = document.getElementById('g-nombre').value;
      const monto     = parseInt(document.getElementById('g-monto').value);
      const categoria = document.getElementById('g-categoria').value;
      const fecha     = document.getElementById('g-fecha').value;

      const emojiMap = { food:'🍔', transport:'🚗', digital:'💻', cafe:'☕', health:'💊', leisure:'🎭', beauty:'💅', other:'📌' };
      const tipoMap  = { food:'Comida', transport:'Transporte', digital:'Digital', cafe:'Café & Bebidas', health:'Salud', leisure:'Entretenimiento', beauty:'Belleza', other:'Otros' };

      const nuevo = {
        id: Date.now(),
        nombre, monto, categoria,
        fecha: fecha || new Date().toISOString().split('T')[0],
        estado: 'paid',
        emoji: emojiMap[categoria] || '📌',
        tipo: tipoMap[categoria] || 'Otros'
      };

      gastos.unshift(nuevo);

      const tbody = document.getElementById('gastos-tbody');
      if (tbody) {
        // Re-render usando renderTabla si existe
        document.dispatchEvent(new CustomEvent('refreshTabla'));
      }
      actualizarKPIs();

      const modal = bootstrap.Modal.getInstance(document.getElementById('modalGasto'));
      if (modal) modal.hide();
      formGasto.reset();
      showToast('✅ Gasto agregado correctamente', 'success');
    });
  }

  /* ─── TOAST ───────────────────────────────────── */
  window.showToast = function(msg, tipo = 'success') {
    const toastEl = document.getElementById('toast-zent');
    const toastMsg = document.getElementById('toast-msg');
    if (!toastEl) return;
    toastMsg.textContent = msg;
    toastEl.className = `toast align-items-center text-white border-0 show ${tipo === 'success' ? 'bg-success' : tipo === 'warning' ? 'bg-warning' : 'bg-danger'}`;
    setTimeout(() => toastEl.classList.remove('show'), 3000);
  };

  /* ─── SIDEBAR TOGGLE (móvil) ──────────────────── */
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  /* ─── PERIOD PILLS ────────────────────────────── */
  document.querySelectorAll('.period-pill').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.period-pills').querySelectorAll('.period-pill').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ─── SPARKLINES ──────────────────────────────── */
  function sparkline(canvasId, data, color) {
    const cv = document.getElementById(canvasId);
    if (!cv) return;
    new Chart(cv, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{ data, borderColor: color, borderWidth: 2, tension: .4,
                     fill: false, pointRadius: 0 }]
      },
      options: {
        responsive: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: { x: { display: false }, y: { display: false } },
        animation: false
      }
    });
  }

  sparkline('spark1', [12,18,14,22,19,28,24], '#247A7A');
  sparkline('spark2', [40,32,38,28,30,22,26], '#E8785F');
  sparkline('spark3', [5,8,6,10,9,12,15], '#247A7A');
  sparkline('spark4', [0,3,1,5,2,4,7], '#B09970');

  console.log('%cZENT Dashboard v1.0', 'color:#247A7A;font-size:18px;font-weight:bold;');
  console.log('%cGastos Hormiga — Control Inteligente', 'color:#4DB8B8;font-size:12px;');
});
