import MyProfileView from "./views/account/MyProfile";
import NotificationView from "./views/account/Notification";
import OrdersView from "./views/account/Orders";
import SignInView from "./views/account/SignIn";
import SignUpView from "./views/account/SignUp";
import WishlistView from "./views/account/Wishlist";
import BrandListView from "./views/brand/List/List";
import CartView from "./views/cart/Cart";
import HomeView from "./views/Home";
import NotFoundView from "./views/pages/404";
import ProductDetailView from "./views/product/Detail";
import ProductListView from "./views/product/List/List";

export const rejectedRoute = "REJECTED_ROUTE";
export const protectedRoute = "PROTECTED_ROUTE";

export const publicRouters = [
  {
    path: "/account/signin",
    component: SignInView,
    type: rejectedRoute,
  },
  {
    path: "/account/signup",
    component: SignUpView,
    type: rejectedRoute,
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/account/profile",
    component: MyProfileView,
    type: protectedRoute,
  },
  {
    path: "/account/orders",
    component: OrdersView,
    type: protectedRoute,
  },
  {
    path: "/account/wishlist",
    component: WishlistView,
    type: protectedRoute,
  },
  {
    path: "/account/notification",
    component: NotificationView,
    type: protectedRoute,
  },
  {
    path: "/cart",
    component: CartView,
    type: protectedRoute,
  },
  {
    path: "/product",
    component: ProductListView,
  },
  {
    path: "/brand/:id",
    component: BrandListView,
  },
  {
    path: "/product/detail/:id",
    component: ProductDetailView,
  },
  {
    path: "*",
    component: NotFoundView,
  },
];