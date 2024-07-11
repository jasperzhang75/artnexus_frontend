import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContextWrapper";
import "./ArtShopDetail.css";
import service from "./../../service/api";

function ArtshopDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [isWish, setIsWish] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const getArtworkDetail = async () => {
    try {
      const res = await service.get(`/api/uploadedartworks/${id}`);
      setArtwork(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkWishStatus = async () => {
    try {
      const res = await service.get(`/api/uploadedartworks/${id}/wish`);
      setIsWish(res.data.isWished);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCartStatus = async () => {
    try {
      const res = await service.get(`/api/order/cart`);
      const isArtworkInCart = res.data?.artworks?.some(artwork => artwork._id === id);
      setIsAdded(isArtworkInCart);
    } catch (error) {
      console.log(error);
    }
  };

  const checkPurchaseStatus = async () => {
    try {
      const res = await service.get(`/api/order/purchased/${id}`);
      setIsPurchased(res.data.isPurchased);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtworkDetail();
    checkWishStatus();
    checkCartStatus();
    checkPurchaseStatus();
  }, [id]);

  const toggleWish = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      if (isWish) {
        await service.delete(`/api/wish/${id}`);
      } else {
        await service.post(`/api/uploadedartworks/${id}/wish`);
      }
      checkWishStatus();
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      await service.post(`/api/order/add-to-cart/${id}`);
      setIsAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const purchaseArtwork = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (!isAdded) {
      try {
        await service.post(`/api/order/add-to-cart/${id}`);
        setIsAdded(true);
      } catch (error) {
        console.log(error);
        return;
      }
    }
    navigate("/artshop/order");
  };

  const navigateToArtist = () => {
    const artistUrl = artwork.artist_title.toLowerCase().split(" ").join("-");
    navigate(`/artist/${artistUrl}`);
  };

  if (!artwork) {
    return <p>Loading..</p>;
  }

  return (
    <div className="artshop-detail-page">
      <hr className="artshop-detail-separator"/>
      <div className="artshop-detail-container">
        <p className="artshop-detail-date">
          {artwork.date_start}
        </p>
        <span onClick={navigateToArtist} className="artshop-detail-artist">
          {artwork.artist_title}
        </span>
        <p className="artshop-detail-title">{artwork.title}</p>
        <div className="artshop-detail-img-container">
          <img src={`${artwork.imageUrl}`} alt={artwork.title} />
        </div>
        <div className="artshop-detail-type-container">
          <p className="artshop-detail-price">Price: {artwork.price} $</p>
          <p onClick={toggleWish} className="artshop-addtowishlist">
            {isWish ? "Remove from Wishlist -" : "Add to Wishlist +"}
          </p>
        </div>
        <div className="artshop-detail-buttons-container">
          <button className="artshop-addtocart" onClick={addToCart} disabled={isAdded || isPurchased}>
            {isAdded || isPurchased ? "Added to Cart" : "Add to Cart"}
          </button>
          <button className="artshop-purchase" onClick={purchaseArtwork} disabled={isPurchased}>
            {isPurchased ? "Already Purchased" : "Purchase"}
          </button>
        </div>
      </div>
      <div className="artshop-detail-description-container">
        <p
          className="artshop-detail-description"
          dangerouslySetInnerHTML={{ __html: artwork.description }}
        ></p>
      </div>
    </div>
  );
}

export default ArtshopDetail;