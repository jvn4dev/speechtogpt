import {useEffect, useState} from "react";

const Button = (props: ButtonProps) => {
  const { token } = props;
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');

  const startRecording = () => {
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

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  }

  useEffect(() => {
    return () => {
      mediaRecorder?.removeEventListener('dataavailable', () => {
        // 이벤트리스너 해제
        console.log('dataavailable 이벤트리스너 해제됨')
      });
      mediaRecorder?.removeEventListener('stop', () => {
        console.log('stop 이벤트리스너 해제됨')
      })
    }
  }, [])

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