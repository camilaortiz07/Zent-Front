/* ===================================================
   ZENT — Dashboard v2 | Todas las secciones activas
=================================================== */

/* ── DATOS ────────────────────────────────────── */
const gastos = [
  { id:1,  nombre:'Café Starbucks',  categoria:'cafe',      monto:12500,  fecha:'2025-06-18', estado:'paid',      emoji:'☕', tipo:'Café & Bebidas' },
  { id:2,  nombre:'Uber al trabajo', categoria:'transport', monto:8200,   fecha:'2025-06-18', estado:'paid',      emoji:'🚗', tipo:'Transporte' },
  { id:3,  nombre:'Almuerzo Rappi',  categoria:'food',      monto:22000,  fecha:'2025-06-17', estado:'paid',      emoji:'🍔', tipo:'Comida' },
  { id:4,  nombre:'Netflix',         categoria:'digital',   monto:17900,  fecha:'2025-06-17', estado:'recurring', emoji:'🎬', tipo:'Digital' },
  { id:5,  nombre:'Farmacia',        categoria:'health',    monto:34000,  fecha:'2025-06-16', estado:'paid',      emoji:'💊', tipo:'Salud' },
  { id:6,  nombre:'Snack tienda',    categoria:'food',      monto:3500,   fecha:'2025-06-16', estado:'paid',      emoji:'🍩', tipo:'Comida' },
  { id:7,  nombre:'Spotify',         categoria:'digital',   monto:9900,   fecha:'2025-06-15', estado:'recurring', emoji:'🎵', tipo:'Digital' },
  { id:8,  nombre:'Bus urbano',      categoria:'transport', monto:2400,   fecha:'2025-06-15', estado:'paid',      emoji:'🚌', tipo:'Transporte' },
  { id:9,  nombre:'Manicure',        categoria:'beauty',    monto:28000,  fecha:'2025-06-14', estado:'paid',      emoji:'💅', tipo:'Belleza' },
  { id:10, nombre:'Agua Postobón',   categoria:'food',      monto:2000,   fecha:'2025-06-14', estado:'paid',      emoji:'🥤', tipo:'Comida' },
  { id:11, nombre:'Amazon Prime',    categoria:'digital',   monto:14900,  fecha:'2025-06-13', estado:'recurring', emoji:'📦', tipo:'Digital' },
  { id:12, nombre:'Parqueadero',     categoria:'transport', monto:6000,   fecha:'2025-06-13', estado:'paid',      emoji:'🅿️', tipo:'Transporte' },
  { id:13, nombre:'Cine Procinal',   categoria:'leisure',   monto:18000,  fecha:'2025-06-12', estado:'paid',      emoji:'🎭', tipo:'Entretenimiento' },
  { id:14, nombre:'Café oficina',    categoria:'cafe',      monto:4500,   fecha:'2025-06-12', estado:'paid',      emoji:'☕', tipo:'Café & Bebidas' },
  { id:15, nombre:'Domicilio pizza', categoria:'food',      monto:42000,  fecha:'2025-06-11', estado:'paid',      emoji:'🍕', tipo:'Comida' },
];

const presupuestos = {
  food:      { label:'🍔 Comida',     max:80000,  gasto:71500, color:'#247A7A' },
  transport: { label:'🚗 Transporte', max:50000,  gasto:16600, color:'#4DB8B8' },
  digital:   { label:'💻 Digital',    max:45000,  gasto:42700, color:'#E8785F' },
  cafe:      { label:'☕ Café',        max:30000,  gasto:17000, color:'#B09970' },
  health:    { label:'💊 Salud',       max:60000,  gasto:34000, color:'#4BB8A8' },
  leisure:   { label:'🎭 Entret.',     max:40000,  gasto:18000, color:'#8ED8D8' },
  beauty:    { label:'💅 Belleza',     max:35000,  gasto:28000, color:'#D9C9A8' },
};

const objetivosData = [
  { id:1, nombre:'Viaje a Cartagena',   meta:800000,  ahorrado:320000, emoji:'🏖', fecha:'2025-09-01' },
  { id:2, nombre:'Fondo de emergencia', meta:500000,  ahorrado:500000, emoji:'🛡', fecha:'2025-06-01', completado:true },
  { id:3, nombre:'Laptop nueva',        meta:2500000, ahorrado:750000, emoji:'💻', fecha:'2025-12-31' },
  { id:4, nombre:'Curso de inglés',     meta:350000,  ahorrado:120000, emoji:'📚', fecha:'2025-08-15' },
];

