import React from "react";
import { Link } from "react-router-dom";
import { Bookmark, Flame, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function RecipeCard({ id, image, title, author = "Chef Ahmed", calories, delay }) {
  return (
    <Link to={`/recipes/${id}`} className="no-underline text-inherit">

      <div

        className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[300px] flex flex-col transition-transform hover:scale-[1.03]"

      >
        <div className="relative">
          <img src={image} alt={title} className="w-full h-[180px] object-cover" />
          <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
            <Bookmark size={18} className="text-red-500" />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between">
          <h3 className="text-sm font-medium capitalize mb-2">{title}</h3>
          <div className="flex justify-between items-center text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <UserCircle size={16} />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame size={16} className="text-red-500" />
              <span>{calories} cals</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
