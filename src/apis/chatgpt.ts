import axios from 'axios';

export const postPromptToGPT = (prompt: string) => {
  return axios.post("http://localhost:8080/chat", { prompt });
}