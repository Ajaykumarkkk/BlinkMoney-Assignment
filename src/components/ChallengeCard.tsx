import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';
import PrimaryButton from './PrimaryButton';
import { SavingChallenge } from '../constants/challenges';

interface ChallengeCardProps {
  challenge: SavingChallenge;
  completed: boolean;
  onComplete: () => void;
  loading: boolean;
  onPressCard?: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  completed,
  onComplete,
  loading,
  onPressCard,
}) => {
  return (
    <Pressable
      onPress={onPressCard}
      disabled={completed}
      style={({ pressed }) => [
        styles.card,
        completed && styles.completedCard,
        pressed && !completed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Today's savings challenge: ${challenge.title}. Reward: ${challenge.xpReward} XP. ${completed ? 'Completed' : 'Tap to view details'}`}
    >
      <View style={styles.header}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>TODAY'S CHALLENGE</Text>
        </View>
        <View style={styles.xpReward}>
          <MaterialCommunityIcons name="star" size={14} color={COLORS.secondary} />
          <Text style={styles.xpText}>+{challenge.xpReward} XP</Text>
        </View>
      </View>

      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>

      <View style={styles.actionRow}>
        <PrimaryButton
          title="Complete Challenge"
          successTitle="Challenge Complete ✓"
          onPress={onComplete}
          loading={loading}
          success={completed}
          variant="primary"
          style={styles.button}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    width: '100%',
    ...SHADOWS.subtle,
  },
  completedCard: {
    borderColor: 'rgba(16, 185, 129, 0.3)',
    backgroundColor: 'rgba(22, 31, 48, 0.75)',
  },
  pressed: {
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.cardBorder,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BORDER_RADIUS.xs,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textSecondary,
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  xpReward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BORDER_RADIUS.xs,
    gap: 4,
  },
  xpText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: 'System',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  actionRow: {
    width: '100%',
  },
  button: {
    height: 46,
  },
});
export default ChallengeCard;
