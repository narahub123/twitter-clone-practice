import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../pages/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";

const UserPage = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();

  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`${baseURL}/api/posts/user/${username}`);

        const data = await res.json();

        if (data.error) {
          return showToast("Error", data.error, "error");
        }

        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User not found</h1>;
  }

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />

      {!fetchingPosts && posts.length === 0 && <h1>User has no posts..</h1>}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
