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

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    // make https call to /api/auth/forgot-password
    console.log("Form submitted:", data);
  };

  return (
    <ScreenWrapper>
      <View className="flex items-center gap-4 p-4 w-full">
        <H1 className="text-center mb-2 dark:text-white">Reset Password</H1>
        <Muted className="text-center dark:text-white/80">
          Enter your email and we&apos;ll send you a link to reset your password
        </Muted>

        <View className="flex gap-4 w-full">
          <View className="flex gap-2">
            <Label className="dark:text-white">Email</Label>
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
        </View>

        <Button className="w-full mt-4" onPress={handleSubmit(onSubmit)}>
          <Text className="dark:text-white">Send Reset Link</Text>
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
