import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, DimensionValue } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = BORDER_RADIUS.sm,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

interface LoadingStateProps {
  type?: 'dashboard' | 'card' | 'list';
}

export const LoadingState: React.FC<LoadingStateProps> = ({ type = 'card' }) => {
  if (type === 'dashboard') {
    return (
      <View style={styles.container}>
        {/* Header Skeleton */}
        <View style={styles.row}>
          <View style={{ gap: 8 }}>
            <Skeleton width={120} height={16} />
            <Skeleton width={180} height={24} />
          </View>
          <Skeleton width={40} height={40} borderRadius={BORDER_RADIUS.round} />
        </View>

        {/* Main Card Skeleton */}
        <Skeleton height={180} borderRadius={BORDER_RADIUS.lg} style={{ marginTop: SPACING.md }} />

        {/* Challenge Section Skeleton */}
        <View style={{ marginTop: SPACING.lg, gap: 12 }}>
          <Skeleton width={150} height={20} />
          <Skeleton height={110} borderRadius={BORDER_RADIUS.md} />
        </View>

        {/* Milestones Skeleton */}
        <View style={{ marginTop: SPACING.lg, gap: 12 }}>
          <Skeleton width={180} height={20} />
          <Skeleton height={70} borderRadius={BORDER_RADIUS.md} />
        </View>
      </View>
    );
  }

  if (type === 'list') {
    return (
      <View style={styles.container}>
        <View style={{ gap: 16 }}>
          <Skeleton height={80} borderRadius={BORDER_RADIUS.md} />
          <Skeleton height={80} borderRadius={BORDER_RADIUS.md} />
          <Skeleton height={80} borderRadius={BORDER_RADIUS.md} />
          <Skeleton height={80} borderRadius={BORDER_RADIUS.md} />
        </View>
      </View>
    );
  }

  // Default 'card' loader
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <View style={styles.cardSkeleton}>
        <Skeleton width={140} height={20} style={{ alignSelf: 'center', marginBottom: SPACING.md }} />
        <Skeleton height={12} style={{ marginBottom: SPACING.sm }} />
        <Skeleton height={12} width="80%" style={{ marginBottom: SPACING.sm, alignSelf: 'center' }} />
        <Skeleton height={8} width="50%" style={{ marginBottom: SPACING.lg, alignSelf: 'center' }} />
        <Skeleton height={48} borderRadius={BORDER_RADIUS.md} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  skeleton: {
    backgroundColor: COLORS.cardBorder,
  },
  cardSkeleton: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
});
export default LoadingState;
