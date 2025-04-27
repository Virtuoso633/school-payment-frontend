// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import TransactionsOverviewPage from './pages/TransactionsOverviewPage';
import TransactionsBySchoolPage from './pages/TransactionsBySchoolPage';
import TransactionStatusPage from './pages/TransactionStatusPage';
import NotFoundPage from './pages/NotFoundPage'; // Optional

function App() {
  return (
    <Routes>
      {/* Routes that use the MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {/* Default route (index) within the layout */}
        <Route index element={<TransactionsOverviewPage />} />
        {/* Other routes */}
        <Route path="school" element={<TransactionsBySchoolPage />} />
        <Route path="status-check" element={<TransactionStatusPage />} />

        {/* Catch-all route for 404 Not Found within the layout */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* You could define routes outside the MainLayout here if needed (e.g., a dedicated Login page) */}
      {/* <Route path="/login" element={<LoginPage />} /> */}

    </Routes>
  );
}

export default App;