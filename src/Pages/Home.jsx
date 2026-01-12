import React from "react";
import Contact from "../Contact/Contact";
import Features from "../Components/Banner/Features";
import UrgentRequests from "../Components/Banner/UrgentRequests";
import LiveImpact from "../Components/Banner/LiveImpact";
import Leaderboard from "../Components/Banner/Leaderboard";

const Home = () => {
  return (
    <div>
      <div className="lg:px-20 py-5 px-3">
        <div className="">
          <UrgentRequests></UrgentRequests>
        </div>
      </div>
      <LiveImpact></LiveImpact>
      <Features></Features>
      <Leaderboard></Leaderboard>
      <Contact></Contact>
    </div>
  );
};

export default Home;
