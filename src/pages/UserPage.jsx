import UserHeader from "../components/UserHeader";
import UserPost from "./UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
