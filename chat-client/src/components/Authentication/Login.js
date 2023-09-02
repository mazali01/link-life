import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import React from 'react'
import { Password } from '../Password/Password';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const submitHandler = async () => {
    if (!email || !password) {
      alert('Please enter all fields');
      return;
    }

    const data = {
      email,
      password
    };

    try {
      const { data: { token } } = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", token);
      history.replace("/chats");
      console.log("success");
    } catch (e) {
      console.log(e);
      if (e.response.status === 404) {
        alert("User not found")
      }
      else if (e.response.status === 401) {
        alert("Invalid email or password")
      }
      else {
        alert("Unexpected error");
      }
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <Password password={password} setPassword={setPassword} />

      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  )
}

export default Login