const alertasData = [
  { tipo:'red',   titulo:'Digital al 95% del presupuesto', desc:'Llevas $42,700 de $45,000. Solo quedan $2,300.', tiempo:'Hace 2 horas', resuelta:false },
  { tipo:'amber', titulo:'Comida al 89% del presupuesto', desc:'Llevas $71,500 de $80,000. Quedan $8,500 para fin de mes.', tiempo:'Hace 5 horas', resuelta:false },
  { tipo:'amber', titulo:'Gasto inusual detectado', desc:'El pago en Domicilio pizza ($42,000) supera tu promedio habitual.', tiempo:'Hace 1 día', resuelta:false },
  { tipo:'green', titulo:'Meta de Transporte cumplida', desc:'Este mes gastaste solo el 33% de tu presupuesto de transporte.', tiempo:'Hace 2 días', resuelta:true },
  { tipo:'green', titulo:'Fondo de emergencia completado', desc:'Lograste ahorrar los $500,000 de tu fondo de emergencia.', tiempo:'Hace 3 días', resuelta:true },
];

/* ── HELPERS ──────────────────────────────────── */
const tagClass = c => ({cafe:'tag-coffee',transport:'tag-transport',food:'tag-food',digital:'tag-digital',health:'tag-health',leisure:'tag-leisure',beauty:'tag-beauty'}[c]||'tag-other');
const estadoLabel = e => ({paid:'Pagado',recurring:'Recurrente',pending:'Pendiente'}[e]||e);
const fmt = n => '$' + Number(n).toLocaleString('es-CO');
window.fmt = fmt;

/* ── NAVEGACIÓN ───────────────────────────────── */
const sectionMeta = {
  dashboard:     { title:'Dashboard',     sub:'Junio 2025 · Resumen general' },
  gastos:        { title:'Gastos',        sub:'Historial completo del mes' },
  analisis:      { title:'Análisis',      sub:'Tendencias y comparativas' },
  presupuestos:  { title:'Presupuestos',  sub:'Control de límites mensuales' },
  objetivos:     { title:'Objetivos',     sub:'Metas de ahorro activas' },
  alertas:       { title:'Alertas',       sub:'Centro de notificaciones' },
  configuracion: { title:'Configuración', sub:'Ajustes de la cuenta' },
};

function goTo(section) {
  document.querySelectorAll('.section-view').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const sec = document.getElementById('sec-' + section);
  if (sec) sec.classList.add('active');
  const navItem = document.querySelector(`[data-section="${section}"]`);
  if (navItem) navItem.classList.add('active');
  const meta = sectionMeta[section];
  if (meta) {
    document.getElementById('topbar-title').textContent = meta.title;
    document.getElementById('topbar-subtitle').textContent = meta.sub;
  }
  document.getElementById('sidebar').classList.remove('open');
  if (section === 'analisis')      initAnalisis();
  if (section === 'presupuestos')  initPresupuestos();
  if (section === 'objetivos')     initObjetivos();
  if (section === 'alertas')       initAlertas();
  if (section === 'configuracion') initConfiguracion();
  if (section === 'gastos')        renderTablaFull(gastos);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-section]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); goTo(el.dataset.section); });
  });
  document.querySelectorAll('[data-section-btn]').forEach(el => {
    el.addEventListener('click', () => goTo(el.dataset.sectionBtn));
  });
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  document.querySelectorAll('.period-pill').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.period-pills').querySelectorAll('.period-pill').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
  initDashboard();
});

/* ── DASHBOARD ────────────────────────────────── */
function initDashboard() {
  renderTabla(gastos.slice(0,7), 'gastos-tbody');
  actualizarKPIs();
  initCharts();
  sparkline('spark1', [12,18,14,22,19,28,24], '#247A7A');
  sparkline('spark2', [40,32,38,28,30,22,26], '#E8785F');
  sparkline('spark3', [5,8,6,10,9,12,15],     '#247A7A');
  sparkline('spark4', [0,3,1,5,2,4,7],         '#B09970');
}

