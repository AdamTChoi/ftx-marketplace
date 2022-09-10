import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nftData, setNftData] = useState([]);
  const [error, setError] = useState(null);
  const [inclusive, setInclusive] = useState(0);
  const [exclusive, setExclusive] = useState(16);
  const [collectionType, setCollectionType] = useState("all");

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [url, inclusive, exclusive, collectionType]);

  const fetchData = async () => {
    try {
      const resp = await axios.get(
        `${url}?startInclusive=${inclusive}&endExclusive=${exclusive}&collectionType=${collectionType}`
      );
      const data = resp?.data;

      let all = new Set([...nftData, ...data.result.collections]);
      setNftData([...all]);
      console.log(nftData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    nftData,
    setNftData,
    error,
    setInclusive,
    setExclusive,
    exclusive,
    fetchData,
    setCollectionType,
  };
};

export default useFetch;
