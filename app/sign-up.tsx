import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { H1, Muted, P } from "~/components/ui/typography";

const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response = await fetch(
        "https://05eb-24-169-27-78.ngrok-free.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      console.log("result", result);
    } catch (e) {
      console.log("e", e);
    }
    // make https call to /api/auth/signup
    console.log("Form submitted:", data);
  };

  return (
    <SafeAreaView className="flex-1 w-full">
      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <View className="flex-1 p-4">
          <H1 className="text-center mb-2 dark:text-white">
            Create Your Account
          </H1>
          <Muted className="text-center mb-6 dark:text-white/80">
            Join the competition and start making picks!
          </Muted>

          <View className="flex gap-4 mb-6">
            <View className="flex gap-2">
              <Label nativeID="usernameLabel" className="dark:text-white">
                Username *
              </Label>
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
              <Label nativeID="emailLabel" className="dark:text-white">
                Email *
              </Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    placeholder="Enter your email"
                    value={field.value}
                    onChangeText={field.onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    aria-labelledby="emailLabel"
                    aria-errormessage="emailError"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
              )}
            </View>

            <View className="flex gap-2">
              <Label nativeID="firstNameLabel" className="dark:text-white">
                First Name *
              </Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (
                  <Input
                    placeholder="Enter your first name"
                    value={field.value}
                    onChangeText={field.onChange}
                    aria-labelledby="firstNameLabel"
                    aria-errormessage="firstNameError"
                  />
                )}
              />
              {errors.firstName && (
                <Text className="text-red-500">{errors.firstName.message}</Text>
              )}
            </View>

            <View className="flex gap-2">
              <Label nativeID="lastNameLabel" className="dark:text-white">
                Last Name *
              </Label>
              <Controller
                control={control}
                name="lastName"
                render={({ field }) => (
                  <Input
                    placeholder="Enter your last name"
                    value={field.value}
                    onChangeText={field.onChange}
                    aria-labelledby="lastNameLabel"
                    aria-errormessage="lastNameError"
                  />
                )}
              />
              {errors.lastName && (
                <Text className="text-red-500">{errors.lastName.message}</Text>
              )}
            </View>

            <View className="flex gap-2">
              <Label nativeID="passwordLabel" className="dark:text-white">
                Password *
              </Label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input
                    placeholder="Create a password"
                    value={field.value}
                    onChangeText={field.onChange}
                    secureTextEntry
                    aria-labelledby="passwordLabel"
                    aria-errormessage="passwordError"
                  />
                )}
              />
              <Muted className="text-xs mt-1 dark:text-white/80">
                Must be at least 8 characters
              </Muted>
              {errors.password && (
                <Text className="text-red-500">{errors.password.message}</Text>
              )}
            </View>

            <View className="flex gap-2">
              <Label
                nativeID="confirmPasswordLabel"
                className="dark:text-white"
              >
                Confirm Password *
              </Label>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input
                    placeholder="Confirm your password"
                    value={field.value}
                    onChangeText={field.onChange}
                    secureTextEntry
                    aria-labelledby="confirmPasswordLabel"
                    aria-errormessage="confirmPasswordError"
                  />
                )}
                aria-errormessage="confirmPasswordError"
              />
              {errors.confirmPassword && (
                <Text className="text-red-500">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </View>

          <Button onPress={handleSubmit(onSubmit)}>
            <Text className="dark:text-white">Create Account</Text>
          </Button>

          <View className="flex-row justify-center items-center mt-6">
            <P className="dark:text-white/80">Already have an account? </P>
            <Link href="/sign-in" asChild>
              <Button variant="link" className="p-0">
                <Text className="dark:text-white">Sign In</Text>
              </Button>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
