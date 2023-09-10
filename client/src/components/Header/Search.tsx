import { Avatar, Box, Card, Flex, Select, Text, TextProps } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import { SearchMethodType, useSearch } from "../../api/user/useSearch";
//@ts-ignore
import { Search as ChakraSearch } from 'chakra-ui-search';
import { useNavigate } from "react-router-dom";
import { useUserFeatures } from "../../api/user/useUserFeatures";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMethod, setSearchMethod] = useState<SearchMethodType>('prefix');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { users, isFetching } = useSearch({ term: debouncedSearchTerm, method: searchMethod });
  const navigate = useNavigate();

  const isSuffixSearchFeatureEnabled = useUserFeatures('suffixSearch');

  return (
    <Box display="flex" gap="1em" width="100%">
      <Box flex="3">
        <ChakraSearch
          css={{
            "&>*:nth-child(2)": {
              position: "absolute",
              zIndex: 1
            }
          }}
          placeholder="Search users..."
          value={searchTerm}
          isLoading={isFetching}
          input={{ iconPosition: 'left' }}
          onSearchChange={e => setSearchTerm(e.target.value)}
          searchResults={users}
          resultRenderer={user =>
            <Flex key={user.email} alignItems="center" gap="1em">
              <Avatar src={user.picture} />
              <HighlightedText text={user.name} highlight={searchTerm} />
              <HighlightedText text={`(${user.email})`} highlight={searchTerm} filter="brightness(0.5)" fontSize="sm" />
            </Flex>
          }
          onResultSelect={user => navigate(`/${btoa(user.email)}`)}
        />
      </Box>
      <Select
        flex="1"
        onChange={(e) => setSearchMethod(e.target.value as SearchMethodType)}
        value={searchMethod}
      >
        <option value="prefix">Prefix</option>
        {isSuffixSearchFeatureEnabled && <option value="suffix">Suffix</option>}
        <option value="contains">Contains</option>
      </Select>
    </Box>
  )
}

interface HighlightedTextProps extends TextProps {
  text: string;
  highlight: string;
}

const HighlightedText: FC<HighlightedTextProps> = ({ text, highlight, ...rest }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <Text display="inline-flex" {...rest}>
      {parts.map((part, i) => (
        <Text
          key={i}
          color={part.toLowerCase() === highlight.toLowerCase() ? 'blue' : 'inherit'}
          fontWeight={part.toLowerCase() === highlight.toLowerCase() ? 'bold' : 'normal'}
        >
          {part}
        </Text>
      ))}
    </Text>
  )
}