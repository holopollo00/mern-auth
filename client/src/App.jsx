import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Blueprint from "./pages/Blueprint/Blueprint";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Designs from "./pages/Designs";
import Customizes from "./pages/Customize/Customize";
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
import { setCurrentPart } from "./redux/user/partSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomArea from "./components/CustomArea";
import AdminHeader from "./components/AdminHeader";
import AdminBlueprint from "./pages/Blueprint/AdminBlueprint";
import AdminMaterial from "./pages/Admin/AdminMaterial";
import AdminDesignDetail from "./pages/Admin/AdminDesignDetail";
import AdminDesignAddings from "./pages/Admin/AdminDesignAdding";


export default function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    getPart();
  }, [])

  const getPart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/part`);
      const data = await res.data;
      dispatch(setCurrentPart(data));
    } catch (error) {
      console.log("Failed to fetch part to custom!");
    }
  };

  return (
    <BrowserRouter>
      {
        (currentUser?.roleID == "Admin") ?
          (<AdminHeader />)
          :
          (<Header />)
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designs" element={ <Designs />} />
        <Route path="/Blueprint" element={(currentUser?.roleID == "User") ? <Blueprint /> : <Home />} />
        <Route path="/designDetail/:id" element={(currentUser?.roleID == "Admin") ? <Home /> : <DesignDetails />} />
        <Route path="/customDesign" element={(currentUser?.roleID == "Admin") ? <Home /> : <CustomArea />} />
        <Route path="/customMaterial" element={(currentUser?.roleID == "Admin") ? <Home /> : <CustomMaterial />} >
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
        <Route path="/customizes" element={(currentUser?.roleID == "Admin") ? <Home /> : <Customizes />} />
        <Route element={<ProfileRoute />}>
          <Route path="/profile" element={(currentUser) ? <Profile /> : <Home />} />
        </Route>
        <Route path="/newsdetail" element={<NewsDetail />} />
        {/* Admin */}
        <Route path="/admin-blueprint" element={(currentUser?.roleID == "Admin") ? <AdminBlueprint /> : <Home />} />
        <Route path="/admin-material" element={(currentUser?.roleID == "Admin") ? <AdminMaterial /> : <Home />} />
        <Route path="/admin-designDetail/:id" element={(currentUser?.roleID == "Admin") ? <AdminDesignDetail /> : <Home />} />
        <Route path="/admin-design-adding" element={(currentUser?.roleID == "Admin") ? <AdminDesignAddings /> : <Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
