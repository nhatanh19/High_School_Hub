import React, { useEffect, useMemo, useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { StudentBottomNav } from '../components/StudentBottomNav';

type Props = {
  onBack: () => void;
  onOpenChat: () => void;
  onOpenHome: () => void;
  onOpenProfile: () => void;
};

const assets = {
  arrowDown: require('../assets/classroom/student/icons/arrow_down.png'),
  avatarLeader: require('../assets/classroom/student/images/avatar_leader.png'),
  avatarSecretary: require('../assets/classroom/student/images/avatar_secretary.png'),
  avatarStudy: require('../assets/classroom/student/images/avatar_study.png'),
  back: require('../assets/classroom/student/icons/back.png'),
  search: require('../assets/classroom/student/icons/search.png'),
};

type Tone = 'pink' | 'blue';
type StatTone = 'neutral' | 'blue' | 'pink';

type ParentContact = {
  id: string;
  name: string;
  phone: string;
  relation: string;
};

type LeadershipMember = {
  accent: string;
  avatarKey: keyof Pick<
    typeof assets,
    'avatarLeader' | 'avatarSecretary' | 'avatarStudy'
  >;
  border: string;
  cardHeight: number;
  id: string;
  name: string;
  role: string;
  sex: string;
  contacts: ParentContact[];
};

type StudentMember = {
  id: string;
  initial: string;
  name: string;
  sex: string;
  tone: Tone;
  contacts: ParentContact[];
};

type TeacherMember = {
  id: string;
  initial: string;
  name: string;
  phone: string;
  tone: Tone;
};

type ClassroomMockData = {
  filters: {
    student: { count: number; label: string };
    teacher: { count: number; label: string };
  };
  headerTitle: string;
  leadership: LeadershipMember[];
  members: StudentMember[];
  sections: {
    leadership: { count: number; editLabel: string; title: string };
    members: { count: number; title: string };
    teachers: { count: number; title: string };
  };
  studentStats: { label: string; tone: StatTone; value: string }[];
  teachers: TeacherMember[];
};

type SearchResultItem = {
  id: string;
  name: string;
  phone?: string;
  subtitle: string;
  type: 'student' | 'teacher';
};

const classroomData = require('../mocks/studentClassroom.json') as ClassroomMockData;

export function StudentClassroomScreen({
  onBack,
  onOpenChat,
  onOpenHome,
  onOpenProfile,
}: Props) {
  const { width } = useWindowDimensions();
  const [activeFilter, setActiveFilter] = useState<'student' | 'teacher'>('student');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const avatarByKey = useMemo(
    () => ({
      avatarLeader: assets.avatarLeader,
      avatarSecretary: assets.avatarSecretary,
      avatarStudy: assets.avatarStudy,
    }),
    [],
  );

  const layout = useMemo(() => {
    const horizontal = Math.max(14, Math.min(24, width * 0.053));
    return {
      cardWidth: width - horizontal * 2,
      horizontal,
    };
  }, [width]);

  const leadership = useMemo(
    () =>
      classroomData.leadership.map(item => ({
        ...item,
        avatar: avatarByKey[item.avatarKey],
      })),
    [avatarByKey],
  );

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const allSearchItems = useMemo<SearchResultItem[]>(() => {
    const studentLeaders = classroomData.leadership.map(item => ({
      id: item.id,
      name: item.name,
      phone: item.contacts[0]?.phone,
      subtitle: `${item.id.toUpperCase()} • Học sinh`,
      type: 'student' as const,
    }));

    const studentMembers = classroomData.members.map(item => ({
      id: item.id,
      name: item.name,
      phone: item.contacts[0]?.phone,
      subtitle: `${item.id.toUpperCase()} • Học sinh`,
      type: 'student' as const,
    }));

    const teachers = classroomData.teachers.map(item => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      subtitle: `${item.id.toUpperCase()} • Giáo viên`,
      type: 'teacher' as const,
    }));

    return [...studentLeaders, ...studentMembers, ...teachers];
  }, []);

  const filteredSearchItems = useMemo(() => {
    const keyword = normalizeText(searchQuery.trim());
    if (!keyword) {
      return [];
    }

    return allSearchItems.filter(item => normalizeText(item.name).includes(keyword));
  }, [allSearchItems, searchQuery]);

  const isSearching = searchVisible && searchQuery.trim().length > 0;

  useEffect(() => {
    if (!feedbackMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setFeedbackMessage(null);
    }, 2200);

    return () => clearTimeout(timer);
  }, [feedbackMessage]);

  const showFeedback = (title: string, message: string) => {
    setFeedbackMessage(`${title}: ${message}`);
  };

  const toggleStudent = (studentId: string) => {
    setExpandedStudentId(current => (current === studentId ? null : studentId));
  };

  const handleCallParent = async (phone: string) => {
    const link = `tel:${phone}`;
    const canOpen = await Linking.canOpenURL(link);
    if (canOpen) {
      await Linking.openURL(link);
      return;
    }

    showFeedback('Không gọi được', `Thiết bị không hỗ trợ gọi tới ${phone}`);
  };

  const handleMessageParent = async (phone: string) => {
    const link = `sms:${phone}`;
    const canOpen = await Linking.canOpenURL(link);
    if (canOpen) {
      await Linking.openURL(link);
      return;
    }

    showFeedback('Không nhắn được', `Thiết bị không hỗ trợ nhắn tới ${phone}`);
  };

  const toggleSearch = () => {
    setSearchVisible(current => {
      if (current) {
        setSearchQuery('');
      }

      return !current;
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.headerButton}>
          <Image source={assets.back} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>{classroomData.headerTitle}</Text>
        <Pressable
          hitSlop={8}
          onPress={toggleSearch}
          style={styles.headerButton}
        >
          <Image source={assets.search} style={styles.searchIcon} />
        </Pressable>
      </View>

      {searchVisible ? (
        <View style={styles.searchWrap}>
          <TextInput
            onChangeText={setSearchQuery}
            placeholder="Tìm học sinh hoặc giáo viên"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={searchQuery}
          />
        </View>
      ) : null}

      {feedbackMessage ? (
        <View style={styles.feedbackBar}>
          <Text numberOfLines={1} style={styles.feedbackText}>
            {feedbackMessage}
          </Text>
        </View>
      ) : null}

      <ScrollView
        bounces={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: layout.horizontal },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {isSearching ? (
          <>
            <Text style={styles.sectionHint}>{`Kết quả (${filteredSearchItems.length})`}</Text>
            {filteredSearchItems.length ? (
              filteredSearchItems.map(item => (
                <View key={`search-${item.type}-${item.id}`} style={[styles.searchResultCard, { width: layout.cardWidth }]}>
                  <View style={styles.searchInfo}>
                    <Text numberOfLines={1} style={styles.nameText}>
                      {item.name}
                    </Text>
                    <Text style={styles.idText}>{item.subtitle}</Text>
                  </View>
                  {item.phone ? (
                    <View style={styles.parentActionsRow}>
                      <Pressable
                        onPress={async () => {
                          await handleCallParent(item.phone as string);
                        }}
                        style={styles.callMiniButton}
                      >
                        <Text style={styles.callMiniText}>Gọi</Text>
                      </Pressable>
                      <Pressable
                        onPress={async () => {
                          await handleMessageParent(item.phone as string);
                        }}
                        style={styles.messageMiniButton}
                      >
                        <Text style={styles.messageMiniText}>Nhắn</Text>
                      </Pressable>
                    </View>
                  ) : null}
                </View>
              ))
            ) : (
              <View style={[styles.emptySearch, { width: layout.cardWidth }]}>
                <Text style={styles.emptySearchText}>Không tìm thấy tên phù hợp</Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.filterWrap}>
          <Pressable
            onPress={() => setActiveFilter('student')}
            style={
              activeFilter === 'student'
                ? styles.filterLeftActivePill
                : styles.filterLeftInactiveZone
            }
          >
            <Text
              style={
                activeFilter === 'student'
                  ? styles.filterActiveText
                  : styles.filterInactiveText
              }
            >
              {`${classroomData.filters.student.label} (${classroomData.filters.student.count})`}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveFilter('teacher')}
            style={
              activeFilter === 'teacher'
                ? styles.filterRightActivePill
                : styles.filterRightInactiveZone
            }
          >
            <Text
              style={
                activeFilter === 'teacher'
                  ? styles.filterActiveText
                  : styles.filterInactiveText
              }
            >
              {`${classroomData.filters.teacher.label} (${classroomData.filters.teacher.count})`}
            </Text>
          </Pressable>
          </View>
        )}

        {!isSearching && activeFilter === 'student' ? (
          <>
            <View style={styles.statsRow}>
              {classroomData.studentStats.map(item => (
                <StatChip
                  key={`${item.label}-${item.value}`}
                  label={item.label}
                  tone={item.tone}
                  value={item.value}
                />
              ))}
            </View>

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeaderTitle}>
                {`${classroomData.sections.leadership.title} (${classroomData.sections.leadership.count})`}
              </Text>
              <Pressable
                hitSlop={6}
                onPress={() =>
                  showFeedback('Điều chỉnh ban cán sự', 'Đi tới màn chỉnh sửa ban cán sự lớp học.')
                }
              >
                <Text style={styles.editText}>{classroomData.sections.leadership.editLabel}</Text>
              </Pressable>
            </View>
            {leadership.map(item => (
              <View key={item.id}>
                <LeaderCard
                  cardWidth={layout.cardWidth}
                  expanded={expandedStudentId === item.id}
                  item={item}
                  onCall={handleCallParent}
                  onMessage={handleMessageParent}
                  onPress={() => toggleStudent(item.id)}
                />
                {expandedStudentId === item.id ? (
                  <ParentContactsBlock
                    cardWidth={layout.cardWidth}
                    contacts={item.contacts}
                    onCall={handleCallParent}
                    onMessage={handleMessageParent}
                  />
                ) : null}
              </View>
            ))}

            <Text style={styles.sectionHint}>
              {`${classroomData.sections.members.title} (${classroomData.sections.members.count})`}
            </Text>
            {classroomData.members.map(item => (
              <View key={item.id}>
                <MemberCard
                  cardWidth={layout.cardWidth}
                  expanded={expandedStudentId === item.id}
                  item={item}
                  onPress={() => toggleStudent(item.id)}
                />
                {expandedStudentId === item.id ? (
                  <ParentContactsBlock
                    cardWidth={layout.cardWidth}
                    contacts={item.contacts}
                    onCall={handleCallParent}
                    onMessage={handleMessageParent}
                  />
                ) : null}
              </View>
            ))}
          </>
        ) : !isSearching ? (
          <>
            <Text style={styles.sectionHintTeacher}>
              {`${classroomData.sections.teachers.title} (${classroomData.sections.teachers.count})`}
            </Text>
            {classroomData.teachers.map(item => (
              <TeacherCard
                cardWidth={layout.cardWidth}
                item={item}
                key={item.id}
                onCall={handleCallParent}
                onMessage={handleMessageParent}
                onPress={() =>
                  showFeedback('Chi tiết giáo viên', `${item.name} - ${item.phone}`)
                }
              />
            ))}
          </>
        ) : null}
      </ScrollView>

      <StudentBottomNav
        activeTab="class"
        onOpenChat={onOpenChat}
        onOpenClass={() => setActiveFilter('student')}
        onOpenHome={onOpenHome}
        onOpenProfile={onOpenProfile}
      />
    </View>
  );
}

