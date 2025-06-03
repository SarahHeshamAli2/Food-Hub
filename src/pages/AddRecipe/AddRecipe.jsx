import { useContext, useEffect } from "react";
import styles from "./AddRecipe.module.css";
import { BASE_URL, Recipe } from "../../services/api";
import { useForm } from "react-hook-form";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useIngredients } from "../../hooks/useIngredients";
import useSubmitRecipe from "../../hooks/useSubmitRecipe";
import { useParams } from "react-router-dom";
import { RecipesContext } from "../../context/RecipesContextProvider";
import axios from "axios";


export default function AddRecipe() {
  const{recipes,setRecipes}=useContext(RecipesContext)






  const {id} = useParams()
useEffect(() => {
  if (id !== "new-recipe") {
    axios.get(BASE_URL + Recipe.GET_BY_ID(id)).then(async (res) => {
      const response = res.data;

      setValue("name", response.name);
      setValue("servings", response.servings);
      setValue("cookTime", response.cookTimeMinutes);
      setValue("prepTime", response.prepTimeMinutes);
      setValue("cuisine", response.cuisine);

      if (Array.isArray(response.ingredients)) {
        setIngredients(response.ingredients);
      }

      if (response.image) {
        try {
          await setImageFromExistingValue(response.image);
        } catch (err) {
          console.error("Error setting image from value:", err);
        }
      }
    });
  }
}, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({ mode: "onChange" });


const {
  image,
  fileInputRef,
  handleImageChange,
  openFilePicker,
  handleDelete,
  setImageFromExistingValue, 
} = useImageUpload();const { ingredients, addIngredient, removeIngredient, handleInputChange, setIngredients } = useIngredients();
  const submitRecipe = useSubmitRecipe(recipes, image,setRecipes);


  const onSubmit = (data) => {
  submitRecipe(data, ingredients, id !== "new-recipe" ? id : null);
  };

  const renderError = (field) =>
    errors[field] && <p className={styles.error}>{errors[field].message}</p>;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Let's Cook Something New!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="recipeTitle" className={styles.label}>
          Recipe Title
        </label>
        <input
          id="recipeTitle"
          type="text"
          className={styles.input}
          placeholder="E.g., Spaghetti Bolognese"
          {...register("name", {
            required: "Recipe name is required",
            minLength: { value: 3, message: "Minimum 3 characters required" },
          })}
        />
        {renderError("name")}

        <label className={styles.label}>Recipe Image</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        {image ? (
          <div className={styles.imagePreviewWrapper}>
            <img src={image} alt="Uploaded" className={styles.imagePreview} />
            <div className={styles.imageActions}>
              <button
                type="button"
                className={`${styles.imageBtn} ${styles.sameStyleButton}`}
                onClick={openFilePicker}
              >
                Change Image
              </button>
              <button
                type="button"
                className={`${styles.imageBtnDelete} ${styles.sameStyleButton}`}
                onClick={handleDelete}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.imagePlaceholder} onClick={openFilePicker}>
            <span>Click or drag image here to upload</span>
          </div>
        )}

        <label className={styles.label}>Ingredients</label>
        <div className={styles.ingredientsContainer}>
          {ingredients.map((ing, idx) => (
            <div key={idx} className={styles.ingredientRow}>
              <input
                type="text"
                value={ing}
                placeholder={`Ingredient ${idx + 1}`}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.removeIngredientBtn}
                onClick={() => removeIngredient(idx)}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className={styles.addIngredientBtn}
            disabled={ingredients.length >= 6}
          >
            + Add Ingredient
          </button>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label htmlFor="servings" className={styles.label}>
              Servings
            </label>
            <input
              id="servings"
              type="number"
              className={styles.input}
              placeholder="e.g., 4"
              {...register("servings", {
                required: "Servings are required",
                min: { value: 1, message: "Must be at least 1" },
              })}
            />
            {renderError("servings")}
            <small className={styles.helpText}>Number of portions</small>
          </div>

          <div className={styles.col}>
            <label htmlFor="prepTime" className={styles.label}>
              Prep Time (min)
            </label>
            <input
              id="prepTime"
              type="number"
              className={styles.input}
              placeholder="e.g., 15"
              {...register("prepTime", {
                required: "Prep time is required",
                min: { value: 1, message: "Must be at least 1 minute" },
              })}
            />
            {renderError("prepTime")}
          </div>

          <div className={styles.col}>
            <label htmlFor="cookTime" className={styles.label}>
              Cooking Time (min)
            </label>
            <input
              id="cookTime"
              type="number"
              className={styles.input}
              placeholder="e.g., 30"
              {...register("cookTime", {
                required: "Cooking time is required",
                min: { value: 1, message: "Must be at least 1 minute" },
              })}
            />
            {renderError("cookTime")}
          </div>
        </div>

        <label htmlFor="cuisine" className={styles.label}>
          Cuisine
        </label>
        <select
          id="cuisine"
          className={styles.select}
          
          {...register("cuisine", {
            required: "Cuisine is required",
          })}
        >
          <option value="" disabled>
            Select cuisine
          </option>
          {[...new Set(recipes.map((r) => r.cuisine).filter(Boolean))].map(
            (cuisine, i) => (
              <option key={i} value={cuisine}>
                {cuisine}
              </option>
            )
          )}
        </select>
        {renderError("cuisine")}

        <button type="submit" className={styles.submitBtn}>
         {id !='new-recipe' ? 'Update Recipe' : ' Create Recipe'}
        </button>
      </form>
    </div>
  );
}
