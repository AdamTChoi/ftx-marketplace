import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CollectionDetails from "./components/CollectionDetails";
import CollectionGallery from "./components/CollectionGallery";
import Navbar from "./components/Navbar";
import NFTDetails from "./components/NFTDetails";
import SearchGallery from "./components/SearchGallery";
import Main from "./Main";

function App() {
  const [query, setQuery] = useState("");

  const searchHandler = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const blurHandler = (event) => {
    event.preventDefault();
    setQuery("");
  };

  return (
    <>
      <Navbar blur={blurHandler} value={query} search={searchHandler} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="gallery" element={<CollectionGallery />} />
        <Route path="searchgallery" element={<SearchGallery query={query} />} />
        <Route path="collectiondetails" element={<CollectionDetails />} />
        <Route path="nftdetails" element={<NFTDetails />} />
      </Routes>
    </>
  );
}

export default App;
