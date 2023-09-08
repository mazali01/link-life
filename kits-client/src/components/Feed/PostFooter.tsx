import React, { FC } from 'react'
import { Comment } from '../../api/useFeed';
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import { FiSend } from "react-icons/fi"
import { BsTrash } from 'react-icons/bs';
import { Avatar, Box, Container, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Text, Textarea } from '@chakra-ui/react';
import { User, useUser } from '../../api/useUser';
import { useUpdateLikes } from '../../api/useUpdateLikes';
import { useAddComment } from '../../api/useAddComment';
import dayjs from 'dayjs';
import { useDeleteComment } from '../../api/useDeleteComment';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';


interface PostFooterProps {
  likes: User[];
  comments: Comment[];
  postId: string;
}

export const PostFooter: FC<PostFooterProps> = ({ likes, comments, postId }) => {
  const { user } = useUser();
  const updateLikes = useUpdateLikes();
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();
  const [isCommentsExpanded, setIsCommentsExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const myLike = likes.find(like => like.email === user?.email);

  const withRefresh = (fn: () => Promise<void>) => async () => {
    await fn();
    await queryClient.invalidateQueries();
  }

  const iconProps = {
    _hover: { filter: "brightness(0.9)" },
    transition: "`all` 0.3s",
    borderRadius: "0.25em",
    padding: "0 0.5em",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none"
  } as const

  return (
    <Container padding="0" display="flex" flexDirection="column" alignItems="center" gap="1em" fontSize="1.25em" maxWidth="100%">
      <Container padding="0" display="flex" alignItems="center" gap="2em" maxWidth="100%">
        <Text
          {...iconProps}
          backgroundColor="white"
          onClick={withRefresh(() => updateLikes({ postId, isLike: !myLike }))}
        >
          {myLike ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
          {likes.length}
        </Text>
        <Text {...iconProps}
          backgroundColor={isCommentsExpanded ? "lightgray" : "white"}
          onClick={() => setIsCommentsExpanded(true)}
        >
          <AiOutlineComment />
          {comments.length}
        </Text>
      </Container>

      <Box display="flex" gap="0.5em" width="100%" alignItems="center">
        <Avatar size="sm" src={user?.picture} />
        <Textarea
          rows={Math.min(3, Math.ceil(comment.split('\n').length))}
          placeholder='Comment...'
          size='md'
          maxLength={300}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <IconButton
          onClick={withRefresh(async () => {
            await addComment({ postId, comment });
            setComment('');
            setIsCommentsExpanded(true);
          })}
          isDisabled={comment.length === 0}
          variant='outline'
          colorScheme='teal'
          aria-label='Send'
          icon={<FiSend />}
        />
      </Box>

      <Drawer placement='bottom' isOpen={isCommentsExpanded} onClose={() => setIsCommentsExpanded(false)}>
        <DrawerOverlay />
        <DrawerContent maxHeight="50%" width="50%" margin="auto">
          <DrawerHeader>Comments</DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" gap="1em">
            {comments.map((comment) => (
              <Box key={comment.id} display="flex" gap="0.5em">
                <Avatar
                  cursor="pointer"
                  onClick={() => navigate(`/${btoa(comment.user.email)}`)}
                  src={comment.user.picture}
                />
                <Box backgroundColor="lightgray" padding="0.5em 1em" borderRadius="1em" display="flex" flexDirection="column">
                  <Box display="flex" gap="1em">
                    <Text
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => navigate(`/${btoa(comment.user.email)}`)}
                      fontWeight="bold"
                    >
                      {comment.user.name}
                    </Text>
                    <Text color="purple.600">{dayjs(comment.createdAt).fromNow()}</Text>
                    {comment.user.email === user?.email && (
                      <IconButton
                        aria-label='Delete'
                        icon={<BsTrash />}
                        size='xs'
                        variant='ghost'
                        colorScheme='red'
                        onClick={withRefresh(() => deleteComment({ postId, commentId: comment.id }))}
                      />
                    )}
                  </Box>
                  <Text>{comment.content}</Text>
                </Box>
              </Box>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </Container>
  )
}
