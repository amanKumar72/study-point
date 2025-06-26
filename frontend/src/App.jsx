import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OTPVerify from "./pages/OTPVerify";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Thankingyou from "./pages/Thankingyou";
import ScrollToTop from "./components/common/ScrollToTop";
import Catalog from "./pages/Catalog";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Course from "./pages/Course";
import AddCourse from "./components/dashboard/AddCourse";
import EditCourse from "./components/dashboard/EditCourse";
import MyCourse from "./pages/Dashboard/MyCourse";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slices/profileSlice";
import { useEffect } from "react";
import { profileApi } from "./services/apis";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import InstructorDashboard from "./pages/Dashboard/InstructorDashboard";
import EnrolledCourses from "./pages/Dashboard/EnrolledCourses";
import Cart from "./pages/Dashboard/Cart";
import NotFound from "./pages/NotFound";
import { ACCOUNT_TYPE } from "./utils/constants";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/viewCourse/VideoDetails";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  // console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) return;
    const token = localStorage.getItem("token");
    fetch(profileApi.getUserDetails, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == false) {
          navigate("/login");
          return;
        }
        // console.log(data?.user);

        dispatch(setUser(data?.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      className="
    flex min-h-screen flex-col bg-[#000814] text-[#fafafa] font-inter"
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/thank-you" element={<Thankingyou />}></Route>
        <Route path="/otp" element={<OTPVerify />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/settings" element={<Settings />}></Route>
          {user?.accountType == ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              ></Route>
              <Route path="/dashboard/cart" element={<Cart />}></Route>
            </>
          )}
          {user?.accountType == ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/add-course"
                element={<AddCourse />}
              ></Route>
              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse />}
              ></Route>
              <Route
                path="/dashboard/instructor-dashboard"
                element={<InstructorDashboard />}
              ></Route>
              <Route
                path="/dashboard/my-courses"
                element={<MyCourse />}
              ></Route>
            </>
          )}
        </Route>
        <Route path="/course/:courseId" element={<Course />}></Route>
        <Route path="/otp" element={<OTPVerify />}></Route>
        <Route element={<ViewCourse />}>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          )}
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
