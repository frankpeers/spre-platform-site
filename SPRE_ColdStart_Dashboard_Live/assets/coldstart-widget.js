
(function(){
  async function initColdStart(el){
    const statusEl = el.querySelector('[data-status]');
    const dateEl = el.querySelector('[data-date]');
    const bootEl = el.querySelector('[data-boot]');
    const threatsEl = el.querySelector('[data-threats]');
    const effEl = el.querySelector('[data-eff]');
    const energyEl = el.querySelector('[data-energy]');
    const nextEl = el.querySelector('[data-next]');
    const alertEl = el.querySelector('[data-alert]');

    try {
      const res = await fetch(el.dataset.src || '/data/coldstart/latest.json', {cache:'no-store'});
      if(!res.ok) throw new Error('Fetch failed');
      const d = await res.json();

      dateEl.textContent = d.last_drill_date;
      bootEl.textContent = d.boot_to_field_time_sec.toFixed(2) + ' sec';
      threatsEl.textContent = (d.threat_types || []).join(' + ');
      effEl.textContent = d.efficiency_percent.toFixed(2) + '%';
      energyEl.textContent = (d.energy_captured_percent>=0?'+':'') + d.energy_captured_percent.toFixed(1) + '%';
      nextEl.textContent = (new Date(d.next_drill)).toUTCString().replace(' GMT',' UTC');

      const ok = d.efficiency_percent >= d.thresholds.min_efficiency_percent &&
                 d.boot_to_field_time_sec <= d.thresholds.max_boot_time_sec;
      statusEl.textContent = ok ? '🟢 Optimal' : '🔴 Attention';
      el.classList.toggle('cs-alert', !ok);
      alertEl.textContent = ok ? 'Within thresholds' :
        `Below targets: Efficiency < ${d.thresholds.min_efficiency_percent}% or Boot > ${d.thresholds.max_boot_time_sec}s`;
    } catch(e){
      statusEl.textContent = '⚠️ Data unavailable';
      alertEl.textContent = 'Could not load cold-start JSON';
      console.error(e);
    }
  }
  document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelectorAll('[data-coldstart-widget]').forEach(initColdStart);
  });
})();
