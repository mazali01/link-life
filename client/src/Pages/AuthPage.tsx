import { Container, Box, Text, Tabs, TabList, TabPanel, TabPanels, Tab, } from '@chakra-ui/react'
import React, { useState } from 'react'
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import AdminLogin from '../components/Authentication/AdminLogin';

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">Kits-Chat-App</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px">
        <Tabs index={tabIndex} onChange={setTabIndex} variant='soft-rounded' colorScheme='purple'>
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
            <Tab width="50%">Admin Login</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup onFinish={() => setTabIndex(0)} />
            </TabPanel>
            <TabPanel>
              <AdminLogin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthPage
