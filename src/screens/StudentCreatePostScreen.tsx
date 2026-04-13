import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

type Props = {
  onBack: () => void;
  onSubmit: () => void;
};

const assets = {
  author: require('../assets/forum/create-post/author.png'),
  divider: require('../assets/forum/create-post/divider.png'),
  quickActions: require('../assets/forum/create-post/quick-actions.png'),
  successCheck: require('../assets/forum/create-post/success_check.png'),
  successRing: require('../assets/forum/create-post/success_ring.png'),
  photos: [
    require('../assets/forum/create-post/photo_1.png'),
    require('../assets/forum/create-post/photo_2.png'),
    require('../assets/forum/create-post/photo_3.png'),
    require('../assets/forum/create-post/photo_4.png'),
    require('../assets/forum/create-post/photo_5.png'),
    require('../assets/forum/create-post/photo_6.png'),
  ],
};

export function StudentCreatePostScreen({ onBack, onSubmit }: Props) {
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { width } = useWindowDimensions();
  const cellWidth = Math.floor((width - 16 - 6) / 3);

  const handleSubmit = () => {
    setShowPhotoPicker(false);
    setShowSuccess(true);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.cancelButton}>
          <Text style={styles.headerActionText}>Hủy</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Tạo bài viết mới</Text>

        <Pressable
          hitSlop={8}
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>Đăng</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.authorRow}>
          <Image source={assets.author} style={styles.authorAvatar} />
          <Text style={styles.authorName}>Nguyễn Văn An</Text>
        </View>

        <View style={styles.textArea}>
          <Text style={styles.placeholder}>
            Hãy viết điều gì đó bạn đang nghĩ...
          </Text>
        </View>

        <Image source={assets.divider} style={styles.divider} />

        <View style={styles.quickActionsWrap}>
          <Image source={assets.quickActions} style={styles.quickActions} />
          <Pressable
            onPress={() => setShowPhotoPicker(current => !current)}
            style={[
              styles.photoActionPressable,
              showPhotoPicker ? styles.photoActionPressableActive : null,
            ]}
          />
        </View>

        <Image source={assets.divider} style={styles.divider} />

        <View style={styles.privacyRow}>
          <Text style={styles.privacyLabel}>Quyền riêng tư:</Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Công khai</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Bạn bè</Text>
          </View>
        </View>
      </View>

      {showPhotoPicker ? (
        <View pointerEvents="box-none" style={styles.photoPickerLayer}>
          <Pressable
            onPress={() => setShowPhotoPicker(false)}
            style={styles.photoPickerBackdrop}
          />

          <View style={styles.photoPickerPanel}>
            <View style={styles.photoPickerHandle} />
            <View style={styles.photoPickerHeader}>
              <Text style={styles.photoPickerTitle}>All Photos</Text>
              <Pressable
                hitSlop={8}
                onPress={() => setShowPhotoPicker(false)}
                style={styles.closePickerButton}
              >
                <Text style={styles.closePickerText}>Đóng</Text>
              </Pressable>
            </View>

            <View style={styles.photoGrid}>
              {assets.photos.map((item, index) => (
                <Image
                  key={`photo-${index}`}
                  source={item}
                  style={[
                    styles.photoCell,
                    { width: cellWidth, height: cellWidth },
                  ]}
                />
              ))}
            </View>
          </View>
        </View>
      ) : null}

      {showSuccess ? (
        <View style={styles.successOverlay}>
          <View style={styles.successIconWrap}>
            <Image source={assets.successRing} style={styles.successRing} />
            <Image source={assets.successCheck} style={styles.successCheck} />
          </View>

          <View style={styles.successContent}>
            <Text style={styles.successTitle}>Thành Công</Text>
            <Text style={styles.successMessage}>
              Chúc mừng bạn đã đăng bài thành công!{`\n`}Vui lòng chờ bài đăng
              được duyệt.
            </Text>

            <Pressable onPress={onSubmit} style={styles.successButton}>
              <Text style={styles.successButtonText}>Trở về diễn đàn</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ECECEC',
  },
  header: {
    height: 56,
    backgroundColor: '#63BAD5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    left: 20,
    top: 14,
  },
  headerActionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  submitButton: {
    position: 'absolute',
    right: 20,
    top: 14,
    width: 54,
    height: 25,
    borderRadius: 8,
    backgroundColor: '#357E9C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    color: '#1C1E21',
    fontSize: 15,
    fontWeight: '700',
  },
  textArea: {
    marginTop: 15,
    height: 240,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#707070',
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  placeholder: {
    color: '#858585',
    fontSize: 14,
    lineHeight: 18,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 38,
  },
  quickActions: {
    width: '100%',
    height: 65,
    resizeMode: 'contain',
  },
  quickActionsWrap: {
    marginTop: 10,
    position: 'relative',
  },
  photoActionPressable: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '20%',
    height: 65,
    borderRadius: 10,
  },
  photoActionPressableActive: {
    backgroundColor: 'rgba(99,186,213,0.22)',
  },
  privacyRow: {
    marginTop: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  privacyLabel: {
    color: '#000000',
    fontSize: 15,
  },
  pill: {
    minWidth: 82,
    height: 32,
    borderRadius: 17,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  pillText: {
    color: '#000000',
    fontSize: 15,
  },
  photoPickerLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  photoPickerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23, 30, 39, 0.2)',
  },
  photoPickerPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 308,
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 12,
    shadowColor: '#5D6A7A',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 12,
  },
  photoPickerHandle: {
    alignSelf: 'center',
    width: 42,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#B9C2CD',
    marginBottom: 8,
  },
  photoPickerHeader: {
    minHeight: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  photoPickerTitle: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  closePickerButton: {
    minWidth: 54,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D2D8E0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  closePickerText: {
    color: '#243346',
    fontSize: 13,
    fontWeight: '700',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 3,
    rowGap: 3,
  },
  photoCell: {
    borderRadius: 2,
    resizeMode: 'cover',
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  successIconWrap: {
    width: 98,
    height: 98,
    marginTop: 196,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successRing: {
    width: 98,
    height: 98,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  successCheck: {
    width: 24.65,
    height: 17.42,
  },
  successContent: {
    width: '100%',
    alignItems: 'center',
    marginTop: 52,
    paddingHorizontal: 20,
  },
  successTitle: {
    color: '#1E1E1E',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  successMessage: {
    marginTop: 28,
    color: '#989898',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  successButton: {
    marginTop: 42,
    width: 355,
    maxWidth: '100%',
    height: 56,
    borderRadius: 12,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.5,
  },
});
