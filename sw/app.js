const publicVapidKey = 'BCoauDSn3nhKF0gW5VGE7yCbKyn-CrVIq51Wrj80KchaMxF4py_0s4EnD7l4nKmWQ9l8uVwjAARAEpE9s_nFkVM';

//check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.log (err));
}

// Register SW, Register push and send push
async function send() {
  //register service worker
  console.log("service is registering");
  const register = await navigator.serviceWorker.register(
    "./service-worker.js"
  );
  console.log("Service Worker is Registered");

  //Register Push
  console.log("Registering push...");
  const subscription = await register.pushManager.subscribe({userVisibleOnly:true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  //Send push notification
  console.log('Sending Push...');
  await fetch('/subscribe', {
      method: 'POST',
      body:JSON.stringify(subscription),
      headers: {
          'content-type': 'application/json'
      }
  });
  console.log('Push sent..');

}
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
