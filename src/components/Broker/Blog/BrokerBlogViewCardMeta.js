import {
  Box,
  Image,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AdminProductViewCardMeta = (props) => {
  const {
    image,
    name,
    _id,
    previewContent,
  } = props;

  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        onClick={() => navigate(`/blog/${_id}`)}
        cursor={"pointer"}
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image.url}
        alt={name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text
            onClick={() => navigate(`/blog/${_id}`)}
            fontWeight="medium"
            cursor={"pointer"}
          >
            {name}
          </Text>
          <Text
            cursor={"default"}
            color={mode("gray.600", "gray.400")}
            fontSize="sm"
          >
            {previewContent}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
