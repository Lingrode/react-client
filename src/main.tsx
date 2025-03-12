import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import ThemeProvider from "./components/ThemeProvider.tsx";
import { Layout } from "./components/Layout/index.tsx";

import { Auth } from "./pages/Auth.tsx";
import { Posts } from "./pages/Posts.tsx";
import { CurrentPost } from "./pages/CurrentPost.tsx";
import { UserProfile } from "./pages/UserProfile.tsx";
import { Followers } from "./pages/Followers.tsx";
import { Following } from "./pages/Following.tsx";

import { store } from "./redux/store.ts";
import "./index.css";
import { AuthGuard } from "./components/AuthGuard/index.tsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "following",
        element: <Following />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthGuard>
          <RouterProvider router={router} />
        </AuthGuard>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