function renderTabla(lista, tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = '';
  lista.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="d-flex align-items-center gap-2"><div class="expense-icon" style="background:var(--sand-100)">${g.emoji}</div><div><div class="expense-name">${g.nombre}</div><div class="expense-sub">${g.fecha}</div></div></div></td>
      <td><span class="tag ${tagClass(g.categoria)}">${g.tipo}</span></td>
      <td><span class="amount-negative">−${fmt(g.monto)}</span></td>
      <td><span class="status-dot ${g.estado}">${estadoLabel(g.estado)}</span></td>
      <td><button class="btn-outline py-1 px-2" style="font-size:11px" onclick="eliminarGasto(${g.id},'${tbodyId}')">✕</button></td>`;
    tbody.appendChild(tr);
  });
}

function renderTablaFull(lista) {
  const tbody = document.getElementById('gastos-tbody-full');
  if (!tbody) return;
  tbody.innerHTML = '';
  lista.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="d-flex align-items-center gap-2"><div class="expense-icon" style="background:var(--sand-100)">${g.emoji}</div><div><div class="expense-name">${g.nombre}</div></div></div></td>
      <td><span class="tag ${tagClass(g.categoria)}">${g.tipo}</span></td>
      <td><span class="amount-negative">−${fmt(g.monto)}</span></td>
      <td><span style="font-size:12px;color:var(--text-muted)">${g.fecha}</span></td>
      <td><span class="status-dot ${g.estado}">${estadoLabel(g.estado)}</span></td>
      <td><button class="btn-outline py-1 px-2" style="font-size:11px" onclick="eliminarGastoFull(${g.id})">✕</button></td>`;
    tbody.appendChild(tr);
  });
  const el = document.getElementById('g-count');
  if (el) el.textContent = lista.length;
}

window.eliminarGasto = function(id, tbodyId) {
  const idx = gastos.findIndex(g => g.id === id);
  if (idx > -1) { gastos.splice(idx,1); renderTabla(gastos.slice(0,7), tbodyId); actualizarKPIs(); showToast('Gasto eliminado','warning'); }
};
window.eliminarGastoFull = function(id) {
  const idx = gastos.findIndex(g => g.id === id);
  if (idx > -1) { gastos.splice(idx,1); renderTablaFull(gastos); showToast('Gasto eliminado','warning'); }
};

function actualizarKPIs() {
  const total = gastos.reduce((s,g)=>s+g.monto,0);
  const rec   = gastos.filter(g=>g.estado==='recurring').reduce((s,g)=>s+g.monto,0);
  const el = id => document.getElementById(id);
  if(el('kpi-total'))        el('kpi-total').textContent        = fmt(total);
  if(el('kpi-recurrente'))   el('kpi-recurrente').textContent   = fmt(rec);
  if(el('kpi-transacciones'))el('kpi-transacciones').textContent= gastos.length;
  if(el('badge-gastos'))     el('badge-gastos').textContent     = gastos.length;
}

document.addEventListener('change', e => {
  if(e.target.id === 'filtro-cat') {
    const cat = e.target.value;
    renderTablaFull(cat ? gastos.filter(g=>g.categoria===cat) : gastos);
  }
});
document.addEventListener('input', e => {
  if(e.target.id === 'search-gastos') {
    const q = e.target.value.toLowerCase();
    renderTabla(gastos.filter(g=>g.nombre.toLowerCase().includes(q)||g.tipo.toLowerCase().includes(q)).slice(0,7),'gastos-tbody');
  }
});

/* ── CHARTS ───────────────────────────────────── */
const chartInstances = {};
function destroyChart(id) { if(chartInstances[id]){chartInstances[id].destroy();delete chartInstances[id];} }

function chartOpts() {
  return {
    responsive:true,
    plugins:{ legend:{ position:'top', align:'end', labels:{ font:{family:'DM Sans',size:11}, color:'#4A6464', boxWidth:10, boxHeight:10, borderRadius:3, useBorderRadius:true, padding:12 } }, tooltip:{ callbacks:{ label:ctx=>` ${fmt(ctx.raw)}` } } },
    scales:{ x:{ grid:{display:false}, ticks:{font:{family:'DM Sans',size:11},color:'#7A9898'}, border:{display:false} }, y:{ grid:{color:'rgba(13,46,46,.05)'}, ticks:{font:{family:'DM Sans',size:11},color:'#7A9898',callback:v=>'$'+(v/1000).toFixed(0)+'k'}, border:{display:false} } }
  };
}

