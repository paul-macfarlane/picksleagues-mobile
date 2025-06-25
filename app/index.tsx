import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { authClient } from "../lib/auth-client";

export default function Index() {
  const [loading, setLoading] = useState<"google" | "apple" | null>(null);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("./home");
    }
  }, [isPending, session, router]);

  const handleGoogleSignIn = async () => {
    setLoading("google");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/home", // Redirect to home after login
      });
    } catch (error) {
      // Optionally handle error
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading("apple");
    try {
      await authClient.signIn.social({
        provider: "apple",
        callbackURL: "/home",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If not authed, show login
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to PicksLeagues</Text>
      <View style={styles.buttonContainer}>
        {loading === "google" ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
        )}
        {loading === "apple" ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button title="Sign in with Apple" onPress={handleAppleSignIn} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
});
