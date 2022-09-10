import React from "react";
import { useNavigate } from "react-router-dom";

const GalleryCard = (props) => {
  //onClick navigate with prop identifier (name or id) to collectionDetails or to NFTDetails. Make navigate location into prop.

  return (
    <div
      id={props.id}
      className="flex h-[full] w-full flex-col justify-center items-center font-inter rounded-t-xl cursor-pointer"
      onClick={props.location}
    >
      <div className="h-full flex flex-col items-center justify-center w-full rounded-xl bg-[#E0E1E4]">
        <div className="relative h-full w-full group container flex ">
          <img
            className=" bg-[#E0E1E4] object-cover h-full w-full flex justify-center items-center rounded-t-xl"
            src={props.image}
            alt={props.name}
          />
          <div className="absolute box-border opacity-0 group-hover:opacity-70 duration-500 rounded-xl bg-black h-full w-full z-40 mx-auto flex items-center justify-center">
            <p className="opacity-100 text-white text-sm p-4">
              {`${props.desc.slice(0, 150)}..`}
            </p>
          </div>
        </div>
        <div className="p-2 flex items-center justify-center bg-[#E0E1E4] rounded-t-xl">
          <p className="font-bold">{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
