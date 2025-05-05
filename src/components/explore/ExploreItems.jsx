import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios"; // Import axios for API calls
import SkeletonCard from "../UI/SkeletonCard"; // Import the skeleton card component

const ExploreItems = () => {
  const [items, setItems] = useState([]); // State to store fetched items
  const [filter, setFilter] = useState(""); // State to store the selected filter
  const [loading, setLoading] = useState(true); // State to track loading status
  const [now, setNow] = useState(Date.now()); // Live ticking clock to update countdowns every second
  const [visibleItemsCount, setVisibleItemsCount] = useState(4); // State to control the number of visible items

  // Function to fetch data based on filter
  const fetchItems = async () => {
    setLoading(true); // Set loading state to true before fetching
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      );
      console.log("API Response:", response.data); // Enhanced logging
      // Log the first item to inspect its structure
      if (Array.isArray(response.data) && response.data.length > 0) {
        console.log("First item structure:", response.data[0]);
        
        // Add a 1.2s delay to allow skeleton shimmer to display
        setTimeout(() => {
          setItems(response.data); // Update state with fetched items
          setLoading(false); // Set loading to false after the timeout
        }, 1200);
      } else {
        console.error("API did not return an array of items.");
        setTimeout(() => setLoading(false), 1200); // Still apply timeout for consistency
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setTimeout(() => setLoading(false), 1200); // Still apply timeout for consistency
    }
  };

  // Countdown format: hours and minutes remaining
  const formatCountdown = (expiryDate) => {
    const end = new Date(expiryDate).getTime();
    const diff = Math.max(0, end - now);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Live update of time
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // UseEffect to fetch items when filter changes
  useEffect(() => {
    setVisibleItemsCount(4); // Reset the number of visible items when filter changes
    fetchItems();
  }, [filter]); // Re-fetch items whenever the filter changes

  // Pagination logic: Only show up to the current number of visible items
  const currentItems = items.slice(0, visibleItemsCount);

  // Load more items
  const loadMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + 4); // Show 4 more items each time
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter} // Controlled select dropdown
          onChange={(e) => setFilter(e.target.value)} // Update filter on change
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        // Show skeleton cards while loading
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index} 
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", marginBottom: "30px" }}
            >
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
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
                    src={item.authorImage || AuthorImage}
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
                        href={`https://facebook.com/sharer/sharer.php?u=https://nftsite.com/item/${item.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=https://nftsite.com/item/${item.id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a
                        href={`mailto:?subject=Check out this NFT&body=https://nftsite.com/item/${item.id}`}
                      >
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.id}`}>
                  <img
                    src={item.nftImage || nftImage}
                    className="lazy nft__item_preview"
                    alt={item.title || "NFT Item"}
                  />
                </Link>
              </div>

              <div className="nft__item_info">
                <Link to={`/item-details/${item.id}`}>
                  <h4>{item.title || "Item Name"}</h4>
                </Link>
                <div className="nft__item_price">
                  {/* Use text format for ETH price */}
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
        <div>No items found</div> // Handle case when no items are available
      )}

      {/* Load More Button */}
      <div className="col-md-12 text-center">
        <button onClick={loadMore} id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
