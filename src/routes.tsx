import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import ProjectsPage from "./pages/projects-page";
import BlogPage from "./pages/blog-page";
import MainToolbar, { loader as rootLoader } from "./components/main-toolbar";
import PuzzleGame from "./pages/projects/grid-game/grid-game";
import ChatThing from "./pages/projects/chat-thing/chat-thing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainToolbar/>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'projects/grid-game',
        element: <PuzzleGame />
      },
      {
        path: 'projects/chatly',
        element: <ChatThing />
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
    ]
  },
]);

export default router