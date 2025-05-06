import React from "react";
import Skeleton from "./Skeleton";

const ExploreItemsSkeleton = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Skeleton width="48px" height="48px" borderRadius="50%" />
      </div>

      <div className="de_countdown" style={{ outline: "none", border: "none" }}>
        <Skeleton width="80px" height="14px" />
      </div>

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <Skeleton width="90px" height="32px" borderRadius="4px" />
            <div className="nft__item_share">
              <h4>Share</h4>
              <Skeleton width="24px" height="24px" borderRadius="50%" />
              <Skeleton width="24px" height="24px" borderRadius="50%" />
              <Skeleton width="24px" height="24px" borderRadius="50%" />
            </div>
          </div>
        </div>
        <Skeleton width="100%" height="200px" borderRadius="8px" />
      </div>

      <div className="nft__item_info">
        <Skeleton width="60%" height="20px" />
        <div className="nft__item_price">
          <Skeleton width="40%" height="16px" />
        </div>
        <div className="nft__item_like">
          <Skeleton width="20%" height="14px" />
        </div>
      </div>
    </div>
  );
};

export default ExploreItemsSkeleton;
