import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT_DEFAULT_CREDENTIALS } from './src/mocks/auth';
import { defaultLeaveRequestDraft } from './src/mocks/leaveRequest';
import { roleOptions } from './src/mocks/roleOptions';
import { defaultStudentProfileDetails } from './src/mocks/studentProfile';
import { studentTuitionCard } from './src/mocks/studentSettings';
import type { LeaveReasonKey, LeaveRequestDraft } from './src/models/leave';
import type { RoleKey, ScreenKey } from './src/models/navigation';
import type { StudentProfileDetails } from './src/models/profile';
import { LoginScreen } from './src/screens/LoginScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { StudentAllFeaturesScreen } from './src/screens/StudentAllFeaturesScreen';
import { StudentAttendanceScreen } from './src/screens/StudentAttendanceScreen';
import { StudentChatConversationScreen } from './src/screens/StudentChatConversationScreen';
import { StudentChatScreen } from './src/screens/StudentChatScreen';
import { StudentClassroomScreen } from './src/screens/StudentClassroomScreen';
import { StudentCreatePostScreen } from './src/screens/StudentCreatePostScreen';
import { StudentDashboardScreen } from './src/screens/StudentDashboardScreen';
import { StudentEditProfileScreen } from './src/screens/StudentEditProfileScreen';
import { StudentExamScheduleScreen } from './src/screens/StudentExamScheduleScreen';
import { StudentForumScreen } from './src/screens/StudentForumScreen';
import { StudentHomeworkScreen } from './src/screens/StudentHomeworkScreen';
import { StudentLeaveRequestPreviewScreen } from './src/screens/StudentLeaveRequestPreviewScreen';
import { StudentLeaveRequestScreen } from './src/screens/StudentLeaveRequestScreen';
import { StudentNewChatScreen } from './src/screens/StudentNewChatScreen';
import { StudentNotificationsScreen } from './src/screens/StudentNotificationsScreen';
import { StudentProfileScreen } from './src/screens/StudentProfileScreen';
import { StudentQuizAiAnalysisScreen } from './src/screens/StudentQuizAiAnalysisScreen';
import { StudentQuizAnswerReviewScreen } from './src/screens/StudentQuizAnswerReviewScreen';
import { StudentQuizQuestionScreen } from './src/screens/StudentQuizQuestionScreen';
import { StudentQuizResultScreen } from './src/screens/StudentQuizResultScreen';
import { StudentScoreBookScreen } from './src/screens/StudentScoreBookScreen';
import { StudentScheduleScreen } from './src/screens/StudentScheduleScreen';
import { StudentSearchScreen } from './src/screens/StudentSearchScreen';
import { StudentSettingsScreen } from './src/screens/StudentSettingsScreen';
import { StudentTuitionPaymentScreen } from './src/screens/StudentTuitionPaymentScreen';
import { TeacherApprovalScreen } from './src/screens/TeacherApprovalScreen';
import { TeacherAttendanceManagementScreen } from './src/screens/TeacherAttendanceManagementScreen';
import { TeacherDashboardScreen } from './src/screens/TeacherDashboardScreen';
import { TeacherNotificationsScreen } from './src/screens/TeacherNotificationsScreen';
import { TeacherReportScreen } from './src/screens/TeacherReportScreen';
import { TeacherScheduleScreen } from './src/screens/TeacherScheduleScreen';
import { TeacherScoreScreen } from './src/screens/TeacherScoreScreen';
import { TeacherSearchScreen } from './src/screens/TeacherSearchScreen';
import { TeacherSettingsScreen } from './src/screens/TeacherSettingsScreen';

