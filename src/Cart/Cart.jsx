// import React from "react";

// const Cart = ({ cart }) => {
//   const totalAmount = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         🛒 Giỏ hàng của bạn
//       </h2>

//       {cart.length === 0 ? (
//         <div className="text-center text-gray-500">Giỏ hàng đang trống.</div>
//       ) : (
//         <div className="space-y-4">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div>
//                   <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     Số lượng: {item.quantity}
//                   </p>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold text-[#D73527]">
//                   {(item.price * item.quantity).toLocaleString("vi-VN")}đ
//                 </p>
//               </div>
//             </div>
//           ))}

//           <div className="text-right mt-6">
//             <p className="text-lg font-semibold text-gray-700">
//               Tổng cộng:{" "}
//               <span className="text-[#D73527]">
//                 {totalAmount.toLocaleString("vi-VN")}đ
//               </span>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// Cart.jsx
import React from "react";
import { checkoutOrder } from "../api/checkoutApi";

const Cart = ({ cart, setCart, onClose }) => {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //   const handleCheckout = () => {
  //     alert("🎉 Thanh toán thành công!");
  //     setCart([]); // Xóa giỏ hàng sau khi thanh toán
  //     onClose();
  //   };

  const handleCheckout = async () => {
    try {
      await checkoutOrder(cart, "khachhang@gmail.com"); // hoặc input email thực
      alert("🧾 Đơn hàng đã được gửi thành công!");
      setCart([]); // reset giỏ hàng sau khi gửi
    } catch (err) {
      alert("❌ Gửi đơn hàng thất bại!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">🛒 Giỏ hàng</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Giỏ hàng đang trống.
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[#D73527] font-bold">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:underline mt-1"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <p className="text-right text-lg font-semibold text-gray-800 mb-4">
                Tổng:{" "}
                <span className="text-[#D73527]">
                  {totalAmount.toLocaleString("vi-VN")}đ
                </span>
              </p>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#D73527] text-white py-3 rounded-lg font-semibold hover:bg-[#b82a1f] transition"
              >
                Thanh Toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
