import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Hero from "@/components/Hero";
import Photos from "@/components/Photos";
import Rocket from "@/components/Rocket";
import { ImSpinner3 } from "react-icons/im";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const LAUNCH_DETAILS = gql`
  query Launch($launchId: ID!) {
    launch(id: $launchId) {
      details
      id
      launch_year
      links {
        video_link
        flickr_images
        article_link
        presskit
        wikipedia
      }
      mission_name
      rocket {
        rocket {
          name
          id
          description
          company
          country
          stages
          type
        }
      }
      upcoming
      launch_site {
        site_name
      }
      launch_success
      mission_id
      launch_date_unix
      launch_date_utc
      ships {
        missions {
          flight
          name
        }
        roles
        successful_landings
        status
        image
        id
      }
      static_fire_date_unix
      static_fire_date_utc
    }
  }
`;

export default function LaunchDetails() {
  const router = useRouter();
  const { id } = router?.query;



  const { loading: launchLoading, error: launchError, data: launchData } = useQuery(LAUNCH_DETAILS, {
    variables: { launchId: id },
  });
  // Check if the id is available
  if (!id) {
    return <div className="flex flex-col w-full min-h-64 h-full justify-center items-center ">
    <MdOutlineReportGmailerrorred className=" text-3xl  text-white"/>
    <p className="animate-pulse">{"Launch not found :( "}</p>
</div>
  }
  if(launchLoading){ 
    return (<div className="flex flex-col w-full min-h-64 h-full justify-center items-center ">
              <ImSpinner3 className=" text-2xl animate-spin text-white"/>
              <p className="animate-pulse">Loading<span >...</span></p>
            </div>
    )};
  
    if (launchError) {
    return <div className="flex flex-col w-full min-h-64 h-full justify-center items-center ">
              <MdOutlineReportGmailerrorred className=" text-3xl  text-white"/>
              <p className="animate-pulse">{"Somathing went wrong while fetching data :( "}</p>
          </div>}
  
  console.log("Launch data:", launchData);

  return (
    <div className='w-full '>
      <Hero data={launchData?.launch} />
      {launchData?.launch?.links?.flickr_images?.length > 0 && (
        <Photos images={launchData?.launch?.links?.flickr_images} />
      )}
      {/* <div>Launch details: {JSON.stringify(launchData?.launch)}</div> */}
      <Rocket data={launchData?.launch}/>
    </div>
  );
}
