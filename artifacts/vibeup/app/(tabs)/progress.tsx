import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useVibeUp } from '@/context/VibeUpContext';

const days = [{ day: 'M', value: 0.74 }, { day: 'T', value: 0.52 }, { day: 'W', value: 0.9 }, { day: 'T', value: 0.45 }, { day: 'F', value: 0.7 }, { day: 'S', value: 0.28 }, { day: 'S', value: 0.58 }];

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { xp, level, streak, habits, completedChallenges } = useVibeUp();
  const completeCount = habits.filter((item) => item.completed).length;
  const xpInLevel = xp % 100;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 17, paddingBottom: insets.bottom + 104 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR MOMENTUM</Text><Text style={[styles.title, { color: colors.foreground }]}>Progress that feels good</Text></View><View style={[styles.trophy, { backgroundColor: colors.peach }]}><Ionicons name="trophy-outline" size={22} color={colors.peachForeground} /></View></View>
        <View style={[styles.levelCard, { backgroundColor: colors.primary }]}><View style={styles.levelTop}><View><Text style={styles.levelEyebrow}>CURRENT LEVEL</Text><Text style={styles.levelTitle}>Level {level}</Text></View><View style={styles.levelIcon}><Ionicons name="sparkles" size={21} color={colors.primary} /></View></View><View style={styles.levelMeta}><Text style={styles.levelMetaText}>{xpInLevel} / 100 XP to next level</Text><Text style={styles.levelMetaText}>{xp} total XP</Text></View><View style={styles.levelTrack}><View style={[styles.levelFill, { width: `${xpInLevel}%`, backgroundColor: colors.accent }]} /></View></View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>This week</Text>
        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={styles.chartHeader}><View><Text style={[styles.chartTitle, { color: colors.foreground }]}>Consistency</Text><Text style={[styles.chartSubtitle, { color: colors.mutedForeground }]}>You showed up 5 days this week</Text></View><Text style={[styles.chartNumber, { color: colors.success }]}>+18%</Text></View><View style={styles.chart}>{days.map((item, index) => <View key={`${item.day}-${index}`} style={styles.barColumn}><View style={styles.barTrack}><View style={[styles.bar, { height: `${item.value * 100}%`, backgroundColor: index === 2 ? colors.primary : colors.secondary }]} /></View><Text style={[styles.day, { color: colors.mutedForeground }]}>{item.day}</Text></View>)}</View>
        <View style={styles.metrics}><View style={[styles.metric, { backgroundColor: colors.mint }]}><Ionicons name="flame-outline" size={19} color={colors.mintForeground} /><Text style={[styles.metricValue, { color: colors.foreground }]}>{streak}</Text><Text style={[styles.metricLabel, { color: colors.mintForeground }]}>day streak</Text></View><View style={[styles.metric, { backgroundColor: colors.peach }]}><Ionicons name="checkmark-done-outline" size={19} color={colors.peachForeground} /><Text style={[styles.metricValue, { color: colors.foreground }]}>{completeCount}</Text><Text style={[styles.metricLabel, { color: colors.peachForeground }]}>today complete</Text></View><View style={[styles.metric, { backgroundColor: colors.secondary }]}><Ionicons name="flag-outline" size={19} color={colors.secondaryForeground} /><Text style={[styles.metricValue, { color: colors.foreground }]}>{completedChallenges.length}</Text><Text style={[styles.metricLabel, { color: colors.secondaryForeground }]}>weekly wins</Text></View></View>
        <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 28 }]}>Recent badges</Text>
        <View style={[styles.badges, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={styles.badge}><View style={[styles.badgeIcon, { backgroundColor: colors.peach }]}><Ionicons name="flame" size={19} color={colors.peachForeground} /></View><Text style={[styles.badgeTitle, { color: colors.foreground }]}>First week</Text><Text style={[styles.badgeDetail, { color: colors.mutedForeground }]}>7 day streak</Text></View><View style={styles.badge}><View style={[styles.badgeIcon, { backgroundColor: colors.mint }]}><Ionicons name="flash" size={19} color={colors.mintForeground} /></View><Text style={[styles.badgeTitle, { color: colors.foreground }]}>Momentum</Text><Text style={[styles.badgeDetail, { color: colors.mutedForeground }]}>300 XP earned</Text></View><View style={styles.badge}><View style={[styles.badgeIcon, { backgroundColor: colors.secondary }]}><Ionicons name="sparkles-outline" size={19} color={colors.secondaryForeground} /></View><Text style={[styles.badgeTitle, { color: colors.foreground }]}>Starter</Text><Text style={[styles.badgeDetail, { color: colors.mutedForeground }]}>First steps</Text></View></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  title: { fontSize: 26, fontWeight: '700', letterSpacing: -0.7, marginTop: 7 },
  trophy: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  levelCard: { marginHorizontal: 20, marginTop: 22, borderRadius: 23, padding: 18 },
  levelTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelEyebrow: { color: '#FFFFFF', opacity: 0.72, fontSize: 10, fontWeight: '700', letterSpacing: 1.2 },
  levelTitle: { color: '#FFFFFF', fontSize: 27, fontWeight: '700', marginTop: 5 },
  levelIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  levelMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  levelMetaText: { color: '#FFFFFF', opacity: 0.76, fontSize: 11 },
  levelTrack: { height: 7, backgroundColor: 'rgba(255,255,255,0.24)', borderRadius: 4, overflow: 'hidden', marginTop: 8 },
  levelFill: { height: '100%', borderRadius: 4 },
  sectionTitle: { paddingHorizontal: 20, fontSize: 19, fontWeight: '700', letterSpacing: -0.3, marginTop: 27 },
  chartCard: { marginHorizontal: 20, marginTop: 13, borderRadius: 21, borderWidth: 1, padding: 16 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  chartTitle: { fontSize: 15, fontWeight: '700' },
  chartSubtitle: { fontSize: 11, marginTop: 4 },
  chartNumber: { fontSize: 14, fontWeight: '700' },
  chart: { height: 120, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 20, gap: 12 },
  barColumn: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 7 },
  barTrack: { height: 91, width: 13, borderRadius: 8, backgroundColor: '#F0EEF8', justifyContent: 'flex-end', overflow: 'hidden' },
  bar: { width: '100%', borderRadius: 8 },
  day: { fontSize: 10, fontWeight: '600' },
  metrics: { flexDirection: 'row', gap: 9, paddingHorizontal: 20, marginTop: 14 },
  metric: { flex: 1, borderRadius: 18, padding: 13, minHeight: 94 },
  metricValue: { fontSize: 23, fontWeight: '700', marginTop: 8 },
  metricLabel: { fontSize: 10, marginTop: 2 },
  badges: { marginHorizontal: 20, marginTop: 13, borderRadius: 21, borderWidth: 1, padding: 15, flexDirection: 'row', justifyContent: 'space-between' },
  badge: { alignItems: 'center', flex: 1 },
  badgeIcon: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  badgeTitle: { fontSize: 11, fontWeight: '700', marginTop: 8 },
  badgeDetail: { fontSize: 9, marginTop: 3 },
});