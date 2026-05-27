import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AppScreen, StaticScreen } from '@/components/marketplace/AppScreen';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { alertItems } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function AlertsScreen() {
  return (
    <StaticScreen>
      <AppScreen notificationDot title="AgroMarket">
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.title}>Alerts</Text>
            <Text style={styles.subtitle}>Stay updated on your farm activity</Text>
          </View>
          <Text style={styles.markAll}>Mark all as read</Text>
        </View>
        <View style={styles.filterRow}>
          {['All', 'Orders', 'Payments', 'Offers'].map((label, index) => (
            <Text key={label} style={[styles.filter, index === 0 && styles.activeFilter]}>{label}</Text>
          ))}
        </View>
        <View style={styles.alertList}>
          {alertItems.map((alert) => (
            <View key={alert.title} style={[styles.alertCard, alert.unread && styles.unread, marketplaceShadows.card]}>
              <View style={[styles.alertIcon, { backgroundColor: alert.color }]}>
                <Ionicons name={alert.icon} size={29} color={alert.color === '#FBC02D' ? '#101710' : '#FFFFFF'} />
              </View>
              <View style={styles.alertBody}>
                <View style={styles.alertTop}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.time}>{alert.time}</Text>
                </View>
                <Text style={styles.alertText}>{alert.body}</Text>
                {alert.image ? (
                  <Image source={alert.image} style={styles.alertImage} />
                ) : null}
                <View style={styles.actions}>
                  {alert.unread ? <Text style={styles.readAction}>Mark as read</Text> : null}
                  <Text style={styles.deleteAction}>Delete</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </AppScreen>
      <FloatingTabBar active="alerts" />
    </StaticScreen>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 14,
  },
  title: {
    color: '#101710',
    fontSize: 34,
    fontWeight: '900',
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 19,
    marginTop: 4,
  },
  markAll: {
    color: marketplaceColors.primaryDark,
    fontSize: 16,
    fontWeight: '900',
    paddingBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 34,
    marginBottom: 20,
  },
  filter: {
    backgroundColor: '#E9EFE4',
    color: marketplaceColors.inkSoft,
    borderRadius: 22,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontSize: 17,
    fontWeight: '800',
    borderWidth: 1,
    borderColor: '#BAC8B4',
  },
  activeFilter: {
    backgroundColor: marketplaceColors.primaryDark,
    borderColor: marketplaceColors.primaryDark,
    color: '#FFFFFF',
  },
  alertList: {
    gap: 18,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#DEE7D9',
    flexDirection: 'row',
    gap: 20,
  },
  unread: {
    borderLeftWidth: 5,
    borderLeftColor: marketplaceColors.primaryDark,
  },
  alertIcon: {
    width: 64,
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBody: {
    flex: 1,
  },
  alertTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  alertTitle: {
    flex: 1,
    color: '#101710',
    fontSize: 22,
    fontWeight: '900',
  },
  time: {
    color: marketplaceColors.inkSoft,
    fontSize: 16,
    fontWeight: '800',
  },
  alertText: {
    color: marketplaceColors.inkSoft,
    fontSize: 20,
    lineHeight: 29,
    marginTop: 12,
  },
  alertImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 22,
    marginTop: 24,
  },
  readAction: {
    color: marketplaceColors.primaryDark,
    fontSize: 16,
    fontWeight: '900',
  },
  deleteAction: {
    color: '#C62828',
    fontSize: 16,
    fontWeight: '900',
  },
});
