import { Flex, List, Box, Avatar, Image, Text, Button, Input } from '@chakra-ui/react'
import { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { User, useUser } from '../../api/user/useUser';
import { useFollow } from '../../api/user/useFollow';
import { convertBase64 } from '../../utils/convertToBase64';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdatePicture } from '../../api/user/useUpdatePicture';

interface BioProps {
  user: User;
}

export const Bio: FC<BioProps> = ({ user }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  const updatePicture = useUpdatePicture();
  const queryClient = useQueryClient();
  const { isFollowing, toggle } = useFollow(user.email);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfilePicture = async (file: File) => {
    const picture = await convertBase64(file);
    await updatePicture({ picture });
    await queryClient.invalidateQueries();
  }

  return (
    <Flex flexDirection="column" gap="1em" height="100%" width="100%">
      <Image src={user.picture || "https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png"} alt="avatar" />
      {currentUser.email !== user.email && (isFollowing ?
        <Button onClick={() => toggle()} colorScheme="orange">Unfollow</Button> :
        <Button onClick={() => toggle()} colorScheme="blue">Follow</Button>)}
      {currentUser.email === user.email &&
        <Button colorScheme="teal" display="flex" alignItems="center" onClick={() => fileInputRef.current.click()}>
          <Text>Upload Image</Text>
          <Input ref={fileInputRef} display="none" type='file' accept='image/*' onChange={e => updateProfilePicture(e.target.files[0])} />
        </Button>
      }
      <Flex gap="1em" alignItems="baseline">
        <Text fontSize="2em" fontWeight="bold">{user.name}</Text>
        <Text color="gray.500">({user.email})</Text>
      </Flex>
      <Text fontSize="1.5em" fontWeight="bold">Following: {user.following.length}</Text>
      <Flex flex="1" height="100%" width="100%" flexDirection="column" overflowY="auto">
        <List display="flex" flexDirection="column" gap="1em">
          {user.following.map((followed) => (
            <Box key={followed.email}
              onClick={() => navigate(`/${btoa(followed.email)}`)}
              padding="1em"
              border="1px solid gray"
              borderRadius="0.5em"
              cursor="pointer"
              userSelect="none"
              backgroundColor="white"
              transition="all 0.2s"
              _hover={{ filter: "brightness(0.9)" }}
            >
              <Flex alignItems="center" gap="1em">
                <Avatar src={followed.picture} />
                <Text>{followed.name}</Text>
                <Text color="gray.500">({followed.email})</Text>
              </Flex>
            </Box>
          ))}
        </List>
      </Flex>
    </Flex>
  )
}