function initCharts() {
  const totCat = {};
  gastos.forEach(g => totCat[g.categoria]=(totCat[g.categoria]||0)+g.monto);

  destroyChart('chartBar');
  chartInstances['chartBar'] = new Chart(document.getElementById('chartBar'), {
    type:'bar',
    data:{ labels:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
      datasets:[
        { label:'Esta semana', data:[14500,32000,26400,48000,19500,55000,12000], backgroundColor:'rgba(36,122,122,.75)', borderRadius:7, borderSkipped:false },
        { label:'Semana anterior', data:[18000,24000,31000,38000,22000,42000,8000], backgroundColor:'rgba(176,153,112,.45)', borderRadius:7, borderSkipped:false }
      ]}, options:chartOpts()
  });

  destroyChart('chartDona');
  chartInstances['chartDona'] = new Chart(document.getElementById('chartDona'), {
    type:'doughnut',
    data:{ labels:['Comida','Transporte','Digital','Café','Salud','Entret.','Belleza'],
      datasets:[{ data:[totCat.food||0,totCat.transport||0,totCat.digital||0,totCat.cafe||0,totCat.health||0,totCat.leisure||0,totCat.beauty||0],
        backgroundColor:['#247A7A','#E8785F','#4DB8B8','#C0503A','#4BB8A8','#D9614A','#B09970'], borderWidth:0, hoverOffset:8 }]},
    options:{ cutout:'68%', plugins:{ legend:{ position:'bottom', labels:{ font:{family:'DM Sans',size:11}, padding:14, color:'#4A6464', boxWidth:10, boxHeight:10, borderRadius:3, useBorderRadius:true } }, tooltip:{ callbacks:{ label:ctx=>`  ${fmt(ctx.raw)}` } } } }
  });

  destroyChart('chartLine');
  chartInstances['chartLine'] = new Chart(document.getElementById('chartLine'), {
    type:'line',
    data:{ labels:['Ene','Feb','Mar','Abr','May','Jun'],
      datasets:[
        { label:'Gasto mensual', data:[320000,285000,410000,375000,398000,225000], borderColor:'#247A7A', backgroundColor:'rgba(36,122,122,.08)', borderWidth:2.5, tension:.4, fill:true, pointBackgroundColor:'#247A7A', pointRadius:4, pointHoverRadius:7 },
        { label:'Presupuesto', data:[350000,350000,350000,350000,350000,350000], borderColor:'#E8785F', borderWidth:1.5, borderDash:[6,4], pointRadius:0, fill:false }
      ]}, options:chartOpts()
  });
}

function sparkline(canvasId, data, color) {
  const cv = document.getElementById(canvasId); if(!cv) return;
  destroyChart(canvasId);
  chartInstances[canvasId] = new Chart(cv, {
    type:'line', data:{ labels:data.map((_,i)=>i), datasets:[{ data, borderColor:color, borderWidth:2, tension:.4, fill:false, pointRadius:0 }] },
    options:{ responsive:false, plugins:{legend:{display:false},tooltip:{enabled:false}}, scales:{x:{display:false},y:{display:false}}, animation:false }
  });
}

