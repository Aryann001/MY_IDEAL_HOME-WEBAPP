import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { Toaster } from "react-hot-toast";
import HouseDetails from "./components/House/HouseDetails";
import BlogDetails from "./components/Blog/BlogDetails";
import House from "./components/House/House";
import Blog from "./components/Blog/Blog";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Profile from "./components/User/Profile";
import UpdatePassword from "./components/User/UpdatePassword";
import UpdateProfile from "./components/User/UpdateProfile";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import BrokerHouse from "./components/Broker/BrokerHouse";
import BrokerBlog from "./components/Broker/BrokerBlog";
import CreateHouseListing from "./components/Broker/CreateHouseListing";
import BrokerHouseView from "./components/Broker/BrokerHouseView";
import UpdateHouseListing from "./components/Broker/UpdateHouseListing";
import CreateBlog from "./components/Broker/Blog/CreateBlog";
import BrokerBlogView from "./components/Broker/Blog/BrokerBlogView";
import UpdateBlog from "./components/Broker/Blog/UpdateBlog";
import NotFound from "./components/Layout/NotFound/NotFound";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses" element={<House />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/house/:houseId" element={<HouseDetails />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/password/reset/:resetToken" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
        </Route>

        {/* Broker Routes */}
        <Route element={<ProtectedRoute isBroker={true} />}>
          <Route path="/broker/house" element={<BrokerHouse />} />
          <Route path="/broker/house/create" element={<CreateHouseListing />} />
          <Route path="/broker/house/houses" element={<BrokerHouseView />} />
          <Route
            path="/broker/house/update/:updateHouseId"
            element={<UpdateHouseListing />}
          />

          <Route path="/broker/blog" element={<BrokerBlog />} />
          <Route path="/broker/blog/create" element={<CreateBlog />} />
          <Route path="/broker/blog/blogs" element={<BrokerBlogView />} />
          <Route
            path="/broker/blog/update/:updateBlogId"
            element={<UpdateBlog />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
