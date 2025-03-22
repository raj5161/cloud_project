import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Room from './Room';

function App() {
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isMuted, setMuted] = useState(false);
  const [isCameraOn, setCameraOn] = useState(true);

  // Start video and microphone
  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  // Mute or unmute audio
  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = isMuted;
      setMuted(!isMuted);
    }
  };

  // Turn camera on/off
  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = isCameraOn;
      setCameraOn(!isCameraOn);
    }
  };

  // Disconnect the stream
  const disconnectStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome! Share a room link to join a video conference.</h1>} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
      <div>
        <h1>Video Conferencing App</h1>
        <button onClick={startVideo}>Start Video</button>
        <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
        <button onClick={toggleCamera}>{isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}</button>
        <button onClick={disconnectStream}>Disconnect</button>
        <video ref={localVideoRef} autoPlay playsInline style={{ width: '500px', border: '1px solid black' }}></video>
      </div>
    </Router>
  );
}

export default App;
