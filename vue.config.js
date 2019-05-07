module.exports = {
    pwa: {
        // configurar el complemento de workbox
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          swSrc: "src/firebase-messaging-sw.js"
        }
    }
}