import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Hero from "@/components/Hero";
import Photos from "@/components/Photos";
import Rocket from "@/components/Rocket";

export default function LaunchDetails() {
  const router = useRouter();
  const { id } = router.query;

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

  // Check if the id is available
  if (!id) {
    return <div>Loading...</div>;
  }

  const {
    loading: launchLoading,
    error: launchError,
    data: launchData,
  } = useQuery(LAUNCH_DETAILS, { variables: { launchId: id } });

  if (launchLoading) return <div>Loading...</div>;
  if (launchError) return <div>Error: {launchError.message}</div>;

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
