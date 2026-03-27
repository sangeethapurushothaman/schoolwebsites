import { BrowserRouter, Routes, Route } from "react-router-dom";

import Singlepage from "./pages/SinglePage";
import Header from "./component/Header";
import Footer from "./component/Footer";
import LegalPage from "./pages/LegalPage";
import ApplicationForm from "./pages/ApplicationForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
     
      <Header/>

        <Routes>
          <Route path="/" element={<Singlepage />} />
          <Route path="/LegalPage" element={<LegalPage />} />
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
