import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, NavLink } from 'react-router-dom';

const ADD_SHOW = gql`
  mutation AddShow(
    $performer: String!
    $openers: String
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
  const [addShow, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_SHOW);
  const [performer, setPerformer] = useState('');
  const [openers, setOpeners] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await addShow({ 
      variables: { performer, openers, venue, date } 
    });
    setPerformer('');
    setOpeners('');
    setVenue('');
    setDate('');
    setRedirect(true);
  };

  return (
    <div className="wrapper">
      {redirect && <Redirect to="/" />}
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
        <NavLink to="/">Cancel</NavLink>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error! Please try again.</p>}
      </form>
    </div>
  );
}

export default AddShow;