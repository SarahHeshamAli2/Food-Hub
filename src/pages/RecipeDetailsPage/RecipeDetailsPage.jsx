import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import IngredientCard from "../../components/IngredientCard/IngredientCard";
import { RecipesContext } from "../../context/RecipesContextProvider";
import Reviews from "../../components/Reviews/Reviews";
import { CommentContext } from "../../context/CommentsContext";
import RecipeDetailAccordion from "./RecipeDetailAccordion";
import RecipeLoader from '../../components/Loader/RecipeLoader';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const { recipes } = useContext(RecipesContext);
  const { reviews = [] } = useContext(CommentContext) || {};
  const [recipe, setRecipe] = useState(null);

  const reviewCount = reviews?.filter((review) => review.recipeId === id).length;

  useEffect(() => {
    if (recipes.length > 0) {
      const foundRecipe = recipes.find((recipe) => String(recipe.id) === id);
      setRecipe(foundRecipe);
    }
  }, [id, recipes]);

  if (!recipes.length) return <RecipeLoader/>;
  if (!recipe) return <div>Recipe not found</div>;

  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;
  const nutritionFacts = {
    calories: recipe.caloriesPerServing,
    carbs: "80g",
    fat: "18g",
    protein: "24g",
    fiber: "23g",
    netCarbs: "56g",
    sodium: "444mg",
    cholesterol: "5mg",
  };

  return (
    <div className="recipe-details">
      <div className="container m-md-4">
        <div className="row justify-between">
          <div className="w-100">
            <div className="recipe-header mb-2">
              <h1 className="mb-3 fw-bolder">{recipe.name}</h1>

              {/* Metadata */}
              <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                {/* Rating */}
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning text-dark me-2">
                    <i className="fas fa-star me-1"></i> {recipe.rating}
                  </span>
                  <small>({reviewCount} reviews)</small>
                </div>

                {/* Difficulty */}
                <div className="badge bg-success text-white">
                  <i className="fas fa-signal me-1"></i> {recipe.difficulty}
                </div>

                {/* Meal Type */}
                {recipe.mealType?.map((type, index) => (
                  <div key={index} className="badge bg-info text-white">
                    <i className="fas fa-utensils me-1"></i> {type}
                  </div>
                ))}

                {/* Cuisine */}
                <div className="badge bg-primary text-white">
                  <i className="fas fa-globe-americas me-1"></i> {recipe.cuisine}
                </div>
              </div>
            </div>
            <hr className="my-2" />
          </div>

          {/* Main Content */}
          <div className="col-md-7">
            <div className="ratio ratio-16x9">
              <img
                src={recipe.image}
                alt="recipe"
                className="img-fluid object-cover rounded mb-2 shadow"
              />
            </div>
            <div className="d-flex justify-content-evenly bg-light p-3 rounded mb-4">
              <div className="text-center">
                <div className="fw-bold">
                  <i className="fas fa-clock me-2"></i>Prep time:
                </div>
                <div>{recipe.prepTimeMinutes}</div>
              </div>
              <div className="text-center">
                <div className="fw-bold">
                  <i className="fas fa-fire me-2"></i>Cook time:
                </div>
                <div>{recipe.cookTimeMinutes}</div>
              </div>
              <div className="text-center">
                <div className="fw-bold">
                  <i className="fas fa-utensils me-2"></i>Serving
                </div>
                <div>{recipe.servings} Serving</div>
              </div>
            </div>

            <RecipeDetailAccordion
              ingredients={ingredients}
              instructions={instructions}
            />

            <div className="comment-section border-t-2">
              <h1 className="fs-2 my-2">Comments</h1>
              <Reviews id={id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-4">
            <div className="card shadow-sm bg-secondary">
              <div className="card-header border-0 pb-0">
                <h2 className="h5 mb-0">Nutrition Facts</h2>
              </div>
              <div className="card-body px-0 py-2 mb-3">
                <table className="table table-borderless mb-0">
                  <tbody>
                    {Object.entries(nutritionFacts).map(([key, value]) => (
                      <tr key={key}>
                        <td className="ps-4 fw-normal text-start">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                        <td className="pe-4 text-end">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Recipes */}
            <div>
              <h3 className="my-4 fw-bolder">Recent Recipes</h3>
              {recipes.slice(0, 3).map((item) => (
                <IngredientCard key={item?.id} recipe={item} />
              ))}
            </div>

            {/* Tags */}
            <div className="mt-4">
              <h4 className="mb-3">Tags</h4>
              <div className="d-flex flex-wrap gap-2">
                {recipe.tags?.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/tags/${tag.toLowerCase()}`}
                    className="btn btn-sm btn-outline-secondary text-decoration-none"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
