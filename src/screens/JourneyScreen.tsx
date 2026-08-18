import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProgress } from '../hooks/useProgress';
import { COLORS, SPACING } from '../constants/theme';
import WealthJourney from '../components/WealthJourney';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export const JourneyScreen: React.FC = () => {
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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wealth Journey</Text>
        <Text style={styles.headerSubtitle}>
          Progress from Save → Grow → Borrow.
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeading}>Progression Path</Text>
        <Text style={styles.sectionDescription}>
          Each milestone saving day elevates your level. Reaching level milestones unlocks next stages of your financial journey.
        </Text>
        
        <WealthJourney
          currentLevel={progress.level}
          challengesCompleted={progress.challengesCompleted}
          compact={false}
        />
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
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    marginTop: SPACING.sm,
  },
  sectionDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    lineHeight: 18,
    marginTop: SPACING.xs,
    marginBottom: SPACING.lg,
  },
});
export default JourneyScreen;
