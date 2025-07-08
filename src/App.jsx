import React, { useEffect, useState } from "react";
import Hero from "./Hero/Hero";
import Category from "./Category/Category";
import Cart from "./Cart/Cart";
import RequestDish from "./component/RequestDish";
import Header from "./Header/Header";
import { sendRequestDish } from "./api/requestDishApi";
import Banner from "./Banner/Banner";
import AOS from "aos";
import "aos/dist/aos.css";
const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // 👈 toggle giỏ hàng
  const [searchKeyword, setSearchKeyword] = useState(""); // 👈 new
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const handleDishRequest = async (formData) => {
    try {
      await sendRequestDish({ ...formData });
      alert("✅ Đã gửi yêu cầu món ăn thành công!");
    } catch {
      alert("❌ Gửi yêu cầu thất bại.");
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 600, // thời gian hiệu ứng (ms)
      once: true, // chỉ animation 1 lần khi cuộn tới
    });
  }, []);
  return (
    <>
      <Header
        cart={cart}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        onSearch={(value) => setSearchKeyword(value)}
      />
      <Banner />
      <Hero setIsRequestOpen={setIsRequestOpen} />
      {isRequestOpen && (
        <RequestDish
          onClose={() => setIsRequestOpen(false)}
          onSubmit={handleDishRequest}
        />
      )}
      <Category
        cart={cart}
        setCart={setCart}
        searchKeyword={searchKeyword}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        onSearch={(value) => setSearchKeyword(value)}
      />
      {isCartOpen && (
        <Cart
          cart={cart}
          setCart={setCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
};

export default App;
