import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "./UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const { username } = useParams();

  const baseURL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${baseURL}/api/users/profile/${username}`);

        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setUser(data);
      } catch (error) {
        console.log(error);
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
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
      <UserPost
        lilkes={1200}
        replies={481}
        postImage={"/post1.png"}
        postTitle={"Let's talk about threads"}
      />
      <UserPost
        lilkes={451}
        replies={12}
        postImage={"/post2.png"}
        postTitle={"Nice tutorial"}
      />
      <UserPost
        lilkes={321}
        replies={989}
        postImage={"/post3.png"}
        postTitle={"I love this guy."}
      />
      <UserPost
        lilkes={212}
        replies={56}
        postTitle={"This is my first thread."}
      />
    </>
  );
};

export default UserPage;
