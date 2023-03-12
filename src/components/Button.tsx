import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useEffect, useState} from "react";
import { postPromptToGPT } from '../apis/chatgpt';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [responseFromGPT, setResponseFromGPT] = useState('');

  useEffect(() => {
    if (!listening && !!transcript) {
      postPromptToGPT(transcript)
        .then(res => {
          setResponseFromGPT(res.data);
          console.log(res)
        })
    }
  }, [listening, transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>지원하지 않는 브라우저입니다. 크롬으로 실행해주세요.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <p>{responseFromGPT}</p>
    </div>
  );
};
export default Dictaphone;