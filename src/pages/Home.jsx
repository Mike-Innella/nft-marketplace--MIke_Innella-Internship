import React, { useEffect, useState, useRef } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from "aos"; // Import AOS JS
import "aos/dist/aos.css"; // Import AOS CSS

const Home = () => {
  // State to track if BrowseByCategory has been scrolled into view
  const [fadeIn, setFadeIn] = useState(false);
  const browseRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Duration of the animation
      once: true, // Animation happens only once
    });

    window.scrollTo(0, 0); // Optionally reset the scroll position on mount

    // Intersection Observer to trigger fade-in effect when in view
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFadeIn(true);
            observer.unobserve(entry.target); // Stop observing once triggered
          }
        });
      },
      { threshold: 0.9 }
    );

    if (browseRef.current) {
      observer.observe(browseRef.current); // Start observing the BrowseByCategory component
    }

    // Cleanup observer on component unmount
    return () => {
      if (browseRef.current) observer.unobserve(browseRef.current);
    };
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <div data-aos="fade-up">
          <Landing />
        </div>
        <div data-aos="fade-down">
          <LandingIntro />
        </div>
        <div data-aos="fade-right">
          <HotCollections />
        </div>
        <div data-aos="fade-left">
          <NewItems />
        </div>
        <div data-aos="fade-right">
          <TopSellers />
        </div>

        {/* Custom fade-in for BrowseByCategory with internal CSS */}
        <div
          ref={browseRef}
          style={{
            opacity: fadeIn ? 1 : 0,
            transition: "all 800ms ease-in-out",
          }}
        >
          <BrowseByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;
