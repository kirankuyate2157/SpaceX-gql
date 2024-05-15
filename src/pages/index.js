import Image from "next/image";
import { Inter } from "next/font/google";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
const inter = Inter({ subsets: ["latin"] });
import { useQuery, gql } from "@apollo/client";
import Dropdown from "../components/Dropdown";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import YouTubeVideo from "@/components/YouTubeVideo";


function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const GET_LAUNCHES = gql`
  query LaunchesQuery($limit: Int) {
    launches(limit: $limit) {
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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("Asc");
  const [filterOption, setFilterOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const launchesPerPage = 10;

  const { loading, error, data } = useQuery(COMPANY_DETAILS);
  const router = useRouter();
  const variable = {
    limit: launchesPerPage,
    find: searchTerm.trim() !== "" ? { [filterOption]: searchTerm } : null,
    sort: filterOption ? filterOption : null,
    order: sortOrder ? sortOrder.toLocaleLowerCase() : null,
  };

  const {
    loading: launchesLoading,
    error: launchesError,
    data: launchesData,
  } = useQuery(GET_LAUNCHES, {
    variable: { limit: launchesPerPage },
  });

  const {
    name = "",
    founder = "",
    founded = "",
    employees = 0,
    summary = "",
  } = data?.company || {};

  const handleClick = (id) => {
    const state = {
      exampleData: "Some data to be passed to the next page",
    };

    router.push(`/launch/${id}`, undefined, { shallow: true, state });
  };
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    if (launchesData && launchesData?.launches?.length > 0) {
      const fields = Object.keys(launchesData?.launches[0]); 
      setFilterOptions(fields);
    }
  }, [launchesData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
            ADVANCING HUMAN SPACEFLIGHT <span className='animate-pulse'>_</span>
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
          <h1 className='text-xl font-semibold my-4 px-2'>Lunches</h1>
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
              <div
                key={index}
                className='p-2 overflow-hidden relative rounded-md flex m-1 w-[100%] sm:w-[47%] lg:w-[33%] xl:w-[24.2%] min-h-[180px]  border-gray-200 border'
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
                    className=' p-1 px-2 w-[70%]  border rounded-lg text-xs'
                  >
                    View Details
                  </button>{" "}
                </div>
                <div className='w-full h-full gap-2  sm:w-[50%] flex flex-col justify-around items-center'>
                  <div className='w-full z-10 h-full flex flex-col justify-around'>
                    {item?.links?.flickr_images[0] ? (
                      <div className='w-full  h-32 flex justify-center'>
                        <img
                          src={item?.links?.flickr_images[0]}
                          alt={item?.rocket?.rocket_name}
                          className='h-full rounded '
                        />
                      </div>
                    ) : (
                      <div>
                        <YouTubeVideo  videoId={item?.links?.video_link} />
                      </div>
                    )}{" "}
                  </div>
                </div>{" "}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
