import { useContext, useEffect } from "react";
import { RecipesContext } from "../../context/RecipesContextProvider";
import { useUser } from "@clerk/clerk-react";

export default function AcceptedRequests() {
  const { getAcceptedRecipes, acceptedRecipe } = useContext(RecipesContext);
  
  const{user}= useUser()

  useEffect(() => {
    getAcceptedRecipes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      
      <h2 className="text-2xl font-bold mb-4 text-black"> Accepted Recipes</h2>

      {acceptedRecipe.length === 0 ? (
        <p className="text-gray-500">You don't have any accepted recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {acceptedRecipe.map((recipe) => recipe.userId == user?.id&& (
          <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={recipe.image || "/fallback.jpg"}
                alt={recipe.title}
                className="w-full h-72 "
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                <p className="text-sm text-gray-600 truncate">{recipe.description}</p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                    Status: {recipe.status || "Accepted"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
