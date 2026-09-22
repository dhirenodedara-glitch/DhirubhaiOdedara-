import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useVibeUp } from '@/context/VibeUpContext';

const prompts = ['Help me plan today', 'Practise an interview', 'I feel stuck'];

export default function CoachScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { messages, sendMessage, coachStyle } = useVibeUp();
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const submit = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={[styles.screen, { backgroundColor: colors.background }]} behavior="padding" keyboardVerticalOffset={0}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 17, paddingBottom: 18 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.header}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR PERSONAL COACH</Text><Text style={[styles.title, { color: colors.foreground }]}>What&apos;s on your mind?</Text></View><View style={[styles.coachBadge, { backgroundColor: colors.secondary }]}><Ionicons name="sparkles" size={19} color={colors.primary} /></View></View>
        <View style={[styles.pill, { backgroundColor: colors.mint }]}><View style={[styles.onlineDot, { backgroundColor: colors.success }]} /><Text style={[styles.pillText, { color: colors.mintForeground }]}>Here for you · {coachStyle} coaching</Text></View>
        <View style={styles.promptRow}>{prompts.map((prompt) => <Pressable key={prompt} onPress={() => setText(prompt)} style={({ pressed }) => [styles.prompt, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.72 : 1 }]}><Text style={[styles.promptText, { color: colors.inkSoft }]}>{prompt}</Text></Pressable>)}</View>
        <View style={styles.messages}>
          {messages.map((message) => (
            <View key={message.id} style={[styles.messageRow, message.role === 'user' && styles.userRow]}>
              {message.role === 'coach' && <View style={[styles.miniAvatar, { backgroundColor: colors.primary }]}><Ionicons name="sparkles" size={13} color={colors.primaryForeground} /></View>}
              <View style={[styles.messageBubble, { backgroundColor: message.role === 'user' ? colors.primary : colors.card, borderColor: message.role === 'user' ? colors.primary : colors.border }]}><Text style={[styles.messageText, { color: message.role === 'user' ? colors.primaryForeground : colors.foreground }]}>{message.text}</Text></View>
            </View>
          ))}
        </View>
        <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>VibeUp shares general guidance, not medical, therapeutic, or financial advice.</Text>
      </ScrollView>
      <View style={[styles.composerWrap, { paddingBottom: Math.max(insets.bottom, 12), backgroundColor: colors.background }]}>
        <View style={[styles.composer, { backgroundColor: colors.card, borderColor: colors.border }]}><TextInput ref={inputRef} value={text} onChangeText={setText} onSubmitEditing={submit} returnKeyType="send" placeholder="Ask anything..." placeholderTextColor={colors.mutedForeground} style={[styles.input, { color: colors.foreground }]} /><Pressable testID="coach-send" onPress={submit} disabled={!text.trim()} style={({ pressed }) => [styles.send, { backgroundColor: text.trim() ? colors.primary : colors.muted, opacity: pressed ? 0.75 : 1 }]}><Ionicons name="arrow-up" size={18} color={text.trim() ? colors.primaryForeground : colors.mutedForeground} /></Pressable></View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  title: { fontSize: 27, fontWeight: '700', letterSpacing: -0.7, marginTop: 7 },
  coachBadge: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  pill: { alignSelf: 'flex-start', marginHorizontal: 20, marginTop: 16, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 7 },
  onlineDot: { width: 7, height: 7, borderRadius: 4 },
  pillText: { fontSize: 11, fontWeight: '600' },
  promptRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginTop: 22 },
  prompt: { borderRadius: 13, borderWidth: 1, paddingHorizontal: 11, paddingVertical: 9 },
  promptText: { fontSize: 11, fontWeight: '600' },
  messages: { paddingHorizontal: 20, marginTop: 26, gap: 16 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, maxWidth: '91%' },
  userRow: { alignSelf: 'flex-end' },
  miniAvatar: { width: 26, height: 26, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  messageBubble: { borderWidth: 1, borderRadius: 19, paddingHorizontal: 14, paddingVertical: 12, flexShrink: 1 },
  messageText: { fontSize: 14, lineHeight: 21 },
  disclaimer: { fontSize: 10, lineHeight: 15, textAlign: 'center', paddingHorizontal: 40, marginTop: 26 },
  composerWrap: { paddingHorizontal: 16, paddingTop: 10 },
  composer: { borderWidth: 1, borderRadius: 20, minHeight: 56, padding: 7, paddingLeft: 16, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 14, minHeight: 40 },
  send: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
});