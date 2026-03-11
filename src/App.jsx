import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singlepage from "./pages/SinglePage";
import Header from "./component/Header";
import Footer from "./component/Footer";


function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Singlepage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
