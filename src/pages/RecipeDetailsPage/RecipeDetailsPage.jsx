import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {recipesContext} from '../../context/RecipesContextProvider';
import IngredientCard from '../../components/IngredientCard/IngredientCard';

const RecipeDetailsPage = () => {
    const { id } = useParams();
    const recipes = useContext(recipesContext);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        if (recipes.length > 0) {
            const foundRecipe = recipes.find(recipe => String(recipe.id) === id);
            setRecipe(foundRecipe);
        }
    }, [id, recipes]);

    if (!recipes.length) return <div>Loading recipes...</div>;
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
        cholesterol: "0mg"
    };

    return (
        <div className='recipe-details'>
            <div className='container m-4'>
                <div className='row'>
                    <div className="recipe-header mb-2">
                        <h1 className="mb-3 fw-bolder">{recipe.name}</h1>
                        
                        {/* Metadata Section */}
                        <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                            {/* Rating */}
                            <div className="d-flex align-items-center">
                            <span className="badge bg-warning text-dark me-2">
                                <i className="fas fa-star me-1"></i> {recipe.rating}
                            </span>
                            <small>({recipe.reviewCount} reviews)</small>
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
                        <hr />
                    <div className="col-md-8">
                        <div className="ratio ratio-16x9">
                            <img src={recipe.image} alt="recipe" className='img-fluid object-fit-cover rounded mb-2 shadow'/>
                        </div>
                        <div className='d-flex justify-content-evenly bg-light p-3 rounded mb-4'>
                            <div className='text-center'>
                            <div className='fw-bold'>
                                <i className="fas fa-clock me-2"></i>Prep time:
                            </div>
                            <div>{recipe.prepTimeMinutes}</div>
                            </div>
                            <div className='text-center'>
                            <div className='fw-bold'>
                                <i className="fas fa-fire me-2"></i>Cook time:
                            </div>
                            <div>{recipe.cookTimeMinutes}</div>
                            </div>
                            <div className='text-center'>
                            <div className='fw-bold'>
                                <i className="fas fa-utensils me-2"></i>Serving
                            </div>
                            <div>{recipe.servings} Serving</div>
                        </div>
                    </div>
                        <h2 className='mb-3'>
                            <i className="fas fa-mortar-pestle me-2"></i>Ingredients:
                        </h2>
                        <ul className="list-group mb-4">
                            {ingredients.map((i, index) => (
                                <li className="list-group-item border-0 bg-light mb-1 rounded" key={index}>{i}</li>
                            ))}
                        </ul>
                         <h2 className='mb-3'>
                            <i className="fas fa-clipboard-list me-2"></i>Instructions
                        </h2>
                        <ol className="list-group list-group-numbered mb-4">
                            {instructions.map((i, index) => (
                                <li className="list-group-item border-0 bg-light mb-1 rounded" key={index}>
                                    {i}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className='col-md-4'>
                    <div className='card shadow-sm bg-secondary'>
                        <div className='card-header border-0 pb-0'>
                        <h2 className='h5 mb-0'>Nutrition Facts</h2>
                        </div>
                        <div className='card-body px-0 py-2 mb-3'>
                            <table className="table table-borderless mb-0">
                                <tbody>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Calories</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.calories}</td>
                                </tr>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Carbs</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.carbs}</td>
                                </tr>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Fat</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.fat}</td>
                                </tr>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Protein</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.protein}</td>
                                </tr>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Fiber</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.fiber}</td>
                                </tr>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Net carbs</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.netCarbs}</td>
                                </tr>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Sodium</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.sodium}</td>
                                </tr>
                                <tr>
                                    <td className='ps-4 fw-normal text-start'>Cholesterol</td>
                                    <td className='pe-4 text-end'>{nutritionFacts.cholesterol}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    <div>
                        <h3>Recent Recipes</h3>
                        {
                            recipes.slice(0, 3).map((recipe) => (
                                <IngredientCard recipe={recipe}>
                                </IngredientCard>
                            ))
                        }
                    </div>
                    <div className="mt-4">
                        <h4 className="mb-3">Tags</h4>
                        <div className="d-flex flex-wrap gap-2">
                            {recipe.tags?.map((tag, index) => (
                            <a 
                                key={index} 
                                href={`/tags/${tag.toLowerCase()}`} 
                                className="btn btn-sm btn-outline-secondary text-decoration-none"
                            >
                                #{tag}
                            </a>
                            ))}
                        </div>
                    </div>
  
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default RecipeDetailsPage;