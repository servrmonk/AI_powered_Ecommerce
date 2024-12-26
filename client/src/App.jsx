// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter wraps everything
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Routing from "./routes/index.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.jsx";



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routing /> 
      <Footer />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
