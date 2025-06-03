import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import ScreenWrapper from "~/components/screen-wrapper";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { H1, Muted, P } from "~/components/ui/typography";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    // make https call to /api/auth/reset-password
    console.log("Form submitted:", data);
  };

  return (
    <ScreenWrapper>
      <View className="flex items-center gap-4 p-4 w-full">
        <H1 className="text-center mb-2 dark:text-white">Reset Password</H1>
        <Muted className="text-center dark:text-white/80">
          Enter your new password
        </Muted>

        <View className="flex gap-4 w-full">
          <View className="flex gap-2">
            <Label className="dark:text-white">New Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  placeholder="Enter your new password"
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
          </View>

          <View className="flex gap-2">
            <Label className="dark:text-white">Confirm New Password</Label>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <Input
                  placeholder="Confirm your new password"
                  value={field.value}
                  onChangeText={field.onChange}
                  secureTextEntry
                  aria-labelledby="confirmPasswordLabel"
                  aria-errormessage="confirmPasswordError"
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500">
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        </View>

        <Button className="w-full mt-4" onPress={handleSubmit(onSubmit)}>
          <Text className="dark:text-white">Reset Password</Text>
        </Button>

        <View className="flex-row justify-center items-center">
          <P className="dark:text-white/80">Remember your password?</P>
          <Link href="/sign-in" asChild>
            <Button variant="link" className="p-0">
              <Text className="dark:text-white font-bold">Sign In</Text>
            </Button>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
}
