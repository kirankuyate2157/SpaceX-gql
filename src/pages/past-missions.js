import { useQuery, gql } from '@apollo/client'
import { useState } from 'react';
const Section = () => {
  return (
    <div className="section relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://sxcontent9668.azureedge.us/cms-assets/assets/Eva_Suit_Mobile_16512413e5.jpg')` }}>
        <div className="section-inner feature" style={{ height: '778px' }}>
          <div className="inner-left-bottom">
            <h2 className="animate shadowed text-white uppercase">
              ADVANCING HUMAN SPACEFLIGHT
            </h2>
            <a
              className="btn animate text-white"
              tabIndex="0"
              href="/updates/#eva-suit"
              aria-label="LEARN MORE ADVANCING HUMAN SPACEFLIGHT"
              role="button"
            >
              <div className="hover"></div>
              <span className="text">LEARN MORE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
const LAUNCHES_QUERY = gql`
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
    }
}
`

export default function PastMissions () { const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const { loading, error, data } = useQuery(LAUNCHES_QUERY, { variables: { limit: 10 } })

  if (loading) return <p>
                        Loading...
                      </p>
  if (error) return <p>
                      Error:
                      {error.message}
                    </p>

  // Implement sorting, filtering, and search logic here

  return (
    <div className='container mx-auto p-4'>
      <Section/>
      <h1 className='text-3xl font-semibold mb-4'>Past Missions</h1>
      <div className='flex items-center space-x-4 mb-4'>
        <input
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-300 px-4 py-2 rounded' />
        <button 
        // onClick={handleSearch}
         className='px-4 py-2 bg-blue-500 text-white rounded'>
          Search
        </button>
        <button 
        // onClick={handleFilter} 
        className='px-4 py-2 bg-green-500 text-white rounded'>
          Filter
        </button>
        <button 
        // onClick={handleSort}
         className='px-4 py-2 bg-gray-500 text-white rounded'>
          Sort
          {sortOrder}
        </button>
      </div>
      {/* Render launches here */}
      <div>
        {data.launches.map((launch) => (
           <div key={launch.flight_number}>
             <p>
               Mission Name:
               {launch.mission_name}
             </p>
             <p>
               Launch Date:
               {launch.launch_date_local}
             </p>
             <p>
               Launch Success:
               {launch.launch_success ? 'Yes' : 'No'}
             </p>
             {/* Render other launch details */}
           </div>
         ))}
      </div>
    </div>
  )
}
