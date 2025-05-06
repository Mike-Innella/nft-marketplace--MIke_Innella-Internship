import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorItemsSkeleton from "../UI/AuthorItemsSkeleton";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const AuthorItems = ({ authorId = "73855012", authorImage = AuthorImage }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // Live ticking clock to update countdowns every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        // Add a 1.2s delay to allow skeleton shimmer to display
        setTimeout(() => {
          // Check if response.data has nftCollection property
          if (response.data && response.data.nftCollection) {
            setItems(response.data.nftCollection);
          } else {
            setItems([]);
          }
          setLoading(false);
        }, 1200);
      } catch (error) {
        console.error("Error fetching author items:", error);
        setTimeout(() => setLoading(false), 1200); // Still apply timeout for consistency
      }
    };

    fetchAuthorItems();
  }, [authorId]);

  // Countdown format: hours and minutes remaining
  const formatCountdown = (expiryDate) => {
    const end = new Date(expiryDate).getTime();
    const diff = Math.max(0, end - now);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            // Show skeleton cards while loading
            new Array(8).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <AuthorItemsSkeleton />
              </div>
            ))
          ) : items.length > 0 ? (
            // Show actual items when loaded
            items.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId || ""}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={`Creator: ${item.author || "Unknown"}`}
                    >
                      <img
                        className="lazy"
                        src={authorImage}
                        alt={item.author || "Author"}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  {item.expiryDate && (
                    <div className="de_countdown">
                      ⏳ {formatCountdown(item.expiryDate)}
                    </div>
                  )}

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a
                            href={`https://facebook.com/sharer/sharer.php?u=https://nftsite.com/item/${
                              item.nftId || item.id
                            }`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href={`https://twitter.com/intent/tweet?url=https://nftsite.com/item/${
                              item.nftId || item.id
                            }`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a
                            href={`mailto:?subject=Check out this NFT&body=https://nftsite.com/item/${
                              item.nftId || item.id
                            }`}
                          >
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId || item.id}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title || "NFT Item"}
                      />
                    </Link>
                  </div>

                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId || item.id}`}>
                      <h4>{item.title || "Item Name"}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {item.price || "0"} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show message when no items are available
            <div className="col-12">
              <p>No items found for this author</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
