import { useContext, useEffect } from "react";
import { RecipesContext } from "../../context/RecipesContextProvider";
import { useUser } from "@clerk/clerk-react";

export default function RejectedRequests() {
  const { getDeclinedRecipes, declinedRecipe } = useContext(RecipesContext);
  const { user } = useUser();

  useEffect(() => {
    getDeclinedRecipes();
  }, []);

  // Filter the rejected recipes to only those that belong to the current user
  const userRejectedRecipes = declinedRecipe?.filter(
    (recipe) => recipe.userId === user?.id
  ) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-red-500">Rejected Recipes</h2>

      {userRejectedRecipes.length === 0 ? (
        <p className="text-gray-500">You have no rejected recipes!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userRejectedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={recipe.image || "/fallback.jpg"}
                alt={recipe.title}
                className="w-full h-48 object-fill"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {recipe.name}
                </h3>
                <span className="text-xs inline-block px-2 py-1 bg-red-100 text-red-600 rounded-full">
                  Rejected
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
