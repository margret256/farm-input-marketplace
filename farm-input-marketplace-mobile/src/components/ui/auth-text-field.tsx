import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { marketplaceColors } from '@/constants/marketplace';

type AuthTextFieldProps = TextInputProps & {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  trailingIcon?: ComponentProps<typeof Ionicons>['name'];
};

export function AuthTextField({ label, icon, trailingIcon, style, ...inputProps }: AuthTextFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>
        <Ionicons name={icon} size={15} color={marketplaceColors.inkMuted} />
        <TextInput
          placeholderTextColor="#A8B0A1"
          style={[styles.input, style]}
          selectionColor={marketplaceColors.primary}
          {...inputProps}
        />
        {trailingIcon ? <Ionicons name={trailingIcon} size={16} color={marketplaceColors.primaryDark} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 7,
  },
  label: {
    color: marketplaceColors.inkSoft,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  field: {
    minHeight: 45,
    borderRadius: 9,
    backgroundColor: marketplaceColors.muted,
    borderWidth: 1,
    borderColor: '#EFF3EA',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    color: marketplaceColors.ink,
    fontSize: 13,
    fontWeight: '600',
    paddingVertical: 0,
  },
});
