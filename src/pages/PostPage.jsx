import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar
            src="/zuck-avatar.png"
            size={"md"}
            name="Mark Zucherberg"
          ></Avatar>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            markzucherberg
          </Text>
          <Image src="/verified.png" w={4} h={4} />
        </Flex>
        <Flex gap={4} alignItems={"centere"}>
          <Text fontSize={"sm"} color={"gart.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      {/* post title */}
      <Text my={2}>Let's talk about Threads</Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post1.png"} w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          239 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
      </Flex>
      <Divider my={4} />
      {/*  */}
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get teh app to like, reply and post.</Text>
        </Flex>
        <Button gap={2} alignItems={"center"}>
          Get
        </Button>
      </Flex>
      <Divider my={4}></Divider>
      {/*  */}
      <Comment
        comment="Looks really good"
        createAt={"2d"}
        likes={200}
        username="johndoe"
        userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
        comment="Amazing"
        createAt={"1d"}
        likes={21}
        username="janedoe"
        userAvatar="https://bit.ly/kent-c-dodds"
      />
      <Comment
        comment="Looks  good"
        createAt={"3d"}
        likes={42}
        username="sallydoe"
        userAvatar="https://bit.ly/code-beast"
      />
    </>
  );
};

export default PostPage;
