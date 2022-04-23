import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./page/basic/Counter/classComponent";
import BasicReact from "./page/basic/React";
import BasicLogin from "./page/basic/login";
import SignIn from "./page/signin";
import Home from "./page/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="login" element={<SignIn />} />
        <Route path="basic/login" element={<BasicLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
