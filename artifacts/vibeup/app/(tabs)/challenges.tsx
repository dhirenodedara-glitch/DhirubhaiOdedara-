import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useVibeUp } from '@/context/VibeUpContext';

const challenges = [
  { id: 'conversation', title: 'Start one conversation', detail: 'Ask someone a genuine question and stay curious.', category: 'SOCIAL CONFIDENCE', points: 40, icon: 'chatbubbles-outline' as const, tone: 'peach' as const },
  { id: 'focus', title: 'Take a focused first step', detail: 'Set a 25-minute timer and move one important task forward.', category: 'PRODUCTIVITY', points: 40, icon: 'timer-outline' as const, tone: 'purple' as const },
  { id: 'reset', title: 'Make space to reset', detail: 'Step outside, breathe slowly, and leave your phone behind.', category: 'SELF-CARE', points: 40, icon: 'leaf-outline' as const, tone: 'mint' as const },
  { id: 'learn', title: 'Learn one useful thing', detail: 'Spend ten minutes with a book, course, or expert you trust.', category: 'GROWTH', points: 40, icon: 'book-outline' as const, tone: 'blue' as const },
];

export default function ChallengesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedChallenges, completeChallenge } = useVibeUp();
  const toneColor = (tone: string) => tone === 'peach' ? colors.peach : tone === 'mint' ? colors.mint : tone === 'blue' ? '#DCEBFA' : colors.secondary;
  const toneInk = (tone: string) => tone === 'peach' ? colors.peachForeground : tone === 'mint' ? colors.mintForeground : tone === 'blue' ? '#3D6385' : colors.secondaryForeground;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 17, paddingBottom: insets.bottom + 104 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>MAKE IT REAL</Text><Text style={[styles.title, { color: colors.foreground }]}>Weekly challenges</Text></View><View style={[styles.weekBadge, { backgroundColor: colors.secondary }]}><Text style={[styles.weekNumber, { color: colors.primary }]}>03</Text><Text style={[styles.weekLabel, { color: colors.secondaryForeground }]}>days left</Text></View></View>
        <Text style={[styles.subtitle, { color: colors.inkSoft }]}>Small, optional experiments designed to help you practise the life you want.</Text>
        <View style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={styles.progressCopy}><Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>THIS WEEK</Text><Text style={[styles.progressTitle, { color: colors.foreground }]}>{completedChallenges.length} of 4 challenges complete</Text></View><View style={[styles.progressCircle, { borderColor: colors.primary }]}><Text style={[styles.progressCircleText, { color: colors.primary }]}>{completedChallenges.length * 25}%</Text></View></View>
        <View style={styles.list}>{challenges.map((challenge) => {
          const done = completedChallenges.includes(challenge.id);
          return <View key={challenge.id} style={[styles.challenge, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.challengeIcon, { backgroundColor: toneColor(challenge.tone) }]}><Ionicons name={challenge.icon} size={22} color={toneInk(challenge.tone)} /></View>
            <View style={styles.challengeCopy}><Text style={[styles.category, { color: toneInk(challenge.tone) }]}>{challenge.category}</Text><Text style={[styles.challengeTitle, { color: colors.foreground }]}>{challenge.title}</Text><Text style={[styles.challengeDetail, { color: colors.mutedForeground }]}>{challenge.detail}</Text><View style={styles.reward}><Ionicons name="flash" size={13} color={colors.warning} /><Text style={[styles.rewardText, { color: colors.mutedForeground }]}>{challenge.points} XP</Text></View></View>
            <Pressable testID={`challenge-${challenge.id}`} onPress={() => completeChallenge(challenge.id)} disabled={done} style={({ pressed }) => [styles.completeButton, { backgroundColor: done ? colors.mint : colors.primary, opacity: pressed ? 0.78 : 1 }]}><Ionicons name={done ? 'checkmark' : 'add'} size={18} color={done ? colors.mintForeground : colors.primaryForeground} /></Pressable>
          </View>;
        })}</View>
        <View style={[styles.tip, { backgroundColor: colors.muted }]}><Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} /><Text style={[styles.tipText, { color: colors.inkSoft }]}>Share wins when you want to. Your private details always stay yours.</Text></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  title: { fontSize: 27, fontWeight: '700', letterSpacing: -0.7, marginTop: 7 },
  subtitle: { paddingHorizontal: 20, fontSize: 14, lineHeight: 21, marginTop: 11, maxWidth: 365 },
  weekBadge: { borderRadius: 15, paddingHorizontal: 13, paddingVertical: 9, alignItems: 'center' },
  weekNumber: { fontSize: 17, fontWeight: '700' },
  weekLabel: { fontSize: 10, marginTop: 1 },
  progressCard: { marginHorizontal: 20, marginTop: 21, borderRadius: 21, borderWidth: 1, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressCopy: { flex: 1 },
  progressLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  progressTitle: { fontSize: 15, fontWeight: '700', marginTop: 5 },
  progressCircle: { width: 55, height: 55, borderRadius: 28, borderWidth: 4, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  progressCircleText: { fontSize: 12, fontWeight: '700' },
  list: { gap: 12, paddingHorizontal: 20, marginTop: 18 },
  challenge: { borderRadius: 21, borderWidth: 1, padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  challengeIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  challengeCopy: { flex: 1 },
  category: { fontSize: 9, fontWeight: '700', letterSpacing: 1.1 },
  challengeTitle: { fontSize: 15, fontWeight: '700', marginTop: 5 },
  challengeDetail: { fontSize: 12, lineHeight: 18, marginTop: 4 },
  reward: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 9 },
  rewardText: { fontSize: 11, fontWeight: '600' },
  completeButton: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tip: { marginHorizontal: 20, marginTop: 20, borderRadius: 17, padding: 14, flexDirection: 'row', gap: 10, alignItems: 'center' },
  tipText: { flex: 1, fontSize: 12, lineHeight: 18 },
});