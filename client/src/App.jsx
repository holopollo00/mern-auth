import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Designs from "./pages/Designs";
import News from "./pages/News";
import DesignDetails from "./pages/DesignDetails";
import CustomMaterial from "./components/CustomMaterial";
import CustomDesignArea from "./pages/CustomDesignArea";
import Windows from "./components/Windows";
import Doors from "./components/Doors";
import YardBricks from "./components/YardBricks";
import Roofs from "./components/Roofs";
import DecorateBricks from "./components/DecorateBricks";
import ProfileRoute from "./components/ProfileRoute";
import NewsDetail from "./pages/NewsDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designs" element={<Designs />} />
        <Route path="/designDetail/:id" element={<DesignDetails />} />
        <Route path="/customDesign" element={<CustomDesignArea />} />
        <Route path="/customMaterial" element={<CustomMaterial />}>
          <Route path="windows" element={<Windows />} />
          <Route path="doors" element={<Doors />} />
          <Route path="yardbricks" element={<YardBricks />} />
          <Route path="roofs" element={<Roofs />} />
          <Route path="decoratebricks" element={<DecorateBricks />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/newsblogs" element={<News />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<ProfileRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/newsdetail" element={<NewsDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
