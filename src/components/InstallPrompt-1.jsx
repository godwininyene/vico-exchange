import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS devices
    const userAgent = window.navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setIsIOS(true);
      setShow(true); // Show instruction banner for iOS
    }

    // Listen for Android PWA install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true); // Show prompt banner
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User installed app");
    }

    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#020617] text-white px-6 py-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-4 z-50">
      
      {/* Message */}
      <span className="text-sm text-center sm:text-left">
        {isIOS
          ? 'To install on iPhone/iPad: Tap the share button (⬆️) and select "Add to Home Screen" 📱'
          : 'Install Winsubz for faster access 🚀'}
      </span>

      {/* Install button for Android/Desktop */}
      {!isIOS && deferredPrompt && (
        <button
          onClick={installApp}
          className="bg-primary-dark px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
        >
          Install
        </button>
      )}

      {/* Close button */}
      <button
        onClick={() => setShow(false)}
        className="text-gray-400 text-sm"
      >
        ✕
      </button>
    </div>
  );
};

export default InstallPrompt;