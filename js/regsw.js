// Ensure service worker supported by browser and register it.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('sw.js')
    .then(reg => console.log(`Service Worker: registered ${reg}`))
    .catch(err => console.log(`Service Worker: Error ${err}`));
   });
  }
  