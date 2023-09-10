import { Card, Flex, Image, Text } from '@chakra-ui/react';
import { useStatistics } from '../../api/admin/useStatistics';
//@ts-ignore
import { GraphCanvas } from 'reagraph';
import { useUsers } from '../../api/admin/useUsers';
import { useMemo } from 'react';

export const Statistics = () => {
  const { statistics } = useStatistics();
  const { users } = useUsers();

  const { nodes, edges } = useMemo(() => {
    const nodes = users.map(({ email, name, picture }) => ({ id: email, label: name, picture }));
    const edges = users.flatMap(({ email, followingIds }) => followingIds.map(followeeEmail => ({
      source: email,
      target: followeeEmail,
      id: `${email}-${followeeEmail}`,
      size: 0.5,
    })));

    return { nodes, edges };
  }, [users]);

  return (
    <Flex flexDirection="column" gap="1em">
      <Flex gap="3em">
        <Flex flexDirection="column" gap="1em">
          <Text fontSize="2em" fontWeight="bold">Statistics</Text>
          <Text fontSize="large">Users count: {statistics?.usersCount}</Text>
          <Text fontSize="large">Posts count: {statistics?.postsCount}</Text>
          <Text fontSize="large">Comments count: {statistics?.commentsCount}</Text>
          <Text fontSize="large">Likes count: {statistics?.likesCount}</Text>
          <Text fontSize="large">Average Posts per user: {(statistics?.postsCount / statistics?.usersCount).toFixed(2)}</Text>
          <Text fontSize="large">Average Comments per post: {(statistics?.commentsCount / statistics?.postsCount).toFixed(2)}</Text>
          <Text fontSize="large">AverageLikes per post: {(statistics?.likesCount / statistics?.postsCount).toFixed(2)}</Text>
          <Text fontSize="large">Post picture rate: {(statistics?.postPictureRate * 100).toFixed(2)}%</Text>
          <Text fontSize="large">User picture rate: {(statistics?.userPictureRate * 100).toFixed(2)}%</Text>
          <Text fontSize="large">Posts per week: {statistics?.postsPeriod?.week}</Text>
          <Text fontSize="large">Posts per month: {statistics?.postsPeriod?.month}</Text>
          <Text fontSize="large">Posts per year: {statistics?.postsPeriod?.year}</Text>
        </Flex>
        <Flex flexDirection="column" gap="1em">
          <Text fontSize="2em" fontWeight="bold">Follow Graph</Text>
          <Card flexDirection="column" gap="1em" position="relative" width="40em" height="100%">
            <GraphCanvas
              draggable
              edgeInterpolation="curved"
              sizingType="centrality"
              nodes={nodes}
              edges={edges}
            />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
}
