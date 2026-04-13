import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

type Props = {
  onBack: () => void;
  onOpenCreatePost: () => void;
};

const forumAssets = {
  avatars: {
    comment1: require('../assets/forum/avatars/comment_1.png'),
    comment2: require('../assets/forum/avatars/comment_2.png'),
    commentInput: require('../assets/forum/avatars/comment_input.png'),
    createUser: require('../assets/forum/avatars/create_user.png'),
    postAuthor1: require('../assets/forum/avatars/post_author_1.png'),
    postAuthor2: require('../assets/forum/avatars/post_author_2.png'),
  },
  icons: {
    back: require('../assets/forum/icons/back.png'),
    camera: require('../assets/forum/icons/camera.png'),
    comment: require('../assets/forum/icons/comment.png'),
    ellipsis: require('../assets/forum/icons/ellipsis.png'),
    gallery: require('../assets/forum/icons/gallery.png'),
    heart: require('../assets/forum/icons/heart.png'),
    smile: require('../assets/forum/icons/smile.png'),
  },
  images: {
    bottomLeft: require('../assets/forum/images/grid_bottom_left.png'),
    bottomMiddle: require('../assets/forum/images/grid_bottom_middle.png'),
    bottomRight: require('../assets/forum/images/grid_bottom_right.png'),
    topLeft: require('../assets/forum/images/grid_top_left.png'),
    topRight: require('../assets/forum/images/grid_top_right.png'),
  },
};

export function StudentForumScreen({ onBack, onOpenCreatePost }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 34;
  const cardInnerWidth = cardWidth - 32;
  const topImageWidth = (cardInnerWidth - 4) / 2;
  const bottomImageWidth = (cardInnerWidth - 8) / 3;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Image source={forumAssets.icons.back} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>Diễn đàn</Text>
      </View>

      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={onOpenCreatePost} style={styles.createPostSection}>
          <Image
            source={forumAssets.avatars.createUser}
            style={styles.createAvatar}
          />
          <View style={styles.postInputTrigger}>
            <Text style={styles.postInputPlaceholder}>
              Hôm nay bạn thế nào?
            </Text>
          </View>
          <Image
            source={forumAssets.icons.gallery}
            style={styles.galleryIcon}
          />
        </Pressable>

        <View style={[styles.postCardLarge, { width: cardWidth }]}>
          <View style={styles.postHeader}>
            <View style={styles.authorRow}>
              <Image
                source={forumAssets.avatars.postAuthor1}
                style={styles.authorAvatar}
              />
              <View>
                <Text style={styles.authorName}>Nguyễn Văn An</Text>
                <Text style={styles.authorTime}>17/2/2026, 19:33</Text>
              </View>
            </View>
            <Image
              source={forumAssets.icons.ellipsis}
              style={styles.ellipsisIcon}
            />
          </View>

          <Text style={styles.postText}>
            Chuyến tham quan Văn Miếu hôm nay thật ý nghĩa! Các em rất vui. 📸
          </Text>

          <View style={styles.mediaGrid}>
            <View style={styles.mediaTopRow}>
              <Image
                source={forumAssets.images.topLeft}
                style={[styles.mediaTopItem, { width: topImageWidth }]}
              />
              <Image
                source={forumAssets.images.topRight}
                style={[styles.mediaTopItem, { width: topImageWidth }]}
              />
            </View>
            <View style={styles.mediaBottomRow}>
              <Image
                source={forumAssets.images.bottomLeft}
                style={[styles.mediaBottomItem, { width: bottomImageWidth }]}
              />
              <Image
                source={forumAssets.images.bottomMiddle}
                style={[styles.mediaBottomItem, { width: bottomImageWidth }]}
              />
              <View>
                <Image
                  source={forumAssets.images.bottomRight}
                  style={[styles.mediaBottomItem, { width: bottomImageWidth }]}
                />
                <View style={styles.moreOverlay}>
                  <Text style={styles.moreOverlayText}>+2</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.actionBar}>
            <View style={styles.actionItem}>
              <Image
                source={forumAssets.icons.heart}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>45 lượt thích</Text>
            </View>
            <View style={styles.actionItem}>
              <Image
                source={forumAssets.icons.comment}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>12 bình luận</Text>
            </View>
          </View>

          <View style={styles.commentPreviewList}>
            <View style={styles.commentItem}>
              <Image
                source={forumAssets.avatars.comment1}
                style={styles.commentAvatar}
              />
              <View style={styles.commentBody}>
                <Text style={styles.commentAuthor}>Nguyễn Thị Mai</Text>
                <Text style={styles.commentText}>Tuyệt vời quá thầy!</Text>
                <Text style={styles.commentTime}>29/03/2026 - 16:36</Text>
              </View>
            </View>

            <View style={styles.commentItem}>
              <Image
                source={forumAssets.avatars.comment2}
                style={styles.commentAvatar}
              />
              <View style={styles.commentBody}>
                <Text style={styles.commentAuthor}>Trần Thị Mai</Text>
                <Text style={styles.commentText}>Vui quá thầy ơi!</Text>
                <Text style={styles.commentTime}>22/03/2026 - 16:37</Text>
              </View>
            </View>
          </View>

          <CommentInputRow avatar={forumAssets.avatars.commentInput} />
        </View>

        <View style={[styles.postCardSmall, { width: cardWidth }]}>
          <View style={styles.postHeader}>
            <View style={styles.authorRow}>
              <Image
                source={forumAssets.avatars.postAuthor2}
                style={styles.authorAvatar}
              />
              <View>
                <Text style={styles.authorName}>Lê Văn Bình (Lớp trưởng)</Text>
                <Text style={styles.authorTime}>Hôm qua, 20:15</Text>
              </View>
            </View>
            <Image
              source={forumAssets.icons.ellipsis}
              style={styles.ellipsisIcon}
            />
          </View>

          <Text style={styles.postTextSmall}>
            Thông báo: Lịch thi học kỳ môn Toán chuyển sang sáng thứ 6 nhé các
            bạn. Nhớ mang máy tính! 📐📏
          </Text>

          <View style={styles.actionBarSmall}>
            <View style={styles.actionItem}>
              <Image
                source={forumAssets.icons.heart}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>15 lượt thích</Text>
            </View>
            <View style={styles.actionItem}>
              <Image
                source={forumAssets.icons.comment}
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>0 bình luận</Text>
            </View>
          </View>

          <CommentInputRow avatar={forumAssets.avatars.commentInput} />
        </View>
      </ScrollView>
    </View>
  );
}

