import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ItemDetailsSkeleton from "../components/UI/ItemDetailsSkeleton";
import nftImage from "../images/nftImage.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import ethereumIcon from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Live ticking clock to update countdowns every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("🧭 ItemDetails mounted with ID:", nftId);

    const fetchItemDetails = async () => {
      try {
        console.log("📡 Fetching item from API...");
        // Using nftId consistently for API calls
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        console.log("✅ API Response:", response.data);

        if (!response.data || Object.keys(response.data).length === 0) {
          console.warn("⚠️ API returned empty or invalid item data.");
          setError(true);
          setLoading(false);
          return;
        }

        // ⏳ Add slight delay before setting item
        setTimeout(() => {
          setItem(response.data);
          setLoading(false);
          console.log("🧩 Item set successfully:", response.data);
        }, 1200);
      } catch (err) {
        console.error("❌ API fetch failed:", err);
        setError(true);
        setLoading(false);
      }
    };

    if (nftId) {
      fetchItemDetails();
    } else {
      console.warn("⚠️ No ID found in route params.");
      setError(true);
      setLoading(false);
    }
  }, [nftId]);

  // Countdown format: hours and minutes remaining
  const formatCountdown = (expiryDate) => {
    if (!expiryDate) return null;
    const end = new Date(expiryDate).getTime();
    const diff = Math.max(0, end - now);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  if (error) {
    console.warn("🚫 Rendering error fallback.");
    return (
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2>⚠️ This NFT could not be found</h2>
                <p>
                  The item you're looking for doesn't exist or has been removed.
                </p>
                <button className="btn-main" onClick={() => navigate(-1)}>
                  ← Go Back
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (loading) {
    return <ItemDetailsSkeleton />;
  }

  console.log("🖼️ Rendering item details:", item);

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={item.nftImage || nftImage}
                className="img-fluid img-rounded mb-sm-30"
                alt={item.title}
              />
            </div>
            <div className="col-md-6">
              <div className="item_info">
                {item.expiryDate && (
                  <div className="de_countdown">
                    ⏳ {formatCountdown(item.expiryDate)}
                  </div>
                )}
                <h2>{item.title}</h2>
                <div className="item_info_counts">
                  <div className="item_info_views">
                    <i className="fa fa-eye"></i>
                    {item.views || 0}
                  </div>
                  <div className="item_info_like">
                    <i className="fa fa-heart"></i>
                    {item.likes || 0}
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="d-flex flex-row">
                  <div className="mr40">
                    <h6>Owner</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.ownerId}`}>
                          <img
                            className="lazy"
                            src={item.ownerImage || AuthorImage}
                            alt={item.ownerName || "Owner"}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.ownerId}`}>
                          {item.ownerName || "Unknown Owner"}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6>Creator</h6>
                    <div className="item_author">
                      <div className="author_list_pp">
                        <Link to={`/author/${item.creatorId}`}>
                          <img
                            className="lazy"
                            src={item.creatorImage || AuthorImage}
                            alt={item.creatorName || "Creator"}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${item.creatorId}`}>
                          {item.creatorName || "Unknown Creator"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <div className="de_tab">
                  <div className="de_tab_content">
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={ethereumIcon} alt="ethereum" />
                      <span>{item.price || 0} ETH</span>
                    </div>
                    <div className="spacer-20"></div>
                    <div className="d-flex flex-row">
                      <button className="btn-main">Buy Now</button>
                      <div className="spacer-10"></div>
                      <button
                        className="btn-main btn-light"
                        onClick={() => navigate(-1)}
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetails;
