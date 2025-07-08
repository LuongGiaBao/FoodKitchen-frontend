import React from "react";
import logobanner from "../assets/welcome banner.png";
import { sendRequestDish } from "../api/requestDishApi";
const hero = {
  title: "Chào mừng đến với bếp yêu thương",
  description:
    "Khám phá những món ăn tuyệt vời và yêu cầu thêm món bạn yêu thích bất cứ lúc nào!",
};

const Hero = ({ setIsRequestOpen }) => {
  const handleDishRequest = async (formData) => {
    try {
      await sendRequestDish({ ...formData });
      alert("✅ Đã gửi yêu cầu món ăn thành công!");
    } catch {
      alert("❌ Gửi yêu cầu thất bại.");
    }
  };
  return (
    <>
      <section className="bg-[#D73527] rounded-xl opacity-70 text-white p-8 mt-6 mx-4 relative overflow-hidden">
        <div className="max-w-3xl animate-pulse">
          <h1 className="text-3xl font-bold mb-4 animate-slide-up ">
            {hero.title}
          </h1>
          <p className="text-lg mb-6">{hero.description}</p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsRequestOpen(true)}
              className=" bg-red-500  text-white font-semibold px-6 py-2 rounded-md transition hover:bg-white"
            >
              Yêu cầu thêm món ăn
            </button>
          </div>
        </div>

        {/* Hình minh họa tô mì */}
        <img
          src={logobanner}
          alt="noodle"
          className="absolute right-8 top-8 w-32  pointer-events-none select-none"
        />
      </section>
    </>
  );
};

export default Hero;
