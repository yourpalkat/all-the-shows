import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const ADD_PERFORMER = gql`
  mutation addPerformer(
    $name: String!
    $shows: [Show]
  ) {
    addPerformer(input: {
      name: $name
      shows: $shows
      }
    ) {
      id
      name
      shows
    }
  }
`;

const ADD_SHOW = gql`
  mutation AddShow(
    $performer: String!
    $openers: [String]
    $venue: String!
    $date: String!
  ) {
    addShow(input: {
      performer: $performer
      openers: $openers
      venue: $venue
      dateProvided: $date
      }
    ) {
      id
      performer
      openers
      venue
      date
    }
  }
`;


const AddShow = () => {
  const [addShow, { data }] = useMutation(ADD_SHOW);
  const [performer, setPerformer] = useState('');
  const [openers, setOpeners] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const openersArray = [openers];
    addShow({ 
      variables: { performer, openers: openersArray, venue, date } 
    });
    setPerformer('');
    setOpeners('');
    setVenue('');
    setDate('');
  };

  return (
    <div className="wrapper">
      <form onSubmit={e => handleFormSubmit(e)}>
        <label htmlFor="performer">Headline act:</label>
        <input type="text" id="performer" name="performer" value={performer} onChange={e => setPerformer(e.target.value)} />
        <label htmlFor="openers">Opening act:</label>
        <input type="text" id="openers" name="openers" value={openers} onChange={e => setOpeners(e.target.value)} />
        <label htmlFor="venue">Venue:</label>
        <input type="text" id="venue" name="venue" value={venue} onChange={e => setVenue(e.target.value)} />
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" pattern="\d{4}-\d{2}-\d{2}" value={date} onChange={e => setDate(e.target.value)}/>
        <button type='submit'>Add Show</button>
      </form>
    </div>
  );
}

export default AddShow;