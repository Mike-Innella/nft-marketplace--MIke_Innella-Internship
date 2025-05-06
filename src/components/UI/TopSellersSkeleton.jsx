import React from "react";
import Skeleton from "./Skeleton";

const TopSellersSkeleton = () => {
  return (
    <div className="author_list_pp">
      <Skeleton width="50px" height="50px" borderRadius="50%" />
      <div className="author_list_info" style={{ marginTop: "12px" }}>
        <Skeleton width="100px" height="16px" />
        <Skeleton width="60px" height="14px" />
      </div>
    </div>
  );
};

export default TopSellersSkeleton;
