import { useContext } from "react";
import { RecipesContext } from "../../context/RecipesContextProvider";
import { useUser } from "@clerk/clerk-react";

export default function CreatedRecipes() {
  const { recipes } = useContext(RecipesContext);
  const { user } = useUser();

  const myRecipes = recipes.filter((rec) => rec.userId === user?.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-black">My Created Recipes</h2>

      {!recipes.length ? (
        <p className="text-gray-500">Loading recipes...</p>
      ) : myRecipes.length === 0 ? (
        <p className="text-gray-500">You haven't created any recipes yet.</p>
      ) : (
<div className="flex flex-col gap-6 w-full">
  {myRecipes.map((recipe) => (
    <div
    
      key={recipe.id}
  className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full"
    >
   <div className="w-full md:w-64 md:h-auto flex-shrink-0">
  <img
    src={recipe.image || "/fallback.jpg"}
    alt={recipe.name}
    className="w-full h-full object-cover"
  />
</div>

      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold mb-1">{recipe.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {recipe.cuisine} • {recipe.mealType?.join(", ")}
        </p>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <strong>Prep:</strong> {recipe.prepTimeMinutes} min |{" "}
            <strong>Cook:</strong> {recipe.cookTimeMinutes} min
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings} |{" "}
            <strong>Calories:</strong> {recipe.caloriesPerServing} kcal
          </p>
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Rating:</strong> {recipe.rating} ⭐ ({recipe.reviewCount} reviews)
          </p>
          <p>
            <strong>Tags:</strong> {recipe.tags?.join(", ")}
          </p>
          <p>
            <strong>By:</strong> {recipe.creator}
          </p>
        </div>

        <details className="mt-2 text-sm text-blue-600 cursor-pointer">
          <summary className="font-medium">Ingredients & Instructions</summary>
          <div className="mt-1 text-gray-700">
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>
            <p className="mt-1">
              <strong>Instructions:</strong>
            </p>
            <ol className="list-decimal list-inside">
              {recipe.instructions.map((inst, index) => (
                <li key={index}>{inst}</li>
              ))}
            </ol>
          </div>
        </details>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
}
