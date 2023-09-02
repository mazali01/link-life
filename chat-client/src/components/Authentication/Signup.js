import { FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Password } from '../Password/Password';
import axios from 'axios';

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const Signup = ({ onFinish }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const submitHandler = async () => {
    if (!username || !email || !password || !passwordConfirm) {
      alert('Please enter all fields');
      return;
    }

    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    const base64Picture = picture ? await convertBase64(picture) : null;

    const data = {
      username,
      email,
      picture: base64Picture,
      password
    };

    try {
      await axios.post("/api/auth/register", data);
      console.log("success");
      alert("User created successfully");
      onFinish();
    }
    catch (e) {
      console.log(e);
      if (e.response.status === 409) {
        alert("User exists")
      }
      else {
        alert("Unexpected error");
      }
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="user-name" isRequired>
        <FormLabel>User Name</FormLabel>
        <Input
          placeholder='Enter your user name'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <Password password={password} setPassword={setPassword} />
      <Password password={passwordConfirm} setPassword={setPasswordConfirm} text="Confirm password" />

      <FormControl id="picture">
        <FormLabel>Upload your Profile Picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e) => setPicture(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup
