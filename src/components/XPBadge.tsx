import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS } from '../constants/theme';
import { getLevelName } from '../hooks/useProgress';

interface XPBadgeProps {
  xp: number;
  level: number;
  showLevelName?: boolean;
}

export const XPBadge: React.FC<XPBadgeProps> = ({
  xp,
  level,
  showLevelName = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <MaterialCommunityIcons name="star" size={16} color={COLORS.secondary} />
        <Text style={styles.badgeText}>{xp} XP</Text>
      </View>
      <View style={[styles.badge, styles.levelBadge]}>
        <MaterialCommunityIcons name="trophy" size={16} color={COLORS.primary} />
        <Text style={[styles.badgeText, styles.levelText]}>
          Lvl {level} {showLevelName ? `• ${getLevelName(level)}` : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: BORDER_RADIUS.round,
    gap: 6,
  },
  badgeText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'System',
  },
  levelBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  levelText: {
    color: COLORS.primary,
  },
});
export default XPBadge;
