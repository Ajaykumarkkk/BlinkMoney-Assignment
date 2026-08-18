import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';
import ProgressBar from './ProgressBar';
import { getXpRangeForLevel, getLevelName } from '../hooks/useProgress';

interface StreakCardProps {
  streak: number;
  xp: number;
  totalSaved: number;
  level: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  streak,
  xp,
  totalSaved,
  level,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for the streak flame
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Calculate level progress percentage
  const { min, max } = getXpRangeForLevel(level);
  const progressPercent = Math.max(0, Math.min(100, ((xp - min) / (max - min)) * 100));

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.streakContainer}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <MaterialCommunityIcons name="fire" size={40} color={COLORS.secondary} />
          </Animated.View>
          <View style={styles.streakTextContainer}>
            <Text style={styles.streakNumber}>{streak}</Text>
            <Text style={styles.streakLabel}>Day Streak</Text>
          </View>
        </View>

        <View style={styles.statContainer}>
          <Text style={styles.statVal}>₹{totalSaved.toLocaleString('en-IN')}</Text>
          <Text style={styles.statLabel}>Saved This Month</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.levelProgressContainer}>
        <View style={styles.levelRow}>
          <Text style={styles.levelText}>Lvl {level}: {getLevelName(level)}</Text>
          <Text style={styles.xpText}>{xp} / {max} XP</Text>
        </View>
        <ProgressBar progress={progressPercent} height={6} color={COLORS.primary} />
        <Text style={styles.nextMilestoneText}>
          {max - xp > 0 ? `${max - xp} XP to next level` : 'Maximum level achieved!'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    width: '100%',
    ...SHADOWS.subtle,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakTextContainer: {
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    lineHeight: 32,
  },
  streakLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'System',
  },
  statContainer: {
    alignItems: 'flex-end',
  },
  statVal: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: SPACING.md,
  },
  levelProgressContainer: {
    gap: 8,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  xpText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    fontFamily: 'System',
  },
  nextMilestoneText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontFamily: 'System',
    marginTop: 2,
  },
});
export default StreakCard;
