import { useEffect, useRef, useState } from "react";
import styles from "./AddRecipe.module.css";
import axios from "axios";
import { BASE_URL, Recipe } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AddRecipe() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({mode:"onChange"});
  const [recipes, setRecipes] = useState([]);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([""]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(BASE_URL + Recipe.GET_ALL)
      .then((res) => setRecipes(res.data))
      .catch(console.error);
  }, []);

const onSubmit = async(data) => {
  const cleanedIngredients = ingredients.filter(ing => ing.trim());

  if (!image) {
    alert("Please upload an image.");
    return;
  }

  const maxId = recipes.reduce((max, recipe) => {
    const idNum = parseInt(recipe.id, 10);
    return idNum > max ? idNum : max;
  }, 0);

  const newId = (maxId + 1).toString();

  const payload = {
    id: newId,
    name: data.name,
    image,
    servings: Number(data.servings),
    prepTimeMinutes: Number(data.prepTime),
    cookTimeMinutes: Number(data.cookTime),
    cuisine: data.cuisine,
    ingredients: cleanedIngredients,

    instructions: [
      "Instruction 1",
      "Instruction 2",
      "Instruction 3",
    ],
    difficulty: "Easy",
    caloriesPerServing: 150,
    tags: ["Tag1", "Tag2"],
    userId: 134,
    rating: 4.4,
    reviewCount: 55,
    mealType: ["Main"],
  };

   try {
    await axios.post("http://localhost:3001/pendingRecipes", payload);
    navigate("/pending-request");
  } catch (err) {
    alert("Failed to submit recipe for approval.",err);
  }

};



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleInputChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    if (ingredients.length < 6) setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const renderError = (field) => (
    errors[field] && <p className={styles.error}>{errors[field].message}</p>
  );

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Let's Cook Something New!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label htmlFor="recipeTitle" className={styles.label}>Recipe Title</label>
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
              <button type="button" className={`${styles.imageBtn} ${styles.sameStyleButton}`} onClick={openFilePicker}>
                Change Image
              </button>
              <button type="button" className={`${styles.imageBtnDelete} ${styles.sameStyleButton}`} onClick={handleDelete}>
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
              <button type="button" className={styles.removeIngredientBtn} onClick={() => removeIngredient(idx)}>
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
            <label htmlFor="servings" className={styles.label}>Servings</label>
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
            <label htmlFor="prepTime" className={styles.label}>Prep Time (min)</label>
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
            <label htmlFor="cookTime" className={styles.label}>Cooking Time (min)</label>
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

        <label htmlFor="cuisine" className={styles.label}>Cuisine</label>
        <select
          id="cuisine"
          className={styles.select}
          defaultValue=""
          {...register("cuisine", {
            required: "Cuisine is required",
          })}
        >
          <option value="" disabled>Select cuisine</option>
          {[...new Set(recipes.map((r) => r.cuisine).filter(Boolean))].map((cuisine, i) => (
            <option key={i} value={cuisine}>{cuisine}</option>
          ))}
        </select>
        {renderError("cuisine")}

        <button type="submit" className={styles.submitBtn}>Create Recipe</button>
      </form>
    </div>
  );
}
