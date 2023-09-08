import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, Flex, FormControl, FormLabel, Icon, IconButton, Image, Input, InputGroup, InputLeftElement, List, ListItem, Text } from '@chakra-ui/react'
import { useUsers } from '../../api/admin/useUsers'
import { BsTrash } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { ImArrowRight } from 'react-icons/im';
import { useRef, useState } from 'react';
import { User } from '../../api/user/useUser';

export const RemoveUsers = () => {
  const { users, removeUser } = useUsers();
  const [userToRemove, setUserToRemove] = useState<User>();
  const [term, setTerm] = useState('');

  const cancelRef = useRef<HTMLButtonElement>(null);

  const filteredUsers = users.filter(user => user.email.includes(term));

  return (
    <Flex flexDirection="column" height="100%" gap="1em">
      <Flex flexDirection="column" gap="1em">
        <Text fontSize="2em" fontWeight="bold">Remove users</Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={FaSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </InputGroup>
      </Flex>

      <List display="flex" flexDirection="column" height="100%" overflowY="auto" gap="1em">
        {filteredUsers.map((user) => (
          <ListItem key={user.email} display="flex" alignItems="center">
            <Box width="100%" display="flex" alignItems="center" gap="0.5em">
              <Avatar src={user.picture} />
              <Text>{user.name}</Text>
              <Text fontSize="sm" color="gray.500">{user.email}</Text>
            </Box>
            <IconButton onClick={() => setUserToRemove(user)} aria-label='Delete' icon={<BsTrash />} size='lg' variant='ghost' colorScheme='red' />
          </ListItem>
        ))}
      </List>

      <AlertDialog
        isOpen={!!userToRemove}
        onClose={() => setUserToRemove(undefined)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width="auto" maxWidth="100%">
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              <Flex gap="2em" alignItems="center" justifyContent="center" position="relative" _after={{
                content: '""',
                position: 'absolute',
                width: '2em',
                height: '2em',
                zIndex: 1,
                top: "5em",
                right: "3em",
                backgroundSize: 'cover',
                backgroundImage: 'url(/teardrop.png)',
              }} >
                <Image src={userToRemove?.picture} height="10em" />
                <Icon as={ImArrowRight} fontSize="2em" />
                <Image src={userToRemove?.picture} height="10em" />
              </Flex>
              <Text fontSize="lg" fontWeight="bold">
                Are you sure you want to remove {userToRemove?.name}?
              </Text>
              <Text fontSize="sm" color="gray.500">
                The following things will happen:
              </Text>
              <Text fontSize="sm" color="gray.500">
                - All of their posts will be deleted
              </Text>
              <Text fontSize="sm" color="gray.500">
                - All of their comments will be deleted
              </Text>
              <Text fontSize="sm" color="gray.500">
                - They will be removed from everyone's following list
              </Text>
              <Text fontSize="sm" color="gray.500">
                - They will be removed from every post likes list that they have liked
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter display="flex" gap="2em">
              <Button ref={cancelRef} onClick={() => setUserToRemove(undefined)}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={async () => {
                await removeUser(userToRemove?.email);
                setUserToRemove(undefined);
              }}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}