function TeacherCard({
  cardWidth,
  item,
  onCall,
  onMessage,
  onPress,
}: {
  cardWidth: number;
  item: TeacherMember;
  onCall: (phone: string) => Promise<void>;
  onMessage: (phone: string) => Promise<void>;
  onPress: () => void;
}) {
  const handleCallPress = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    await onCall(item.phone);
  };

  const handleMessagePress = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    await onMessage(item.phone);
  };

  return (
    <Pressable onPress={onPress} style={[styles.teacherCard, { width: cardWidth }]}> 
      <View
        style={[
          styles.initialCircle,
          item.tone === 'pink' ? styles.initialCirclePink : styles.initialCircleBlue,
        ]}
      >
        <Text
          style={
            item.tone === 'pink' ? styles.initialTextPink : styles.initialTextBlue
          }
        >
          {item.initial}
        </Text>
      </View>

      <View style={styles.teacherInfo}>
        <Text numberOfLines={1} style={styles.nameText}>
          {item.name}
        </Text>
        <Text style={styles.teacherPhoneText}>{item.phone}</Text>
        <View style={styles.actionsMiniRow}>
          <Pressable onPress={handleCallPress} style={styles.callMiniButton}>
            <Text style={styles.callMiniText}>Gọi</Text>
          </Pressable>
          <Pressable onPress={handleMessagePress} style={styles.messageMiniButton}>
            <Text style={styles.messageMiniText}>Nhắn</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

function StatChip({
  label,
  tone,
  value,
}: {
  label: string;
  tone: StatTone;
  value: string;
}) {
  return (
    <View
      style={[
        styles.statChip,
        tone === 'neutral'
          ? styles.statChipNeutral
          : tone === 'blue'
            ? styles.statChipBlue
            : styles.statChipPink,
      ]}
    >
      <Text
        style={[
          styles.statChipLabel,
          tone === 'neutral'
            ? styles.statLabelNeutral
            : tone === 'blue'
              ? styles.statLabelBlue
              : styles.statLabelPink,
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.statChipValue,
          tone === 'neutral'
            ? styles.statValueNeutral
            : tone === 'blue'
              ? styles.statValueBlue
              : styles.statValuePink,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

function LeaderCard({
  cardWidth,
  expanded,
  item,
  onCall,
  onMessage,
  onPress,
}: {
  cardWidth: number;
  expanded: boolean;
  item: LeadershipMember & { avatar: number };
  onCall: (phone: string) => Promise<void>;
  onMessage: (phone: string) => Promise<void>;
  onPress: () => void;
}) {
  const primaryContact = item.contacts[0];

  const handleCallPress = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (!primaryContact) {
      return;
    }

    await onCall(primaryContact.phone);
  };

  const handleMessagePress = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (!primaryContact) {
      return;
    }

    await onMessage(primaryContact.phone);
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.leaderCard,
        expanded ? styles.leaderCardExpanded : null,
        {
          borderColor: item.border,
          height: item.cardHeight,
          width: cardWidth,
        },
      ]}
    >
      <View style={styles.avatarFrame}>
        <Image source={item.avatar} style={styles.avatarImage} />
      </View>

      <View style={styles.infoWrap}>
        <Text numberOfLines={1} style={styles.nameText}>
          {item.name}
        </Text>
        <Text style={styles.idText}>{item.id.toUpperCase()} • {item.sex}</Text>
        {expanded ? (
          <View style={styles.actionsMiniRow}>
            <Pressable onPress={handleCallPress} style={styles.callMiniButton}>
              <Text style={styles.callMiniText}>Gọi</Text>
            </Pressable>
            <Pressable onPress={handleMessagePress} style={styles.messageMiniButton}>
              <Text style={styles.messageMiniText}>Nhắn</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={[styles.roleBadge, { backgroundColor: item.accent }]}>
        <Text style={styles.roleBadgeText}>{item.role}</Text>
      </View>

      <Image
        source={assets.arrowDown}
        style={[styles.arrowIcon, expanded ? styles.arrowExpanded : null]}
      />
    </Pressable>
  );
}

function ParentContactsBlock({
  cardWidth,
  contacts,
  onCall,
  onMessage,
}: {
  cardWidth: number;
  contacts: ParentContact[];
  onCall: (phone: string) => Promise<void>;
  onMessage: (phone: string) => Promise<void>;
}) {
  const connectorHeight = contacts.length * 49 + 4;

  return (
    <View style={styles.parentBlockWrap}>
      <View style={[styles.guardianConnector, { height: connectorHeight }]}>
        <View style={[styles.guardianConnectorVertical, { height: connectorHeight }]} />
      </View>

      <View style={styles.parentCardsWrap}>
        {contacts.map(contact => (
          <ParentContactCard
            cardWidth={cardWidth - 60}
            contact={contact}
            key={contact.id}
            onCall={onCall}
            onMessage={onMessage}
          />
        ))}
      </View>
    </View>
  );
}

function ParentContactCard({
  cardWidth,
  contact,
  onCall,
  onMessage,
}: {
  cardWidth: number;
  contact: ParentContact;
  onCall: (phone: string) => Promise<void>;
  onMessage: (phone: string) => Promise<void>;
}) {
  return (
    <View style={[styles.guardianCard, { width: cardWidth }]}>
      <View style={styles.guardianInfo}>
        <Text numberOfLines={1} style={styles.guardianName}>
          {`${contact.relation}: ${contact.name}`}
        </Text>
        <Text style={styles.guardianPhone}>{contact.phone}</Text>
      </View>

      <View style={styles.parentActionsRow}>
        <Pressable
          onPress={async () => {
            await onCall(contact.phone);
          }}
          style={styles.callMiniButton}
        >
          <Text style={styles.callMiniText}>Gọi</Text>
        </Pressable>
        <Pressable
          onPress={async () => {
            await onMessage(contact.phone);
          }}
          style={styles.messageMiniButton}
        >
          <Text style={styles.messageMiniText}>Nhắn</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MemberCard({
  cardWidth,
  expanded,
  item,
  onPress,
}: {
  cardWidth: number;
  expanded: boolean;
  item: StudentMember;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.memberCard, { width: cardWidth }]}>
      <View
        style={[
          styles.initialCircle,
          item.tone === 'pink' ? styles.initialCirclePink : styles.initialCircleBlue,
        ]}
      >
        <Text
          style={
            item.tone === 'pink' ? styles.initialTextPink : styles.initialTextBlue
          }
        >
          {item.initial}
        </Text>
      </View>

      <View style={styles.memberInfo}>
        <Text numberOfLines={1} style={styles.nameText}>
          {item.name}
        </Text>
        <Text style={styles.idText}>{item.id.toUpperCase()} • {item.sex}</Text>
      </View>

      <Image
        source={assets.arrowDown}
        style={[styles.arrowIcon, expanded ? styles.arrowExpanded : null]}
      />
    </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 14,
    height: 25,
    resizeMode: 'contain',
  },
  searchIcon: {
    width: 21,
    height: 23,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 28,
  },
  searchWrap: {
    marginHorizontal: 14,
    marginTop: 8,
  },
  searchInput: {
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    backgroundColor: '#FFFFFF',
    color: '#111827',
    fontSize: 13,
    fontWeight: '500',
    paddingHorizontal: 12,
  },
  feedbackBar: {
    marginHorizontal: 14,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  feedbackText: {
    color: '#0C4A6E',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16,
  },
  scrollContent: {
    paddingTop: 13,
    paddingBottom: 120,
  },
  filterWrap: {
    height: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  filterLeftActivePill: {
    width: '49.2%',
    height: 37,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterRightActivePill: {
    width: '49.2%',
    height: 37,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterLeftInactiveZone: {
    width: '49.2%',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterRightInactiveZone: {
    width: '49.2%',
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterActiveText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  filterInactiveText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },
  statsRow: {
    marginTop: 12,
    flexDirection: 'row',
    columnGap: 8,
  },
  statChip: {
    height: 34,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  statChipNeutral: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statChipBlue: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  statChipPink: {
    backgroundColor: '#FDF2F8',
    borderWidth: 1,
    borderColor: '#FCE7F3',
  },
  statChipLabel: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
    marginRight: 6,
  },
  statChipValue: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  statLabelNeutral: { color: '#9CA3AF' },
  statLabelBlue: { color: '#60A5FA' },
  statLabelPink: { color: '#F472B6' },
  statValueNeutral: { color: '#374151' },
  statValueBlue: { color: '#2563EB' },
  statValuePink: { color: '#DB2777' },
  sectionHint: {
    marginTop: 16,
    marginLeft: 8,
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  sectionHeaderRow: {
    marginTop: 16,
    marginLeft: 8,
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  editText: {
    color: '#63BAD5',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  sectionHintTeacher: {
    marginTop: 14,
    marginLeft: 8,
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  searchResultCard: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInfo: {
    flex: 1,
    paddingRight: 8,
  },
  emptySearch: {
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptySearchText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
  leaderCard: {
    height: 73,
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  leaderCardExpanded: {
    backgroundColor: '#F3F4F6',
  },
  avatarFrame: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  avatarImage: {
    width: 44,
    height: 44,
    margin: 2,
    borderRadius: 999,
    resizeMode: 'cover',
  },
  infoWrap: {
    marginLeft: 12,
    flex: 1,
    paddingRight: 26,
  },
  actionsMiniRow: {
    marginTop: 6,
    flexDirection: 'row',
    columnGap: 8,
  },
  callMiniButton: {
    minWidth: 36,
    height: 19,
    borderRadius: 4,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  callMiniText: {
    color: '#16A34A',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  messageMiniButton: {
    minWidth: 46,
    height: 19,
    borderRadius: 4,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  messageMiniText: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  nameText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 24,
  },
  idText: {
    marginTop: -2,
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
  },
  roleBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 21.5,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  roleBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 13.5,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  arrowExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  memberCard: {
    height: 66,
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  initialCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialCirclePink: {
    backgroundColor: '#FDF2F8',
    borderColor: '#FCE7F3',
  },
  initialCircleBlue: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
  },
  initialTextPink: {
    color: '#DB2777',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  initialTextBlue: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  memberInfo: {
    marginLeft: 12,
    flex: 1,
    paddingRight: 26,
  },
  parentBlockWrap: {
    marginBottom: 6,
    position: 'relative',
  },
  guardianConnector: {
    position: 'absolute',
    left: 70,
    top: 0,
    width: 1,
  },
  guardianConnectorVertical: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(99, 186, 213, 0.26)',
  },
  parentCardsWrap: {
    marginTop: 8,
  },
  guardianCard: {
    alignSelf: 'flex-end',
    height: 43,
    marginTop: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  guardianInfo: {
    flex: 1,
    paddingRight: 8,
  },
  guardianName: {
    color: '#979797',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 20,
  },
  guardianPhone: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
    marginTop: -1,
  },
  parentActionsRow: {
    flexDirection: 'row',
    columnGap: 6,
  },
  teacherCard: {
    height: 86,
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  teacherInfo: {
    marginLeft: 12,
    flex: 1,
    paddingRight: 8,
  },
  teacherPhoneText: {
    marginTop: -2,
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
  },
});
