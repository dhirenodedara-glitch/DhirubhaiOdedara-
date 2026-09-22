import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { CoachStyle, Goal, useVibeUp } from '@/context/VibeUpContext';

const goalOptions: { id: Goal; title: string; detail: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'confidence', title: 'Feel more confident', detail: 'Show up with more ease', icon: 'sparkles-outline' },
  { id: 'career', title: 'Grow my career', detail: 'Make progress on work goals', icon: 'briefcase-outline' },
  { id: 'fitness', title: 'Build healthier habits', detail: 'Create a rhythm that lasts', icon: 'fitness-outline' },
  { id: 'relationships', title: 'Strengthen my connections', detail: 'Communicate more openly', icon: 'people-outline' },
  { id: 'productivity', title: 'Get more done', detail: 'Focus on what matters', icon: 'checkmark-circle-outline' },
];

const lifestyles = ['Just getting started', 'Finding my rhythm', 'Ready for a bigger push'];
const coachStyles: { id: CoachStyle; title: string; detail: string }[] = [
  { id: 'warm', title: 'Warm and encouraging', detail: 'Keep me steady and supported' },
  { id: 'direct', title: 'Clear and direct', detail: 'Tell me the next move' },
  { id: 'curious', title: 'Thoughtful and curious', detail: 'Help me find my own answers' },
];

