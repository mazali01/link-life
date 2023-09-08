import { Post } from "../../api/user/useFeed"
import { Avatar, Box, Card, CardFooter, IconButton, Text } from "@chakra-ui/react"
import { CardHeader } from "@chakra-ui/react"
import { CardBody } from "@chakra-ui/react"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PostFooter } from "./PostFooter";
import { BsTrash } from 'react-icons/bs';
import { useUser } from "../../api/user/useUser";
import { useDeletePost } from "../../api/user/useDeletePost";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
dayjs.extend(relativeTime);

interface FeedProps {
  feed: Post[];
}

export const Feed: FC<FeedProps> = ({ feed }) => {
  const { user } = useUser();
  const deletePost = useDeletePost();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return (
    <Box position="relative" maxWidth="100%" display="flex" flexDirection="column" gap="1em" overflowY="auto">
      {feed?.map((post) => (
        <Card key={post.id} boxSizing="content-box" padding="1em">
          <CardHeader display="flex" justifyContent="space-between" padding="0">
            <Box
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              onClick={() => navigate(`/${btoa(post.user.email)}`)}
              width="100%"
              display="flex"
              alignItems="center"
              gap="0.5em"
            >
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
                  await queryClient.invalidateQueries();
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
              likes={post.likes}
              comments={post.comments}
              postId={post.id}
            />
          </CardFooter>
        </Card>
      ))
      }
    </Box>
  )
}
