import React, { useEffect } from "react";

const Skeleton = ({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  marginBottom = "8px",
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
    marginBottom,
  };

  useEffect(() => {
    // Add the keyframes once to avoid duplicates
    const styleId = "skeleton-shimmer-keyframes";
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.innerHTML = `
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  return <div style={shimmerStyle}></div>;
};

export default Skeleton;
