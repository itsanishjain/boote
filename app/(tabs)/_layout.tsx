// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { colors, typography, tabBarTheme } from "@/constants/theme";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarStyle: {
//           backgroundColor: tabBarTheme.backgroundColor,
//           borderTopColor: colors.grey800,
//         },
//         tabBarActiveTintColor: tabBarTheme.activeTintColor,
//         tabBarInactiveTintColor: tabBarTheme.inactiveTintColor,
//         tabBarLabelStyle: typography.body2,
//         headerStyle: {
//           backgroundColor: colors.background,
//         },
//         headerTintColor: colors.onBackground,
//         headerTitleStyle: typography.h2,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Feed",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="home" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="compass" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="person" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="settings" size={24} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.neutral.background.primary,
          borderTopWidth: 1,
          borderTopColor: colors.neutral.gray300,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.neutral.gray600,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          // headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
