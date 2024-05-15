import React from 'react'
import YouTubeVideo from './YouTubeVideo'
import { useRouter } from "next/router";


function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
const Card = ({item}) => {
    const router = useRouter();
    const handleClick = (id) => {
        const state = {
          exampleData: "Some data to be passed to the next page",
        };
    
        router.push(`/launch/${id}`, undefined, { shallow: true, state });
      };
  return (
    <div
    className='p-2 overflow-hidden text-gray-300 relative rounded-md flex m-1 w-[100%] sm:w-[47%] lg:w-[33%] xl:w-[24.2%] min-h-[180px]  border-gray-700 border'
  >
    <div
      className='absolute  w-[100%] h-[100%]'
      style={{
        background:
          "linear-gradient(to top, #010204, #00030d, #000313, #000318, #00021c, #01031f, #020523, #030626, #040a29, #040e2d, #041130, #031434)",
        filter: "blur(900px)",
      }}
    />
    <div className='z-10 w-[50%] flex flex-col gap-2 justify-between'>
      <p className='text-sm'>
        {formatDate(item?.launch_date_local)}
      </p>
      <div>
        <p>
          <span className='text-xs'>Mission</span>{" "}
          {item?.mission_name}{" "}
        </p>
        <p>
          <span className='text-xs'>Rocket</span>{" "}
          {item?.rocket?.rocket_name}
        </p>
      </div>{" "}
      <button
        onClick={() => handleClick(item?.id)}
        className=' p-1 px-2 w-[70%] border-gray-700 border hover:bg-slate-900 rounded-lg text-xs'
      >
        View Details
      </button>{" "}
    </div>
    <div className='w-full h-full gap-2  sm:w-[50%] flex flex-col justify-around items-center'>
      <div className='w-full z-10 h-full flex flex-col justify-around'>
        {item?.links?.flickr_images[0] ? (
          <div
            className={`w-full rounded bg-gray-800 ${
              !item?.links?.flickr_images[0] ? "animate-pulse" : ""
            } h-32 flex justify-center`}
          >
            <img
              src={item?.links?.flickr_images[0]}
              alt={item?.rocket?.rocket_name}
              className='h-full rounded '
            />
          </div>
        ) : (
          <div>
            <YouTubeVideo videoId={item?.links?.video_link} />
          </div>
        )}{" "}
      </div>
    </div>{" "}
  </div>
  )
}

export default Card
