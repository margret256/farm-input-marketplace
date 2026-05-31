import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { marketplaceColors } from '@/constants/marketplace';
import { AppHeader } from './AppHeader';

type AppScreenProps = {
  children: ReactNode;
  title?: string;
  back?: boolean;
  help?: boolean;
  padded?: boolean;
  showHeader?: boolean;
};

export function AppScreen({
  children,
  title,
  back,
  help,
  padded = true,
  showHeader = true,
}: AppScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {showHeader ? <AppHeader back={back} help={help} title={title} /> : null}
      <ScrollView
        contentContainerStyle={[styles.content, padded && styles.padded]}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function StaticScreen({ children }: { children: ReactNode }) {
  return <View style={styles.staticScreen}>{children}</View>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: marketplaceColors.screen,
  },
  content: {
    paddingBottom: 126,
  },
  padded: {
    paddingHorizontal: 24,
    paddingTop: 26,
  },
  staticScreen: {
    flex: 1,
    backgroundColor: marketplaceColors.screen,
  },
});
