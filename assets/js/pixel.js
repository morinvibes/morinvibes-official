'use strict';

/* ═══════════════════════════════════════════════════════════════
   MORINVIBES® — pixel.js
   Meta Pixel initialisation — loads FIRST before all other JS
   ═══════════════════════════════════════════════════════════════ */

var META_PIXEL_ID = '[PIXEL_ID]'; // ← replace with real Meta Pixel ID

/* ─── META PIXEL INIT ─── */
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){
    n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments);
  };
  if(!f._fbq)f._fbq=n;
  n.push=n;
  n.loaded=!0;
  n.version='2.0';
  n.queue=[];
  t=b.createElement(e);
  t.async=!0;
  t.src=v;
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s);
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', META_PIXEL_ID);
fbq('track', 'PageView');

/* ─── NO-SCRIPT FALLBACK (inject if needed) ─── */
// Note: noscript pixel img is typically in HTML;
// here we create and append it dynamically for JS-only setup.
(function() {
  var ns = document.createElement('noscript');
  var img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = 'https://www.facebook.com/tr?id=' + META_PIXEL_ID + '&ev=PageView&noscript=1';
  img.alt = '';
  ns.appendChild(img);
  document.body && document.body.appendChild(ns);
})();

/* ─── FBTRACK WRAPPER ─── */
/**
 * Safe wrapper for fbq('track', ...).
 * Used by all other JS files — never call fbq() directly.
 *
 * @param {string} event  - Facebook standard or custom event name
 * @param {Object} params - Optional event parameters
 */
function fbTrack(event, params) {
  if (typeof fbq === 'function') {
    fbq('track', event, params || {});
  }
}

/* ─── EXPOSE GLOBALLY ─── */
window.fbTrack = fbTrack;
