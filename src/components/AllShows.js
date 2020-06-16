import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NavLink } from 'react-router-dom';

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

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function AllShows() {
  const { loading, error, data } = useQuery(ALL_SHOWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return (
    <div className="wrapper">
      <h1>Testing Apollo Client</h1>
      {
        data.allShows.map((show) => (
          <div key={show.id}>
            <h2>
              {show.performer}
            </h2>
            {show.openers && <h3>{show.openers}</h3>}
            <p>{show.venue}</p>
            <p>{new Date(show.date).toLocaleDateString('en-UK', options)}</p>
          </div>
        ))
      }
      <NavLink to="/add">Add a show</NavLink>
    </div>
  );
  
}

export default AllShows;