import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, View } from "react-native";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { H1, Muted, P } from "~/components/ui/typography";

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    // make https call to /api/auth/signin
    console.log("Form submitted:", data);
  };

  return (
    <SafeAreaView className="flex-1 w-full">
      <View className="flex-1 p-5">
        <H1 className="text-center mb-2 dark:text-white">Welcome Back</H1>
        <Muted className="text-center mb-6 dark:text-white/80">
          Sign in to continue competing with your friends!
        </Muted>

        <View className="space-y-4 mb-6">
          <View className="flex gap-2">
            <Label className="dark:text-white">Username</Label>
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <Input
                  placeholder="Enter your username"
                  value={field.value}
                  onChangeText={field.onChange}
                  aria-labelledby="usernameLabel"
                  aria-errormessage="usernameError"
                />
              )}
            />
            {errors.username && (
              <Text className="text-red-500">{errors.username.message}</Text>
            )}
          </View>

          <View className="flex gap-2">
            <Label className="dark:text-white">Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  placeholder="Enter your password"
                  value={field.value}
                  onChangeText={field.onChange}
                  secureTextEntry
                  aria-labelledby="passwordLabel"
                  aria-errormessage="passwordError"
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}

            <Link href="/forgot-password" asChild>
              <Button variant="link" className="p-0 self-end">
                <Text className="dark:text-white font-bold">
                  Forgot your password?
                </Text>
              </Button>
            </Link>
          </View>
        </View>

        <Button onPress={handleSubmit(onSubmit)}>
          <Text className="dark:text-white">Sign In</Text>
        </Button>

        <View className="flex-row justify-center items-center mt-6">
          <P className="dark:text-white/80">Don&apos;t have an account? </P>
          <Link href="/sign-up" asChild>
            <Button variant="link" className="p-0">
              <Text className="dark:text-white font-bold">Sign Up</Text>
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
