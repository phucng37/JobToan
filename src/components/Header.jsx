import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogoutRedux } from "../redux/slice/loginSlice";
import { handleGetToCartRedux } from "../redux/slice/cartSlice";
import { handleGetOrderRedux, status } from "../redux/slice/orderSlice";
import {
  CButton,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CHeaderDivider,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  CHeaderToggler,
} from "@coreui/react";
import { isUser } from "../utils/auth";
const Search = lazy(() => import("./Search"));

const Header = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const countDataCart = useSelector(
    (state) => state.cartReducer.dataCart.length
  );
  useEffect(() => {
    dispatch(handleGetToCartRedux());
  }, []);
  const isStatusOrder = useSelector(
    (state) => state.orderReducer.isStatusOrder
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isStatusOrder === status.GOT) {
      navigate("account/orders");
    }
  }, [isStatusOrder]);
  const authComponent = () => {
    if (isUser) {
      return (
        <>
          <CDropdown variant="nav-item" popper={false}>
            <CNavLink>
              <CDropdownToggle color="secondary">My Profile</CDropdownToggle>
            </CNavLink>
            <CDropdownMenu>
              <CDropdownItem
                onClick={() => {
                  dispatch(handleGetOrderRedux());
                }}
              >
                <i className="bi bi-list-check text-primary"></i> Orders
              </CDropdownItem>
              <CDropdownItem
                onClick={() => {
                  dispatch(handleLogoutRedux());
                  navigate("/account/signin", { replace: true });
                  window.location.reload();
                }}
              >
                {/* <Link
                  className="text-decoration-none"
                  onClick={() => {
                    dispatch(handleLogoutRedux());
                    navigate("/account/signin")
                  }}
                  to="account/signin"
                > */}
                <i className="bi bi-door-closed-fill text-danger"></i>
                Logout
                {/* </Link> */}
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <CNavItem>
            <CNavLink>
              <div className="position-relative d-inline">
                <Link to="/cart" className="btn btn-primary ">
                  <i className="bi bi-cart3"></i>
                  <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                    { countDataCart > 0 && countDataCart}
                  </div>
                </Link>
              </div>
            </CNavLink>
          </CNavItem>
        </>
      );
    } else {
      return (
        <CNavItem>
          <CNavLink>
            <Link className="nav-link" to="/account/signin">
              Login
            </Link>
          </CNavLink>
        </CNavItem>
      );
    }
  };
  return (
    // <header className="p-3 border-bottom bg-light">
    //   <div className="container-fluid">
    //     <div className="row g-3">
    //       <div className="col-md-3 text-center">
    //         <Link to="/">
    //           <img
    //             src="../../images/logo.jpg"
    //             alt="logo"
    //             style={{ width: "50px", height: "50px" }}
    //           />
    //         </Link>
    //       </div>
    //       <div className="col-md-5">
    //         <Search />
    //       </div>
    //       <div className="col-md-4">
    //         <div className="position-relative d-inline me-3">
    //           <Link to="/cart" className="btn btn-primary">
    //             <i className="bi bi-cart3"></i>
    //             <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
    //               {countDataCart || 0}
    //             </div>
    //           </Link>
    //         </div>
    //         <div className="btn-group">
    //           <button
    //             type="button"
    //             className="btn btn-secondary rounded-circle border me-3"
    //             data-toggle="dropdown"
    //             aria-expanded="false"
    //             aria-label="Profile"
    //             data-bs-toggle="dropdown"
    //           >
    //             <i className="bi bi-person-fill text-light"></i>
    //           </button>
    //           <ul className="dropdown-menu">
    //             <li>
    //               <Link className="dropdown-item" to="/account/profile">
    //                 <i className="bi bi-person-square"></i> My Profile
    //               </Link>
    //             </li>
    //             <li>
    //               <div
    //                 className="dropdown-item"
    //                 onClick={() => {
    //                   dispatch(handleGetOrderRedux());
    //                 }}
    //                 style={{ cursor: "pointer" }}
    //               >
    //                 <i className="bi bi-list-check text-primary"></i> Orders
    //               </div>
    //             </li>
    //             {!localStorage.getItem("userId") && (
    //               <li>
    //                 <Link className="dropdown-item" to={`/account/signin`}>
    //                   <i
    //                     className="bi bi-box-arrow-in-right fs-5"
    //                     style={{ marginLeft: "-4px" }}
    //                   ></i>{" "}
    //                   Sign In
    //                 </Link>
    //               </li>
    //             )}
    //             <li>
    //               <hr className="dropdown-divider" />
    //             </li>
    //             <li>
    //               <Link
    //                 className="dropdown-item"
    //                 onClick={() => {
    //                   dispatch(handleLogoutRedux());
    //                 }}
    //                 to="account/signin"
    //               >
    //                 <i className="bi bi-door-closed-fill text-danger"></i>
    //                 Logout
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //         {/* <Link to="/account/signin">Sign In</Link> |{" "}
    //           <Link to="/account/signup"> Sign Up</Link> */}
    //       </div>
    //     </div>
    //   </div>
    // </header>
    <div>
      <CHeader expand="lg" className="bg-body-tertiary">
        <CContainer>
          <CHeaderBrand>
            <Link to="/">
              <img
                src="../../images/logo.jpg"
                alt="logo"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </CHeaderBrand>
          <CHeaderToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="header-collapse" visible={true}>
            <CHeaderNav>
              <CNavItem>
                <CNavLink>
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink>
                  <Link className="nav-link" to="/product">
                    Products
                  </Link>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink>
                  <Link className="nav-link" to="/blog">
                    Blog
                  </Link>{" "}
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink>
                  <Link className="nav-link" to="/intro">
                    Introduction
                  </Link>
                </CNavLink>
              </CNavItem>
              {authComponent()}
            </CHeaderNav>
            {/* <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search" />
              <CButton type="submit" color="success" variant="outline">
                Search
              </CButton>
            </CForm> */}
          </CCollapse>
        </CContainer>
        <CDropdownDivider />
      </CHeader>
    </div>
  );
};
export default Header;
