import { Box, Button, Container, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { MdThumbUp, MdPeople, MdPublish } from 'react-icons/md';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="100%"
      width="100%"
      height="100%"
      padding="0"
      backgroundImage="/landing.png"
      backgroundRepeat="round"
      backgroundSize="cover"
    >
      <Flex
        maxWidth="100%"
        width="100%"
        height="100%"
        justify="space-between"
        color="white"
        align="center"
        flexDirection="column"
        gap="3em"
        backgroundColor="rgba(0,0,0,0.6)"
      >
        <Flex
          justify="space-between"
          align="center"
          p={8}
          color="white"
          boxShadow="lg"
          flexDir="column"
        >
          <Heading as="h1" fontSize="4xl" fontWeight="bold" mb={4}>
            Welcome To Link Life Social Network
          </Heading>
          <Text fontSize="xl" mb={6}>
            A social network for the modern age where you can connect with friends and family
            around the world.
          </Text>
        </Flex>

        <Flex flex="1" />

        <Flex justify="space-around">
          <Box maxW="30%" textAlign="center" backgroundColor="rgba(0,0,0,0.5)" p={4} borderRadius="1em">
            <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4}>
              Like & Comment
            </Heading>
            <Text fontSize="lg" mb={4}>
              Interact with posts you love. Share your thoughts and engage with friends' content.
            </Text>
          </Box>
          <Box maxW="30%" textAlign="center" backgroundColor="rgba(0,0,0,0.5)" p={4} borderRadius="1em">
            <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4}>
              Connect with Friends
            </Heading>
            <Text fontSize="lg" mb={4}>
              Stay connected with friends and family, no matter where they are in the world.
            </Text>
          </Box>
          <Box maxW="30%" textAlign="center" backgroundColor="rgba(0,0,0,0.5)" p={4} borderRadius="1em">
            <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4}>
              Share Your Moments
            </Heading>
            <Text fontSize="lg" mb={4}>
              Easily share your life's moments with the world. Capture memories and cherish them forever.
            </Text>
          </Box>
        </Flex>

        <Flex direction="column" align="center">
          <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4}>
            What Our Users Say
          </Heading><Box display="flex" justifyContent="space-around" width="100%" gap="2em">
            <Box maxW="20%" textAlign="center">
              <Text fontSize="lg" mb={4}>
                "I love Link Life! It's changed the way I connect with friends."
              </Text>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                - John Doe
              </Text>
              <Text fontSize="sm" color="gray.500">
                Freelance Photographer
              </Text>
            </Box>
            <Box maxW="20%" textAlign="center">
              <Text fontSize="lg" mb={4}>
                "Link Life has made sharing my life's moments effortless."
              </Text>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                - Jane Smith
              </Text>
              <Text fontSize="sm" color="gray.500">
                Travel Enthusiast
              </Text>
            </Box>
            <Box maxW="20%" textAlign="center">
              <Text fontSize="lg" mb={4}>
                "Link Life has simplified my social media experience. I can easily connect with friends and family without the clutter."
              </Text>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                - Sarah Adams
              </Text>
              <Text fontSize="sm" color="gray.500">
                Marketing Professional
              </Text>
            </Box>
            <Box maxW="20%" textAlign="center">
              <Text fontSize="lg" mb={4}>
                "The clean and intuitive design of Link Life makes it my go-to platform for staying in touch with loved ones."
              </Text>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                - Michael Carter
              </Text>
              <Text fontSize="sm" color="gray.500">
                Teacher
              </Text>
            </Box>
            <Box maxW="20%" textAlign="center">
              <Text fontSize="lg" mb={4}>
                "I appreciate how Link Life values user privacy and data security. It's a platform I trust."
              </Text>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                - Susan Roberts
              </Text>
              <Text fontSize="sm" color="gray.500">
                Data Analyst
              </Text>
            </Box>
            <Box maxW="20%" textAlign="center">
              <Text fontSize="lg" mb={4}>
                "Link Life has brought back the joy of meaningful connections in an era of digital noise."
              </Text>
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                - David Miller
              </Text>
              <Text fontSize="sm" color="gray.500">
                Author
              </Text>
            </Box>
          </Box>
        </Flex>

        <Flex justify="space-around">
          <Button colorScheme="yellow" size="lg" onClick={() => navigate("/auth")}>
            Get Started
          </Button>
        </Flex>

        <Flex justify="center" gap="1em" align="center" p={4} bg="gray.500" width="100%">
          <Text fontSize="lg">© 2023 Link Life. All rights reserved.</Text>
        </Flex>
      </Flex>
    </Container >
  );
};

