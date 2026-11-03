import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import SignupPage from './pages/signup/SignupPage'
import HomePage from './pages/home/HomePage'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
