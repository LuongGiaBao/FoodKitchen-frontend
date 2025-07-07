import React, { useEffect, useState } from "react";
import { fetchAllFood } from "../api/foodApi";
import food from "../assets/ga-ran.png";
const categories = [
  "All Items",
  "Popular",
  "Phở / Bún / Mì",
  "Đồ ăn nhanh",
  "Cơm",
  "Đồ ăn vặt",
  "Thức uống",
];

const Category = ({ cart, setCart, searchKeyword }) => {
  const [selected, setSelected] = useState("All Items");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

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
        food.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        food.description.toLowerCase().includes(searchKeyword.toLowerCase());

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
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  return (
    <>
      {/* Category Selector */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-[#fffaf5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 text-center lg:text-left">
            Categories
          </h2>

          {/* Mobile: 2 columns grid */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm text-center transition-all duration-200
                    ${
                      selected === cat
                        ? "bg-[#D73527] text-white shadow-md"
                        : "bg-white text-gray-800 border border-gray-200 hover:border-[#D73527] hover:text-[#D73527]"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tablet & Desktop */}
          <div className="hidden sm:flex flex-wrap gap-3 justify-center lg:justify-start">
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
      </section>

      {/* Food Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 bg-white">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-48 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = { food };
                      }}
                    />

                    {/* Rating or Popular Badge */}
                    <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-md">
                      <span className="text-yellow-500 text-sm font-medium flex items-center gap-1">
                        ⭐ {food.rating}
                      </span>
                    </div>

                    {/* Category or Popular */}
                    <div className="absolute top-3 left-3 bg-[#D73527] text-white text-xs px-2 py-1 rounded-full">
                      {selected === "Popular" ? "Popular" : food.category}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#D73527] font-bold text-lg">
                        {food.price.toLocaleString("vi-VN")}đ
                      </span>
                      <button
                        onClick={() => handleAddToCart(food)}
                        className="bg-[#D73527] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b82a1f] transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        Add +
                      </button>
                    </div>
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
