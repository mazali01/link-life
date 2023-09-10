import { Container, Flex } from '@chakra-ui/react';
import { Header } from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const AppOutlet = () => {
  return (
    <Container
      width="100%"
      padding="0"
      boxSizing="border-box"
      maxW="100%"
      height="100vh"
      gap="1em"
      justifyContent="center"
      display="flex"
      flexDirection="column"
    >
      <Header />
      <Flex direction="column" width="100%" flex="1" overflowY="auto" alignItems="center">
        <Outlet />
      </Flex>
    </Container>
  )
};

export default AppOutlet;