export default function OnboardingScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { hydrated, onboarded, finishOnboarding } = useVibeUp();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>('confidence');
  const [lifestyle, setLifestyle] = useState(lifestyles[1]);
  const [coachStyle, setCoachStyle] = useState<CoachStyle>('warm');

  if (!hydrated) {
    return <View style={[styles.loading, { backgroundColor: colors.background }]}><ActivityIndicator color={colors.primary} /></View>;
  }
  if (onboarded) return <Redirect href="/(tabs)" />;

  const next = () => {
    if (step < 2) setStep(step + 1);
    else {
      finishOnboarding({ displayName: 'there', goal, lifestyle, coachStyle });
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top + 18, paddingBottom: insets.bottom + 12 }]}>
      <View style={styles.topRow}>
        <View style={styles.brandMark}><Ionicons name="sparkles" size={18} color={colors.primaryForeground} /></View>
        <Text style={[styles.brand, { color: colors.foreground }]}>vibeup</Text>
        <Text style={[styles.stepText, { color: colors.mutedForeground }]}>{step + 1} of 3</Text>
      </View>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${((step + 1) / 3) * 100}%` }]} /></View>

      <View style={styles.content}>
        {step === 0 && (
          <>
            <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.hero}>
              <Ionicons name="sunny-outline" size={28} color={colors.primaryForeground} />
              <Text style={styles.heroEyebrow}>A better kind of progress</Text>
              <Text style={styles.heroTitle}>Level up your life, one day at a time.</Text>
              <Text style={styles.heroBody}>A personal coach for the goals that matter to you.</Text>
            </LinearGradient>
            <Text style={[styles.heading, { color: colors.foreground }]}>What are you ready to work on?</Text>
            <View style={styles.options}>
              {goalOptions.map((item) => (
                <Pressable key={item.id} onPress={() => setGoal(item.id)} style={({ pressed }) => [styles.option, { backgroundColor: goal === item.id ? colors.secondary : colors.card, borderColor: goal === item.id ? colors.primary : colors.border, opacity: pressed ? 0.8 : 1 }]}>
                  <View style={[styles.optionIcon, { backgroundColor: goal === item.id ? colors.primary : colors.muted }]}><Ionicons name={item.icon} size={20} color={goal === item.id ? colors.primaryForeground : colors.primary} /></View>
                  <View style={styles.optionCopy}><Text style={[styles.optionTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.optionDetail, { color: colors.mutedForeground }]}>{item.detail}</Text></View>
                  {goal === item.id && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                </Pressable>
              ))}
            </View>
          </>
        )}
        {step === 1 && (
          <>
            <Text style={[styles.kicker, { color: colors.primary }]}>YOUR PACE</Text>
            <Text style={[styles.heading, { color: colors.foreground }]}>Where are you in your journey?</Text>
            <Text style={[styles.subheading, { color: colors.inkSoft }]}>There is no right starting point. We will meet you where you are.</Text>
            <View style={styles.largeOptions}>
              {lifestyles.map((item, index) => (
                <Pressable key={item} onPress={() => setLifestyle(item)} style={({ pressed }) => [styles.largeOption, { backgroundColor: lifestyle === item ? colors.secondary : colors.card, borderColor: lifestyle === item ? colors.primary : colors.border, opacity: pressed ? 0.8 : 1 }]}>
                  <View style={[styles.number, { backgroundColor: lifestyle === item ? colors.primary : colors.muted }]}><Text style={[styles.numberText, { color: lifestyle === item ? colors.primaryForeground : colors.primary }]}>0{index + 1}</Text></View>
                  <Text style={[styles.optionTitle, { color: colors.foreground }]}>{item}</Text>
                  {lifestyle === item && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                </Pressable>
              ))}
            </View>
            <View style={[styles.note, { backgroundColor: colors.peach }]}><Ionicons name="heart-outline" size={20} color={colors.peachForeground} /><Text style={[styles.noteText, { color: colors.peachForeground }]}>VibeUp is here to support your real life, not add another impossible checklist.</Text></View>
          </>
        )}
        {step === 2 && (
          <>
            <Text style={[styles.kicker, { color: colors.primary }]}>YOUR COACH</Text>
            <Text style={[styles.heading, { color: colors.foreground }]}>How should your coach show up?</Text>
            <Text style={[styles.subheading, { color: colors.inkSoft }]}>You can change this any time from your profile.</Text>
            <View style={styles.largeOptions}>
              {coachStyles.map((item) => (
                <Pressable key={item.id} onPress={() => setCoachStyle(item.id)} style={({ pressed }) => [styles.styleOption, { backgroundColor: coachStyle === item.id ? colors.secondary : colors.card, borderColor: coachStyle === item.id ? colors.primary : colors.border, opacity: pressed ? 0.8 : 1 }]}>
                  <View style={[styles.coachDot, { backgroundColor: coachStyle === item.id ? colors.primary : colors.muted }]}><Ionicons name={item.id === 'warm' ? 'heart-outline' : item.id === 'direct' ? 'navigate-outline' : 'bulb-outline'} size={22} color={coachStyle === item.id ? colors.primaryForeground : colors.primary} /></View>
                  <View style={styles.optionCopy}><Text style={[styles.optionTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.optionDetail, { color: colors.mutedForeground }]}>{item.detail}</Text></View>
                  {coachStyle === item.id && <Ionicons name="checkmark-circle" size={22} color={colors.primary} />}
                </Pressable>
              ))}
            </View>
            <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>VibeUp offers general encouragement and practical ideas. It is not a therapist, doctor, or financial adviser.</Text>
          </>
        )}
      </View>
      <Pressable onPress={next} style={({ pressed }) => [styles.button, { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }]}>
        <Text style={[styles.buttonText, { color: colors.primaryForeground }]}>{step === 2 ? 'Build my VibeUp' : 'Continue'}</Text>
        <Ionicons name="arrow-forward" size={18} color={colors.primaryForeground} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandMark: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6E5AE6' },
  brand: { fontSize: 20, fontWeight: '700', letterSpacing: -0.5 },
  stepText: { marginLeft: 'auto', fontSize: 12, fontWeight: '600' },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: '#E6E1F1', marginTop: 18, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  content: { flex: 1, paddingTop: 24 },
  hero: { borderRadius: 24, padding: 22, marginBottom: 26 },
  heroEyebrow: { color: '#FFFFFF', opacity: 0.8, fontSize: 13, fontWeight: '600', marginTop: 16, letterSpacing: 0.4 },
  heroTitle: { color: '#FFFFFF', fontSize: 28, lineHeight: 33, fontWeight: '700', marginTop: 7, letterSpacing: -0.8 },
  heroBody: { color: '#FFFFFF', opacity: 0.82, fontSize: 14, lineHeight: 20, marginTop: 10 },
  kicker: { fontSize: 12, fontWeight: '700', letterSpacing: 1.4, marginTop: 22 },
  heading: { fontSize: 29, lineHeight: 34, fontWeight: '700', letterSpacing: -0.8, marginTop: 10 },
  subheading: { fontSize: 15, lineHeight: 22, marginTop: 10 },
  options: { gap: 9, marginTop: 18 },
  largeOptions: { gap: 12, marginTop: 28 },
  option: { minHeight: 68, borderRadius: 18, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  largeOption: { minHeight: 72, borderRadius: 20, borderWidth: 1, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  styleOption: { minHeight: 82, borderRadius: 20, borderWidth: 1, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13 },
  optionIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  coachDot: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  number: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  numberText: { fontSize: 12, fontWeight: '700' },
  optionCopy: { flex: 1 },
  optionTitle: { fontSize: 15, fontWeight: '700' },
  optionDetail: { fontSize: 12, marginTop: 3 },
  note: { borderRadius: 18, padding: 15, flexDirection: 'row', gap: 10, marginTop: 24, alignItems: 'flex-start' },
  noteText: { flex: 1, fontSize: 13, lineHeight: 19, fontWeight: '500' },
  disclaimer: { fontSize: 11, lineHeight: 16, marginTop: 22 },
  button: { height: 56, borderRadius: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  buttonText: { fontSize: 15, fontWeight: '700' },
});