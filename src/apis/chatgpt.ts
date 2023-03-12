import axios from 'axios';

export const postPromptToGPT = (prompt: string) => {
  return axios.post("http://localhost:8080/chat", { prompt });
}

export const fetchData = async (input: string) => {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: `Complete this sentence: "${input}"`,
      model: 'text-davinci-003',
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
      n: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text;
};