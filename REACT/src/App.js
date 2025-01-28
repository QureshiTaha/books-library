import Home from "./pages/home";
import Book from "./pages/book";
import Login from "./pages/login";
import Wishlist from "./pages/wishlist";
import Notfound from "./pages/notfound";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/book/:id" element={<Book />} />
          <Route exact path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
