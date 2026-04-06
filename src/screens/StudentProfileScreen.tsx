import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {StudentProfileDetails} from '../models/profile';

type Props = {
  data: StudentProfileDetails;
  onBack: () => void;
  onOpenEdit: () => void;
};

export function StudentProfileScreen({data, onBack, onOpenEdit}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Hồ sơ cá nhân</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cardShell}>
          <View style={styles.heroCard}>
            <View style={styles.heroOrbLarge} />
            <View style={styles.heroOrbSmall} />

            <View style={styles.heroHeader}>
              <Text style={styles.schoolName}>{data.schoolName}</Text>
              <View style={styles.rolePill}>
                <Text style={styles.rolePillText}>HỌC SINH</Text>
              </View>
            </View>

            <View style={styles.profileHeroRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>ML</Text>
              </View>

              <View style={styles.heroBody}>
                <Text style={styles.heroName}>{data.displayName}</Text>
                <Text style={styles.heroSubtitle}>
                  Lớp: {data.className} • {data.schoolYears}
                </Text>
                <View style={styles.codePill}>
                  <Text style={styles.codePillText}>MSHS: {data.studentCode}</Text>
                </View>
              </View>
            </View>

            <View style={styles.heroDivider} />

            <View style={styles.heroFooter}>
              <View>
                <Text style={styles.heroFooterText}>Ngày sinh: {data.birthDate}</Text>
                <Text style={styles.heroFooterText}>Hiệu lực đến: {data.validUntil}</Text>
              </View>
              <View style={styles.qrBox}>
                <Text style={styles.qrText}>QR</Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable onPress={onOpenEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
        </Pressable>

        <ProfileSection
          rows={[
            {label: 'Họ và tên', value: data.fullName},
            {label: 'Ngày sinh', value: data.birthDate},
            {label: 'Giới tính', value: data.gender},
            {label: 'Địa chỉ', value: data.address},
          ]}
          title="THÔNG TIN CƠ BẢN"
        />

        <ProfileSection
          rows={[
            {label: 'Số điện thoại', value: data.phoneNumber},
            {label: 'Email', value: data.email},
          ]}
          title="LIÊN HỆ"
        />

        <ProfileSection
          rows={[
            {label: 'Họ tên Bố', value: data.fatherName},
            {label: 'SĐT liên hệ', value: data.fatherPhone, valueAccent: true},
            {label: 'Họ tên Mẹ', value: data.motherName},
            {label: 'SĐT liên hệ', value: data.motherPhone, valueAccent: true},
          ]}
          title="NGƯỜI GIÁM HỘ / PHỤ HUYNH"
        />
      </ScrollView>
    </View>
  );
}

type ProfileSectionProps = {
  rows: Array<{label: string; value: string; valueAccent?: boolean}>;
  title: string;
};

function ProfileSection({rows, title}: ProfileSectionProps) {
  return (
    <View style={styles.sectionBlock}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>
        {rows.map((row, index) => (
          <View key={`${title}-${row.label}-${index}`} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{row.label}</Text>
            <Text style={[styles.infoValue, row.valueAccent ? styles.infoValueAccent : null]}>
              {row.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7FB',
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
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 30,
  },
  cardShell: {
    marginHorizontal: 18,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 12,
    shadowColor: '#D6DEEA',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 4,
  },
  heroCard: {
    borderRadius: 24,
    backgroundColor: '#4C93F0',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,
    overflow: 'hidden',
  },
  heroOrbLarge: {
    position: 'absolute',
    width: 176,
    height: 176,
    borderRadius: 88,
    right: -22,
    top: -26,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  heroOrbSmall: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    left: -28,
    bottom: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  schoolName: {
    color: '#DFF1FD',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    flex: 1,
  },
  rolePill: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rolePillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  profileHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  heroBody: {
    flex: 1,
  },
  heroName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  heroSubtitle: {
    color: '#E9F7FF',
    fontSize: 12,
    marginTop: 6,
  },
  codePill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  codePillText: {
    color: '#FFFFFF',
    fontSize: 13,
    letterSpacing: 1,
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.28)',
    marginTop: 14,
    marginBottom: 14,
  },
  heroFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  heroFooterText: {
    color: '#E9F7FF',
    fontSize: 12,
    marginTop: 4,
  },
  qrBox: {
    width: 54,
    height: 54,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrText: {
    color: '#0E1724',
    fontSize: 16,
    fontWeight: '900',
  },
  editButton: {
    marginHorizontal: 18,
    marginTop: 16,
    marginBottom: 2,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#69BFDE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#97D8EA',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.24,
    shadowRadius: 14,
    elevation: 4,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  sectionBlock: {
    marginTop: 20,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    color: '#6E778A',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
  },
  sectionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#D6DEEA',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  infoRow: {
    minHeight: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  infoLabel: {
    color: '#757F92',
    fontSize: 15,
    flex: 1,
  },
  infoValue: {
    color: '#273142',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
    flex: 1,
  },
  infoValueAccent: {
    color: '#69BFDE',
  },
});
