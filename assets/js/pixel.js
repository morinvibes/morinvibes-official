/* ═══════════════════════════════════════════════════════════
   MORINVIBES® — pixel.js
   Meta Pixel · Loads FIRST before all other JS
   v1.0 · March 2026
═══════════════════════════════════════════════════════════ */
'use strict';

(function() {

  var META_PIXEL_ID = '[PIXEL_ID]';

  /* ─── META PIXEL BASE CODE ─── */
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', META_PIXEL_ID);
  fbq('track', 'PageView');

  /* ─── NOSCRIPT FALLBACK ─── */
  document.addEventListener('DOMContentLoaded', function() {
    var ns = document.createElement('noscript');
    var img = document.createElement('img');
    img.height = 1;
    img.width  = 1;
    img.style.display = 'none';
    img.src = 'https://www.facebook.com/tr?id=' + META_PIXEL_ID + '&ev=PageView&noscript=1';
    ns.appendChild(img);
    var body = document.body;
    if (body) body.insertBefore(ns, body.firstChild);
  });

  /* ─── GLOBAL HELPER ─── */
  window.fbTrack = function(event, params) {
    if (typeof fbq === 'function') {
      fbq('track', event, params || {});
    }
  };

})();