/* ── ANÁLISIS ─────────────────────────────────── */
function initAnalisis() {
  const totCat = {};
  gastos.forEach(g => totCat[g.categoria]=(totCat[g.categoria]||0)+g.monto);

  destroyChart('chartDona2');
  chartInstances['chartDona2'] = new Chart(document.getElementById('chartDona2'), {
    type:'doughnut',
    data:{ labels:['Comida','Transporte','Digital','Café','Salud','Entret.','Belleza'],
      datasets:[{ data:[totCat.food||0,totCat.transport||0,totCat.digital||0,totCat.cafe||0,totCat.health||0,totCat.leisure||0,totCat.beauty||0],
        backgroundColor:['#247A7A','#E8785F','#4DB8B8','#C0503A','#4BB8A8','#D9614A','#B09970'], borderWidth:0, hoverOffset:8 }]},
    options:{ cutout:'65%', plugins:{ legend:{ position:'bottom', labels:{ font:{family:'DM Sans',size:11}, padding:12, color:'#4A6464', boxWidth:10, boxHeight:10 } }, tooltip:{ callbacks:{ label:ctx=>`  ${fmt(ctx.raw)}` } } } }
  });

  destroyChart('chartLine2');
  chartInstances['chartLine2'] = new Chart(document.getElementById('chartLine2'), {
    type:'line',
    data:{ labels:['Ene','Feb','Mar','Abr','May','Jun'],
      datasets:[
        { label:'2025', data:[320000,285000,410000,375000,398000,225000], borderColor:'#247A7A', backgroundColor:'rgba(36,122,122,.1)', borderWidth:2.5, tension:.4, fill:true, pointBackgroundColor:'#247A7A', pointRadius:4 },
        { label:'2024', data:[280000,310000,350000,290000,340000,370000], borderColor:'#B09970', backgroundColor:'rgba(176,153,112,.08)', borderWidth:2, tension:.4, fill:true, pointBackgroundColor:'#B09970', pointRadius:3 }
      ]}, options:chartOpts()
  });

  destroyChart('chartBar2');
  chartInstances['chartBar2'] = new Chart(document.getElementById('chartBar2'), {
    type:'bar',
    data:{ labels:['Lun 9','Mar 10','Mié 11','Jue 12','Vie 13','Sáb 14','Dom 15','Lun 16','Mar 17','Mié 18'],
      datasets:[{ label:'Gastos diarios', data:[0,0,42000,22500,26300,28000,0,37500,39900,20700], backgroundColor:'rgba(36,122,122,.7)', borderRadius:6, borderSkipped:false }]},
    options:chartOpts()
  });

  const top5 = [...gastos].sort((a,b)=>b.monto-a.monto).slice(0,5);
  const maxM  = top5[0]?.monto||1;
  const container = document.getElementById('top-gastos-list');
  if(container) {
    container.innerHTML = top5.map((g,i)=>`
      <div style="padding:12px 24px;border-bottom:1px solid rgba(13,46,46,.05)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:13px;font-weight:500">${g.emoji} ${g.nombre}</span>
          <span style="font-family:'Syne',sans-serif;font-weight:600;font-size:13px;color:#D9614A">−${fmt(g.monto)}</span>
        </div>
        <div style="height:5px;background:var(--sand-100);border-radius:4px">
          <div style="height:5px;width:${(g.monto/maxM*100).toFixed(0)}%;background:${['#247A7A','#4DB8B8','#E8785F','#B09970','#4BB8A8'][i]};border-radius:4px"></div>
        </div>
      </div>`).join('');
  }
}

/* ── PRESUPUESTOS ─────────────────────────────── */
function initPresupuestos() {
  const container = document.getElementById('budget-cards-container');
  if(container && container.children.length===0) {
    Object.entries(presupuestos).forEach(([key,p]) => {
      const pct = Math.round(p.gasto/p.max*100);
      const [cls,ico,lbl] = pct>=90?['danger','🚨','Crítico']:pct>=70?['warning','⚠️','Alerta']:['success','✅','En orden'];
      const col = document.createElement('div');
      col.className='col-md-6 col-lg-4';
      col.innerHTML=`
        <div class="panel h-100" style="border-top:3px solid ${p.color}">
          <div style="padding:20px 22px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <div style="font-family:'Syne',sans-serif;font-weight:700;font-size:15px">${p.label}</div>
              <span class="kpi-change ${cls==='success'?'up':'down'}">${ico} ${lbl}</span>
            </div>
            <div style="font-family:'Syne',sans-serif;font-size:26px;font-weight:700;margin-bottom:4px">${fmt(p.gasto)}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:14px">de ${fmt(p.max)} presupuestados</div>
            <div class="progress-track" style="height:8px"><div class="progress-fill" style="width:${pct}%;background:${p.color}"></div></div>
            <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--text-muted)">
              <span>${pct}% usado</span><span>Restante: ${fmt(p.max-p.gasto)}</span>
            </div>
          </div>
        </div>`;
      container.appendChild(col);
    });
  }

  const sliders = document.getElementById('budget-sliders');
  if(sliders && sliders.children.length===0) {
    Object.entries(presupuestos).forEach(([key,p]) => {
      const row = document.createElement('div');
      row.className='budget-edit-row';
      row.innerHTML=`
        <div class="budget-edit-label">${p.label}</div>
        <input type="range" class="budget-range" min="20000" max="300000" step="5000" value="${p.max}"
          oninput="document.getElementById('bval-${key}').textContent=fmt(+this.value)">
        <div class="budget-edit-val" id="bval-${key}">${fmt(p.max)}</div>`;
      sliders.appendChild(row);
    });
  }
}

