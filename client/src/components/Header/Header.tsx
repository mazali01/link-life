import { Avatar, Button, Container, Flex, Image, Text } from '@chakra-ui/react'
import { Search } from './Search'
import logoImg from '/logo.png'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../api/user/useUser'
import { useUserFeatures } from '../../api/user/useUserFeatures'

export const Header = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const isSearchUsersFeatureEnabled = useUserFeatures("searchUsers");

  return (
    <Container backgroundColor="white" display="flex" maxWidth="100%" padding="1em" gap="1em">
      <Flex flex="1" justifyContent="space-evenly">
        <Flex alignItems="center" gap="0.5em" cursor="pointer" onClick={() => navigate(`/app/${btoa(user?.email)}`)}>
          <Avatar src={user?.picture} />
          <Text fontWeight="bold" fontSize="1.25em">{user?.name}</Text>
        </Flex>
        <Image cursor="pointer" onClick={() => navigate("/app")} src={logoImg} alt="logo" height="3em" borderRadius="50%" />
      </Flex>
      {isSearchUsersFeatureEnabled && (
        <Flex flex="1" justifyContent="center">
          <Search />
        </Flex>
      )}
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
