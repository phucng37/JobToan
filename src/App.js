import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React, { Suspense, lazy } from "react";
import Skeleton from "react-loading-skeleton";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TopMenu from "./components/TopMenu";
import AdminLayout from "./layout/AdminLayout";
import { protectedRoute, publicRouters, rejectedRoute } from "./router";
import "./scss/style.scss";
import { CContainer } from "@coreui/react";
import { isAdmin } from "./utils/auth";
//const Header = lazy(() => import("./components/Header"));
//const TopMenu = lazy(() => import("./components/TopMenu"));
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
// const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
const MyProfileView = lazy(() => import("./views/account/MyProfile"));
const ProductListView = lazy(() => import("./views/product/List/List"));
const BrandListView = lazy(() => import("./views/brand/List/List"));
const ProductDetailView = lazy(() => import("./views/product/Detail"));
const StarZoneView = lazy(() => import("./views/product/StarZone"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const InvoiceView = lazy(() => import("./views/cart/Invoice"));
const DocumentationView = lazy(() => import("./views/Documentation"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));
const BlogView = lazy(() => import("./views/blog/Blog"));
const BlogDetailView = lazy(() => import("./views/blog/Detail"));

//kiểm tra khi truy cập đến url login or register thì nếu đã login rồi thì chuyển đến home, nếu chưa thì mới cho đến trang register or login
function RejectedRoute() {
  return !localStorage.getItem("userId") ? <Outlet /> : <Navigate to="/home" />;
}

//kiểm tra nếu ta chưa login mà truy cập đến những trang như profile thì phải chuyển đến login page để đăng nhập trước đã
function ProtectedRoute() {
  return localStorage.getItem("userId") ? (
    <Outlet />
  ) : (
    <Navigate to="/account/signin" />
  );
}

function App() {
  console.log(localStorage.getItem('role'));
  console.log(localStorage.getItem('role')==='admin');
  return (
    <BrowserRouter>
      {isAdmin ? (
        <AdminLayout />
      ) : (
        <React.Fragment>
          <Header />
          {/* <TopMenu /> */}
          <Suspense
            fallback={
              <CContainer><Skeleton count={5} height={100}/></CContainer>
            }
          >
            <Routes>
              {publicRouters.map((item, index) => {
                if (!item.type) {
                  console.log("path", item);

                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={<item.component />}
                    />
                  );
                }
                if (item.type === protectedRoute)
                  return (
                    <Route key={index} path="" element={<ProtectedRoute />}>
                      <Route path={item.path} element={<item.component />} />
                    </Route>
                  );
                else if (item.type === rejectedRoute)
                  return (
                    <Route key={index} path="" element={<RejectedRoute />}>
                      <Route path={item.path} element={<item.component />} />
                    </Route>
                  );
              })}
            </Routes>
          </Suspense>
          <Footer />
        </React.Fragment>
      )}
    </BrowserRouter>
  );
}

export default App;
