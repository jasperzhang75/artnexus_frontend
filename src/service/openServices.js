import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const IMAGE_API_URL = "https://api.openai.com/v1/images/generations";
const POEM_API_URL = "https://api.openai.com/v1/chat/completions";

export const generateArtwork = async (prompt) => {
  try {
    const response = await axios.post(
      IMAGE_API_URL,
      {
        prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data[0].url;
  } catch (error) {
    console.error("Error generating artwork: ", error);
    throw error;
  }
};

export const generatePoem = async (prompt) => {
  try {
    const response = await axios.post(
      POEM_API_URL,
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a poet." },
          { role: "user", content: prompt },
        ],
        max_tokens: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error("No choices found in the response");
    }
  } catch (error) {
    console.error("Error generating poem: ", error);
    throw error;
  }
};
