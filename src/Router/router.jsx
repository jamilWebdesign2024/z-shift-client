import {
  createBrowserRouter
  } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index: true,
            Component: Home
        }
    ]
  },
  {
      path: '/',
      Component: AuthLayout,
      children:[
        {
          path: 'login',
          Component: Login
        }
      ]
  }
]);