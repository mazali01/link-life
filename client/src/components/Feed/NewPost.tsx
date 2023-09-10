import { Card, Box, Avatar, Textarea, Button, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { usePublishPost } from "../../api/user/usePublishPost";
import { useUser } from "../../api/user/useUser";
import { convertBase64 } from "../../utils/convertToBase64";
import { useQueryClient } from "@tanstack/react-query";


export const NewPost = () => {
  const { user } = useUser();
  const [postContent, setPostContent] = useState('');
  const [postPicture, setPostPicture] = useState<File>();
  const queryClient = useQueryClient();

  const publishPost = usePublishPost();
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card boxShadow="0px 0px 10px 5px rgb(176 255 252 / 34%)" width="100%" height="100%" padding="2em" display="flex" gap="1em">
      <Box display="flex" gap="1em">
        <Avatar src={user?.picture} />
        <Textarea placeholder="A penny for your thought?" value={postContent} onChange={e => setPostContent(e.target.value)} />
      </Box>
      <Box display="flex" gap="1em">
        <Button boxShadow={postPicture ? "0px 0px 10px 5px rgb(95 9 192 / 45%)" : ""} display="flex" alignItems="center" onClick={() => fileInputRef.current.click()}>
          <Text>Upload Image</Text>
          <FcAddImage />
          <Input ref={fileInputRef} display="none" type='file' accept='image/*' onChange={e => setPostPicture(e.target.files[0])} />
        </Button>

        <Button onClick={async () => {
          const picture = postPicture ? await convertBase64(postPicture) : null;
          await publishPost({
            content: postContent,
            picture
          });
          await queryClient.invalidateQueries();
          setPostContent('');
          setPostPicture(undefined);
        }} colorScheme="purple" flex="1">Post</Button>
      </Box>
    </Card>
  );
}

