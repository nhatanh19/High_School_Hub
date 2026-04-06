import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  teacherSettingsProfile,
  teacherSettingsSections,
  teacherTuitionCard,
} from '../mocks/teacherSettings';
import type {SettingsListItem, SettingsSection} from '../models/settings';

type Props = {
  onBack: () => void;
};

export function TeacherSettingsScreen({onBack}: Props) {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(
    teacherSettingsSections
      .flatMap(section => section.items)
      .find(item => item.id === 'faceid')?.value ?? false,
  );

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Cài đặt</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>VA</Text>
          </View>

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{teacherSettingsProfile.fullName}</Text>
            <Text style={styles.profileCode}>{teacherSettingsProfile.studentCode}</Text>
            <View style={styles.classPill}>
              <Text style={styles.classPillText}>{teacherSettingsProfile.className}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>HỌC PHÍ</Text>
        <View style={styles.tuitionCard}>
          <View style={styles.tuitionOrb} />
          <View style={styles.tuitionHeaderRow}>
            <View>
              <Text style={styles.tuitionMonth}>{teacherTuitionCard.monthLabel}</Text>
              <Text style={styles.tuitionAmount}>{teacherTuitionCard.amount}</Text>
              <Text style={styles.tuitionDeadline}>{teacherTuitionCard.deadline}</Text>
            </View>

            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{teacherTuitionCard.status}</Text>
            </View>
          </View>

          <Pressable style={styles.qrButton}>
            <Text style={styles.qrIcon}>▦</Text>
            <Text style={styles.qrText}>Quét mã QR thanh toán</Text>
          </Pressable>
        </View>

        {teacherSettingsSections.map(section => (
          <SettingsSectionCard
            isBiometricEnabled={isBiometricEnabled}
            key={section.id}
            onToggleBiometric={() => setIsBiometricEnabled(value => !value)}
            section={section}
          />
        ))}

        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

type SettingsSectionCardProps = {
  isBiometricEnabled: boolean;
  onToggleBiometric: () => void;
  section: SettingsSection;
};

function SettingsSectionCard({
  isBiometricEnabled,
  onToggleBiometric,
  section,
}: SettingsSectionCardProps) {
  return (
    <View style={styles.settingsBlock}>
      <Text style={styles.sectionLabel}>{section.title}</Text>
      <View style={styles.sectionCard}>
        {section.items.map((item, index) => (
          <SettingsRow
            isBiometricEnabled={isBiometricEnabled}
            isLast={index === section.items.length - 1}
            item={item}
            key={item.id}
            onToggleBiometric={onToggleBiometric}
          />
        ))}
      </View>
    </View>
  );
}

type SettingsRowProps = {
  isBiometricEnabled: boolean;
  isLast: boolean;
  item: SettingsListItem;
  onToggleBiometric: () => void;
};

function SettingsRow({
  isBiometricEnabled,
  isLast,
  item,
  onToggleBiometric,
}: SettingsRowProps) {
  return (
    <Pressable style={[styles.settingRow, !isLast ? styles.rowDivider : null]}>
      <View style={[styles.settingIconWrap, {backgroundColor: item.iconTint}]}>
        <Text style={[styles.settingIcon, {color: item.iconColor}]}>{item.icon}</Text>
      </View>

      <Text style={styles.settingTitle}>{item.title}</Text>

      {item.type === 'switch' ? (
        <Pressable hitSlop={8} onPress={onToggleBiometric} style={styles.switchTrack}>
          <View
            style={[
              styles.switchThumb,
              isBiometricEnabled ? styles.switchThumbActive : null,
            ]}
          />
        </Pressable>
      ) : (
        <View style={styles.trailingWrap}>
          {item.trailingText ? <Text style={styles.trailingText}>{item.trailingText}</Text> : null}
          <Text style={styles.chevron}>›</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 66,
    backgroundColor: '#69BFDE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 18,
    top: 10,
    bottom: 0,
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 44,
    lineHeight: 44,
    fontWeight: '400',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 42,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  profileBody: {
    flex: 1,
  },
  profileName: {
    color: '#222C3A',
    fontSize: 26,
    fontWeight: '900',
  },
  profileCode: {
    color: '#707A8D',
    fontSize: 16,
    marginTop: 6,
  },
  classPill: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: '#DDF4FD',
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 12,
  },
  classPillText: {
    color: '#5BB7D8',
    fontSize: 15,
    fontWeight: '800',
  },
  sectionLabel: {
    color: '#6E778A',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
  },
  tuitionCard: {
    overflow: 'hidden',
    borderRadius: 28,
    backgroundColor: '#63BAD9',
    padding: 22,
    marginBottom: 28,
  },
  tuitionOrb: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: 'rgba(255,255,255,0.12)',
    right: -24,
    top: -22,
  },
  tuitionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tuitionMonth: {
    color: '#EAF8FD',
    fontSize: 16,
    fontWeight: '500',
  },
  tuitionAmount: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 8,
  },
  tuitionDeadline: {
    color: '#EAF8FD',
    fontSize: 15,
    marginTop: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD845',
    marginRight: 10,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  qrButton: {
    marginTop: 24,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIcon: {
    color: '#60BADA',
    fontSize: 24,
    marginRight: 14,
  },
  qrText: {
    color: '#60BADA',
    fontSize: 17,
    fontWeight: '800',
  },
  settingsBlock: {
    marginBottom: 26,
  },
  sectionCard: {
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    shadowColor: '#D1D9E4',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 4,
  },
  settingRow: {
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
  },
  settingIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  settingIcon: {
    fontSize: 28,
    fontWeight: '700',
  },
  settingTitle: {
    flex: 1,
    color: '#212B39',
    fontSize: 18,
    fontWeight: '500',
    paddingRight: 12,
  },
  trailingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailingText: {
    color: '#768094',
    fontSize: 16,
    marginRight: 12,
  },
  chevron: {
    color: '#C2CAD5',
    fontSize: 28,
    lineHeight: 28,
  },
  switchTrack: {
    width: 68,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEE8',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  switchThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C8D0DB',
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
    backgroundColor: '#69BFDE',
    borderColor: '#69BFDE',
  },
  logoutButton: {
    height: 68,
    borderRadius: 20,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#FF4343',
    fontSize: 18,
    fontWeight: '800',
  },
});
