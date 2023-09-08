import { Flex, Switch, Text } from '@chakra-ui/react'
import { useAdminFeatures } from '../../api/admin/useAdminFeatures';

export const Features = () => {
  const { features, toggleFeature } = useAdminFeatures();
  return (
    <Flex>
      <Flex flexDirection="column" gap="1em">
        <Text fontSize="2em" fontWeight="bold">Toggle features</Text>
        <Flex flexDirection="column" gap="1em">
          {features.map(({ type, displayName, enabled }) => (
            <Flex key={type} gap="1em" justifyContent="space-between">
              <Text fontSize="large">{displayName}</Text>
              <Switch isChecked={enabled} onChange={() => toggleFeature(type)} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
