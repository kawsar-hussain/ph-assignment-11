import React from "react";
import Banner from "../Components/Banner/Banner";
import Contact from "../Contact/Contact";
import Features from "../Components/Banner/Features";
import UrgentRequests from "../Components/Banner/UrgentRequests";
import LiveImpact from "../Components/Banner/LiveImpact";
import OurHeros from "../Components/Banner/OurHeros";

const Home = () => {
  return (
    <div>
      <div className="flex items-center lg:px-20 py-10 px-5">
        <div className="flex-8">
          <UrgentRequests></UrgentRequests>
        </div>
        <div className="flex-4">
          <Banner></Banner>
        </div>
      </div>
      <LiveImpact></LiveImpact>
      <Features></Features>
      <OurHeros></OurHeros>
      <Contact></Contact>
    </div>
  );
};

export default Home;
