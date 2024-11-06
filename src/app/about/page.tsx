import React from "react";
import About from "./_about";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Cursor | About",
  description: "About Start Cursor",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  robots: {
    index: true,
    follow: true,
  },
};

const AboutPage = () => {
  return (
    <>
      <About />
    </>
  );
};

export default AboutPage;
