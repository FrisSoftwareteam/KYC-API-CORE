import React from "react";

interface HorizontalLineProps {
  className?: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({ className = "" }) => {
  return <hr className={`border-t border-gray-300 my-4 ${className}`} />;
};

export default HorizontalLine;
