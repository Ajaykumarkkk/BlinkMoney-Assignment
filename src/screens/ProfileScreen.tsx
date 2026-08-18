import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProgress, getLevelName } from '../hooks/useProgress';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';
import StatCard from '../components/StatCard';
import PrimaryButton from '../components/PrimaryButton';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import CustomAlert from '../components/CustomAlert';

export const ProfileScreen: React.FC = () => {
  const {
    progress,
    loading,
    error,
    resetProgress,
    seedDemoProgress,
    triggerSync,
  } = useProgress();

  const [resetAlertVisible, setResetAlertVisible] = useState(false);
  const [seedAlertVisible, setSeedAlertVisible] = useState(false);

  if (loading && !progress) {
    return <LoadingState type="list" />;
  }

  if (error && !progress) {
    return <ErrorState message={error} onRetry={triggerSync} />;
  }

  if (!progress) {
    return null;
  }

  const handleReset = () => {
    setResetAlertVisible(true);
  };

  const handleRestoreDemo = () => {
    setSeedAlertVisible(true);
  };

  const executeReset = async () => {
    setResetAlertVisible(false);
    await resetProgress();
  };

  const executeSeed = async () => {
    setSeedAlertVisible(false);
    await seedDemoProgress();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile & Statistics</Text>
        <Text style={styles.headerSubtitle}>
          Review your wealth building records.
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account" size={32} color={COLORS.primary} />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>Ajay Kumar</Text>
            <Text style={styles.membership}>BlinkMoney Saver since Aug 2026</Text>
            <Text style={styles.levelTag}>Lvl {progress.level} • {getLevelName(progress.level)}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <Text style={styles.sectionTitle}>Performance Stats</Text>
        <View style={styles.grid}>
          <StatCard
            value={`${progress.streak} days`}
            label="Current Streak"
            iconName="fire"
            iconColor={COLORS.secondary}
          />
          <StatCard
            value={`${progress.longestStreak} days`}
            label="Longest Streak"
            iconName="trophy-outline"
            iconColor={COLORS.secondary}
          />
          <StatCard
            value={`₹${progress.totalSaved.toLocaleString('en-IN')}`}
            label="Total Saved"
            iconName="piggy-bank-outline"
            iconColor={COLORS.primary}
          />
          <StatCard
            value={`${progress.challengesCompleted}`}
            label="Challenges Won"
            iconName="check-circle-outline"
            iconColor={COLORS.primary}
          />
          <StatCard
            value={`${progress.xp} XP`}
            label="Total Experience"
            iconName="star-outline"
            iconColor={COLORS.secondary}
          />
          <StatCard
            value={`Lvl ${progress.level}`}
            label="Account Level"
            iconName="chevron-double-up"
            iconColor={COLORS.info}
          />
        </View>

        {/* Sandbox Controls for Evaluator */}
        <View style={styles.sandboxContainer}>
          <Text style={styles.sandboxTitle}>Evaluator Sandbox</Text>
          <Text style={styles.sandboxDesc}>
            Use these buttons to easily toggle states, verifying how the app reacts to a fresh setup vs. active demo numbers.
          </Text>
          <View style={styles.sandboxButtons}>
            <PrimaryButton
              title="Reset Progress (Fresh Install)"
              onPress={handleReset}
              variant="danger"
              style={styles.sandboxButton}
            />
            <PrimaryButton
              title="Restore Day-12 Demo Data"
              onPress={handleRestoreDemo}
              variant="secondary"
              style={styles.sandboxButton}
            />
          </View>
        </View>
      </ScrollView>

      {/* Custom Alerts replacing default OS popups */}
      <CustomAlert
        visible={resetAlertVisible}
        title="Reset Saving Progress?"
        description="This will erase all your streaks, XP, saved amounts, and level achievements. Useful for testing the Fresh Install & Empty State flow."
        confirmText="Reset Progress"
        cancelText="Cancel"
        confirmVariant="danger"
        onConfirm={executeReset}
        onCancel={() => setResetAlertVisible(false)}
      />

      <CustomAlert
        visible={seedAlertVisible}
        title="Seed Demo Progress?"
        description="This will restore your streak to 12 days, total saved to ₹2,450, and level to 3. Useful to quickly verify active stats on the dashboard."
        confirmText="Seed Data"
        cancelText="Cancel"
        confirmVariant="primary"
        onConfirm={executeSeed}
        onCancel={() => setSeedAlertVisible(false)}
      />
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.subtle,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.background,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
  },
  membership: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginTop: 2,
  },
  levelTag: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: BORDER_RADIUS.xs,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    marginBottom: SPACING.md,
    letterSpacing: 0.2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  sandboxContainer: {
    backgroundColor: COLORS.cardBackground,
    borderColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.sm,
    ...SHADOWS.subtle,
  },
  sandboxTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    marginBottom: 4,
  },
  sandboxDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  sandboxButtons: {
    gap: 8,
  },
  sandboxButton: {
    height: 44,
  },
});
export default ProfileScreen;
