import React from "react";

const Skeleton = ({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
}) => {
  const shimmerStyle = {
    width,
    height,
    borderRadius,
    background: `linear-gradient(
      90deg,
      #e2e2e2 25%,
      #f5f5f5 50%,
      #e2e2e2 75%
    )`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.2s infinite linear",
    marginBottom: "8px",
  };

  return (
    <>
      <div style={shimmerStyle}></div>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default Skeleton;
