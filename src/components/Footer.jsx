import React, { useEffect, useState, useRef } from "react";
import AOS from "aos"; // Import AOS JS
import "aos/dist/aos.css"; // Import AOS CSS
import { Link } from "react-router-dom";
import Logo from "../images/Ultraverse.png";

const Footer = () => {
  // State to track if Footer has been scrolled into view
  const [fadeIn, setFadeIn] = useState(false);
  const footerRef = useRef(null);

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
      { threshold: 0.92 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current); // Start observing the footer
    }

    // Cleanup observer on component unmount
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="footer-light"
      style={{
        opacity: fadeIn ? 1 : 0,
        transition: "all 800ms ease-in-out",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Marketplace</h5>
              <ul>
                <li>
                  <Link to="#" className="no-cursor">
                    All NFTs
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Art
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Music
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Domain Names
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Virtual World
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Collectibles
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Resources</h5>
              <ul>
                <li>
                  <Link to="#" className="no-cursor">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Suggestions
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Community</h5>
              <ul>
                <li>
                  <Link to="#" className="no-cursor">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Brand Assets
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link to="#" className="no-cursor">
                    Mailing List
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Newsletter</h5>
              <p>
                Signup for our newsletter to get the latest news in your inbox.
              </p>
              <form
                action="blank.php"
                className="row form-dark"
                id="form_subscribe"
                method="post"
                name="form_subscribe"
              >
                <div className="col text-center">
                  <input
                    className="form-control"
                    id="txt_subscribe"
                    name="txt_subscribe"
                    placeholder="enter your email"
                    type="text"
                  />
                  <Link to="#" className="no-cursor" id="btn-subscribe">
                    <i className="arrow_right bg-color-secondary"></i>
                  </Link>
                  <div className="clearfix"></div>
                </div>
              </form>
              <div className="spacer-10"></div>
              <small>Your email is safe with us. We don't spam.</small>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex footer__wrapper">
                <div className="de-flex-col">
                  <Link className="footer__link" to="/">
                    <img alt="" className="f-logo" src={Logo} />
                    <span className="copy">&copy; Copyright 2022</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
