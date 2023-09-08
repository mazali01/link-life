import { Avatar, Box, Flex, Image, List, Text } from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../api/useUser';
import { Bio } from '../components/User/Bio';
import { Feed } from '../components/Feed/Feed';
import { useFeed } from '../api/useFeed';

const UserPage = () => {
  const { encodedEmail } = useParams();
  const email = atob(encodedEmail);

  const { user, error } = useUser(email);
  const { feed: userFeed } = useFeed({ only: email });
  const { feed: likedFeed } = useFeed({ likedBy: email });

  if (error?.response?.status === 404) {
    return <Navigate to="/" />;
  }

  return (
    <Flex width="100%" height="100%" padding="1em" gap="1em">
      <Flex flex="1" height="100%" width="100%" backgroundColor="rgba(255,255,255,0.8)" padding="1em" borderRadius="1em">
        {user && <Bio user={user} />}
      </Flex>
      <Flex flex="1" flexDirection="column" gap="1em" backgroundColor="rgba(255,255,255,0.8)" padding="1em" borderRadius="1em">
        <Text fontSize="2em" fontWeight="bold">{user?.name} posts</Text>
        <Feed feed={userFeed} />
      </Flex>
      <Flex flex="1" flexDirection="column" gap="1em" backgroundColor="rgba(255,255,255,0.8)" padding="1em" borderRadius="1em">
        <Text fontSize="2em" fontWeight="bold">Posts that {user?.name} liked</Text>
        <Feed feed={likedFeed} />
      </Flex>
    </Flex>
  );
};

export default UserPage;