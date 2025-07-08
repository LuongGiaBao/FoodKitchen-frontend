import React, { useEffect, useState } from "react";
import { fetchAllFood } from "../api/foodApi";
import food from "../assets/ga-ran.png";
import { FiShoppingCart } from "react-icons/fi";
const categories = [
  "All Items",
  "Popular",
  "Phở / Bún / Mì",
  "Đồ ăn nhanh",
  "Cơm",
  "Đồ ăn vặt",
  "Thức uống",
];

const Category = ({ cart, setCart, searchKeyword, onCartClick, onSearch }) => {
  const [selected, setSelected] = useState("All Items");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const filteredFoods = foods
    .filter((food) => !!food.name)
    .filter((food) => {
      const matchCategory =
        selected === "All Items"
          ? true
          : selected === "Popular"
          ? food.rating >= 4.5
          : food.category === selected;

      const matchSearch =
        !searchKeyword ||
        food.name.toLowerCase().includes(searchKeyword.toLowerCase());
      // food.description.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchCategory && matchSearch;
    });

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAllFood();
        const parsedFoods = res.data.map((item) => {
          const imageUrl =
            item.image?.formats?.thumbnail?.url ||
            item.image?.formats?.medium?.url ||
            item.image?.url ||
            "";

          return {
            id: item.id,
            name: item.name,
            price: item.price,
            rating: item.rating,
            description: item.description,
            category: item.category || "Unknown",
            image: imageUrl,
          };
        });
        setFoods(parsedFoods);
      } catch (err) {
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === food.id);
      if (existingItem) {
        alert(`Đã tăng số lượng ${food.name} trong giỏ hàng.`);
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        alert(`Đã thêm ${food.name} vào giỏ hàng.`);
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  return (
    <>
      {/* Category Selector */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-slate-100 flex ">
        <div className="max-w-7xl mx-auto py-3">
          <div className="flex lg:justify-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 text-center lg:text-left">
              Món ăn best seller
            </h2>
            <div className="">
              <input
                type="text"
                placeholder="Search dishes..."
                onChange={(e) => onSearch(e.target.value)}
                className="rounded-full px-4 py-2 text-sm focus:outline-none block md:hidden"
              />
            </div>
          </div>

          {/* Mobile: 2 columns grid */}
          <div className="block sm:hidden px-4">
            <div className="w-full border border-orange-500 rounded-xl p-4 flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 border
          ${
            selected === cat
              ? "bg-[#D73527] text-white shadow-md border-transparent"
              : "bg-white text-gray-800 border border-gray-200 hover:border-[#D73527] hover:text-[#D73527] hover:shadow-md"
          }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tablet & Desktop */}
          <div className="hidden sm:flex justify-center lg:justify-start px-4 sm:px-6">
            <div className="w-full max-w-6xl border border-orange-300 rounded-xl p-4 sm:p-6 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 hover:scale-105
          ${
            selected === cat
              ? "bg-[#D73527] text-white shadow-lg"
              : "bg-white text-gray-800 border border-gray-200 hover:border-[#D73527] hover:text-[#D73527] hover:shadow-md"
          }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Food Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-[#F7F1E1] ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {selected}
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({filteredFoods.length} items)
              </span>
            </h2>
          </div>

          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {filteredFoods.map((food, i) => (
                <div
                  key={food.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl  transition-all  duration-300 overflow-hidden relative flex flex-col items-center text-center pb-6 group"
                >
                  {/* Top red curved background on hover */}
                  <div className="absolute top-0 left-0 w-full h-36 sm:h-28 overflow-hidden z-0 transition-all duration-300">
                    <div
                      className="w-full h-full bg-[#f5f5f5] group-hover:bg-[#D73527] 
    rounded-b-[120px] sm:rounded-b-full 
    scale-100 group-hover:scale-110 
    transition-transform duration-300"
                    ></div>
                  </div>

                  {/* Image inside white circle, overlapping the red background */}
                  <div className="relative mt-10 z-10">
                    <div className="w-32 h-32 rounded-full bg-white shadow-md flex items-center justify-center mx-auto">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-28 h-28 object-cover rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fallback-image.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Food Info */}
                  <div className="mt-6 px-4 z-10 relative">
                    <h3 className="font-bold text-gray-900 text-base mb-2">
                      {food.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {food.description}
                    </p>
                    <div className="text-[#D73527] text-lg font-bold mb-3">
                      {food.price.toLocaleString("vi-VN")}đ
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(food)}
                      className="border w-[250px] h-12 border-green-600 text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 active:bg-green-100"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No food items found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Category;
