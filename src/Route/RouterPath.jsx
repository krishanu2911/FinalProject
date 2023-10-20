import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from 'Components';
import { Login, Signup, Home, Explore, Profile, ErrorPage } from "../Pages/index";
import "../App.css"

const ComingSoon = () => {
  return <h1 style={{ textAlign:"center", fontSize: "2rem"}} className=" bold-font">Coming soon...</h1>
}
function RouterPath() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      // {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/explore" element={<Explore />} />
      {/* <Route path="/Profile/:userId" element={<RequireAuth><Profile /></RequireAuth>} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default RouterPath;
