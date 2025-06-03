import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function RecipeDetailAccordion({ingredients,instructions}) {
      const [open, setOpen] = useState(false);



return <>
  <div className="bg-white shadow rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-5 py-4 text-left font-semibold text-gray-800 text-lg hover:bg-gray-50 transition"
      >
        <span>
          <i className="fas fa-utensils mr-2 text-blue-600"></i>
          Recipe Details
        </span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {open && (
        <div className="px-6 pb-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              <i className="fas fa-mortar-pestle mr-2 text-blue-500"></i>
              Ingredients:
            </h2>
            <ul className="space-y-1">
              {ingredients.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 px-4 py-2 rounded text-gray-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              <i className="fas fa-clipboard-list mr-2 text-green-500"></i>
              Instructions:
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              {instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="bg-gray-100 px-4 py-2 rounded text-gray-700"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
</>
}
