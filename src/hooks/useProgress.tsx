import React, { createContext, useContext, useState, useEffect } from 'react';
import { progressStorage, UserProgress } from '../storage/progressStorage';
import { CHALLENGES, SavingChallenge } from '../constants/challenges';
import { MILESTONES, Milestone } from '../constants/milestones';

interface ProgressContextType {
  progress: UserProgress | null;
  loading: boolean;
  error: string | null;
  currentChallenge: SavingChallenge | null;
  completeChallenge: () => Promise<Milestone | null>;
  resetProgress: () => Promise<void>;
  seedDemoProgress: () => Promise<void>;
  dismissAchievement: () => void;
  justUnlockedMilestone: Milestone | null;
  triggerSync: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const getLevelFromXp = (xp: number): number => {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 1000) return 4;
  return 5;
};

export const getLevelName = (level: number): string => {
  switch (level) {
    case 1: return 'Novice Saver';
    case 2: return 'Consistent Saver';
    case 3: return 'Smart Saver';
    case 4: return 'Wealth Builder';
    case 5: return 'Wealth Champion';
    default: return 'Novice Saver';
  }
};

export const getXpRangeForLevel = (level: number): { min: number; max: number } => {
  switch (level) {
    case 1: return { min: 0, max: 100 };
    case 2: return { min: 100, max: 250 };
    case 3: return { min: 250, max: 500 };
    case 4: return { min: 500, max: 1000 };
    default: return { min: 1000, max: 2500 };
  }
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [justUnlockedMilestone, setJustUnlockedMilestone] = useState<Milestone | null>(null);

  // Load progress on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const saved = await progressStorage.loadProgress();
      setProgress(saved);
    } catch (err) {
      console.error(err);
      setError('Could not load saving progress.');
    } finally {
      // Simulate brief loading spinner to show off our loading states nicely
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  };

  // Find the challenge for the user's current day
  const currentChallenge: SavingChallenge | null = progress
    ? CHALLENGES.find(c => c.day === progress.currentDay) || CHALLENGES[CHALLENGES.length - 1]
    : null;

  /**
   * Completes today's saving challenge.
   * Returns a Milestone if one was unlocked as a result, or null.
   */
  const completeChallenge = async (): Promise<Milestone | null> => {
    if (!progress || progress.challengeCompletedToday || !currentChallenge) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const newStreak = progress.streak + 1;
      const newLongestStreak = Math.max(progress.longestStreak, newStreak);
      const newXp = progress.xp + currentChallenge.xpReward;
      const newTotalSaved = progress.totalSaved + currentChallenge.amount;
      const newChallengesCompleted = progress.challengesCompleted + 1;
      const newLevel = getLevelFromXp(newXp);

      // Check if a milestone was unlocked (streak matches a milestone)
      const newlyUnlockedMilestone = MILESTONES.find(
        m => m.dayRequired === newStreak && !progress.unlockedMilestones.includes(m.id)
      );

      const updatedUnlockedMilestones = [...progress.unlockedMilestones];
      if (newlyUnlockedMilestone) {
        updatedUnlockedMilestones.push(newlyUnlockedMilestone.id);
        // Grant extra XP for the milestone
        // newXp += newlyUnlockedMilestone.xpReward; // Keep rewards simple and deterministic
        setJustUnlockedMilestone(newlyUnlockedMilestone);
      }

      const updatedProgress: UserProgress = {
        streak: newStreak,
        longestStreak: newLongestStreak,
        xp: newXp,
        totalSaved: newTotalSaved,
        challengesCompleted: newChallengesCompleted,
        currentDay: progress.currentDay, // Keep currentDay as is, increment it on the next day/reset
        challengeCompletedToday: true,
        unlockedMilestones: updatedUnlockedMilestones,
        level: newLevel,
      };

      const success = await progressStorage.saveProgress(updatedProgress);
      if (success) {
        setProgress(updatedProgress);
        return newlyUnlockedMilestone || null;
      } else {
        throw new Error('AsyncStorage failure');
      }
    } catch (err) {
      console.error(err);
      setError('Could not update your streak. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resets all saving progress to initial values (0 stats).
   */
  const resetProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const initial = await progressStorage.resetProgress();
      setProgress(initial);
      setJustUnlockedMilestone(null);
    } catch (err) {
      console.error(err);
      setError('Could not reset progress.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Restores data to seeded demo values (12 streak, level 3).
   */
  const seedDemoProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const demo = await progressStorage.seedDemoProgress();
      setProgress(demo);
      setJustUnlockedMilestone(null);
    } catch (err) {
      console.error(err);
      setError('Could not seed demo progress.');
    } finally {
      setLoading(false);
    }
  };

  const dismissAchievement = () => {
    setJustUnlockedMilestone(null);
  };

  const triggerSync = async () => {
    await loadInitialData();
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        loading,
        error,
        currentChallenge,
        completeChallenge,
        resetProgress,
        seedDemoProgress,
        dismissAchievement,
        justUnlockedMilestone,
        triggerSync,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
