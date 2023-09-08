import { Box, Container, Spinner } from '@chakra-ui/react';
import { Feed } from '../components/Feed/Feed';
import { NewPost } from '../components/Feed/NewPost';
import { useFeed } from '../api/useFeed';

const FeedPage = () => {
  const { feed, isLoading } = useFeed({});
  return (
    <Box display="flex" flexDirection="column" gap="1em" maxWidth="50%" width="50%" height="100%">
      <Container maxWidth="100%">
        <NewPost />
      </Container>
      <Container maxWidth="100%" overflowY="auto">
        {(isLoading || !feed) ?
          <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" color="purple" />
          </Box> :
          <Feed feed={feed} />
        }
      </Container>
    </Box>
  )
};

export default FeedPage;
