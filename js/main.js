if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('TT');
        navigator.serviceWorker.register('cached_site.js')
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`));
    });
}