function CommentInputRow({ avatar }: { avatar: number }) {
  return (
    <View style={styles.commentInputArea}>
      <Image source={avatar} style={styles.commentInputAvatar} />
      <View style={styles.commentInputWrapper}>
        <Text style={styles.commentPlaceholder}>Viết bình luận...</Text>
        <View style={styles.commentActions}>
          <Image
            source={forumAssets.icons.smile}
            style={styles.commentActionIcon}
          />
          <Image
            source={forumAssets.icons.camera}
            style={styles.commentActionIcon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 16,
  },
  backIcon: {
    width: 9,
    height: 17,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    backgroundColor: '#F4F4F4',
    paddingBottom: 30,
  },
  createPostSection: {
    width: '100%',
    height: 72,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  createAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postInputTrigger: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  postInputPlaceholder: {
    color: '#65676B',
    fontSize: 14,
    lineHeight: 17,
  },
  galleryIcon: {
    width: 22.5,
    height: 17.5,
    marginLeft: 12,
  },
  postCardLarge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 12,
    marginHorizontal: 17,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  postHeader: {
    minHeight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    color: '#1C1E21',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  authorTime: {
    marginTop: 2,
    color: '#65676B',
    fontSize: 13,
    lineHeight: 16,
  },
  ellipsisIcon: {
    width: 15.19,
    height: 3.94,
    marginTop: 8,
  },
  postText: {
    marginTop: 13,
    color: '#1C1E21',
    fontSize: 15,
    lineHeight: 22.5,
  },
  mediaGrid: {
    marginTop: 11,
  },
  mediaTopRow: {
    flexDirection: 'row',
    columnGap: 4,
  },
  mediaTopItem: {
    height: 160,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  mediaBottomRow: {
    marginTop: 3,
    flexDirection: 'row',
    columnGap: 4,
  },
  mediaBottomItem: {
    height: 110,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  moreOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 110,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreOverlayText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 40,
  },
  actionBar: {
    height: 31.5,
    marginTop: 11,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F2F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 18,
    height: 15.75,
    marginRight: 6,
  },
  actionText: {
    color: '#65676B',
    fontSize: 14,
    lineHeight: 17,
  },
  commentPreviewList: {
    marginTop: 10,
    gap: 12,
  },
  commentItem: {
    flexDirection: 'row',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  commentBody: {
    flex: 1,
  },
  commentAuthor: {
    color: '#1C1E21',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17,
  },
  commentText: {
    marginTop: 2,
    color: '#1C1E21',
    fontSize: 14,
    lineHeight: 19.6,
  },
  commentTime: {
    marginTop: 4,
    color: '#65676B',
    fontSize: 12,
    lineHeight: 15,
  },
  commentInputArea: {
    height: 38.5,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentInputWrapper: {
    flex: 1,
    height: 38.5,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  commentPlaceholder: {
    color: '#757575',
    fontSize: 14,
    lineHeight: 18.5,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentActionIcon: {
    width: 16,
    height: 16,
  },
  postCardSmall: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 12,
    marginHorizontal: 17,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  postTextSmall: {
    marginTop: 13,
    color: '#1C1E21',
    fontSize: 15,
    lineHeight: 22.5,
  },
  actionBarSmall: {
    height: 31.5,
    marginTop: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F2F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
