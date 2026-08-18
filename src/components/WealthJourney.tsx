import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';

interface WealthJourneyProps {
  currentLevel: number;
  challengesCompleted: number;
  compact?: boolean;
}

export const WealthJourney: React.FC<WealthJourneyProps> = ({
  currentLevel,
  challengesCompleted,
  compact = false,
}) => {
  // Determine statuses of stages
  // Save: Level 1+ (Always unlocked)
  // Grow: Level 3+
  // Borrow: Level 5+
  const saveState: 'completed' | 'active' | 'locked' = currentLevel >= 3 ? 'completed' : 'active';
  const growState: 'completed' | 'active' | 'locked' = 
    currentLevel >= 5 ? 'completed' : currentLevel >= 3 ? 'active' : 'locked';
  const borrowState: 'completed' | 'active' | 'locked' = 
    currentLevel >= 5 ? 'active' : 'locked';

  if (compact) {
    // Compact Horizontal Version for Home Dashboard Card
    return (
      <View style={styles.compactCard}>
        <Text style={styles.compactTitle}>Wealth Progression Stage</Text>
        
        <View style={styles.compactTimeline}>
          {/* Node 1: Save */}
          <View style={styles.compactNodeContainer}>
            <View style={[styles.compactCircle, styles.circleActive]}>
              <MaterialCommunityIcons name="seed" size={16} color={COLORS.primary} />
            </View>
            <Text style={[styles.compactLabel, styles.labelActive]}>Save</Text>
          </View>

          {/* Line 1 */}
          <View style={[
            styles.compactLine, 
            currentLevel >= 3 ? styles.lineCompleted : styles.lineLocked
          ]} />

          {/* Node 2: Grow */}
          <View style={styles.compactNodeContainer}>
            <View style={[
              styles.compactCircle,
              currentLevel >= 3 ? styles.circleActive : styles.circleLocked
            ]}>
              <MaterialCommunityIcons 
                name="sprout" 
                size={16} 
                color={currentLevel >= 3 ? COLORS.accent : COLORS.textMuted} 
              />
            </View>
            <Text style={[
              styles.compactLabel, 
              currentLevel >= 3 ? styles.labelActive : styles.labelLocked
            ]}>Grow</Text>
          </View>

          {/* Line 2 */}
          <View style={[
            styles.compactLine, 
            currentLevel >= 5 ? styles.lineCompletedAlt : styles.lineLocked
          ]} />

          {/* Node 3: Borrow */}
          <View style={styles.compactNodeContainer}>
            <View style={[
              styles.compactCircle,
              currentLevel >= 5 ? styles.circleActiveAlt : styles.circleLocked
            ]}>
              <MaterialCommunityIcons 
                name="tree" 
                size={16} 
                color={currentLevel >= 5 ? COLORS.accentAlt : COLORS.textMuted} 
              />
            </View>
            <Text style={[
              styles.compactLabel, 
              currentLevel >= 5 ? styles.labelActiveAlt : styles.labelLocked
            ]}>Borrow</Text>
          </View>
        </View>

        <Text style={styles.statusDescription}>
          {currentLevel < 3 
            ? '🌱 Complete daily savings to unlock 🌿 Grow (Level 3)' 
            : currentLevel < 5 
              ? '🌿 You unlocked Grow! Reach Level 5 (1,000+ XP) to unlock 🌳 Borrow'
              : '🌳 Ultimate financial stage unlocked! You are a Wealth Champion!'}
        </Text>
      </View>
    );
  }

  // Detailed Vertical version for full Wealth Journey Screen
  return (
    <View style={styles.verticalContainer}>
      {/* Step 1: Save */}
      <View style={styles.verticalStep}>
        <View style={styles.verticalLeft}>
          <View style={[
            styles.verticalCircle,
            saveState === 'completed' && styles.circleSuccessBg,
            saveState === 'active' && styles.circleActiveBg
          ]}>
            {saveState === 'completed' ? (
              <MaterialCommunityIcons name="check" size={20} color={COLORS.textPrimary} />
            ) : (
              <MaterialCommunityIcons name="seed" size={20} color={COLORS.primary} />
            )}
          </View>
          <View style={[
            styles.verticalTrack,
            saveState === 'completed' ? styles.trackSuccess : styles.trackInactive
          ]} />
        </View>
        <View style={styles.verticalRight}>
          <View style={styles.stageHeader}>
            <Text style={styles.stageTitle}>🌱 STAGE 1: SAVE</Text>
            {saveState === 'completed' && (
              <Text style={styles.statusTagCompleted}>Completed</Text>
            )}
            {saveState === 'active' && (
              <Text style={styles.statusTagActive}>In Progress</Text>
            )}
          </View>
          <Text style={styles.stageSubtitle}>Build your saving habit</Text>
          <Text style={styles.stageDesc}>
            The foundation of wealth. Complete daily challenges to establish visual streaks, earn XP, and lock in solid saving behaviors.
          </Text>
          <View style={styles.progressDetailCard}>
            <Text style={styles.progressDetailText}>
              📊 {challengesCompleted} challenges completed
            </Text>
          </View>
        </View>
      </View>

      {/* Step 2: Grow */}
      <View style={styles.verticalStep}>
        <View style={styles.verticalLeft}>
          <View style={[
            styles.verticalCircle,
            growState === 'completed' && styles.circleSuccessBg,
            growState === 'active' && styles.circleGrowActiveBg,
            growState === 'locked' && styles.circleLockedBg
          ]}>
            {growState === 'completed' ? (
              <MaterialCommunityIcons name="check" size={20} color={COLORS.textPrimary} />
            ) : growState === 'active' ? (
              <MaterialCommunityIcons name="sprout" size={20} color={COLORS.textPrimary} />
            ) : (
              <MaterialCommunityIcons name="lock-outline" size={18} color={COLORS.textMuted} />
            )}
          </View>
          <View style={[
            styles.verticalTrack,
            growState === 'completed' ? styles.trackGrow : styles.trackInactive
          ]} />
        </View>
        <View style={styles.verticalRight}>
          <View style={styles.stageHeader}>
            <Text style={[
              styles.stageTitle,
              growState === 'locked' && styles.stageTextLocked
            ]}>🌿 STAGE 2: GROW</Text>
            {growState === 'completed' && (
              <Text style={styles.statusTagCompleted}>Completed</Text>
            )}
            {growState === 'active' && (
              <Text style={styles.statusTagGrowActive}>Active Stage</Text>
            )}
            {growState === 'locked' && (
              <Text style={styles.statusTagLocked}>Locked</Text>
            )}
          </View>
          <Text style={styles.stageSubtitle}>Grow your savings</Text>
          <Text style={styles.stageDesc}>
            Put your savings to work. Unlock compounding investment instruments, mutual fund analytics integrations, and growth tracking rewards.
          </Text>
          {growState === 'locked' ? (
            <View style={styles.lockedCard}>
              <MaterialCommunityIcons name="information-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.lockedText}>Requires Level 3 (250+ XP) to unlock</Text>
            </View>
          ) : (
            <View style={[styles.progressDetailCard, { borderColor: COLORS.accent }]}>
              <Text style={[styles.progressDetailText, { color: COLORS.accent }]}>
                📈 Level {currentLevel} achieved • Savings ready for growth!
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Step 3: Borrow */}
      <View style={styles.verticalStep}>
        <View style={styles.verticalLeft}>
          <View style={[
            styles.verticalCircle,
            borrowState === 'active' && styles.circleBorrowActiveBg,
            borrowState === 'locked' && styles.circleLockedBg
          ]}>
            {borrowState === 'active' ? (
              <MaterialCommunityIcons name="tree" size={20} color={COLORS.textPrimary} />
            ) : (
              <MaterialCommunityIcons name="lock-outline" size={18} color={COLORS.textMuted} />
            )}
          </View>
        </View>
        <View style={styles.verticalRight}>
          <View style={styles.stageHeader}>
            <Text style={[
              styles.stageTitle,
              borrowState === 'locked' && styles.stageTextLocked
            ]}>🌳 STAGE 3: BORROW</Text>
            {borrowState === 'active' && (
              <Text style={styles.statusTagBorrowActive}>Active Stage</Text>
            )}
            {borrowState === 'locked' && (
              <Text style={styles.statusTagLocked}>Locked</Text>
            )}
          </View>
          <Text style={styles.stageSubtitle}>Access responsible credit</Text>
          <Text style={styles.stageDesc}>
            Responsible credit access when you need it. Unlock low-interest credits, overdraft covers, and loan options built on your saving streaks.
          </Text>
          {borrowState === 'locked' ? (
            <View style={styles.lockedCard}>
              <MaterialCommunityIcons name="information-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.lockedText}>Requires Level 5 (1,000+ XP) to unlock</Text>
            </View>
          ) : (
            <View style={[styles.progressDetailCard, { borderColor: COLORS.accentAlt }]}>
              <Text style={[styles.progressDetailText, { color: COLORS.accentAlt }]}>
                🌳 Level 5 achieved • Credit options unlocked!
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  compactCard: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    width: '100%',
    ...SHADOWS.subtle,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    fontFamily: 'System',
    marginBottom: SPACING.md,
  },
  compactTimeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.md,
  },
  compactNodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 4,
  },
  circleActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  circleActiveAlt: {
    borderColor: COLORS.accentAlt,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
  },
  circleLocked: {
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.background,
  },
  compactLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'System',
  },
  labelActive: {
    color: COLORS.textPrimary,
  },
  labelActiveAlt: {
    color: COLORS.accentAlt,
  },
  labelLocked: {
    color: COLORS.textMuted,
  },
  compactLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
    marginTop: -16, // Shift up to align with circles
  },
  lineCompleted: {
    backgroundColor: COLORS.primary,
  },
  lineCompletedAlt: {
    backgroundColor: COLORS.accent,
  },
  lineLocked: {
    backgroundColor: COLORS.cardBorder,
  },
  statusDescription: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Vertical Detailed Timeline Styles
  verticalContainer: {
    width: '100%',
    paddingVertical: SPACING.md,
  },
  verticalStep: {
    flexDirection: 'row',
    minHeight: 150,
  },
  verticalLeft: {
    alignItems: 'center',
    width: 40,
    marginRight: SPACING.md,
  },
  verticalCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  circleSuccessBg: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success,
  },
  circleActiveBg: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
  },
  circleGrowActiveBg: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  circleBorrowActiveBg: {
    borderColor: COLORS.accentAlt,
    backgroundColor: COLORS.accentAlt,
  },
  circleLockedBg: {
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.cardBackground,
  },
  verticalTrack: {
    width: 2,
    flex: 1,
    marginVertical: 4,
    zIndex: 1,
  },
  trackSuccess: {
    backgroundColor: COLORS.success,
  },
  trackGrow: {
    backgroundColor: COLORS.accent,
  },
  trackInactive: {
    backgroundColor: COLORS.cardBorder,
  },
  verticalRight: {
    flex: 1,
    paddingBottom: SPACING.lg,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  stageTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    letterSpacing: 0.5,
  },
  stageTextLocked: {
    color: COLORS.textMuted,
  },
  stageSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'System',
    marginTop: 2,
  },
  stageDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    lineHeight: 18,
    marginTop: SPACING.xs,
  },
  progressDetailCard: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
  },
  progressDetailText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'System',
  },
  lockedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 6,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
  },
  lockedText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    fontWeight: '600',
  },
  statusTagCompleted: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.success,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: BORDER_RADIUS.xs,
  },
  statusTagActive: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primary,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: BORDER_RADIUS.xs,
  },
  statusTagGrowActive: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accent,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: BORDER_RADIUS.xs,
  },
  statusTagBorrowActive: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.accentAlt,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: BORDER_RADIUS.xs,
  },
  statusTagLocked: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    backgroundColor: COLORS.cardBorder,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: BORDER_RADIUS.xs,
  },
});
export default WealthJourney;
