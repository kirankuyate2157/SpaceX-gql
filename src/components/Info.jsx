import React, { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";


function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const meridiem = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${day} ${month} ${year} ${formattedHours}:${minutes} ${meridiem} UTC`;
}
const Info = ({data}) => {
  return (
    <>
      <div className="flex   flex-col z-50 gap-3 lg:gap-8">
        <div className="flex items-center gap-3 ">
          <div className=" flex items-baseline w-full h-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/96/SpaceX_Logo_Black.png"
              alt=""
              className="w-40 h-8 z-50"
            />
          </div>
         
        </div>
        <div className="flex z-50 flex-col ">
        <h1 className="text-white  lg:text-5xl font-bold lg:block ">
          {data?.mission_name}
        </h1>
        <p>{data?.rocket?.rocket?.name} {`${data?.rocket?.rocket?.type}`}</p>
        </div>
        <div className="flex flex-col-reverse gap-3 lg:gap-5 lg:flex-col">
          <div className=" z-50  max-w-[1100px] text-white font-light flex flex-col gap-2 ">
            <h4>From {data?.rocket?.rocket?.country} at {formatDate(data?.static_fire_date_utc)} </h4>
            <h4>
            <LinesEllipsis
            text={data?.details||""}
            maxLine={6}
            ellipsis='...'
            trimRight
            basedOn='words'
          />
           
            </h4>
          </div>
      
        </div>
      </div>
    </>
  );
};

export default Info;
