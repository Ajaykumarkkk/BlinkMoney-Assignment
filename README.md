# BlinkMoney Wealth Streak (Mobile Feature)

BlinkMoney Wealth Streak is a premium, high-fidelity mobile feature built in **React Native** and **TypeScript**. It transforms a user's financial progression (Save → Grow → Borrow) into an interactive, gamified habit-building loop.

This project is a **frontend-focused prototype** designed to demonstrate advanced product thinking, frontend engineering excellence, micro-interactions, clean state modeling, and robust local persistence.

---

## 1. Product Overview & Core Concept

The **BlinkMoney Wealth Streak** gamifies daily savings. Instead of treating saving as an occasional, dry task, this feature encourages consistent daily actions (e.g., saving ₹100, ₹200) to maintain an active **Streak Flame**, earn **Experience Points (XP)**, level up, and unlock advanced stages of the BlinkMoney platform.

### The Psychological Loop
```
Daily Saving Challenge
    ↓ (Complete Challenge)
Interactive Progress Update (+50 XP, Streak Increment)
    ↓ (Habit Reinforcement)
Milestone Achievements Unlocked (e.g. Bronze Saver)
    ↓ (Celebration)
Native Social Sharing (Virality)
    ↓ (Retention)
Return Tomorrow to Keep Streak Active
```

---

## 2. Product Thinking & Strategic Alignment

### Why This Feature?
A primary friction point in fintech is **user retention**. Users open savings/investment apps occasionally but lack a daily trigger. The Wealth Streak establishes a **daily morning routine** that couples behavioral finance with game design.

### Problem Being Solved
- **Lack of Saving Consistency**: Most users save randomly. The streak mechanism uses loss aversion (fear of losing a 12-day streak) to maintain daily savings discipline.
- **Dry Financial UX**: Traditional banking apps feel chores-like. This concept introduces visual rewards (levels, badges, trophies) to make saving feel active and productive.

### Strategic Metrics Improved
1. **Engagement (Daily Active Users)**: Encourages users to open the app every 24 hours to claim or complete their challenge.
2. **Wealth Gamification**: Elegant, credit-building progression (Leveling up from Save to Grow to Borrow).
3. **Virality & Referrals**: Celebrating milestone achievements (e.g., "15-Day Saving Streak!") with native sharing options.
4. **Lead Magnet**: High streak counts serve as a trust score, qualifying savers for low-interest credit lines (the "Borrow" stage).

---

## 3. Screen Overview

The app comprises **5 main navigation tabs** and **1 overlay screen**:

1. **Home / Wealth Dashboard**: Overview of current streak, total monthly savings, level progression (Save → Grow → Borrow), today's challenge card, and upcoming milestones.
2. **Challenge Screen**: A focused, interactive portal to complete the daily saving target with an animated progress bar and detailed rewards checklist.
3. **Journey Screen**: A detailed vertical timeline highlighting locked, active, and completed stages of the Save → Grow → Borrow progression.
4. **Rewards & Milestones**: Scrollable list of streak achievements (Bronze, Silver, Gold levels) showing unlocked statuses and rewards.
5. **Achievement Celebration (Overlay Modal)**: Triggered automatically upon reaching days 3, 7, 15, 20, 30, and 50. Features celebratory styling and native share integrations.
6. **Profile & Stats**: Displays historical records (total XP, challenges completed, longest streak). Includes the **Evaluator Sandbox** to reset progress or restore demo data for testing.

---

## 4. Component & Files Architecture

The application has been organized using clean, scalable modular structures:

