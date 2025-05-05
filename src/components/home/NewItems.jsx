import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SkeletonCard from "../UI/SkeletonCard";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  // Live ticking clock to update countdowns every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchNewItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
        // Add a 1.2s delay to allow skeleton shimmer to display
        setTimeout(() => setLoading(false), 1200);
      }
    };

    fetchNewItems();
  }, []);

  const formatCountdown = (expiryDate) => {
    const end = new Date(expiryDate).getTime();
    const diff = Math.max(0, end - now);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {loading
            ? new Array(4).fill(0).map((_, i) => (
                <SwiperSlide key={`skeleton-${i}`}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : items.map((item, index) => (
                <SwiperSlide key={index}>
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
                          alt={item.author}
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
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewItems;
