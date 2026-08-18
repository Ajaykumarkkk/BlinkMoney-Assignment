import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress, getXpRangeForLevel, getLevelName } from '../hooks/useProgress';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';
import MilestoneCard from '../components/MilestoneCard';
import { MILESTONES } from '../constants/milestones';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export const RewardsScreen: React.FC = () => {
  const { progress, loading, error, triggerSync } = useProgress();

  if (loading && !progress) {
    return <LoadingState type="list" />;
  }

  if (error && !progress) {
    return <ErrorState message={error} onRetry={triggerSync} />;
  }

  if (!progress) {
    return null;
  }

  // Calculate level progress stats
  const { min, max } = getXpRangeForLevel(progress.level);
  const progressPercent = Math.max(0, Math.min(100, ((progress.xp - min) / (max - min)) * 100));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards & Milestones</Text>
        <Text style={styles.headerSubtitle}>
          Track your saving streak checkpoints.
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Level Overview card */}
        <View style={styles.levelCard}>
          <Text style={styles.levelLabel}>CURRENT LEVEL</Text>
          <Text style={styles.levelTitle}>
            Level {progress.level} — {getLevelName(progress.level)}
          </Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressRow}>
              <Text style={styles.xpText}>{progress.xp} XP total</Text>
              <Text style={styles.nextXpText}>{max} XP for Level {progress.level + 1}</Text>
            </View>
            <ProgressBar progress={progressPercent} height={8} color={COLORS.primary} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Streak Checkpoints</Text>
        
        <View style={styles.milestonesList}>
          {MILESTONES.map((milestone) => {
            const isCompleted = progress.streak >= milestone.dayRequired;
            const isUnlocked = progress.unlockedMilestones.includes(milestone.id);

            return (
              <MilestoneCard
                key={milestone.id}
                milestone={milestone}
                isUnlocked={isUnlocked}
                isCompleted={isCompleted}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  levelCard: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.subtle,
  },
  levelLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    marginBottom: SPACING.md,
  },
  progressSection: {
    gap: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: 'System',
  },
  nextXpText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: 'System',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    marginBottom: SPACING.sm,
    letterSpacing: 0.2,
  },
  milestonesList: {
    gap: 2,
  },
});
export default RewardsScreen;
