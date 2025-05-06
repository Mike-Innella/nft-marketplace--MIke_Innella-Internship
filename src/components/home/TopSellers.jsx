import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AuthorImage from "../../images/author_thumbnail.jpg";
import TopSellersSkeleton from "../UI/TopSellersSkeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );

        const sorted = response.data.sort((a, b) => b.price - a.price);
        setSellers(sorted);

        setTimeout(() => setLoading(false), 1200); // delay to show skeleton
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
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <TopSellersSkeleton />
                    </li>
                  ))
                : sellers.map((seller, index) => (
                    <li key={seller.authorId || index}>
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
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
