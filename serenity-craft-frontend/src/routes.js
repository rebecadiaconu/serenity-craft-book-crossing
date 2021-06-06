import LockScreenPage from "pages/Admin/LockScreenPage.js";
import LoginPage from "pages/Auth/LoginPage.js";
import ResetPassword from "pages/Auth/ResetPassword.js";
import RegisterPage from "pages/Auth/RegisterPage.js";

// @material-ui/icons
import BookIcon from '@material-ui/icons/Book';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";

// Components Serenity
import Favorites from "pages/User/Favorites";
import RequestPage from "pages/Crossings/RequestPage";
import CrossingPage from "pages/Crossings/CrossingPage";
import BookPage from "pages/Books/BookPage";
import UserPage from "./pages/User/UserPage";
import UserAuthPage from "./pages/User/UserAuthPage";
import AllBooks from "./pages/AllBooks";

// @material-ui/icons Serenity
import FavoriteIcon from '@material-ui/icons/Favorite';
import CachedIcon from '@material-ui/icons/Cached';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShareIcon from '@material-ui/icons/Share';
import { LockOpen } from "@material-ui/icons";


// logged: true -> show only when user is authenticated
// unauth: true -> show only when user is unauthenticated

const routes = [
  {
    path: '/users/:username',
    name: '',
    icon: AccountBoxIcon,
    component: UserPage,
    layout: "/admin",
    invisible:  true,
    logged: false,
    unauth: false 
  },
  {
    path: '/books/:bookId',
    name: '',
    icon: ShareIcon,
    component: BookPage,
    layout: "/admin",
    invisible:  true,
    logged: false,
    unauth: false 
  },
  {
    path: '/requests',
    name: '',
    icon: BookIcon,
    component: RequestPage,
    layout: "/admin",
    invisible:  true,
    logged: false,
    unauth: false 
  },
  {
    path: '/crossings/:crossingId/:topicIndex',
    name: '',
    icon: ShareIcon,
    component: CrossingPage,
    layout: "/admin",
    invisible:  true,
    logged: false,
    unauth: false 
  },
  {
    path: '/crossings/:crossingId',
    name: '',
    icon: ShareIcon,
    component: CrossingPage,
    layout: "/admin",
    invisible:  true,
    logged: false,
    unauth: false 
  },
  {
    path: "/user",
    name: "My profile",
    icon: AccountBoxIcon,
    component: UserAuthPage,
    layout: "/admin",
    invisible: true,
    logged: false,
    unauth: false 
  },
  {
    path: "/all-books",
    name: "All books",
    icon: DashboardIcon,
    component: AllBooks,
    layout: "/admin",    
    logged: false,
    unauth: false
  },
  {
    path: '/favorites',
    name: 'My favorites',
    icon: FavoriteIcon,
    component: Favorites,
    layout: "/admin",
    invisible:  false,
    logged: true,
    unauth: false 
  },
  {
    path: "/login-page",
    name: "Log in",
    icon: Fingerprint,
    component: LoginPage,
    logged: false,
    unauth: true,   
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register",
    icon: PersonAdd,
    component: RegisterPage,
    logged: false,
    unauth: true,   
    layout: "/auth"
  },
  {
      path: "/reset-password",
      name: "Reset Password",
      icon: CachedIcon,
      component: ResetPassword,

      layout: "/auth",
      logged: false,
      unauth: true,   
  },
  // {
  //   path: "/lock-screen-page",
  //   name: "Lock Page",
  //   icon: LockOpen,
  //   component: LockScreenPage,
  //   invisible: true,
  //   logged: false,
  //   unauth: false,  
  //   admin: true, 
  //   layout: "/auth"
  // }
];

export default routes;