/* ── OBJETIVOS ────────────────────────────────── */
function initObjetivos() { renderObjetivos(); }

function renderObjetivos() {
  const grid = document.getElementById('objetivos-grid');
  if(!grid) return;
  grid.innerHTML = '';
  objetivosData.forEach(obj => {
    const pct = Math.min(100, Math.round(obj.ahorrado/obj.meta*100));
    const col = document.createElement('div');
    col.className='col-md-6 col-lg-3';
    col.innerHTML=`
      <div class="objetivo-card${obj.completado?' opacity-75':''}">
        <div style="font-size:32px;margin-bottom:12px">${obj.emoji}</div>
        ${obj.completado?'<span style="background:#D1FAE5;color:#059669;font-size:10px;font-weight:600;padding:3px 10px;border-radius:20px;display:inline-block;margin-bottom:8px">✅ Completado</span>':''}
        <div style="font-family:\'Syne\',sans-serif;font-weight:700;font-size:16px;margin-bottom:4px">${obj.nombre}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:16px">Fecha: ${obj.fecha}</div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-family:\'Syne\',sans-serif;font-weight:700;font-size:18px;color:#1F6060">${fmt(obj.ahorrado)}</span>
          <span style="font-size:12px;color:var(--text-muted);align-self:flex-end">de ${fmt(obj.meta)}</span>
        </div>
        <div class="progress-track" style="height:8px"><div class="progress-fill" style="width:${pct}%;background:${obj.completado?'#10B981':'#247A7A'}"></div></div>
        <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:var(--text-muted)">
          <span>${pct}% logrado</span>
          ${obj.completado?'<span style="color:#059669;font-weight:600">¡Meta alcanzada!</span>':`<span>Faltan ${fmt(obj.meta-obj.ahorrado)}</span>`}
        </div>
        ${!obj.completado?`<button class="btn-outline w-100 mt-3" style="font-size:12px" onclick="abonarObjetivo(${obj.id})">+ Abonar ahorro</button>`:''}
      </div>`;
    grid.appendChild(col);
  });
}

window.agregarObjetivo = function() {
  const nombre=document.getElementById('obj-nombre').value.trim();
  const meta=parseInt(document.getElementById('obj-meta').value);
  const fecha=document.getElementById('obj-fecha').value;
  if(!nombre||!meta){showToast('Completa nombre y monto','warning');return;}
  objetivosData.push({id:Date.now(),nombre,meta,ahorrado:0,emoji:'🎯',fecha:fecha||'2025-12-31'});
  renderObjetivos();
  document.getElementById('obj-nombre').value='';
  document.getElementById('obj-meta').value='';
  showToast('🎯 Objetivo creado','success');
};

window.abonarObjetivo = function(id) {
  const monto=parseInt(prompt('¿Cuánto quieres abonar? (COP)')||'0');
  if(monto>0){
    const obj=objetivosData.find(o=>o.id===id);
    if(obj){
      obj.ahorrado=Math.min(obj.meta,obj.ahorrado+monto);
      if(obj.ahorrado>=obj.meta) obj.completado=true;
      renderObjetivos();
      showToast(`✅ Abono de ${fmt(monto)} registrado`,'success');
    }
  }
};

