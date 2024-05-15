import Image from "next/image";
import { Inter } from "next/font/google";
import { RiSearch2Line } from "react-icons/ri";
const inter = Inter({ subsets: ["latin"] });
import { useQuery, gql } from "@apollo/client";
import Dropdown from "../components/Dropdown";
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import YouTubeVideo from "@/components/YouTubeVideo";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";



const GET_LAUNCHES = gql`
  query LaunchesQuery(
    $find: LaunchFind
    $limit: Int
    $offset: Int
    $order: String
    $sort: String
  ) {
    launches(
      find: $find
      limit: $limit
      offset: $offset
      order: $order
      sort: $sort
    ) {
      mission_name
      launch_date_local
      launch_success
      upcoming
      rocket {
        rocket_type
        rocket_name
        rocket {
          id
          company
          country
          description
          stages
        }
      }
      launch_date_utc
      launch_site {
        site_name
        site_id
      }
      id
      details
      mission_id
      links {
        flickr_images
        video_link
      }
    }
  }
`;

const COMPANY_DETAILS = gql`
  query CompanyDetails {
    company {
      name
      founder
      founded
      employees
      summary
    }
  }
`;
;
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Asc");
  const [filterOption, setFilterOption] = useState("mission_name");
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 16;

  const { loading, error, data } = useQuery(COMPANY_DETAILS);

  const variables = {
    limit: launchesPerPage,
    offset: (currentPage - 1) * launchesPerPage,
    find: searchTerm.trim() !== "" ? { [filterOption]: searchTerm } : null,
    sort: searchTerm.trim() !== "" && filterOption ? filterOption : null,
    order: sortOrder ? sortOrder.toLocaleLowerCase() : null,
  };

  const {
    loading: launchesLoading,
    error: launchesError,
    data: launchesData,
  } = useQuery(GET_LAUNCHES, { variables });

  console.log(" data ",launchesData)
  const totalPages = Math.ceil(
    (launchesData?.launches_aggregate?.aggregate?.count || 110) /
      launchesPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const {
    name = "",
    founder = "",
    founded = "",
    employees = 0,
    summary = "",
  } = data?.company || {};

  
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    if (launchesData && launchesData?.launches?.length > 0) {
      const fields = Object.keys(launchesData?.launches[0]);
      setFilterOptions(fields);
    }
  }, [launchesData]);

if(loading){ 
  return (<div className="flex flex-col w-full min-h-64 h-full justify-center items-center ">
            <ImSpinner3 className=" text-2xl animate-spin text-white"/>
            <p className="animate-pulse">Loading<span >...</span></p>
          </div>
  )};

  if (error) {
  return <div className="flex flex-col w-full min-h-64 h-full justify-center items-center ">
            <MdOutlineReportGmailerrorred className=" text-3xl  text-white"/>
            <p className="animate-pulse">{"Somathing went wrong while fetching data :( "}</p>
        </div>}

  return (
    <div className='container '>
      <div className=' w-[100vw] px-4 md:px-20 justify-between  overflow-hidden relative flex sm:flex-row flex-col-reverse items-center '>
        <div
          className='absolute z-[1] w-[100%] h-[100%] -right-[40%] rounded-full opacity-40 bottom-40'
          style={{
            background:
              "linear-gradient(to bottom, #0b0b0b, #0f0e14, #11111b, #111321, #101628, #111a30, #131f38, #132340, #192b4b, #1f3356, #263b61, #2c446d)",
            filter: "blur(900px)",
          }}
        />
        <div className='w-full sm:w-[50%] relative flex  justify-center h-full '>
          <h1 className='absolute top-[20%] font-bold '>
            ADVANCING HUMAN SPACEFLIGHT <span className='animate-pulse text-orange-700'>__</span>
          </h1>
          <img
            src='https://sxcontent9668.azureedge.us/cms-assets/assets/Eva_Suit_Mobile_16512413e5.jpg'
            alt='logo'
            className=' w-auto h-[300px] sm:h-[500px] '
          />
        </div>
        <div className='text-white flex w-full sm:w-[50%] p-4 max-w-[610px] pl-po justify-center '>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-semibold'>{name}</h1>
            <div className='flex gap-3 text-sm '>
              <p>
                <span className='font-semibold'>• Founder & CEO</span> {founder}
              </p>
              <p>
                <span className='font-semibold'>• Founded</span>
                {" 14 March "}
                {founded}
              </p>
            </div>
            <p className='text-sm'>{summary}</p>
          </div>
        </div>
      </div>
      <div className=' w-[100vw] px-4 md:px-20 justify-between  overflow-hidden relative flex flex-col  '>
        <div className='flex flex-col sm:flex-row sm:justify-between  sm:items-center'>
          <h1 className='text-3xl  text-orange-700 md:text-5xl font-semibold my-4 sm:my-6'>
            Lunches
          </h1>
          <div className='flex items-center space-x-4 mt-2 mb-4'>
            <div className=' w-full bg-white shadow-md p-1 px-2 flex items-center gap-3  border border-gray-200 rounded-lg'>
              <div className='flex w-full text-black items-center gap-2'>
                <RiSearch2Line classNam='text-lg' />
                <input
                  type='search'
                  placeholder='Search..'
                  className='w-full focus:outline-none'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Dropdown
              name='Filter'
              options={filterOptions}
              selectedOption={filterOption}
              setSelectedOption={setFilterOption}
            />
            <Dropdown
              name='Sort'
              options={["Asc", "Desc"]}
              selectedOption={sortOrder}
              setSelectedOption={setSortOrder}
            />
          </div>
        </div>
        {launchesLoading?(<div className="flex flex-col w-full min-h-64 h-full justify-center items-center ">
            <ImSpinner3 className=" text-2xl animate-spin text-white"/>
            <p className="animate-pulse">Loading<span >...</span></p>
          </div>):launchesError?(<div className="flex flex-col w-full min-h-64 h-full justify-center items-center ">
            <MdOutlineReportGmailerrorred className=" text-3xl  text-white"/>
            <p className="animate-pulse">{"Result not found or somthing went wrong !"}</p>
        </div>):(
        <div className='w-full flex flex-wrap '>
          {launchesData?.launches
            ?.filter((ele) => {
              if (filterOption && searchTerm.trim() !== "") {
                if (typeof ele[filterOption] === "object") {
                  for (const prop in ele[filterOption]) {
                    if (
                      typeof ele[filterOption][prop] === "string" &&
                      ele[filterOption][prop]
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return true;
                    }
                  }
                  return false;
                } else {
                  return ele[filterOption]
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                }
              } else {
                return true;
              }
            })
            ?.sort((a, b) => {
              if (sortOrder === "Asc") {
                return (
                  new Date(a.launch_date_utc) - new Date(b.launch_date_utc)
                );
              } else {
                return (
                  new Date(b.launch_date_utc) - new Date(a.launch_date_utc)
                );
              }
            })
            ?.map((item, index) => (
          <Card key={index} item={item}/>
            ))}
     </div>)}
    </div>
 {!launchesError&&( <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />)}

      
    </div>
  );
}
