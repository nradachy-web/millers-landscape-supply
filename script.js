// Mobile nav toggle
(function () {
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-nav');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', '');
  });
  // Close menu when a link is tapped
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('hidden', '');
    });
  });
})();

// Year
(function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();

// "Open today" message based on time
(function () {
  var el = document.querySelector('.topbar-hours');
  if (!el) return;
  var d = new Date();
  var day = d.getDay();
  var hour = d.getHours() + d.getMinutes() / 60;
  var status, dotColor;
  if (day === 0) {
    status = 'Closed Sunday. Open Monday 7:30 AM';
    dotColor = '#ef4444';
  } else if (day === 6) {
    if (hour >= 7.5 && hour < 14) {
      status = 'Open today 7:30 AM to 2:00 PM';
      dotColor = '#4ade80';
    } else {
      status = hour < 7.5 ? 'Opens at 7:30 AM' : 'Closed. Reopens Monday 7:30 AM';
      dotColor = '#ef4444';
    }
  } else {
    if (hour >= 7.5 && hour < 17) {
      status = 'Open today 7:30 AM to 5:00 PM';
      dotColor = '#4ade80';
    } else {
      status = hour < 7.5 ? 'Opens at 7:30 AM' : 'Closed. Reopens tomorrow 7:30 AM';
      dotColor = '#ef4444';
    }
  }
  el.innerHTML = '<span class="dot" style="background:' + dotColor + ';box-shadow:0 0 0 4px ' + dotColor + '33"></span> ' + status;
})();
