// FoundU PWA registration
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then((registration) => {
                console.log("FoundU PWA: Service Worker registered.", registration.scope);
            })
            .catch((error) => {
                console.error("FoundU PWA: Service Worker registration failed.", error);
            });
    });
}
