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
export const MyContext = createContext();

function App() {
  return (
    <>
      <NavBar />
      <Routes>
		<Route path="/aipainter" element={<AiPainter />} />
        <Route path="/" element={<Artwork />} />
		<Route path="/artist/:artistUrl" element={<ArtistArtworks />} />
      <Route path="/artist-artwork/:contentId" element={<ArtistArtworkDetail />} />
        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-artist" element={<SignUpArtistPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<IsLoggedIn />}>
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
		  <Route path="/favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
