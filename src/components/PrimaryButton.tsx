import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Pressable,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  success?: boolean;
  successTitle?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  title,
  loading = false,
  success = false,
  successTitle = 'Completed ✓',
  disabled = false,
  style,
  textStyle,
  icon,
  variant = 'primary',
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled || loading || success) return;
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || loading || success) return;
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const getBackgroundColor = () => {
    if (disabled) return COLORS.cardBorder;
    if (success || variant === 'success') return COLORS.success;
    if (variant === 'secondary') return COLORS.cardBackground;
    if (variant === 'danger') return COLORS.error;
    return COLORS.primary;
  };

  const getBorderColor = () => {
    if (variant === 'secondary') return COLORS.cardBorder;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (variant === 'secondary') return COLORS.textSecondary;
    return COLORS.textPrimary;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%' }}>
      <Pressable
        onPress={disabled || loading || success ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === 'secondary' ? 1 : 0,
          },
          variant === 'primary' && !disabled && !success && SHADOWS.glow(COLORS.primary + '30'),
          style,
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled || loading, checked: success }}
        accessibilityLabel={success ? successTitle : title}
        accessible={true}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.textPrimary} size="small" />
        ) : success ? (
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {successTitle}
          </Text>
        ) : (
          <View style={styles.content}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
              {title}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    width: '100%',
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'System',
  },
});
export default PrimaryButton;
