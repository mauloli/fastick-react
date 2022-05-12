import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./page/basic/Counter/classComponent";
import BasicReact from "./page/basic/React";
import BasicLogin from "./page/basic/login";
import SignIn from "./page/Signin/index";
import Home from "./page/Home";
import MovieDetails from "./page/MovieDetails";
import Order from "./page/Order";
import Payment from "./page/Payment";
import ViewAll from "./page/ViewAll";
import ManageSchedule from "./page/ManageSchedule";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movieDetails/:id" element={<MovieDetails />} />
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="login" element={<SignIn />} />
        <Route path="basic/login" element={<BasicLogin />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/viewAll" element={<ViewAll />} />
        <Route path="manageSchedule" element={<ManageSchedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
