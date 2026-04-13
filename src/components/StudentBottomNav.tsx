import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onOpenProfile: () => void;
};

const assets = {
  chat: require('../assets/dashboard/student/icons/chat.png'),
  class: require('../assets/dashboard/student/icons/nav/class.png'),
  home: require('../assets/dashboard/student/icons/nav/home.png'),
  profile: require('../assets/dashboard/student/icons/nav/profile.png'),
  scan: require('../assets/dashboard/student/icons/scan.png'),
};

export function StudentBottomNav({ onOpenProfile }: Props) {
  return (
    <View style={styles.bottomNav}>
      <View style={styles.navRow}>
        <NavItem active iconImage={assets.home} label="Trang chủ" />
        <NavItem iconImage={assets.class} label="Lớp học" />

        <View style={styles.centerSpacer} />

        <NavItem iconImage={assets.chat} label="Trò chuyện" />
        <NavItem
          iconImage={assets.profile}
          label="Cá nhân"
          onPress={onOpenProfile}
        />
      </View>

      <View pointerEvents="box-none" style={styles.centerNavWrap}>
        <View pointerEvents="none" style={styles.centerButton}>
          <Image source={assets.scan} style={styles.centerButtonIcon} />
        </View>
      </View>
    </View>
  );
}

function NavItem({
  active = false,
  iconImage,
  label,
  onPress,
}: {
  active?: boolean;
  iconImage?: number;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      {iconImage ? (
        <Image source={iconImage} style={styles.navIconImage} />
      ) : null}
      <Text style={[styles.navLabel, active ? styles.navActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70.8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 6,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '100%',
    paddingTop: 11,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    height: 47,
    alignItems: 'center',
  },
  centerSpacer: {
    width: 74,
    height: 1,
  },
  navIconImage: {
    width: 25,
    height: 28,
  },
  navLabel: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 15,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  navActive: {
    color: '#63BAD5',
    fontWeight: '700',
  },
  centerNavWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    height: 52,
    alignItems: 'center',
  },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#63BAD5',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonIcon: { width: 24, height: 24 },
});
