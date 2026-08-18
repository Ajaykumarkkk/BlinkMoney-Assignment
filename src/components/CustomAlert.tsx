import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  BackHandler,
} from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';
import PrimaryButton from './PrimaryButton';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
}) => {
  const scaleVal = useRef(new Animated.Value(0.9)).current;
  const opacityVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Entrance animation
      Animated.parallel([
        Animated.spring(scaleVal, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(opacityVal, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset values when modal closes
      scaleVal.setValue(0.9);
      opacityVal.setValue(0);
    }
  }, [visible]);

  // Handle hardware back button on Android
  useEffect(() => {
    const handleBackButton = () => {
      if (visible) {
        onCancel();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      subscription.remove();
    };
  }, [visible, onCancel]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />
        
        <Animated.View
          style={[
            styles.alertCard,
            {
              opacity: opacityVal,
              transform: [{ scale: scaleVal }],
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={confirmText}
              onPress={onConfirm}
              variant={confirmVariant}
              style={styles.button}
            />
            <PrimaryButton
              title={cancelText}
              onPress={onCancel}
              variant="secondary"
              style={styles.button}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  alertCard: {
    width: '90%',
    maxWidth: 320,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    fontFamily: 'System',
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontFamily: 'System',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.xs,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: SPACING.sm,
    width: '100%',
  },
  button: {
    width: '100%',
    height: 46,
  },
});
export default CustomAlert;
