import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./page/basic/Counter/classComponent";
import BasicReact from "./page/basic/React";
import BasicLogin from "./page/basic/login";
import SignIn from "./page/signin";
import SignUp from "./page/Signup";
import Home from "./page/Home";
import MovieDetails from "./page/MovieDetails";
import Order from "./page/Order";
import Payment from "./page/Payment";
import ViewAll from "./page/ViewAll";
import ManageSchedule from "./page/ManageSchedule";
import ManageMovie from "./page/manageMovie";
import Profile from "./page/Profile";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./helpers/routes/private";
import PublicRoute from "./helpers/routes/public";

function App() {
  // useSelector((state)=>state.movie)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute restricted={true} />}>
          <Route path="login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
        <Route element={<PublicRoute restricted={false} />}>
          <Route path="/" element={<Home />} />
          <Route path="movieDetails/:id" element={<MovieDetails />} />
          <Route path="/viewAll" element={<ViewAll />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="/manageSchedule" element={<ManageSchedule />} />
          <Route path="/manageMovie" element={<ManageMovie />} />
        </Route>
        <Route element={<PrivateRoute isAdmin={false} />}>
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
