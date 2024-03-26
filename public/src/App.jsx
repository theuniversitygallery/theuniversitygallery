import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LandingPageLayout from "./layouts/LandingPageLayout";
import { AllPosts, HomeErrorPage, IndexErrorPage, Login, NotFound, PostDetails } from "./components";
import Register from "./components/Register";
import Onboarding from "./components/Onboarding";
import { onboardingLoader } from "./utils/loaders/OnboardingLoader";
import SharedHomeLayout from "./layouts/SharedHomeLayout";
import { loginAction, logoutAction, onboardingAction, registerAction } from "./utils/actions/IndexActions";
import PostDetailLoader from "./utils/loaders/PostDetailLoader";
import AllPostsLoader from "./utils/loaders/AllPostsLoader";
import { addApplicationAction } from "./utils/actions/postActions";
import { needsAuth, needsNoAuth } from "./utils/loaders/authLoaders";

function App() {

  const unigalleryrouter = createBrowserRouter([
    {
      path: "/",
      element: <LandingPageLayout />,
      errorElement: <IndexErrorPage />,
      loader: needsNoAuth,
      children: [
        {
          index: true,
          element: <Login />,
          action: loginAction
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction
        },
      ]
    },
    {
      path: "/onboarding",
      element: <Onboarding />,
      loader: onboardingLoader,
      action: onboardingAction,
      errorElement: <IndexErrorPage />
    },
    {
      path: "/home",
      element: <SharedHomeLayout />,
      errorElement: <HomeErrorPage />,
      loader: needsAuth,
      children: [
        {
          index: true,
          element: <AllPosts />,
          loader: AllPostsLoader,
        },
        {
          path: "/home/posts/:postId",
          element: <PostDetails />,
          loader: PostDetailLoader,
          action: addApplicationAction
        },
        {
          path: "/home/logout",
          action: logoutAction
        }
      ]
    },
    {
      path: "/*",
      element: <NotFound />
    }
    // {
    //   path: "/posts/:postId",
    //   element: <PostDetails />
    // },
  ]);

  return (
    <RouterProvider router={unigalleryrouter} />
  )
}

export default App
