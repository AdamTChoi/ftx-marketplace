import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import AnimatedPage from "../ui/AnimatedPage";
import GalleryCard from "../ui/card/GalleryCard";
import Error from "../ui/Error";
import SpinLoader from "../ui/SpinLoader";

const CollectionGallery = () => {
  const [lastElement, setLastElement] = useState(null);
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    nftData,
    setInclusive,
    setExclusive,
    exclusive,
    fetchData,
    setNftData,
    setCollectionType,
  } = useFetch(`http://localhost:8010/proxy/api/nft/collections_page`);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setInclusive((no) => no + 16);
        setExclusive((no) => no + 16);
      }
    })
  );

  useEffect(() => {
    if (exclusive <= 5800) {
      fetchData();
    }
  }, [exclusive]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const allHandler = () => {
    setCollectionType("all");
    setNftData([]);
    setInclusive(0);
    setExclusive(16);
  };
  const ftxHandler = () => {
    setCollectionType("ftx");
    setNftData([]);
    setInclusive(0);
    setExclusive(16);
  };
  const solHandler = () => {
    setCollectionType("sol");
    setNftData([]);
    setInclusive(0);
    setExclusive(16);
  };
  const ethHandler = () => {
    setCollectionType("eth");
    setNftData([]);
    setInclusive(0);
    setExclusive(16);
  };

  return (
    <AnimatedPage>
      <div className="w-full h-auto bg-[white] font-inter">
        <div className="pt-[90px] max-w-[1400px] md:px-12 mx-auto">
          <div className="pt-[20px] px-2 border-b-8 pb-2 border-b-black flex flex-row items-center">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-3xl md:text-5xl font-bold tracking-widest">
                  COLLECTIONS
                </p>
              </div>
              <div>
                <ul className="pl-2 sm:py-0 py-2 md:pl-6 flex flex-row font-bold">
                  <li
                    onClick={allHandler}
                    className="px-3 cursor-pointer hover:translate-y-[-3px] duration-300 md:text-xl"
                  >
                    ALL
                  </li>
                  <li
                    onClick={ftxHandler}
                    className="px-3 cursor-pointer hover:translate-y-[-3px] duration-300 md:text-xl"
                  >
                    FTX
                  </li>
                  <li
                    onClick={solHandler}
                    className="px-3  cursor-pointer hover:translate-y-[-3px] duration-300 md:text-xl"
                  >
                    SOL
                  </li>
                  <li
                    onClick={ethHandler}
                    className="px-3 cursor-pointer hover:translate-y-[-3px] duration-300 md:text-xl"
                  >
                    ETH
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto w-full sm:max-w-[1400px] px-4 md:px-12 bg-[white] mx-auto flex flex-col items-center">
          {!isLoading && error ? (
            <Error />
          ) : (
            <div className="w-full mt-4 md:grid flex flex-col md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-4 md:gap-6">
              {nftData &&
                nftData.map((item, index) => {
                  return index === nftData.length - 1 &&
                    !isLoading &&
                    exclusive <= 5800 ? (
                    <div key={item.group_id + index} ref={setLastElement}>
                      <GalleryCard
                        data={item}
                        name={item.group_id}
                        desc={
                          item.collectionDict.description
                            ? item.collectionDict.description
                            : item.group_id
                        }
                        image={
                          item.collectionDict.cardImageUrl
                            ? item.collectionDict.cardImageUrl
                            : item["first_nft"]["imageUrl"]
                        }
                        location={() => {
                          navigate("/collectiondetails", {
                            state: {
                              id: item.group_id,
                              name: item.group_id,
                              desc: item.collectionDict.description,
                              data: item,
                            },
                          });
                        }}
                      />
                    </div>
                  ) : (
                    <GalleryCard
                      data={item}
                      key={item.group_id + index}
                      name={item.group_id}
                      desc={
                        item.collectionDict.description
                          ? item.collectionDict.description
                          : item.group_id
                      }
                      image={
                        item.collectionDict.cardImageUrl
                          ? item.collectionDict.cardImageUrl
                          : item["first_nft"]["imageUrl"]
                      }
                      location={() => {
                        navigate("/collectiondetails", {
                          state: {
                            id: item.group_id,
                            name: item.group_id,
                            desc: item.collectionDict.description,
                            data: item,
                          },
                        });
                      }}
                    />
                  );
                })}
            </div>
          )}
          {isLoading && <SpinLoader />}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default CollectionGallery;
