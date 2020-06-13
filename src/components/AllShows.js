import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const ALL_SHOWS = gql`
  {
    allShows {
      id
      performer
      openers
      venue
      date
    }
  }
`;

function AllShows() {
  const { loading, error, data } = useQuery(ALL_SHOWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return data.allShows.map((show) => (
    <div key={show.id}>
      <h2>
        {show.performer}
      </h2>
      <p>{show.venue}</p>
    </div>
  ));
}

export default AllShows;