/* ── ALERTAS ──────────────────────────────────── */
function initAlertas() {
  const list=document.getElementById('alertas-list');
  if(list&&list.children.length===0){
    alertasData.forEach((a,i)=>{
      const item=document.createElement('div');
      item.className='alerta-item';
      item.style.opacity=a.resuelta?'.55':'1';
      item.innerHTML=`
        <span class="alerta-dot ${a.tipo}" style="margin-top:8px"></span>
        <div style="flex:1">
          <div style="font-weight:500;font-size:14px;margin-bottom:3px${a.resuelta?';text-decoration:line-through':''}">${a.titulo}</div>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.5">${a.desc}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:4px">${a.tiempo}</div>
        </div>
        ${!a.resuelta?`<button class="btn-outline" style="font-size:11px;white-space:nowrap" onclick="resolverAlerta(${i})">Resolver</button>`:'<span style="font-size:11px;color:#10B981;font-weight:500">Resuelta</span>'}`;
      list.appendChild(item);
    });
  }

  const config=document.getElementById('alertas-config');
  if(config&&config.children.length===0){
    [['Alerta al 80% del presupuesto',true],['Gasto inusual detectado',true],['Suscripción próxima',true],['Meta de ahorro alcanzada',true],['Resumen semanal',false],['Reporte mensual',true]]
    .forEach(([label,checked])=>{
      const row=document.createElement('div');
      row.className='config-toggle';
      row.innerHTML=`<span style="font-size:13px">${label}</span><label class="toggle-switch"><input type="checkbox"${checked?' checked':''}><span class="toggle-slider"></span></label>`;
      config.appendChild(row);
    });
  }
}

window.resolverAlerta=function(idx){
  alertasData[idx].resuelta=true;
  document.getElementById('alertas-list').innerHTML='';
  initAlertas();
  showToast('✅ Alerta resuelta','success');
};

/* ── CONFIGURACIÓN ────────────────────────────── */
function initConfiguracion() {
  const notif=document.getElementById('config-notif');
  if(notif&&notif.children.length===0){
    [['Notificaciones push',true],['Notificaciones por email',true],['Resumen diario',false],['Alertas de seguridad',true]]
    .forEach(([label,checked])=>{
      const row=document.createElement('div');
      row.className='config-toggle';
      row.innerHTML=`<div style="font-size:13px;font-weight:500">${label}</div><label class="toggle-switch"><input type="checkbox"${checked?' checked':''}><span class="toggle-slider"></span></label>`;
      notif.appendChild(row);
    });
  }
}

/* ── MODAL NUEVO GASTO ────────────────────────── */
document.addEventListener('submit', e => {
  if(e.target.id!=='form-gasto') return;
  e.preventDefault();
  const nombre=document.getElementById('g-nombre').value;
  const monto=parseInt(document.getElementById('g-monto').value);
  const categoria=document.getElementById('g-categoria').value;
  const fecha=document.getElementById('g-fecha').value;
  const emojiMap={food:'🍔',transport:'🚗',digital:'💻',cafe:'☕',health:'💊',leisure:'🎭',beauty:'💅',other:'📌'};
  const tipoMap={food:'Comida',transport:'Transporte',digital:'Digital',cafe:'Café & Bebidas',health:'Salud',leisure:'Entretenimiento',beauty:'Belleza',other:'Otros'};
  gastos.unshift({id:Date.now(),nombre,monto,categoria,fecha:fecha||new Date().toISOString().split('T')[0],estado:'paid',emoji:emojiMap[categoria]||'📌',tipo:tipoMap[categoria]||'Otros'});
  renderTabla(gastos.slice(0,7),'gastos-tbody');
  actualizarKPIs();
  bootstrap.Modal.getInstance(document.getElementById('modalGasto'))?.hide();
  e.target.reset();
  showToast('✅ Gasto agregado correctamente','success');
});

/* ── TOAST ────────────────────────────────────── */
window.showToast = function(msg, tipo='success') {
  const toastEl=document.getElementById('toast-zent');
  const toastMsg=document.getElementById('toast-msg');
  if(!toastEl) return;
  toastMsg.textContent=msg;
  const colors={success:'bg-success',warning:'bg-warning text-dark',danger:'bg-danger'};
  toastEl.className=`toast align-items-center text-white border-0 show ${colors[tipo]||'bg-success'}`;
  setTimeout(()=>toastEl.classList.remove('show'),3000);
};

console.log('%cZENT v2.0 — 7 secciones activas ✓','color:#247A7A;font-size:13px;font-weight:bold');
