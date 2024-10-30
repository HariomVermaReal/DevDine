import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./MainLayout";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";

const appRouter = createBrowserRouter([
  { path: "/", element: <MainLayout /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/verify-email", element: <VerifyEmail /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
