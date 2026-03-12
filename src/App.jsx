import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singlepage from "./pages/SinglePage";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LegalPage from "./pages/LegalPage";





function App() {
  return (
    <>
      <BrowserRouter>
     
      <Header/>
      
        <Routes>
          <Route path="/" element={<Singlepage />} />
          <Route path="/LegalPage" element={<LegalPage />} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
