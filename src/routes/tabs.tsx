import { Colors } from "@/constants/Colors";
import Home from "@/screens/home";
import MyList from "@/screens/myList";
import Profile from "@/screens/profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    House,
    Bookmark,
    CircleUser
} from "lucide-react-native";
import { useColorScheme } from "@/components/useColorScheme";

const Tab = createBottomTabNavigator();

const tabIcons: Record<
    string,
    { solid: React.ElementType; outline: React.ElementType }
> = {
    Home: { solid: House, outline: House },
    MyList: { solid: Bookmark, outline: Bookmark },
    Profile: { solid: CircleUser, outline: CircleUser },
};

export default function Tabs() {
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? "light"];

    const renderIcon = (name: keyof typeof tabIcons, focused: boolean) => {
        const Icon = focused ? tabIcons[name].solid : tabIcons[name].outline;

        return (
            <View style={{ alignItems: "center", gap: 4, marginTop: 8 }}>
                <Icon
                    size={26}
                    color={focused ? themeColors.tabIconSelected : themeColors.tabIconDefault}
                />
            </View>
        );
    };

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: themeColors.background,
                    height: 60 + insets.bottom,
                    borderTopWidth: 1,
                    borderTopColor: themeColors.tint,
                    paddingTop: 8,
                },
                tabBarLabel: () => null,
                headerShown: false,
            }}
        >
            {Object.keys(tabIcons).map((name) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={
                    name === "MyList"
                            ? MyList
                            : name === "Profile"
                            ? Profile
                            : Home
                    }
                    options={{
                        tabBarIcon: ({ focused }) =>
                            renderIcon(
                                name as
                                    | "Home"
                                    | "MyList"
                                    | "Profile",
                                focused
                            ),
                    }}
                    listeners={{
                        tabPress: async () => {
                            await Haptics.impactAsync(
                                Haptics.ImpactFeedbackStyle.Light
                            );
                        },
                    }}
                />
            ))}
        </Tab.Navigator>
    );
}
