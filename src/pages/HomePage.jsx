import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Link to={`/markzucherberg`}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>visit Profile page</Button>
      </Flex>
    </Link>
  );
};

export default HomePage;
