import { Tabs } from 'expo-router';

export default function DealerTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="inventory" />
      <Tabs.Screen name="orders" />
      <Tabs.Screen name="add-product" />
      <Tabs.Screen name="analytics" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="onboarding" />
    </Tabs>
  );
}