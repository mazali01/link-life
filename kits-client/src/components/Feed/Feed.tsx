import { useFeed } from "../../api/useFeed"
import { Avatar, Box, Card, CardFooter, IconButton, Spinner, Text } from "@chakra-ui/react"
import { CardHeader } from "@chakra-ui/react"
import { CardBody } from "@chakra-ui/react"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostFooter } from "./PostFooter";
import { BsTrash } from 'react-icons/bs';
import { useUser } from "../../api/useUser";
import { useDeletePost } from "../../api/useDeletePost";
dayjs.extend(relativeTime);

export const Feed = () => {
  const { feed, isLoading, refresh } = useFeed();
  const { user } = useUser();
  const deletePost = useDeletePost();

  if (isLoading || !feed) {
    return (
      <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" color="purple" />
      </Box>
    );
  }

  return (
    feed?.map((post) => (
      <Card key={post.id} boxSizing="content-box" padding="1em">
        <CardHeader display="flex" justifyContent="space-between" padding="0">
          <Box width="100%" display="flex" alignItems="center" gap="0.5em">
            <Avatar src={post.user.picture} />
            <Text fontWeight="bold">{post.user.name}</Text>
            <Text color="gray.500">{dayjs(post.createdAt).fromNow()}</Text>
          </Box>
          {post.user.email === user?.email && (
            <IconButton
              aria-label='Delete'
              icon={<BsTrash />}
              size='lg'
              variant='ghost'
              colorScheme='red'
              onClick={async () => {
                await deletePost({ postId: post.id });
                await refresh();
              }}
            />
          )}
        </CardHeader>
        <CardBody boxSizing="content-box" padding="1em 2em" display="flex" gap="1em" flexDirection="column">
          <Text fontStyle="italic" fontSize="1.2em">{post.content}</Text>
          {post.image && (
            <img
              src={post.image}
              alt="post"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </CardBody>
        <CardFooter display="flex" flexDirection="column" padding="0 2em" gap="1em">
          <PostFooter
            refresh={refresh}
            likes={post.likes}
            comments={post.comments}
            postId={post.id}
          />
        </CardFooter>
      </Card>
    ))
  )
}
