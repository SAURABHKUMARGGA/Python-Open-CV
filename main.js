document.addEventListener("DOMContentLoaded", () => {
    const listElement = document.querySelector("select#availableCameras");
//   console.log("hello");
  let localVideo = document.getElementById("localVideo");
  function startcamera(){
  let contraints = {
      "video":true,
      "audio":true,
  }
  navigator.mediaDevices.getUserMedia(contraints)
  .then((stream)=>{
      console.log("device available",stream);
      // const videoTracks = stream.getVideoTracks();
      // console.log(`Using video device: ${videoTracks[0].label}`);
    //   stream.onremovetrack = () => {
    //       console.log("Stream ended");
    //     };
      localVideo.srcObject = stream;

  })
  .catch((error)=>{
      console.log("not device connected",error);
  })
}

startcamera();

listElement.addEventListener("change",()=>{
    
    startcamera();
})
  //update camera
 
  function updatecameralist(cameras) {
    startcamera();
    listElement.innerHTML = "";
   cameras.forEach(camera => {
        const cameraOption = document.createElement('option');
        cameraOption.value = camera.deviceId;
        cameraOption.textContent = camera.label;
        // cameraOption.label = camera.label;
        listElement.appendChild(cameraOption);
   });
  
  }

  //list all devices
  async function getconnecteddevice(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const fildev = devices.filter((device) => device.kind === type);
    return fildev;
  }

  // Get the initial set of cameras connected
  getconnecteddevice("videoinput").then((videoCameras) => {
    updatecameralist(videoCameras);
  });

  //chaeck camera changes

  navigator.mediaDevices.addEventListener("devicechange", (event) => {
    getconnecteddevice("videoinput").then((newcameralist) => {
      console.log(newcameralist);
      updatecameralist(newcameralist);
    });
  });
});
