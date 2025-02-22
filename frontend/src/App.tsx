import './App.css'
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import Layout from './components/UI/Layout/Layout.tsx';

const App = () => {

  return (
    <>
      <Layout>
<Routes>
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
</Routes>
      </Layout>
    </>

  )
};

export default App
