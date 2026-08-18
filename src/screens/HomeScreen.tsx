import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProgress } from '../hooks/useProgress';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import StreakCard from '../components/StreakCard';
import WealthJourney from '../components/WealthJourney';
import ChallengeCard from '../components/ChallengeCard';
import XPBadge from '../components/XPBadge';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { MILESTONES } from '../constants/milestones';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    progress,
    loading,
    error,
    currentChallenge,
    completeChallenge,
    justUnlockedMilestone,
    triggerSync,
  } = useProgress();

  const [completing, setCompleting] = useState(false);

  // Auto-navigate to AchievementScreen when a milestone unlocks
  useEffect(() => {
    if (justUnlockedMilestone && progress) {
      navigation.navigate('Achievement', { milestone: justUnlockedMilestone });
    }
  }, [justUnlockedMilestone, progress]);

  if (loading && !progress) {
    return <LoadingState type="dashboard" />;
  }

  if (error && !progress) {
    return <ErrorState message={error} onRetry={triggerSync} />;
  }

  if (!progress) {
    return null;
  }

  const handleCompleteChallenge = async () => {
    if (completing || progress.challengeCompletedToday) return;
    setCompleting(true);
    
    // Artificially wait 1.2s to show off button loading & micro-interactions
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

  // Find next 3 locked milestones
  const upcomingMilestones = MILESTONES.filter(
    m => m.dayRequired > progress.streak
  ).slice(0, 3);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Ajay</Text>
          <Text style={styles.subtitle}>Let's grow your wealth today.</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
          accessibilityRole="button"
          accessibilityLabel="Go to profile"
        >
          <MaterialCommunityIcons name="account-circle-outline" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* XP Badge Header chip */}
        <View style={styles.badgeRow}>
          <XPBadge xp={progress.xp} level={progress.level} showLevelName={false} />
        </View>

        {/* Wealth Streak Card */}
        <StreakCard
          streak={progress.streak}
          xp={progress.xp}
          totalSaved={progress.totalSaved}
          level={progress.level}
        />

        {/* Save -> Grow -> Borrow Horizontal Roadmap */}
        <WealthJourney
          currentLevel={progress.level}
          challengesCompleted={progress.challengesCompleted}
          compact={true}
        />

        {/* Daily Challenge Interactive Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Action</Text>
        </View>
        
        {currentChallenge ? (
          <ChallengeCard
            challenge={currentChallenge}
            completed={progress.challengeCompletedToday}
            onComplete={handleCompleteChallenge}
            loading={completing}
            onPressCard={() => navigation.navigate('Challenge')}
          />
        ) : (
          <View style={styles.noChallengeCard}>
            <Text style={styles.noChallengeText}>All challenges completed! 🎉</Text>
          </View>
        )}

        {/* Upcoming milestones */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Targets</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Rewards')}
            accessibilityRole="button"
            accessibilityLabel="View all milestones"
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.milestonesList}>
          {upcomingMilestones.length > 0 ? (
            upcomingMilestones.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={styles.miniMilestoneCard}
                onPress={() => navigation.navigate('Rewards')}
                accessibilityRole="button"
                accessibilityLabel={`Upcoming Milestone: ${m.name}. Requires day ${m.dayRequired}. Reward: ${m.rewardText}`}
              >
                <View style={styles.miniMilestoneLeft}>
                  <View style={styles.miniMilestoneIconCircle}>
                    <MaterialCommunityIcons name={m.icon as any} size={16} color={COLORS.textSecondary} />
                  </View>
                  <View>
                    <Text style={styles.miniMilestoneName}>{m.name}</Text>
                    <Text style={styles.miniMilestoneReq}>Requires Day {m.dayRequired}</Text>
                  </View>
                </View>
                <Text style={styles.miniMilestoneReward}>{m.rewardText}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.allUnlockedCard}>
              <Text style={styles.allUnlockedText}>🔥 You have unlocked all milestones!</Text>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  badgeRow: {
    marginVertical: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    letterSpacing: 0.2,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'System',
  },
  noChallengeCard: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChallengeText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  milestonesList: {
    gap: 8,
    marginTop: SPACING.xs,
  },
  miniMilestoneCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
  },
  miniMilestoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  miniMilestoneIconCircle: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniMilestoneName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  miniMilestoneReq: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontFamily: 'System',
    marginTop: 1,
  },
  miniMilestoneReward: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.secondary,
    fontFamily: 'System',
  },
  allUnlockedCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  allUnlockedText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'System',
  },
});
export default HomeScreen;
