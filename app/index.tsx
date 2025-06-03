import { Link } from "expo-router";
import { Star } from "lucide-react-native";
import { Text, View } from "react-native";
import ScreenWrapper from "~/components/screen-wrapper";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { TrendingUp } from "~/lib/icons/TrendingUp";
import { Trophy } from "~/lib/icons/Trophy";
import { Users } from "~/lib/icons/Users";

export default function Index() {
  const cards = [
    {
      icon: <Users className="text-primary" />,
      title: "Play in Pick'em Leagues",
      description:
        "Compete in leagues to see who is the best NFL prognosticator",
    },
    {
      icon: <TrendingUp className="text-primary" />,
      title: "Track Your Performance",
      description:
        "See detailed stats on your picking accuracy and trends over time",
    },
    {
      icon: <Star className="text-primary" />,
      title: "Weekly Competitions",
      description:
        "Fresh challenges every week with updated NFL spreads and matchups",
    },
  ];

  return (
    <ScreenWrapper>
      <View className="flex items-center gap-4">
        <View className="flex flex-row items-center gap-2">
          <View className="bg-primary p-2 rounded-xl">
            <Trophy className="text-white" />
          </View>
          <Text className="text-2xl font-bold dark:text-white">
            Picks Leagues
          </Text>
        </View>

        <Text className="text-3xl font-bold text-center mt-4 dark:text-white">
          Compete with Friends on NFL Picks
        </Text>

        <Text className="text-center text-lg dark:text-white/80">
          Think you know football? Prove it by making picks against the spread
          and climbing the leaderboards with your friends.
        </Text>

        <Link href="/sign-up" asChild>
          <Button>
            <Text className="font-bold">Get Started - It&apos;s Free!</Text>
          </Button>
        </Link>

        <Link href="/sign-in" asChild>
          <Button variant={"outline"}>
            <Text className="font-bold">Sign In</Text>
          </Button>
        </Link>

        <View className="flex flex-col gap-4 mt-4">
          {cards.map((card, index) => (
            <Card key={index} className="w-full">
              <CardContent className="p-4 w-full">
                <View className="flex flex-row w-full items-center gap-4">
                  {card.icon}
                  <View className="flex-1 gap-2">
                    <Text className="text-lg font-bold">{card.title}</Text>
                    <Text>{card.description}</Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>

        <Text className="dark:text-white/80">
          Ready to prove you&apos;re the best at picking NFL games?
        </Text>
      </View>
    </ScreenWrapper>
  );
}
