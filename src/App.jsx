import './App.css'
import { createContext} from "react"
import { Routes, Route } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import SignUpArtistPage from "./pages/SignUpArtistPage"
import LoginPage from "./pages/LoginPage"
import IsLoggedOut from "./components/Routing/IsLoggedOut"
import IsLoggedIn from "./components/Routing/IsLoggedIn"
import Artwork from './pages/Artwork/Artwork'
import NavBar from "./components/Navbar/Navbar"
import ArtworkDetail from "./pages/ArtworkDetail/ArtworkDetail"
export const MyContext = createContext()

function App() {

  return (
   <>

   <NavBar />
<Routes>
  <Route path="/" element={<Artwork />} />
  <Route element={<IsLoggedOut />}>
     <Route path="/signup" element={<SignUpPage />} />
     <Route path="/signup-artist" element={<SignUpArtistPage />} />
     <Route path="/login" element={<LoginPage />} />
  </Route>
  <Route element={<IsLoggedIn />}>
    <Route path="/artwork/:id" element={<ArtworkDetail />} />
  </Route>
</Routes>

   </>
  )
}

export default App
