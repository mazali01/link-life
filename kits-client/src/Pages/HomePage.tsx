import { Box, Card, Container } from '@chakra-ui/react';
import { Feed } from '../components/Feed/Feed';
import { NewPost } from '../components/Feed/NewPost';

const HomePage = () => {
  return (
    <Container
      width="100%"
      padding="2em"
      boxSizing="border-box"
      maxW="100%"
      height="100vh"
      gap="1em"
      justifyContent="center"
      display="flex"
    >
      <Card width="25%" height="100%" backgroundColor="transparent" boxShadow="none">
      </Card>
      <Box display="flex" flexDirection="column" gap="1em" maxWidth="50%" width="50%" height="100%">
        <Container maxWidth="100%">
          <NewPost />
        </Container>
        <Container maxWidth="100%" display="flex" flexDirection="column" gap="1em" overflowY="auto">
          <Feed />
        </Container>
      </Box>
      <Card width="25%" height="100%" backgroundColor="transparent" boxShadow="none">
      </Card>
    </Container>
  )
};

export default HomePage;
