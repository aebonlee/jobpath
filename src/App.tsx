import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import LoginPage from './pages/auth/LoginPage';

import PilgiHome from './pages/pilgi/PilgiHome';
import ExamSelect from './pages/pilgi/ExamSelect';
import StudyMode from './pages/pilgi/StudyMode';
import ExamMode from './pages/pilgi/ExamMode';
import ExamResult from './pages/pilgi/ExamResult';
import QuestionReview from './pages/pilgi/QuestionReview';

import SilgiHome from './pages/silgi/SilgiHome';
import PracticeMode from './pages/silgi/PracticeMode';
import PracticeResult from './pages/silgi/PracticeResult';
import KeyTerms from './pages/silgi/KeyTerms';
import SilgiExamList from './pages/silgi/SilgiExamList';
import SilgiExamDetail from './pages/silgi/SilgiExamDetail';

import Dashboard from './pages/dashboard/Dashboard';
import StudyHistory from './pages/dashboard/StudyHistory';

import Bookmarks from './pages/study/Bookmarks';
import WrongAnswers from './pages/study/WrongAnswers';

import ExamInfo from './pages/info/ExamInfo';

import LearnHome from './pages/learn/LearnHome';
import SubjectStudy from './pages/learn/SubjectStudy';

import PracticeHome from './pages/practice/PracticeHome';

function AppLayout() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/learn" element={<LearnHome />} />
          <Route path="/learn/:subjectCode" element={<SubjectStudy />} />

          <Route path="/practice" element={<PracticeHome />} />

          <Route path="/pilgi" element={<PilgiHome />} />
          <Route path="/pilgi/select" element={<ExamSelect />} />
          <Route path="/pilgi/study" element={<StudyMode />} />
          <Route path="/pilgi/exam/:id" element={<ExamMode />} />
          <Route path="/pilgi/result/:id" element={<ExamResult />} />
          <Route path="/pilgi/review/:id" element={<QuestionReview />} />

          <Route path="/silgi" element={<SilgiHome />} />
          <Route path="/silgi/practice/:id" element={<PracticeMode />} />
          <Route path="/silgi/result/:id" element={<PracticeResult />} />
          <Route path="/silgi/terms" element={<KeyTerms />} />
          <Route path="/silgi/past" element={<SilgiExamList />} />
          <Route path="/silgi/past/:examId" element={<SilgiExamDetail />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/history" element={<StudyHistory />} />

          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/wrong-answers" element={<WrongAnswers />} />

          <Route path="/info" element={<ExamInfo />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
