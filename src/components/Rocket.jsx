import { FaChevronCircleRight } from "react-icons/fa";
import { useState } from "react";
import PdfPreview from "./PdfPreview";

const Rocket = ({data}) => {
    const [isOpen,setIsOpen]=useState(false);
  return <div className=' px-8 sm:px-20'>
<div className='  flex flex-col gap-2 py-6 pb-40 sm:px-4  relative'
>
    <PdfPreview setIsOpen={()=>setIsOpen(false)} modalIsOpen={isOpen} url={data?.links?.presskit} />
  <div className=' w-full my-12  text-6xl sm:text-5xl flex justify-center'>
    <h2 className=' z-20 text-primary  font-extrabold text-orange-700   rounded-xl flex  items-center gap-5'>
      Rocket Features
    </h2>
  </div>
  <section id='Solution' className='flex  flex-col-reverse md:flex-row'>
    <div className='flex-1 flex  items-start flex-col'>
      <h1
        className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-white leading-[56.8px] xs:leading-[40px] w-full`}
      >
        {data?.rocket?.rocket?.name}
      
      </h1>
      <p
        className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28?.8px] max-w-[470px] mt-5`}
      >
         {data?.rocket?.rocket?.description}
      </p>
      <div className="flex flex-wrap gap-3">
      <a
        href={data?.links?.article_link}
        target="_black_"
        className=' flex items-center gap-2 text-md hover:bg-orange-400 bg-transparent border border-gray-100 text-orange-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
        
      >
        Articles  <FaChevronCircleRight className='animate-pulse' />
      </a>
      <a
           href={data?.links?.wikipedia}
           target="_black_"
        className=' flex items-center gap-2 text-md hover:bg-orange-400 bg-transparent border border-gray-100 text-orange-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
        
      >
        Wiki  <FaChevronCircleRight className='animate-pulse' />
      </a>
      <button
      onClick={()=>setIsOpen(true)}
        className=' flex items-center gap-2 text-md hover:bg-orange-400 bg-transparent border border-gray-100 text-orange-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
        
      >
        Presskit  <FaChevronCircleRight className='animate-pulse' />
      </button>
      </div>
    </div>
    <div
      className={`flex-1 w-1/2 md:w-full  flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative  pb-4 md:pb-0`}
    >
      <div
        className='absolute z-[1] w-[40%]  h-[60%] -right-[5%] md:right-[40%] rounded-full opacity-70 bottom-40 md:top-20'
        style={{
          background:
            "linear-gradient(90deg, #601d50 40%, #960443 100%)",
          filter: "blur(900px)",
        }}
      />
      <img
        src={"https://custome-portfolio.vercel.app/_next/static/media/Animation.a03a108f.svg"}
        alt='card deals'
        className='z-10 w-[60%] md:w-[70%] h-full rounded-full '
      />
    </div>
  </section>
  
</div>
</div>;
};

export default Rocket;
