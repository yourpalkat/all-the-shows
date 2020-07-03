import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './Layout';

const LOG_IN = gql`
  mutation LogIn(
    $username: String!
    $password: String!
  ) {
    logIn( 
      username: $username
      password: $password
    ) {
      user {
        id
        username
        password
      }
      token
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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [logIn, { loading: mutationLoading, error: mutationError }] = useMutation(LOG_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await logIn({ variables: { username, password } });
      console.log(result.data.logIn.user, result.data.logIn.token);
      setRedirect(true);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      {redirect && <Redirect to="/" />}
      <form onSubmit={handleSubmit}>
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

        <button type='submit'>Sign in</button>
        <NavLink to="/">Cancel</NavLink>
        <p>Don't have an account? <NavLink to="/signup">Sign up.</NavLink></p>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Sorry! That username or password was incorrect.</p>}

      </form>
    </Layout>
  );
}

export default Login;