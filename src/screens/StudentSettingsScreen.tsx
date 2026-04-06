import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  studentSettingsProfile,
  studentSettingsSections,
  studentTuitionCard,
} from '../mocks/studentSettings';
import type {SettingsListItem, SettingsSection} from '../models/settings';

type Props = {
  onBack: () => void;
  onOpenPersonalProfile: () => void;
  onOpenTuitionPayment: () => void;
  tuitionStatus: string;
};

export function StudentSettingsScreen({
  onBack,
  onOpenPersonalProfile,
  onOpenTuitionPayment,
  tuitionStatus,
}: Props) {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(
    studentSettingsSections
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
            <Text style={styles.avatarText}>ML</Text>
          </View>

          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{studentSettingsProfile.fullName}</Text>
            <Text style={styles.profileCode}>{studentSettingsProfile.studentCode}</Text>
            <View style={styles.classPill}>
              <Text style={styles.classPillText}>{studentSettingsProfile.className}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>HỌC PHÍ</Text>
        <View style={styles.tuitionCard}>
          <View style={styles.tuitionOrb} />
          <View style={styles.tuitionHeaderRow}>
            <View style={styles.tuitionContent}>
              <Text style={styles.tuitionMonth}>{studentTuitionCard.monthLabel}</Text>
              <Text style={styles.tuitionAmount}>{studentTuitionCard.amount}</Text>
              <Text style={styles.tuitionDeadline}>{studentTuitionCard.deadline}</Text>
            </View>

            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{tuitionStatus}</Text>
            </View>
          </View>

          <Pressable onPress={onOpenTuitionPayment} style={styles.qrButton}>
            <Text style={styles.qrIcon}>▦</Text>
            <Text style={styles.qrText}>Quét mã QR thanh toán</Text>
          </Pressable>
        </View>

        {studentSettingsSections.map(section => (
          <SettingsSectionCard
            isBiometricEnabled={isBiometricEnabled}
            key={section.id}
            onPressItem={item => {
              if (item.id === 'profile') {
                onOpenPersonalProfile();
              }
            }}
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
  onPressItem: (item: SettingsListItem) => void;
  onToggleBiometric: () => void;
  section: SettingsSection;
};

function SettingsSectionCard({
  isBiometricEnabled,
  onPressItem,
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
            onPress={() => onPressItem(item)}
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
  onPress: () => void;
  onToggleBiometric: () => void;
};

function SettingsRow({
  isBiometricEnabled,
  isLast,
  item,
  onPress,
  onToggleBiometric,
}: SettingsRowProps) {
  return (
    <Pressable
      onPress={item.type === 'arrow' ? onPress : undefined}
      style={[styles.settingRow, !isLast ? styles.rowDivider : null]}>
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
    left: 16,
    top: 10,
    bottom: 0,
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '400',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 32,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  profileBody: {
    flex: 1,
  },
  profileName: {
    color: '#222C3A',
    fontSize: 21,
    fontWeight: '900',
  },
  profileCode: {
    color: '#707A8D',
    fontSize: 14,
    marginTop: 4,
  },
  classPill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: '#DDF4FD',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 10,
  },
  classPillText: {
    color: '#5BB7D8',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionLabel: {
    color: '#6E778A',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },
  tuitionCard: {
    overflow: 'hidden',
    borderRadius: 24,
    backgroundColor: '#63BAD9',
    padding: 18,
    marginBottom: 24,
  },
  tuitionOrb: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255,255,255,0.12)',
    right: -24,
    top: -20,
  },
  tuitionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tuitionContent: {
    flex: 1,
    paddingRight: 10,
  },
  tuitionMonth: {
    color: '#EAF8FD',
    fontSize: 14,
    fontWeight: '500',
  },
  tuitionAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 6,
  },
  tuitionDeadline: {
    color: '#EAF8FD',
    fontSize: 13,
    marginTop: 6,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FFD845',
    marginRight: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  qrButton: {
    marginTop: 18,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrIcon: {
    color: '#60BADA',
    fontSize: 20,
    marginRight: 12,
  },
  qrText: {
    color: '#60BADA',
    fontSize: 15,
    fontWeight: '800',
  },
  settingsBlock: {
    marginBottom: 22,
  },
  sectionCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    shadowColor: '#D1D9E4',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 3,
  },
  settingRow: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
  },
  settingIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingIcon: {
    fontSize: 22,
    fontWeight: '700',
  },
  settingTitle: {
    flex: 1,
    color: '#212B39',
    fontSize: 16,
    fontWeight: '500',
    paddingRight: 12,
  },
  trailingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailingText: {
    color: '#768094',
    fontSize: 14,
    marginRight: 10,
  },
  chevron: {
    color: '#C2CAD5',
    fontSize: 24,
    lineHeight: 24,
  },
  switchTrack: {
    width: 60,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEE8',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#FF4343',
    fontSize: 16,
    fontWeight: '800',
  },
});
