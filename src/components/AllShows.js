import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import Layout from './Layout';

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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

function AllShows() {
  const { loading, error, data } = useQuery(ALL_SHOWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return (
    <Layout>
      <GridContainer>
        { data.allShows.map((show) => (
          <div key={show.id}>
            <h2>
              {show.performer}
            </h2>
            {show.openers && <h3>{show.openers}</h3>}
            <p>{show.venue}</p>
            <p>{new Date(show.date).toLocaleDateString('en-UK', options)}</p>
          </div>
        )) }
      </GridContainer>
    </Layout>
  );
  
}

export default AllShows;