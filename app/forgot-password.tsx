import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { H1, Muted, Small } from "~/components/ui/typography";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");

  const handleForgotPassword = () => {
    // TODO: Implement sign in logic
    console.log("Resetting password...");
  };

  return (
    <View className="flex-1 bg-background p-5">
      <H1 className="text-center mb-2">Forgot Password</H1>
      <Muted className="text-center mb-6">
        Enter your username to reset your password.
      </Muted>

      <View className="space-y-4 mb-6">
        <View>
          <Small className="mb-2">Username</Small>
          <Input
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>

      <Button onPress={handleForgotPassword}>Reset Password</Button>
    </View>
  );
}
