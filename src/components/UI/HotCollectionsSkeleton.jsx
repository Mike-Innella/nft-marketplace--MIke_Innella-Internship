import React from "react";
import Skeleton from "./Skeleton"; // Reuse shimmer skeleton component

const HotCollectionsSkeleton = () => {
  return (
    <div className="nft_coll">
      <div className="nft_wrap">
        <Skeleton width="100%" height="200px" borderRadius="8px" />
      </div>
      <div className="nft_coll_pp">
        <Skeleton width="50px" height="50px" borderRadius="50%" />
      </div>
      <div className="nft_coll_info">
        <Skeleton width="60%" height="20px" />
        <Skeleton width="40%" height="16px" />
      </div>
    </div>
  );
};

export default HotCollectionsSkeleton;
