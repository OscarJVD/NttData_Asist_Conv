if (!Jarvis.recognizingSupported())
  alert("navegador no soportado. Se necesita Google Chrome versión 25 y posteriores")

// Verify if artyom is supported
window.onload = function () {
  if (Jarvis.Device.isChrome) {
    // if (!Jarvis.Device.isMobile) {
    //   alert("Jarvis can talk and obey commands in this browser, however the voice will be the default voice of the device. Cannot force language here.");
    // } 
  } else {
    alert("Jarvis only works with The Google Chrome Browser !");
  }
};