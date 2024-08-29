import { Button, Text } from "@chakra-ui/react";
import React from "react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const SettingsPage = () => {
  const baseURL = import.meta.env.VITE_API_URL;
  const showToast = useShowToast();
  const logout = useLogout();

  const freezeAccount = async () => {
    if (!window.confirm(`Are you sure you want to freeze your account?`)) {
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/users/freeze`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }

      if (data.success) {
        await logout();
        showToast("Success", "Your account has been fronzen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return (
    <>
      <Text my={1} fontWeight={"bold"}>
        Freeze your account
      </Text>
      <Text my={1}>You can unfreeze your account anytime by logging in</Text>
      <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
        freeze
      </Button>
    </>
  );
};

export default SettingsPage;
