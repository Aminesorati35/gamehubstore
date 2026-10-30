let activeScript = null;
let activeLockerKey = null;

export const openAdblueLocker = async (config) => {
  if (!config?.it || !config?.key || !config?.variable || !config?.script) {
    console.error("Invalid AdBlueMedia configuration");
    return;
  }

  const lockerKey = `${config.it}-${config.key}-${config.script}`;

  try {
    // Remove the previous locker script when switching lockers
    if (activeLockerKey !== lockerKey) {
      if (activeScript) {
        activeScript.remove();
        activeScript = null;
      }

      // Clear previous locker function
      delete window._cy;

      // Set the configuration variable required by AdBlueMedia
      window[config.variable] = {
        it: config.it,
        key: config.key,
      };

      // Load the selected locker script
      const script = document.createElement("script");
      script.src = config.script;
      script.type = "text/javascript";
      script.async = true;

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = () =>
          reject(new Error("Failed to load AdBlueMedia script"));

        document.body.appendChild(script);
      });

      activeScript = script;
      activeLockerKey = lockerKey;
    }

    // Open the selected AdBlueMedia locker
    if (typeof window._cy === "function") {
      window._cy();
    } else {
      console.error("AdBlueMedia _cy() function not available");
    }
  } catch (error) {
    console.error("AdBlueMedia locker error:", error);
  }
};