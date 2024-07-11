import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { generateArtwork } from "./../../service/api";
import { AuthContext } from "../../context/AuthContextWrapper";
import "./ArtworkDetail.css";
import service from "./../../service/api";

function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [generatedArtwork, setGeneratedArtwork] = useState(null);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  const getArtworkDetail = async () => {
    try {
      const res = await service.get(`/api/normalartworks/${id}`);
      setArtwork(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavouriteStatus = async () => {
    try {
      const res = await service.get(`/api/normalartworks/${id}/favourite`);
      console.log(res.data.isFavourite);
      setIsFavourite(res.data.isFavourite);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const res = await service.get(`/api/normalartworks/${id}/comment`);
      console.log(res.data.content);
      setComments(res.data.content || null);
      console.log(comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtworkDetail();
    checkFavouriteStatus();
    getComments();
  }, [id]);

  const toggleFavourite = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      if (isFavourite) {
        await service.delete(`/api/favourite/${id}`);
      } else {
        await service.post(`/api/normalartworks/${id}/favourite`, {
          user: user._id,
          artwork: id,
        });
      }
      checkFavouriteStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const saveComment = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      if (comments) {
        await service.put(`/api/comment/${id}`, {
          
          content: newComment,
          
        });
      } else {
        await service.post(`/api/normalartworks/${id}/comment`, {
          content: newComment,
          creator: user._id,
          artwork: id,
        });
      }
      await getComments();
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToArtist = () => {
    const artistUrl = artwork.artist_title.toLowerCase().split(" ").join("-");
    navigate(`/artist/${artistUrl}`);
  };

  const handleGenerateArtwork = async () => {
    try {
      const prompt = `Create a new artwork inspired by ${artwork.title} by 
      ${artwork.artist_display}, created in ${artwork.date_start}.`;
      const url = await generateArtwork(prompt);
      setGeneratedArtwork(url);
    } catch (error) {
      console.log("Error generating artwork: ", error);
    }
  };

  if (!artwork) {
    return <p>Loading..</p>;
  }

  return (
    <div>
      <hr></hr>
      <div className="artwork-detail-container-renamed">
        <div className="artwork-img-container-renamed">
          <img
            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
            alt={artwork.title}
          />
        </div>
        <p className="artwork-title-renamed">{artwork.title}</p>
        <p className="artwork-date-renamed">
          {artwork.date_start} - {artwork.date_end}
        </p>
        <span onClick={navigateToArtist} className="artwork-artist-renamed">
          {artwork.artist_display}
        </span>
        <p
          className="artwork-description-renamed"
          dangerouslySetInnerHTML={{ __html: artwork.description }}
        ></p>
        <div className="artwork-buttons-container-renamed">
          <button className="artwork-toggle-favourite-button-renamed" onClick={toggleFavourite}>
            {isFavourite ? "Unfavourite" : "Favourite"}
          </button>
        </div>
        <button className="artwork-rainbow-button-renamed" onClick={handleGenerateArtwork}>
          AI-mpressionist It!
        </button>
        {generatedArtwork && (
          <div className="artwork-generated-container-renamed">
            <p>AI-mpressionist Recreation is here!</p>
            <img src={generatedArtwork} alt="Generated Artwork" />
          </div>
        )}
        <div className="artwork-comments-section-renamed">
          <hr></hr>

          <h2>Comment</h2>
          {editMode ? (
            <>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add or edit your comment"
              />
              <button className="artwork-save-comment-button-renamed" onClick={saveComment}>Save</button>
              <button className="artwork-cancel-comment-button-renamed" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{comments ? comments : "No comments yet"}</p>
              <button
                className="artwork-edit-comment-button-renamed"
                onClick={() => {
                  setNewComment(comments ? comments : "");
                  setEditMode(true);
                }}
              >
                {comments ? "Edit" : "Add a Comment"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetail;