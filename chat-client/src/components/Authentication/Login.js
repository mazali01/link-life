import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import React from 'react'

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const submitHandler = () => { };

  return <VStack spacing="5px">

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
          <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <Button
      colorScheme="purple"
      width="100%"
      style={{ marginTop: 15 }}
      onClick={submitHandler}
    >
      Login
    </Button>

  </VStack>
}

export default Login
