import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SkeletonCard from "../components/UI/SkeletonCard";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("🧭 ItemDetails mounted with ID:", id);

    const fetchItemDetails = async () => {
      try {
        console.log("📡 Fetching item from API...");
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?id=${id}`
        );

        console.log("✅ API Response:", response.data);

        if (!response.data || Object.keys(response.data).length === 0) {
          console.warn("⚠️ API returned empty or invalid item data.");
          setError(true);
          return;
        }

        // ⏳ Add slight delay before setting item
        setTimeout(() => {
          setItem(response.data);
          console.log("🧩 Item set successfully:", response.data);
        }, 1200);
      } catch (err) {
        console.error("❌ API fetch failed:", err);
        setError(true);
      }
    };

    if (id) {
      fetchItemDetails();
    } else {
      console.warn("⚠️ No ID found in route params.");
    }
  }, [id]);

  if (error) {
    console.warn("🚫 Rendering error fallback.");
    return (
      <div className="container py-5 text-center">
        <h3>⚠️ This NFT could not be found.</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    );
  }

  if (!item) {
    console.log("⏳ Still loading item...");
    return (
      <div className="container py-5 d-flex justify-content-center">
        <SkeletonCard />
      </div>
    );
  }

  console.log("🖼️ Rendering item details:", item);

  return (
    <div className="container py-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>
      <h2>{item.title}</h2>
      <img src={item.nftImage} alt={item.title} className="img-fluid mb-4" />
      <p>
        <strong>Price:</strong> {item.price} ETH
      </p>
      <p>
        <strong>Likes:</strong> {item.likes}
      </p>
      <p>
        <strong>Author:</strong> {item.author}
      </p>
      <pre className="bg-light p-3 rounded">
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  );
};

export default ItemDetails;
