import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProgress } from '../hooks/useProgress';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';
import PrimaryButton from '../components/PrimaryButton';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export const ChallengeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    progress,
    loading,
    error,
    currentChallenge,
    completeChallenge,
    triggerSync,
  } = useProgress();

  const [completing, setCompleting] = useState(false);

  if (loading && !progress) {
    return <LoadingState type="card" />;
  }

  if (error && !progress) {
    return <ErrorState message={error} onRetry={triggerSync} />;
  }

  if (!progress) {
    return null;
  }

  const handleComplete = async () => {
    if (completing || progress.challengeCompletedToday) return;
    setCompleting(true);

    // Artificially delay by 1.2s to showcase loader transitions and visual checks
    setTimeout(async () => {
      try {
        await completeChallenge();
      } catch (err) {
        console.error(err);
      } finally {
        setCompleting(false);
      }
    }, 1200);
  };

  const isCompleted = progress.challengeCompletedToday;
  const progressPercent = isCompleted ? 100 : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Challenge</Text>
        <Text style={styles.headerSubtitle}>Build your savings habit.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentChallenge ? (
          <View style={styles.card}>
            <View style={styles.trophyCircle}>
              <MaterialCommunityIcons 
                name={isCompleted ? "check-decagram" : "piggy-bank-outline"} 
                size={40} 
                color={isCompleted ? COLORS.success : COLORS.primary} 
              />
            </View>

            <Text style={styles.challengeTitle}>
              {currentChallenge.title}
            </Text>
            <Text style={styles.challengeDesc}>
              {currentChallenge.description}
            </Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressTextRow}>
                <Text style={styles.progressLabel}>Current Savings Progress</Text>
                <Text style={styles.progressNumbers}>
                  ₹{isCompleted ? currentChallenge.amount : 0} / ₹{currentChallenge.amount}
                </Text>
              </View>
              
              <ProgressBar 
                progress={progressPercent} 
                height={10} 
                color={COLORS.primary} 
                backgroundColor={COLORS.cardBorder}
              />
            </View>

            <View style={styles.rewardsBox}>
              <Text style={styles.rewardHeading}>Rewards on Completion</Text>
              <View style={styles.rewardRow}>
                <View style={styles.rewardItem}>
                  <MaterialCommunityIcons name="star" size={20} color={COLORS.secondary} />
                  <Text style={styles.rewardVal}>+{currentChallenge.xpReward} XP</Text>
                </View>
                <View style={styles.rewardItem}>
                  <MaterialCommunityIcons name="fire" size={20} color={COLORS.secondary} />
                  <Text style={styles.rewardVal}>+1 Day Streak</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionSection}>
              <PrimaryButton
                title="Complete Challenge"
                successTitle="Challenge Complete ✓"
                onPress={handleComplete}
                loading={completing}
                success={isCompleted}
              />
            </View>

            {isCompleted && (
              <View style={styles.successFeedback}>
                <MaterialCommunityIcons name="emoticon-happy-outline" size={24} color={COLORS.success} />
                <Text style={styles.successText}>
                  Great job! You completed today's challenge. You are ₹{currentChallenge.amount} closer to your goals!
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="party-popper" size={48} color={COLORS.primary} />
            <Text style={styles.emptyTitle}>Congratulations!</Text>
            <Text style={styles.emptyDesc}>
              You have completed all available daily challenges. Come back tomorrow for new goals!
            </Text>
          </View>
        )}
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.background,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  challengeDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  progressContainer: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    fontFamily: 'System',
  },
  progressNumbers: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'System',
  },
  rewardsBox: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  rewardHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textMuted,
    fontFamily: 'System',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: SPACING.xs,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rewardVal: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  actionSection: {
    width: '100%',
  },
  successFeedback: {
    flexDirection: 'row',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.lg,
    gap: 10,
    alignItems: 'center',
  },
  successText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    fontFamily: 'System',
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  emptyDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    textAlign: 'center',
    lineHeight: 20,
  },
});
export default ChallengeScreen;
