import { VStack, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import React from 'react'
import { Password } from '../Password/Password';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const login = async () => {
    try {
      const { data: { token } } = await axios.post("/api/auth/adminLogin", { password });
      localStorage.setItem("token", token);
      toast({
        title: 'Logged in.',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-left'
      });
      navigate("/dashboard", { replace: true });
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        alert("Invalid password")
      }
      else {
        alert("Unexpected error");
      }
    }
  };

  return (
    <VStack spacing="5px" alignItems="left" gap="1em">
      <Password password={password} setPassword={setPassword} text='Master Password' />
      <Button
        isDisabled={!password}
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

export default AdminLogin
