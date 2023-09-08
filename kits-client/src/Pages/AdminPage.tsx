import { Button, Card, Collapse, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { RemoveUsers } from '../components/Admin/RemoveUsers';
import { Features } from '../components/Admin/Features';
import { Activity } from '../components/Admin/Activity';
import { useNavigate } from 'react-router-dom';

type AdminAction = 'remove' | 'features' | 'activity';

export const AdminPage = () => {
  const [selectedAction, setSelectedAction] = useState<AdminAction>();
  const navigate = useNavigate();

  const chooseAction = (action: AdminAction) => () => {
    selectedAction === action ? setSelectedAction(undefined) : setSelectedAction(action);
  }

  return (
    <Flex alignItems="center" width="100%" height="100%" padding="5em" flexDirection="column" gap="2em">
      <Card display="flex" padding="2em" flexDirection="column" gap="1em" maxWidth="50%" alignItems="center">
        <Flex>
          <Text fontSize="xx-large" fontWeight="bold">Admin Page</Text>
          <Button position="absolute" right="1em" top="1em" colorScheme="red" onClick={() => {
            localStorage.removeItem('token')
            navigate('/auth');
          }}>
            Logout
          </Button>
        </Flex>
        <Text fontSize="x-large">What would you like to do?</Text>
        <Flex gap="1em" flexWrap="wrap" justifyContent="space-around">
          {[
            { action: 'remove' as const, text: 'Remove users' },
            { action: 'features' as const, text: 'Manage features' },
            { action: 'activity' as const, text: 'View activity' },
          ].map(({ action, text }) => (
            <Button key={action}
              padding="2em"
              fontSize="x-large"
              colorScheme='yellow'
              variant={selectedAction === action ? 'solid' : 'outline'}
              onClick={chooseAction(action)}
            >
              {text}
            </Button>
          ))}
        </Flex>
      </Card>
      <Collapse unmountOnExit in={!!selectedAction}>
        <Card padding="2em" height="100%" display="flex" justifyContent="center" alignItems="center">
          {selectedAction === 'remove' && (
            <RemoveUsers />
          )}
          {selectedAction === 'features' && (
            <Features />
          )}
          {selectedAction === 'activity' && (
            <Activity />
          )}
        </Card>
      </Collapse>
    </Flex>
  )
}
