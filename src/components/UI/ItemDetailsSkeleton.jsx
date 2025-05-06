import React from "react";
import Skeleton from "./Skeleton";

const ItemDetailsSkeleton = () => {
  return (
    <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      <section aria-label="section" className="mt90 sm-mt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Skeleton width="100%" height="450px" borderRadius="8px" />
            </div>
            <div className="col-md-6">
              <Skeleton width="70%" height="40px" borderRadius="8px" />
              <div className="spacer-10"></div>
              <div className="item_info">
                <div className="de_tab tab_simple">
                  <Skeleton width="100%" height="20px" />
                  <div className="spacer-10"></div>
                  <Skeleton width="60%" height="20px" />
                  <div className="spacer-20"></div>
                  <Skeleton width="40%" height="20px" />
                  <div className="spacer-10"></div>
                  <Skeleton width="80%" height="20px" />
                  <div className="spacer-20"></div>
                  <Skeleton width="30%" height="50px" borderRadius="30px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetailsSkeleton;
