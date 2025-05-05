import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SkeletonCard from "../UI/SkeletonCard";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setSellers(response.data);
        setTimeout(() => setLoading(false), 1200); // <-- delay loading flag
      } catch (error) {
        console.error("Failed to fetch top sellers:", error);
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <Swiper
              spaceBetween={16}
              slidesPerView={6}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              breakpoints={{
                0: { slidesPerView: 2 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 5 },
                1200: { slidesPerView: 6 },
              }}
            >
              {loading
                ? Array.from({ length: 12 }).map((_, index) => (
                    <SwiperSlide key={index}>
                      <SkeletonCard />
                    </SwiperSlide>
                  ))
                : sellers.map((seller, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="top-sellers__card"
                        style={{
                          height: "128px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          borderRadius: "12px",
                        }}
                      >
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage || AuthorImage}
                              alt={seller.authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${seller.authorId}`}>
                            {seller.authorName}
                          </Link>
                          <span>{seller.price} ETH</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
