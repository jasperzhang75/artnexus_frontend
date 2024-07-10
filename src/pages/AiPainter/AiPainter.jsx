import { useState } from "react";
import { generateArtwork, generatePoem } from "./../../service/api";
import "./AiPainter.css";

function AiPainter() {
  const [scene, setScene] = useState("");
  const [style, setStyle] = useState("impressionism");
  const [imageUrl, setImageUrl] = useState("");
  const [poem, setPoem] = useState("");

  const handleGenerate = async () => {
    if (scene && style) {
      try {
        const promptForImage = `Create a ${style} painting inspired by the scene: ${scene}.`;
        const imageUrl = await generateArtwork(promptForImage);
        setImageUrl(imageUrl);

        const promptForPoem = `Create a poem inspired by the scene: "${scene}".`;
        const poem = await generatePoem(promptForPoem);
        setPoem(poem);
      } catch (error) {
        console.error("Error generating content: ", error);
      }
    }
  };

  return (
    <div className="ai-painter-container">
      <p>Everyone can be an artist!</p>
      <div className="ai-painter-input-container">
        <span>I am imagining</span>
        <input
          type="text"
          value={scene}
          onChange={(e) => setScene(e.target.value)}
          placeholder="Describe your scene"
        />
        <span>in</span>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="impressionism">Impressionism</option>
          <option value="modernism">Modernism</option>
          <option value="surrealism">Surrealism</option>
        </select>
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

export default AiPainter;