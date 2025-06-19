import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/login";
import Register from "./pages/login/register";
import Booking from "./pages/booking/Booking";
import Transaction from "./pages/transaction/transaction";
import SearchContextProvider from "./components/store/search-context";

function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:hotelId" element={<Hotel />} />
          <Route path="/booking/:hotelId" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/transactions" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;
