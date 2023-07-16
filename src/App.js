import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Pagecontent from "./components/pageContent/Pagecontent";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Pagecontent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
