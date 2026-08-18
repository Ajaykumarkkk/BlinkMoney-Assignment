export const COLORS = {
  // Background and surfaces
  background: '#0B0F19',     // Slate 950 (very deep blue-gray)
  cardBackground: '#161F30', // Slate 850 (subtle contrast card)
  cardBorder: '#23304A',     // Slate 750 (border for cards)
  
  // Accents
  primary: '#10B981',        // Emerald Green (wealth, growth, complete)
  secondary: '#F59E0B',      // Amber Yellow (streak flame, XP)
  info: '#3B82F6',           // Blue (journey steps, current milestones)
  accent: '#8B5CF6',         // Violet (Grow step highlight)
  accentAlt: '#EC4899',      // Pink (Borrow step highlight)
  
  // Text
  textPrimary: '#F8FAFC',    // Off-white
  textSecondary: '#94A3B8',  // Cool gray
  textMuted: '#64748B',      // Darker gray
  
  // Statuses
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 9999,
};

export const SHADOWS = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  }),
};
