import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import type {StudentProfileDetails} from '../models/profile';

type Props = {
  data: StudentProfileDetails;
  onBack: () => void;
  onChange: (field: keyof StudentProfileDetails, value: string) => void;
  onSave: () => void;
};

export function StudentEditProfileScreen({data, onBack, onChange, onSave}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.sideButton}>
          <Text style={styles.sideButtonText}>Hủy</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Chỉnh sửa hồ sơ</Text>
        <Pressable hitSlop={8} onPress={onSave} style={[styles.sideButton, styles.sideButtonRight]}>
          <Text style={styles.sideButtonText}>Lưu</Text>
        </Pressable>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.avatarBlock}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>VA</Text>
            </View>
            <Pressable style={styles.cameraBadge}>
              <Text style={styles.cameraIcon}>⌘</Text>
            </Pressable>
          </View>
          <Text style={styles.changePhotoText}>Chạm để đổi ảnh</Text>
        </View>

        <EditSection title="THÔNG TIN HỌC SINH" titleMuted>
          <LockedField label="Trường" value={data.schoolName} />
          <LockedField label="Lớp" value={data.className} />
          <LockedField label="Giáo viên chủ nhiệm" value={data.homeroomTeacher} />
          <LockedField label="Chức vụ" value={data.roleLabel} isLast />
        </EditSection>

        <EditSection title="THÔNG TIN CÁ NHÂN" titleAccent>
          <EditableField
            label="Họ và tên"
            onChangeText={value => onChange('fullName', value)}
            value={data.fullName}
          />
          <EditableField
            label="Ngày sinh"
            onChangeText={value => onChange('birthDate', value)}
            value={data.birthDate}
          />
          <EditableField
            isLast
            label="Địa chỉ hiện tại"
            onChangeText={value => onChange('address', value)}
            value={data.address}
          />
        </EditSection>

        <EditSection title="LIÊN HỆ" titleAccent>
          <LockedField label="Email trường (Cố định)" value={data.email} />
          <EditableField
            isLast
            label="Số điện thoại cá nhân"
            onChangeText={value => onChange('phoneNumber', value)}
            value={data.phoneNumber}
          />
        </EditSection>
      </ScrollView>
    </View>
  );
}

type EditSectionProps = {
  children: React.ReactNode;
  title: string;
  titleAccent?: boolean;
  titleMuted?: boolean;
};

function EditSection({children, title, titleAccent = false, titleMuted = false}: EditSectionProps) {
  return (
    <View style={styles.sectionBlock}>
      <View style={styles.sectionTitleRow}>
        <Text
          style={[
            styles.sectionTitle,
            titleAccent ? styles.sectionTitleAccent : null,
            titleMuted ? styles.sectionTitleMuted : null,
          ]}>
          {title}
        </Text>
        {titleMuted ? <Text style={styles.sectionLock}>⌂</Text> : null}
      </View>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

type LockedFieldProps = {
  isLast?: boolean;
  label: string;
  value: string;
};

function LockedField({isLast = false, label, value}: LockedFieldProps) {
  return (
    <View style={[styles.fieldRow, !isLast ? styles.fieldDivider : null]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.lockedInput}>
        <Text numberOfLines={1} style={styles.lockedInputValue}>
          {value}
        </Text>
        <Text style={styles.lockedInputIcon}>⌂</Text>
      </View>
    </View>
  );
}

type EditableFieldProps = {
  isLast?: boolean;
  label: string;
  onChangeText: (value: string) => void;
  value: string;
};

function EditableField({isLast = false, label, onChangeText, value}: EditableFieldProps) {
  return (
    <View style={[styles.fieldRow, !isLast ? styles.fieldDivider : null]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput onChangeText={onChangeText} style={styles.editableInput} value={value} />
    </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  sideButton: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  sideButtonRight: {
    left: undefined,
    right: 16,
  },
  sideButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 28,
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 146,
    height: 146,
    borderRadius: 73,
    backgroundColor: '#1E1E1E',
    borderWidth: 5,
    borderColor: '#F2F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
  },
  cameraBadge: {
    position: 'absolute',
    right: -2,
    bottom: 14,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#69BFDE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cameraIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  changePhotoText: {
    color: '#5FB8DA',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 16,
  },
  sectionBlock: {
    marginBottom: 22,
    paddingHorizontal: 18,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
  },
  sectionTitleMuted: {
    color: '#6F778A',
  },
  sectionTitleAccent: {
    color: '#61BADB',
  },
  sectionLock: {
    color: '#A1A9B8',
    fontSize: 16,
  },
  sectionCard: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#D7DFEA',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  fieldRow: {
    paddingVertical: 14,
  },
  fieldDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F5',
  },
  fieldLabel: {
    color: '#6F778A',
    fontSize: 14,
    marginBottom: 8,
  },
  lockedInput: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: '#F4F6FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  lockedInputValue: {
    color: '#687286',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    paddingRight: 10,
  },
  lockedInputIcon: {
    color: '#A3ADBC',
    fontSize: 16,
  },
  editableInput: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D5DDE8',
    paddingHorizontal: 16,
    color: '#273142',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: '#FFFFFF',
  },
});
