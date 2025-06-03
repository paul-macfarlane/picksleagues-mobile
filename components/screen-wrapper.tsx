import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "~/lib/useColorScheme";

export default function ScreenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center">
        <LinearGradient
          colors={
            isDarkColorScheme // need to keep this in sync with the color scheme in global.css
              ? ["rgba(34, 197, 94, 0.2)", "#0c0a09"]
              : ["rgba(22, 163, 74, 0.2)", "#ffffff"]
          }
          style={{ flex: 1, alignItems: "center", width: "100%", padding: 20 }}
        >
          {children}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
