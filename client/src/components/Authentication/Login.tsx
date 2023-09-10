import { Checkbox, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import React from 'react'
import { Password } from '../Password/Password';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRememberMeChecked, setIsRememberMeChecked] = React.useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const login = async () => {
    if (!email || !password) {
      alert('Please enter all fields');
      return;
    }

    const data = {
      email,
      password,
      shouldRemember: isRememberMeChecked
    };

    try {
      const { data: { token } } = await axios.post("/api/auth/login", data);
      localStorage.setItem("token", token);
      toast({
        title: 'Logged in.',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-left'
      });
      navigate("/", { replace: true });
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
    <VStack spacing="5px" alignItems="left" gap="1em">
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <Password password={password} setPassword={setPassword} />

      <Checkbox colorScheme="green" checked={isRememberMeChecked} onChange={(e) => setIsRememberMeChecked(e.target.checked)}>
        Remember me
      </Checkbox>

      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={login}
      >
        Login
      </Button>
    </VStack>
  )
}

export default Login
