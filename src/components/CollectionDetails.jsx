import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import AnimatedPage from "../ui/AnimatedPage";
import GalleryCard from "../ui/card/GalleryCard";
import Error from "../ui/Error";
import ScrollToTop from "../ui/ScrollToTop/ScrollToTop";
import SpinLoader from "../ui/SpinLoader";

const CollectionDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [lastElement, setLastElement] = useState(null);
  const url = "http://localhost:8010/proxy/api/nft/filtered_nfts"; // receive collection name from useLocation/navigation and add to url to search for NFTs that are part of the collection

  const {
    isLoading,
    error,
    nftData,
    setInclusive,
    setExclusive,
    exclusive,
    fetchData,
  } = useFetch(`http://localhost:8010/proxy/api/nft/collections_page`); //use updated url to fetch and map out NFTs that are part of the collection

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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

  return (
    <AnimatedPage>
      <div className="w-full bg-[white] font-inter">
        <div className="pt-[90px] max-w-[1400px] md:px-12 mx-auto">
          <div className="pt-[10px] px-4 md:px-4  flex flex-row items-center">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-4xl md:text-6xl font-extrabold tracking-widest">
                  {location.state.name}
                </p>
              </div>
            </div>
          </div>
          <div className="md:mt-4 pt-2 md:px-4 border-black">
            <ul className="pt-2 bg-black  sm:py-0 md:pl-6 flex flex-row gap-2 justify-evenly md:justify-center font-bold text-white">
              {location.state.data.collectionDict.homepageUrl ? (
                <li className="sm:px-3 cursor-pointer hover:translate-y-[-3px] duration-300 md:text-xl">
                  <a
                    href={location.state.data.collectionDict.homepageUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    OFFICIAL
                  </a>
                </li>
              ) : (
                ""
              )}
              {location.state.data.collectionDict.twitterUrl ? (
                <li className="sm:px-3 cursor-pointer hover:translate-y-[-3px] duration-300 md:text-xl">
                  <a
                    href={location.state.data.collectionDict.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    TWITTER
                  </a>
                </li>
              ) : (
                ""
              )}
              {location.state.data.collectionDict.discordUrl ? (
                <li className="sm:px-3 cursor-pointer hover:translate-y-[-3px] duration-300 md:text-xl">
                  <a
                    href={location.state.data.collectionDict.discordUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    DISCORD
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] pt-6 md:pt-12 md:px-4  bg-[white] mx-auto">
          <div className="flex flex-col px-4 md:px-12 md:grid grid-cols-2 max-w-[1400px] justify-between items-center">
            <div className="flex justify-center items-center ">
              <div className="rounded-xl ">
                <img
                  className="rounded-xl"
                  src={location.state.data.first_nft.imageUrl}
                  alt={location.state.data.first_nft.id}
                />
              </div>
            </div>
            <div className="pt-4 md:pt-0 md:px-10 flex items-center justify-center">
              <p className="font-normal md:text-lg">
                {location.state.desc
                  ? location.state.desc
                  : location.state.data.collectionDict.markdownDescription}
              </p>
            </div>
          </div>
          <div className="pt-[50px] max-w-[1400px] md:px-12  mx-auto">
            <div className="pt-[20px] md:px-2 border-b-8 pb-2 px-4 border-b-black flex flex-row items-center">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <p className="text-3xl md:text-5xl font-bold tracking-widest">
                    COLLECTION NFTS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-auto w-full sm:max-w-[1400px] px-4 md:px-16 bg-[white] mx-auto flex flex-col items-center">
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
                          navigate("/nftdetails", {
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
                        navigate("/nftdetails", {
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
      <ScrollToTop />
    </AnimatedPage>
  );
};

export default CollectionDetails;
