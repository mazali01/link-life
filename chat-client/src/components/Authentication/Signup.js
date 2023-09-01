import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import React from 'react'

const Signup = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [picture, setPicture] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [showPassword, setSshowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const postDetails = (picture) => { };
  const submitHandler = () => {
    const data = {
      username,
      email,
      picture,
      password,
      passwordConfirm
    };
    console.log(data);
  };

  return <VStack spacing="5px">
    <FormControl id="user-name" isRequired>
      <FormLabel>User Name</FormLabel>
      <Input
        placeholder='Enter your user name'
        onChange={(e) => setUsername(e.target.value)}
      />
    </FormControl>

    <FormControl id="Email" isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormControl>

    <FormControl id="Password" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder='Enter your password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setSshowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <FormControl id="Password" isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input
          type={showPasswordConfirm ? "text" : "password"}
          placeholder='Confirm Password'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
            {showPasswordConfirm ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <FormControl id="picture">
      <FormLabel>Upload your Profile Picture</FormLabel>
      <Input
        type='file'
        p={1.5}
        accept='image/*'
        onChange={(e) => postDetails(e.target.files[0], "picture")}
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

}

export default Signup
