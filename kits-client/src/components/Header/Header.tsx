import { Avatar, Button, Container, Flex, Image, Text } from '@chakra-ui/react'
import { Search } from '../Feed/Search'
import logoImg from '/logo.png'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../api/user/useUser'

export const Header = () => {
  const navigate = useNavigate();

  const { user } = useUser();

  return (
    <Container backgroundColor="white" display="flex" maxWidth="100%" padding="1em" gap="1em">
      <Flex flex="1" justifyContent="space-evenly">
        <Flex alignItems="center" gap="0.5em" cursor="pointer" onClick={() => navigate(`/${btoa(user?.email)}`)}>
          <Avatar src={user?.picture} />
          <Text fontWeight="bold" fontSize="1.25em">{user?.name}</Text>
        </Flex>
        <Image cursor="pointer" onClick={() => navigate("/")} src={logoImg} alt="logo" height="3em" borderRadius="50%" />
      </Flex>
      <Flex flex="1" justifyContent="center">
        <Search />
      </Flex>
      <Flex flex="1" justifyContent="center">
        <Button colorScheme="red" onClick={() => {
          localStorage.removeItem('token')
          navigate('/auth');
        }}>
          Logout
        </Button>
      </Flex>
    </Container>
  )
}
