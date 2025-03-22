import React, { useRef, useEffect } from 'react';

function Room() {
  const localVideoRef = useRef(null);
  const { roomId } = useParams();

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    startVideo();
  }, []);

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <video ref={localVideoRef} autoPlay playsInline style={{ width: '500px', border: '1px solid black' }}></video>
    </div>
  );
}

export default Room;
