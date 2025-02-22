import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import Layout from "./components/UI/Layout/Layout.tsx";
import Photos from "./features/photos/Photos.tsx";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/users/UserSlice.ts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import NewPhotoForm from "./features/photos/NewPhotoForm.tsx";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Photos />} />
          <Route path="/photos" element={<Photos />} />
          <Route
            path="photos/add_photo"
            element={
              <ProtectedRoute
                isAllowed={
                  user && (user.role === "admin" || user.role === "user")
                }
              >
                <NewPhotoForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<h1 className={"text-center mt-5"}>Not found</h1>}
          />
          <Route path={`/photos?userID=${user?._id}`} element={<Photos />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
