import React from "react";
import "./backgroundimage.css";

interface BackgrondImageProps {
  imageName: string;
}

const BackgrondImage: React.FC<BackgrondImageProps> = (props) => {
  const { imageName } = props;
  return (
    <div className="bg_container">
      <img src={`/Images/${imageName}.jpg`} alt="neom-images" />
    </div>
  );
};

export default BackgrondImage;
