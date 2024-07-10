import "./App.css";
import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignUpArtistPage from "./pages/SignUpArtistPage";
import LoginPage from "./pages/LoginPage";
import IsLoggedOut from "./components/Routing/IsLoggedOut";
import IsLoggedIn from "./components/Routing/IsLoggedIn";
import Artwork from "./pages/Artwork/Artwork";
import NavBar from "./components/Navbar/Navbar";
import ArtworkDetail from "./pages/ArtworkDetail/ArtworkDetail";
import ArtistArtworks from "./pages/ArtistArtworks/ArtistArtworks";
import ArtistArtworkDetail from "./pages/ArtistArtworkDetail/ArtistArtworkDetail";
import Favourites from "./pages/Favourites/Favourites";
import AiPainter from "./pages/AiPainter/AiPainter";
import Artshop from "./pages/Artshop/ArtShop";
import ArtshopDetail from "./pages/ArtShopDetail/ArtShopDetail";
import ArtshopOrder from "./pages/ArtshopOrder/ArtshopOrder";
import PurchasedArtworks from "./pages/PurchasedArtworks/PurchasedArtworks";
import Wishlist from "./pages/Wishlist/Wishlist";
import PublishArtwork from "./pages/PublishArtwork/PublishArtwork";
import MyArtworks from "./pages/MyArtworks/MyArtworks";
import ModifyArtwork from "./pages/ModifyArtwork/ModifyArtwork";
import UserCenter from "./pages/UserCenter/UserCenter";
export const MyContext = createContext();

function App() {
  return (
    <>
      <NavBar />
      <Routes>
		<Route path="/aipainter" element={<AiPainter />} />
        <Route path="/" element={<Artwork />} />
		<Route path="/artist/:artistUrl" element={<ArtistArtworks />} />
		<Route path="/artshop" element={<Artshop />} />
		<Route path="/uploadedartworks/:id" element={<ArtshopDetail />} />
        <Route path="/artist-artwork/:contentId" element={<ArtistArtworkDetail />} />
		<Route path="/artwork/:id" element={<ArtworkDetail />} />  

        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-artist" element={<SignUpArtistPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<IsLoggedIn />}>
        <Route path="/favourites" element={<Favourites />} />
		<Route path="/artshop/order" element={<ArtshopOrder />} />
		<Route path="/purchased-artworks" element={<PurchasedArtworks />} />
		<Route path="/wishlist" element={<Wishlist />} />
		<Route path="/publish-artwork" element={<PublishArtwork />} />
		<Route path="/my-artworks" element={<MyArtworks />} />
		<Route path="/modify-artwork/:id" element={<ModifyArtwork />} />
		<Route path="/user-center" element={<UserCenter />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
