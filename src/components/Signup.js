import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './Layout';

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
  ) {
    createUser( input: {
      username: $username
      password: $password
      }
    ) {
      user {
        id
        username
        password
      }
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 300px;
`;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [createUser, { loading: mutationLoading, error: mutationError, data }] = useMutation(CREATE_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ variables: { username, password }});
      console.log(data);
      setUsername('');
      setPassword('');
      setRedirect(true);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      {redirect && <Redirect to="/" />}
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <GridContainer>
          <div>
            <Label htmlFor="username">User Name:</Label>
            <Input 
              type="text" 
              name="user" 
              id="user"
              required
              value={username}
              onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input 
              type="text" 
              name="password" 
              id="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
        </GridContainer>
        <button type='submit'>Create account</button>
        <NavLink to="/">Cancel</NavLink>
        <p>Already have an account? <NavLink to="/login">Sign in.</NavLink></p>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error! Please try again.</p>}
      </form>
    </Layout>
  );
}

export default Signup;