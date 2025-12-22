import React from "react";
import Banner from "../Components/Banner/Banner";
import Contact from "../Contact/Contact";
import Features from "../Components/Banner/Features";
import UrgentRequests from "../Components/Banner/UrgentRequests";
import LiveImpact from "../Components/Banner/LiveImpact";
import Leaderboard from "../Components/Banner/Leaderboard";

const Home = () => {
  return (
    <div>
      <div className="flex lg:flex-row flex-col items-center lg:px-20 py-5 px-3">
        <div className="flex-8">
          <UrgentRequests></UrgentRequests>
        </div>
        <div className="flex-4 lg:self-center self-start w-full lg:w-auto mt-5 lg:mt-0">
          <Banner></Banner>
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
