import { useState } from "react";

const Button = (props: ButtonProps) => {
  const { token } = props;
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');

  function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        const chunks: Blob[] = [];

        mediaRecorder.addEventListener('dataavailable', function(event) {
          chunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', function() {
          const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        });

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function stopRecording() {
    mediaRecorder?.stop();
    setIsRecording(false);
  }

  return (
    <div>
      {audioUrl && (
        <audio controls src={audioUrl}></audio>
      )}
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  )
}

export default Button;

type ButtonProps = {
  token: string;
}