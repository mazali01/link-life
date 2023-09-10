import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'


export const Password = ({
  password,
  setPassword,
  text = "Password"
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isRequired>
      <FormLabel>{text}</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={text}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  )
}
