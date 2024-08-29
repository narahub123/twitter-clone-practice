import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";

const SuggestedUsers = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/api/users/suggested`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();

        if (data.error) {
          showToast("Error", data.error, "error");
        }

        setSuggestedUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getSuggestedUsers();
  }, [showToast]);
  return (
    <>
      <Text mb={4} fontWeight={"bold"}>
        SuggestedUsers
      </Text>
      <Flex direction={"column"} gap={4}>
        {!loading &&
          suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        {/* skeleton */}
        {loading &&
          [...Array(5)].map((_, idx) => (
            <Flex
              key={idx}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
            >
              {/* avatar skeleton */}
              <Box>{<SkeletonCircle size={10} />}</Box>
              {/* username and fullname skeleton */}
              <Flex w={"full"} flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"80px"} />
                <Skeleton h={"8px"} w={"90px"} />
              </Flex>
              {/* follow button skeletion */}
              <Flex>
                <Skeleton h={"20px"} w={"60px"} />
              </Flex>
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default SuggestedUsers;

// skeleton example
{
  /* <Flex key={idx} gap={2} alignItems={"center"} p={1} borderRadius={"md"}>
  <Box>{<SkeletonCircle size={10} />}</Box>

  <Flex w={"full"} flexDir={"column"} gap={2}>
    <Skeleton h={"8px"} w={"80px"} />
    <Skeleton h={"8px"} w={"90px"} />
  </Flex>
  <Flex>
    <Skeleton h={"20px"} w={"60px"} />
  </Flex>
</Flex> */
}
