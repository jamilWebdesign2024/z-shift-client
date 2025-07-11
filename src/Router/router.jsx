import {
  createBrowserRouter
  } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "../routes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/Myparcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
// import MyParcels from "../Pages/Dashboard/Myparcels/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index: true,
            Component: Home
        },
        {
            path: 'coverage',
            Component: Coverage,
            loader: ()=>fetch('./serViceCenter.json')
        },
        {
            path: 'sendParcel',
            element: <PrivateRoutes>
              <SendParcel></SendParcel>
            </PrivateRoutes>,
            loader: ()=>fetch('./serViceCenter.json')
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
        },
        {
          path: 'register',
          Component: Register
        }
      ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes>
          <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        children: [
          {
              path: 'myParcels',
              Component: MyParcels

          },
          {
            path: 'payment/:parcelId',
            Component: Payment
          }
        ]
    }
]);