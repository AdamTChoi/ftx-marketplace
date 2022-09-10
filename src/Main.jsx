import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";
import CollectionGallery from "./components/CollectionGallery";
import Hero from "./components/Hero";
import ScrollToTop from "./ui/ScrollToTop/ScrollToTop";

const Main = () => {
  const [collectionData, setCollectionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollHandler = () => {};

  return (
    <>
      <div>
        <Hero />
      </div>
      <div name="gallery">
        <CollectionGallery collectionData={collectionData} />
      </div>
      <ScrollToTop />
    </>
  );
};

export default Main;
