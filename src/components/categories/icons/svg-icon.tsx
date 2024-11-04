import React from "react";

import Image from "next/image";

interface SVGIconProps {
  iconSrc: string;
  name?: string;
  size?: number;
}

const SVGIcon = ({ iconSrc, name = "icon", size = 24 }: SVGIconProps) => {
  if (!iconSrc || iconSrc === "") {
    return <Image src="/logo.jpg" alt={name} width={size} height={size} />;
  }
  return <Image src={iconSrc} alt={name} width={size} height={size} />;
};

export default SVGIcon;