function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('splash');
  const [selectedRole, setSelectedRole] = useState<RoleKey>('student');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [studentProfile, setStudentProfile] = useState<StudentProfileDetails>(
    defaultStudentProfileDetails,
  );
  const [leaveDraft, setLeaveDraft] = useState<LeaveRequestDraft>(
    defaultLeaveRequestDraft,
  );
  const [tuitionStatus, setTuitionStatus] = useState(studentTuitionCard.status);
  const [studentSearchReturnScreen, setStudentSearchReturnScreen] = useState<
    'student-dashboard' | 'student-notifications'
  >('student-dashboard');
  const [activeChatId, setActiveChatId] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveScreen('role-selection');
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  const openOnboarding = (role: RoleKey) => {
    setSelectedRole(role);
    setActiveScreen(
      role === 'student' ? 'student-onboarding' : 'teacher-onboarding',
    );
  };

  const openLogin = () => {
    if (selectedRole === 'student') {
      setPhoneNumber(STUDENT_DEFAULT_CREDENTIALS.phoneNumber);
      setPassword(STUDENT_DEFAULT_CREDENTIALS.password);
    } else {
      setPhoneNumber('');
      setPassword('');
    }

    setActiveScreen('login');
  };

  const openStudentSearch = (
    returnScreen: 'student-dashboard' | 'student-notifications',
  ) => {
    setStudentSearchReturnScreen(returnScreen);
    setActiveScreen('student-search');
  };

  const openChatConversation = (chatId: string) => {
    setActiveChatId(chatId);
    setActiveScreen('student-chat-conversation');
  };

  const updateStudentProfile = (
    field: keyof StudentProfileDetails,
    value: string,
  ) => {
    setStudentProfile(current => ({ ...current, [field]: value }));
  };

  const updateLeaveField = (field: keyof LeaveRequestDraft, value: string) => {
    setLeaveDraft(current => ({ ...current, [field]: value }));
  };

  const updateLeaveReason = (reason: LeaveReasonKey) => {
    setLeaveDraft(current => ({ ...current, reason }));
  };

  const handleTuitionPaymentSuccess = () => {
    setTuitionStatus('Đã thanh toán');
    setActiveScreen('student-settings');
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={false}
      />
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        {activeScreen === 'splash' ? <SplashScreen /> : null}
        {activeScreen === 'role-selection' ? (
          <RoleSelectionScreen
            options={roleOptions}
            onChooseRole={openOnboarding}
          />
        ) : null}
        {activeScreen === 'student-onboarding' ? (
          <OnboardingScreen
            onContinue={openLogin}
            onSkip={openLogin}
            variant="student"
          />
        ) : null}
        {activeScreen === 'teacher-onboarding' ? (
          <OnboardingScreen
            onContinue={openLogin}
            onSkip={openLogin}
            variant="teacher"
          />
        ) : null}
        {activeScreen === 'login' ? (
          <LoginScreen
            onBackToRoles={() => setActiveScreen('role-selection')}
            onTeacherLoginSuccess={() => setActiveScreen('teacher-dashboard')}
            onStudentLoginSuccess={() => setActiveScreen('student-dashboard')}
            password={password}
            phoneNumber={phoneNumber}
            role={selectedRole}
            setPassword={setPassword}
            setPhoneNumber={setPhoneNumber}
          />
        ) : null}
        {activeScreen === 'student-dashboard' ? (
          <StudentDashboardScreen
            onOpenAttendance={() => setActiveScreen('student-attendance')}
            onOpenAllFeatures={() => setActiveScreen('student-all-features')}
            onOpenClassroom={() => setActiveScreen('student-classroom')}
            onOpenChat={() => setActiveScreen('student-chat')}
            onOpenExamSchedule={() => setActiveScreen('student-exam-schedule')}
            onOpenForum={() => setActiveScreen('student-forum')}
            onOpenHomework={() => undefined}
            onOpenLeaveRequest={() => setActiveScreen('student-leave-request')}
            onOpenNotifications={() => setActiveScreen('student-notifications')}
            onOpenProfile={() => setActiveScreen('student-settings')}
            onOpenScore={() => setActiveScreen('student-scorebook')}
            onOpenSchedule={() => setActiveScreen('student-schedule')}
            onOpenSearch={() => openStudentSearch('student-dashboard')}
          />
        ) : null}
        {activeScreen === 'student-attendance' ? (
          <StudentAttendanceScreen
            onBack={() => setActiveScreen('student-dashboard')}
          />
        ) : null}
        {activeScreen === 'student-schedule' ? (
          <StudentScheduleScreen
            onBack={() => setActiveScreen('student-dashboard')}
          />
        ) : null}
        {activeScreen === 'student-search' ? (
          <StudentSearchScreen
            onBack={() => setActiveScreen(studentSearchReturnScreen)}
          />
        ) : null}
        {activeScreen === 'student-notifications' ? (
          <StudentNotificationsScreen
            onBack={() => setActiveScreen('student-dashboard')}
            onOpenSearch={() => openStudentSearch('student-notifications')}
          />
        ) : null}
        {activeScreen === 'student-settings' ? (
          <StudentSettingsScreen
            onBack={() => setActiveScreen('student-dashboard')}
            onOpenPersonalProfile={() => setActiveScreen('student-profile')}
            onOpenTuitionPayment={() =>
              setActiveScreen('student-tuition-payment')
            }
            tuitionStatus={tuitionStatus}
          />
        ) : null}
        {activeScreen === 'student-tuition-payment' ? (
          <StudentTuitionPaymentScreen
            onBack={() => setActiveScreen('student-settings')}
            onPaymentSuccess={handleTuitionPaymentSuccess}
          />
        ) : null}
        {activeScreen === 'student-profile' ? (
          <StudentProfileScreen
            data={studentProfile}
            onBack={() => setActiveScreen('student-settings')}
            onOpenEdit={() => setActiveScreen('student-edit-profile')}
          />
        ) : null}
        {activeScreen === 'student-edit-profile' ? (
          <StudentEditProfileScreen
            data={studentProfile}
            onBack={() => setActiveScreen('student-profile')}
            onChange={updateStudentProfile}
            onSave={() => setActiveScreen('student-profile')}
          />
        ) : null}
        {activeScreen === 'student-exam-schedule' ? (
          <StudentExamScheduleScreen
            onBack={() => setActiveScreen('student-dashboard')}
          />
        ) : null}
        {activeScreen === 'student-homework' ? (
          <StudentHomeworkScreen
            onBack={() => setActiveScreen('student-all-features')}
            onOpenQuiz={() => setActiveScreen('student-quiz-question')}
          />
        ) : null}
        {activeScreen === 'student-classroom' ? (
          <StudentClassroomScreen
            onBack={() => setActiveScreen('student-dashboard')}
            onOpenChat={() => setActiveScreen('student-chat')}
            onOpenHome={() => setActiveScreen('student-dashboard')}
            onOpenProfile={() => setActiveScreen('student-settings')}
          />
        ) : null}
        {activeScreen === 'student-chat' ? (
          <StudentChatScreen
            onOpenCreateNew={() => setActiveScreen('student-chat-new')}
            onOpenClass={() => setActiveScreen('student-classroom')}
            onOpenHome={() => setActiveScreen('student-dashboard')}
            onOpenProfile={() => setActiveScreen('student-settings')}
            onOpenConversation={openChatConversation}
          />
        ) : null}
        {activeScreen === 'student-chat-conversation' ? (
          <StudentChatConversationScreen
            chatId={activeChatId}
            onBack={() => setActiveScreen('student-chat')}
          />
        ) : null}
        {activeScreen === 'student-chat-new' ? (
          <StudentNewChatScreen
            onBack={() => setActiveScreen('student-chat')}
            onOpenClass={() => setActiveScreen('student-classroom')}
            onOpenHome={() => setActiveScreen('student-dashboard')}
            onOpenProfile={() => setActiveScreen('student-settings')}
          />
        ) : null}
        {activeScreen === 'student-all-features' ? (
          <StudentAllFeaturesScreen
            onBack={() => setActiveScreen('student-dashboard')}
            onOpenQuiz={() => setActiveScreen('student-homework')}
          />
        ) : null}
        {activeScreen === 'student-quiz-question' ? (
          <StudentQuizQuestionScreen
            onBack={() => setActiveScreen('student-homework')}
            onSubmit={() => setActiveScreen('student-quiz-result')}
          />
        ) : null}
        {activeScreen === 'student-quiz-result' ? (
          <StudentQuizResultScreen
            onBack={() => setActiveScreen('student-homework')}
            onOpenAi={() => setActiveScreen('student-quiz-ai-analysis')}
            onOpenReview={() => setActiveScreen('student-quiz-answer-review')}
          />
        ) : null}
        {activeScreen === 'student-quiz-ai-analysis' ? (
          <StudentQuizAiAnalysisScreen
            onBack={() => setActiveScreen('student-quiz-result')}
          />
        ) : null}
        {activeScreen === 'student-quiz-answer-review' ? (
          <StudentQuizAnswerReviewScreen
            onBack={() => setActiveScreen('student-quiz-result')}
          />
        ) : null}
        {activeScreen === 'student-scorebook' ? (
          <StudentScoreBookScreen
            onBack={() => setActiveScreen('student-dashboard')}
          />
        ) : null}
        {activeScreen === 'student-forum' ? (
          <StudentForumScreen
            onBack={() => setActiveScreen('student-dashboard')}
            onOpenCreatePost={() => setActiveScreen('student-create-post')}
          />
        ) : null}
        {activeScreen === 'student-create-post' ? (
          <StudentCreatePostScreen
            onBack={() => setActiveScreen('student-forum')}
            onSubmit={() => setActiveScreen('student-forum')}
          />
        ) : null}
        {activeScreen === 'student-leave-request' ? (
          <StudentLeaveRequestScreen
            draft={leaveDraft}
            onBack={() => setActiveScreen('student-dashboard')}
            onChangeField={updateLeaveField}
            onChangeReason={updateLeaveReason}
            onPreview={() => setActiveScreen('student-leave-request-preview')}
          />
        ) : null}
        {activeScreen === 'student-leave-request-preview' ? (
          <StudentLeaveRequestPreviewScreen
            draft={leaveDraft}
            onBack={() => setActiveScreen('student-leave-request')}
            profile={studentProfile}
          />
        ) : null}
        {activeScreen === 'teacher-dashboard' ? (
          <TeacherDashboardScreen
            onOpenApproval={() => setActiveScreen('teacher-approval')}
            onOpenAttendance={() => setActiveScreen('teacher-attendance-management')}
            onOpenNotifications={() => setActiveScreen('teacher-notifications')}
            onOpenProfile={() => setActiveScreen('teacher-settings')}
            onOpenReport={() => setActiveScreen('teacher-report')}
            onOpenSchedule={() => setActiveScreen('teacher-schedule')}
            onOpenSearch={() => setActiveScreen('teacher-search')}
            onOpenScore={() => setActiveScreen('teacher-score')}
          />
        ) : null}
        {activeScreen === 'teacher-approval' ? (
          <TeacherApprovalScreen onBack={() => setActiveScreen('teacher-dashboard')} />
        ) : null}
        {activeScreen === 'teacher-attendance-management' ? (
          <TeacherAttendanceManagementScreen
            onBack={() => setActiveScreen('teacher-dashboard')}
          />
        ) : null}
        {activeScreen === 'teacher-report' ? (
          <TeacherReportScreen onBack={() => setActiveScreen('teacher-dashboard')} />
        ) : null}
        {activeScreen === 'teacher-schedule' ? (
          <TeacherScheduleScreen onBack={() => setActiveScreen('teacher-dashboard')} />
        ) : null}
        {activeScreen === 'teacher-search' ? (
          <TeacherSearchScreen onBack={() => setActiveScreen('teacher-dashboard')} />
        ) : null}
        {activeScreen === 'teacher-score' ? (
          <TeacherScoreScreen onBack={() => setActiveScreen('teacher-dashboard')} />
        ) : null}
        {activeScreen === 'teacher-notifications' ? (
          <TeacherNotificationsScreen
            onBack={() => setActiveScreen('teacher-dashboard')}
            onOpenSearch={() => setActiveScreen('teacher-search')}
          />
        ) : null}
        {activeScreen === 'teacher-settings' ? (
          <TeacherSettingsScreen onBack={() => setActiveScreen('teacher-dashboard')} />
        ) : null}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;
