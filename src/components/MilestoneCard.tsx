import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';
import { Milestone } from '../constants/milestones';

interface MilestoneCardProps {
  milestone: Milestone;
  isUnlocked: boolean;
  isCompleted: boolean; // is completed when current streak >= dayRequired
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  isUnlocked,
  isCompleted,
}) => {
  const getBorderColor = () => {
    if (isCompleted) return 'rgba(16, 185, 129, 0.4)';
    if (isUnlocked) return 'rgba(59, 130, 246, 0.4)';
    return COLORS.cardBorder;
  };

  const getBackgroundColor = () => {
    if (isCompleted) return 'rgba(22, 31, 48, 0.95)';
    return COLORS.cardBackground;
  };

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: getBorderColor(),
          backgroundColor: getBackgroundColor(),
        },
        isCompleted && SHADOWS.subtle,
      ]}
      accessibilityRole="text"
      accessibilityLabel={`Milestone: ${milestone.name}. Requires a ${milestone.dayRequired}-day streak. Reward: ${milestone.rewardText}. Status: ${isCompleted ? 'Unlocked and Achieved' : 'Locked'}`}
    >
      <View style={[
        styles.iconContainer,
        {
          backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.1)' : COLORS.cardBorder,
        }
      ]}>
        <MaterialCommunityIcons
          name={milestone.icon as any}
          size={24}
          color={isCompleted ? COLORS.primary : COLORS.textMuted}
        />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, !isCompleted && styles.textLocked]}>
            {milestone.name}
          </Text>
          <Text style={styles.daysText}>
            Day {milestone.dayRequired}
          </Text>
        </View>
        <Text style={styles.badgeName}>{milestone.badgeName}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {milestone.description}
        </Text>
        <View style={styles.rewardRow}>
          <MaterialCommunityIcons name="gift-outline" size={14} color={COLORS.secondary} />
          <Text style={styles.rewardText}>{milestone.rewardText}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        {isCompleted ? (
          <View style={styles.checkContainer}>
            <MaterialCommunityIcons name="check" size={16} color={COLORS.textPrimary} />
          </View>
        ) : (
          <MaterialCommunityIcons name="lock-outline" size={18} color={COLORS.textMuted} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.xs,
    width: '100%',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  textLocked: {
    color: COLORS.textSecondary,
  },
  daysText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: 'System',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: BORDER_RADIUS.xs,
  },
  badgeName: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontFamily: 'System',
    marginTop: 4,
    lineHeight: 16,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  rewardText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: 'System',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  checkContainer: {
    width: 22,
    height: 22,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MilestoneCard;
