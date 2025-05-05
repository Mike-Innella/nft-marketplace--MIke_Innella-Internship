import React from "react";
import Skeleton from "./Skeleton"; // Make sure this points to your shimmer component

const SkeletonCard = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="48px" height="48px" borderRadius="50%" />
      </div>

      <div className="de_countdown">
        <Skeleton width="80px" height="14px" />
      </div>

      <div className="nft__item_wrap">
        <Skeleton width="100%" height="200px" borderRadius="8px" />
      </div>

      <div className="nft__item_info">
        <Skeleton width="80%" height="20px" />
        <Skeleton width="40%" height="16px" />
        <Skeleton width="20%" height="14px" />
      </div>
    </div>
  );
};

export default SkeletonCard;