```
src/
├── components/
│   ├── WealthJourney.tsx      # Save -> Grow -> Borrow visual journey (Compact / Detailed)
│   ├── StreakCard.tsx         # Streak statistics card with pulsing flame
│   ├── ChallengeCard.tsx      # Interactive card for Today's savings goal
│   ├── ProgressBar.tsx        # Animated progress bar (Animated API)
│   ├── XPBadge.tsx            # Pill showing level status and current XP
│   ├── MilestoneCard.tsx      # Checkpoint reward card for locked/unlocked milestones
│   ├── StatCard.tsx           # Numeric metrics grid card
│   ├── PrimaryButton.tsx      # Interactive button with loaders and active scale
│   ├── LoadingState.tsx       # Shimmering skeleton loaders (Dashboard / List)
│   ├── EmptyState.tsx         # Screen placeholders when data is empty
│   └── ErrorState.tsx         # Graceful error UI with retry action
├── screens/
│   ├── HomeScreen.tsx         # Main dashboard screen
│   ├── ChallengeScreen.tsx    # Daily challenge detailed portal
│   ├── JourneyScreen.tsx      # Vertical Save-Grow-Borrow progression timeline
│   ├── RewardsScreen.tsx      # Milestones checklist screen
│   ├── AchievementScreen.tsx  # Celebratory milestone pop-up
│   └── ProfileScreen.tsx      # User profile, statistics, and sandbox settings
├── navigation/
│   └── AppNavigator.tsx       # Tab & Native Stack router configuration
├── storage/
│   └── progressStorage.ts     # AsyncStorage integration and data validators
├── hooks/
│   └── useProgress.tsx        # Global state context provider and state actions
└── constants/
    ├── theme.ts               # Slate-based premium dark mode colors
    ├── challenges.ts          # Mock saving challenge database (Days 1 - 30)
    └── milestones.ts          # Milestone rewards database (Days 3, 7, 15, 20, 30, 50)
```

---

## 5. Technical Execution Details

### State Management & Storage
- **Context-Powered State**: The app uses a global React Context (`ProgressProvider`) to synchronize user stats across all screens.
- **AsyncStorage Persistence**: User progress, including streak counts, unlocked achievements, XP, and saving records, is saved locally.
- **Automatic Seed & Fallbacks**: On the first install, the app automatically seeds progress to **Day 12, Level 3, ₹2,450 saved** so that the dashboard is populated with interesting details immediately.

### Micro-Interactions & Animations
- **Pulsing Streak Flame**: Reflected in the `StreakCard` using looping scale animations.
- **Fluid Progress Bars**: Custom React Native `Animated` bindings to smoothly transition from old to new values when completing a challenge.
- **Press-to-Scale CTAs**: `PrimaryButton` scales down slightly on press to simulate a tactile physical button click.
- **Achievement Pop-In**: Gracefully scales up and fades in milestone rewards upon unlock.
- **Shimmering Skeleton Loader**: Beautiful looping opacity skeleton loaders show during async storage fetch operations.

### Edge Cases Handled
1. **Duplicate Completes**: Button is disabled and transitions to "Completed" state upon click to prevent double saving.
2. **Corrupted Storage**: JSON parse failures are caught gracefully, falling back to initialized or seeded data without crashing the app.
3. **Fresh Install vs. Existing Data**: Evaluator Sandbox in Profile provides immediate toggling between empty state (0 statistics) and active state (day 12 statistics).
4. **App Resets**: Resets clear all cached AsyncStorage values correctly.
5. **Milestone Unlocking Limits**: Unlocks trigger exactly once upon hitting the specific streak day requirement, eliminating duplicate celebratory screen triggers.
6. **Share API Availability**: Failsafe try-catch blocks protect the application if the platform's native sharing is unavailable (e.g. some emulators).

---

## 6. How to Run Locally

### Prerequisites
Make sure you have Node.js and npm installed on your system.

### Steps
1. Clone the repository and navigate to the project directory:
   ```bash
   cd d:\Ajay\Assignment
   ```
2. Install npm packages (already performed in workspace):
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm run start
   ```
4. Run on a virtual device:
   - To open in **Android Emulator**: press `a` (Make sure an emulator like `Pixel_10` is active).
   - To open in **Web Browser**: press `w` (Runs the web-compiled server).
   - To open on a **Real Mobile Device**: Scan the QR code using the **Expo Go** app (iOS/Android).

---

## 7. How to Build APK

To generate a standalone Android APK package for distribution and manual installation, follow these steps:

1. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your Expo account:
   ```bash
   eas login
   ```
3. Configure the project for EAS build:
   ```bash
   eas build:configure
   ```
4. Build the Android app as an APK package (submitting to Expo's cloud compiler):
   ```bash
   eas build --platform android --profile preview
   ```
5. Once completed, download the `.apk` file from the terminal link or your Expo dashboard and install it directly on your Android device.

---

## 8. Future Roadmap

1. **A/B Testing on Streaks**: Implementing dynamic challenge values tailored to user savings history.
2. **Social Leaderboard**: A private group streak leaderboard to encourage peer accountability.
3. **Streak Insurance**: Introducing "Streak Freeze" items users can purchase using XP to prevent losing progress if they miss a day.
4. **Bank Account Sync**: Automatically updating the daily saving completion status by listening to SMS receipts or banking open APIs.
