import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { RecipesContext } from '../../context/RecipesContextProvider';
import IngredientCard from '../../components/IngredientCard/IngredientCard';

const TagRecipes = () => {
  const { tag } = useParams();
  const { recipes } = useContext(RecipesContext);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );

  return (
    <div className='container mx-auto px-6 py-10 bg-white rounded-2xl  transition-shadow duration-300 w-full'>
      <div className="text-center mb-10 ">
        <h2 className='text-4xl font-extrabold text-[#FF7F50] mb-2'>{tag}</h2>

        <p className='text-gray-600 text-lg'>Explore delicious recipes tagged with <span className="font-medium text-gray-800">{tag}</span></p>
        <div className="w-24 h-1 bg-[#FF7F50] mx-auto mt-4 rounded-full"></div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map(recipe => (
            <IngredientCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center text-red-500 text-xl mt-10">
          No recipes found with this tag.
        </div>
      )}
    </div>
  );
};

export default TagRecipes;
