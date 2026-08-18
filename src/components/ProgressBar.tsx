import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { COLORS, BORDER_RADIUS } from '../constants/theme';

interface ProgressBarProps {
  progress: number; // Value between 0 and 100
  height?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  color = COLORS.primary,
  backgroundColor = COLORS.cardBorder,
  showText = false,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Keep within bounds
    const clampedProgress = Math.max(0, Math.min(100, progress));
    
    Animated.timing(animatedWidth, {
      toValue: clampedProgress,
      duration: 800,
      useNativeDriver: false, // width cannot use native driver
    }).start();
  }, [progress]);

  const widthInterpolation = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.barContainer, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              backgroundColor: color,
              width: widthInterpolation,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
      {showText && (
        <Text style={styles.percentageText}>
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  barContainer: {
    flex: 1,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BORDER_RADIUS.round,
  },
  percentageText: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    minWidth: 32,
    textAlign: 'right',
  },
});
export default ProgressBar;
