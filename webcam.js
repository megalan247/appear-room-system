function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }
  
  if (hasGetUserMedia()) {
    // Good to go!
  } else {
    alert('getUserMedia() is not supported by your browser');
  }

  const constraints = {
    video: true
  };
  
  const video = document.getElementById('liveVideo');
  
  navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => {video.srcObject = stream});

