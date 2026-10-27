/**
 * components/ConfirmDialog.js — modal confirmation with themed actions.
 * Used before destructive actions such as signing out.
 */

import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './Text';
import { Button } from './Button';
import { useTheme } from '../theme/ThemeProvider';

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'primary',
  icon = 'help-circle',
  onConfirm,
  onCancel,
}) {
  const theme = useTheme();
  const { colors } = theme;
  const toneColor = tone === 'danger' ? colors.danger : colors.primary;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={[styles.card, { backgroundColor: colors.surface }]} onPress={() => {}}>
          <View style={[styles.iconWrap, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name={icon} size={26} color={toneColor} />
          </View>
          <Text variant="headlineSm" color={colors.textHeading} style={styles.title}>
            {title}
          </Text>
          {message ? (
            <Text variant="bodySm" color={colors.textBody} style={styles.message}>
              {message}
            </Text>
          ) : null}
          <View style={styles.actions}>
            <Button
              label={cancelLabel}
              variant="outline"
              style={styles.action}
              onPress={onCancel}
            />
            <Button
              label={confirmLabel}
              variant={tone === 'danger' ? 'danger' : 'primary'}
              style={styles.action}
              onPress={onConfirm}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { textAlign: 'center' },
  message: { textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8, width: '100%' },
  action: { flex: 1 },
});

export default ConfirmDialog;
