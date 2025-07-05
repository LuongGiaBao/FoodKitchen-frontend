import React, { useState } from "react";

const RequestDish = ({ onClose, onSubmit }) => {
  const [dishName, setDishName] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (dishName.trim()) {
      onSubmit({ name: dishName, note });
      setDishName("");
      setNote("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-red-600">
          Gửi yêu cầu món ăn
        </h2>
        <input
          type="text"
          placeholder="Tên món ăn bạn muốn"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />
        <textarea
          placeholder="Ghi chú thêm (nếu có)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400 text-gray-700"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
          >
            Gửi yêu cầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDish;
