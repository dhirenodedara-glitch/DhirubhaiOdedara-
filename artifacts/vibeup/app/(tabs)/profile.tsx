import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useVibeUp } from '@/context/VibeUpContext';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { displayName, goal, lifestyle, notificationsEnabled, setNotificationsEnabled, clearProgress } = useVibeUp();
  const goalLabel = goal === 'confidence' ? 'Confidence' : goal === 'career' ? 'Career growth' : goal === 'fitness' ? 'Healthier habits' : goal === 'relationships' ? 'Connections' : 'Productivity';

  const reset = () => Alert.alert('Reset progress?', 'Your onboarding preferences will stay, but your XP, habits, and challenge progress will reset.', [{ text: 'Keep progress', style: 'cancel' }, { text: 'Reset', style: 'destructive', onPress: clearProgress }]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 17, paddingBottom: insets.bottom + 104 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR SPACE</Text><Text style={[styles.title, { color: colors.foreground }]}>Profile</Text></View><Pressable onPress={() => router.push('/')} style={({ pressed }) => [styles.editButton, { backgroundColor: colors.secondary, opacity: pressed ? 0.75 : 1 }]}><Ionicons name="options-outline" size={18} color={colors.secondaryForeground} /></Pressable></View>
        <View style={[styles.profileCard, { backgroundColor: colors.primary }]}><View style={styles.profileAvatar}><Text style={[styles.profileAvatarText, { color: colors.primary }]}>{displayName.charAt(0).toUpperCase()}</Text></View><Text style={styles.profileName}>{displayName}</Text><Text style={styles.profileSub}>Building a life that feels like yours</Text><View style={styles.profilePills}><View style={styles.profilePill}><Ionicons name="sparkles-outline" size={13} color={colors.primary} /><Text style={[styles.profilePillText, { color: colors.primary }]}>Level 4</Text></View><View style={styles.profilePill}><Ionicons name="leaf-outline" size={13} color={colors.primary} /><Text style={[styles.profilePillText, { color: colors.primary }]}>7 day streak</Text></View></View></View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your setup</Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingRow}><View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}><Ionicons name="locate-outline" size={18} color={colors.primary} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>Main focus</Text><Text style={[styles.settingDetail, { color: colors.mutedForeground }]}>{goalLabel}</Text></View><Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} /></View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.settingRow}><View style={[styles.settingIcon, { backgroundColor: colors.peach }]}><Ionicons name="speedometer-outline" size={18} color={colors.peachForeground} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>Current pace</Text><Text style={[styles.settingDetail, { color: colors.mutedForeground }]}>{lifestyle}</Text></View><Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} /></View>
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Preferences</Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingRow}><View style={[styles.settingIcon, { backgroundColor: colors.mint }]}><Ionicons name="notifications-outline" size={18} color={colors.mintForeground} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>Helpful reminders</Text><Text style={[styles.settingDetail, { color: colors.mutedForeground }]}>Daily goals and weekly reflections</Text></View><Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: colors.muted, true: colors.primary }} thumbColor={colors.primaryForeground} /></View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Pressable onPress={() => Alert.alert('Privacy first', 'Your progress is stored on this device in this first version. You control reminders, and you can reset your data below.')} style={({ pressed }) => [styles.settingRow, { opacity: pressed ? 0.72 : 1 }]}><View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}><Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>Privacy controls</Text><Text style={[styles.settingDetail, { color: colors.mutedForeground }]}>Your data, your choices</Text></View><Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} /></Pressable>
        </View>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Data & account</Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Pressable onPress={() => Alert.alert('Export ready', 'Your VibeUp export will include your preferences, habits, and progress history.')} style={({ pressed }) => [styles.settingRow, { opacity: pressed ? 0.72 : 1 }]}><View style={[styles.settingIcon, { backgroundColor: colors.muted }]}><Ionicons name="download-outline" size={18} color={colors.primary} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>Export my data</Text><Text style={[styles.settingDetail, { color: colors.mutedForeground }]}>Take a copy of your progress</Text></View><Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} /></Pressable>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Pressable onPress={reset} style={({ pressed }) => [styles.settingRow, { opacity: pressed ? 0.72 : 1 }]}><View style={[styles.settingIcon, { backgroundColor: colors.peach }]}><Ionicons name="refresh-outline" size={18} color={colors.peachForeground} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>Reset progress</Text><Text style={[styles.settingDetail, { color: colors.mutedForeground }]}>Start fresh without losing setup</Text></View><Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} /></Pressable>
        </View>
        <Text style={[styles.footer, { color: colors.mutedForeground }]}>VibeUp is a supportive coach, not a therapist, doctor, or financial adviser.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.7, marginTop: 7 },
  editButton: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  profileCard: { marginHorizontal: 20, marginTop: 22, borderRadius: 24, padding: 20, alignItems: 'center' },
  profileAvatar: { width: 58, height: 58, borderRadius: 21, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontSize: 23, fontWeight: '700' },
  profileName: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 11 },
  profileSub: { color: '#FFFFFF', opacity: 0.75, fontSize: 12, marginTop: 4 },
  profilePills: { flexDirection: 'row', gap: 8, marginTop: 17 },
  profilePill: { backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 7, flexDirection: 'row', alignItems: 'center', gap: 5 },
  profilePillText: { fontSize: 10, fontWeight: '700' },
  sectionTitle: { paddingHorizontal: 20, fontSize: 17, fontWeight: '700', marginTop: 26, marginBottom: 11 },
  settingsCard: { marginHorizontal: 20, borderRadius: 21, borderWidth: 1, paddingHorizontal: 14 },
  settingRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 11 },
  settingIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  settingCopy: { flex: 1 },
  settingTitle: { fontSize: 13, fontWeight: '700' },
  settingDetail: { fontSize: 11, marginTop: 3 },
  divider: { height: 1 },
  footer: { textAlign: 'center', fontSize: 10, lineHeight: 15, paddingHorizontal: 50, marginTop: 24 },
});