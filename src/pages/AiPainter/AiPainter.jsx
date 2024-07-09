import { useState } from "react";
import { generateArtwork, generatePoem } from "./../../service/api";
import "./AiPainter.css"

function AIMpressionist() {
  const [theme, setTheme] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [poem, setPoem] = useState("");

  const handleGenerate = async () => {
    if (theme) {
      try {
        const promptForImage = `Create an impressionist painting inspired by the theme: ${theme}.`;
        const imageUrl = await generateArtwork(promptForImage);
        setImageUrl(imageUrl);

        const promptForPoem = `Create a poem inspired by the theme: "${theme}".`;
        const poem = await generatePoem(promptForPoem);
        setPoem(poem);
      } catch (error) {
        console.error("Error generating content: ", error);
      }
    }
  };

  return (
    <div className="aimpressionist-container">
      <p>Create Your Impressionism Card!</p>
      <div className="aimpressionist-input-container">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Enter a theme"
        />
        <button onClick={handleGenerate} className="rainbow-button">Generate</button>
      </div>
      <div className="generated-content">

      {imageUrl && (
          <div className="generated-box">
          <img src={imageUrl} alt="Generated Artwork" />
        </div>
      )}
      {poem && (
          <div className="generated-box">
          <p>{poem}</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default AIMpressionist;
