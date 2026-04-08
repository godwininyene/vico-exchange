import OneSignal from "react-onesignal";

let initPromise = null;

export const initOneSignal = async () => {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      if (window.OneSignal && window.OneSignal.initialized) return;

      await OneSignal.init({
        appId: "b9aed036-78e0-41fe-b140-657487f974e1",

        notifyButton: { enable: false },

        allowLocalhostAsSecureOrigin: true,

        serviceWorkerPath: "push/OneSignalSDKWorker.js",
        serviceWorkerUpdaterPath: "push/OneSignalSDKUpdaterWorker.js",

        serviceWorkerParam: { scope: "/push/" },
      });

      console.log("OneSignal initialized");

    } catch (err) {
      console.error("OneSignal init error:", err);
      initPromise = null; // Reset on error so we can try again if needed
    }
  })();

  return initPromise;
};