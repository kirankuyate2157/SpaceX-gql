import React from "react";
import Info from "./Info";

function extractVideoId(url) {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    );
    // If match is found, return the video ID, otherwise return null
    return match ? match[1] : null;
  }

function YouTubeVideo({ videoId }) {
    console.log("id : ", extractVideoId(videoId));
    const embedUrl = `https://www.youtube.com/embed/${extractVideoId(videoId)}`;
  
    return (
      <div  className="w-full h-full">
        <iframe
          className="w-full h-full"
          // width="150"
          maxWidth='180'
          height='110'
          src={embedUrl}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe>
      </div>
    );
  }
  
const Hero = ({data}) => {

  return (
    <>
      <div>
        {/* mobile */}
        <div
          className="relative md:hidden  min-h-[600px] w-full"
          style={{ height: "calc(180vw)" }}
        >
          <div className="absolute z-20 bottom-4 px-4 ">
          <div
          className='absolute  bottom-[-10%] z-[10] w-[100%] h-[100%]  '
          style={{
            background:
              "linear-gradient(to bottom, #000000, #000000, #000000, #000000,  #000000, #000000)",
            filter: "blur(900px)",
          }}
        />
            <Info data={data}/>
          </div>
          <div className={`w-full min-h-64 bg-opacity-50 absolute z-10 bottom-0`} />
         
          {!data.links?.flickr_images[2]?(
            <YouTubeVideo videoId={data?.links?.video_link}/>):(
              <img
                src={data.links?.flickr_images[2]}
                alt=""
                className="w-full h-full "
              />)}
        </div>

        {/* Medium */}
        <div
          className="relative hidden md:block w-full lg:hidden"
          style={{ height: "calc(100vw)" }}
        >
          <div className="w-full px-4 h-56 bg-opacity-50 absolute bg-black z-10 bottom-0" />
          <div className="absolute z-20 bottom-4 px-10 ">
            <Info data={data}/>
          </div>
          {!data.links?.flickr_images[2]?(
            <YouTubeVideo videoId={data?.links?.video_link}/>):(
              <img
                src={data.links?.flickr_images[2]}
                alt=""
                className="w-full h-full"
              />)}
        </div>

        {/* Large */}
        <div
          className="relative hidden w-full  lg:block"
          style={{ height: "30rem" }}
        >
          <div
            className="absolute z-10 w-full h-full px-4"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(7, 6, 6) 24.97%, rgb(34, 34, 34) 38.3%, rgba(34, 34, 34, 0.04) 97.47%, rgb(34, 34, 34) 100%)",
            }}
          />

          <div className="absolute z-30 left-24 top-10 flex items-center gap-10">
            <div className=" w-full h-96 ">
              {!data.links?.flickr_images[2]?(
            <YouTubeVideo videoId={data?.links?.video_link}/>):(
              <img
                src={data.links?.flickr_images[2]}
                alt=""
                className="w-full h-full rounded-xl"
              />)}
            </div>
            <div  className="w-full h-full pr-20">
              <Info data={data}/>
            </div>
          </div>
          <img
            src={data.links?.flickr_images[3]}
            alt="poster bg"
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
