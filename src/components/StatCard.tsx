import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';

interface StatCardProps {
  value: string | number;
  label: string;
  iconName: string;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  iconName,
  iconColor = COLORS.primary,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name={iconName as any} size={22} color={iconColor} />
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    minWidth: '45%', // To fit in 2 column grids
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.xs,
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
});
export default StatCard;
