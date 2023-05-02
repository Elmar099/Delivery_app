
import {
  createBrowserRouter,
  RouterProvider, 
  Route, 
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Profile from "./pages/restaurantPages/Profile"
import Driver from "./pages/driverPages/Driver"
import Contact from "./pages/restaurantPages/Contact"
import Landing from "./pages/restaurantPages/Home"
import Write from "./pages/Write"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Reset from "./pages/Reset"
import DriverNav from "./components/DriverNav"
import DriverOrder from "./pages/driverPages/DriverOrder"
import "./style.scss" 
import DriverProfile from "./pages/driverPages/DriverProfile";
import Order from "./pages/restaurantPages/Order";
import Home from "./pages/restaurantPages/Home";
import DriverHome from "./pages/driverPages/DriverHome";
import DriverContact from "./pages/driverPages/DriverContact";

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
};
const DriverLayout = () => {
  return (
    <>
      <DriverNav/>
      <Outlet/>
      <Footer/>
    </>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Landing/>,
      },
      {
        path: '/post/:id',
        element: <Single/>,
      },
      {
        path: '/write',
        element: <Write/>,
      },
      {
        path: '/profile',
        element: <Profile/>,
      },
      {
        path: '/order',
        element: <Order/>,
      },
      {
        path: '/home',
        element: <Home/>,
      },
      {
        path: '/contact',
        element: <Contact/>,
      },
    ],
  },
  {
    path: '/',
    element: <DriverLayout/>,
    children: [
      {
        path: '/driver',
        element: <Driver/>,
      },
      {
        path: '/driverOrder',
        element: <DriverOrder/>,
      },
      {
        path: '/driverProfile',
        element: <DriverProfile/>,
      },
      {
        path: '/driverHome',
        element: <DriverHome/>,
      },
      {
        path: '/driverContact',
        element: <DriverContact/>,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
])

function App() {
  return (
    <div className='app'>
      <div className='container'>
      <RouterProvider router={router} />
      </div>
    </div>
  );
}


export default App;
