import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Share,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProgress } from '../hooks/useProgress';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import PrimaryButton from '../components/PrimaryButton';
import { Milestone } from '../constants/milestones';

export const AchievementScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { dismissAchievement, progress } = useProgress();
  
  // Fallback milestone if none passed (failsafe coding)
  const milestone: Milestone = route.params?.milestone || {
    id: 'm1',
    dayRequired: 3,
    name: 'First Step',
    badgeName: 'Novice Saver',
    rewardText: '+20 XP',
    xpReward: 20,
    description: 'Complete a 3-day saving streak.',
    icon: 'seedling',
  };

  const scaleVal = useRef(new Animated.Value(0.85)).current;
  const opacityVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pop-in transition on screen mount
    Animated.parallel([
      Animated.spring(scaleVal, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityVal, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      const message = `I just hit a ${milestone.dayRequired}-day saving streak on BlinkMoney! 🔥\nBuilding my wealth one day at a time. Join me in growing wealth!`;
      await Share.share({
        message,
        title: 'BlinkMoney Wealth Streak Achievement',
      });
    } catch (error) {
      console.warn('Share API unavailable:', error);
    }
  };

  const handleContinue = () => {
    // Reset the "justUnlockedMilestone" state in global hook
    dismissAchievement();
    
    // Go back to the screen we came from (usually Home Dashboard)
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />
      
      <Animated.View style={[
        styles.overlayContent,
        {
          opacity: opacityVal,
          transform: [{ scale: scaleVal }],
        }
      ]}>
        {/* Celebration sparkles */}
        <View style={styles.partyIcon}>
          <MaterialCommunityIcons name="party-popper" size={56} color={COLORS.secondary} />
        </View>

        <View style={styles.card}>
          <Text style={styles.congratulationsText}>MILESTONE UNLOCKED!</Text>
          
          <View style={styles.iconBadgeCircle}>
            <MaterialCommunityIcons name={milestone.icon as any} size={48} color={COLORS.primary} />
          </View>

          <Text style={styles.milestoneTitle}>{milestone.name}</Text>
          <Text style={styles.badgeLabel}>{milestone.badgeName}</Text>
          <Text style={styles.milestoneDesc}>{milestone.description}</Text>

          <View style={styles.divider} />

          <View style={styles.statsOverview}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>🔥 {milestone.dayRequired} Days</Text>
              <Text style={styles.statLabel}>Streak Achieved</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>+{milestone.xpReward} XP</Text>
              <Text style={styles.statLabel}>Bonus Awarded</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Share Achievement"
            onPress={handleShare}
            variant="primary"
            icon={<MaterialCommunityIcons name="share-variant" size={18} color={COLORS.textPrimary} />}
            style={styles.shareButton}
          />
          <PrimaryButton
            title="Continue Journey"
            onPress={handleContinue}
            variant="secondary"
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContent: {
    width: '90%',
    maxWidth: 380,
    alignItems: 'center',
  },
  partyIcon: {
    marginBottom: SPACING.md,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  congratulationsText: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 2,
    fontFamily: 'System',
    marginBottom: SPACING.md,
  },
  iconBadgeCircle: {
    width: 90,
    height: 90,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  milestoneTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
  milestoneDesc: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontFamily: 'System',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: SPACING.lg,
  },
  statsOverview: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
  buttonContainer: {
    width: '100%',
    marginTop: SPACING.lg,
    gap: 10,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
  },
});
export default AchievementScreen;
