import { useEffect, useRef, useState } from "react";
import styles from "./addRecipe.module.css";
import axios from "axios";
import { BASE_URL, Recipe } from "../../services/api";

export default function AddRecipe() {
  const [recipes,setRecipes]=useState([])


  const getAllRecipes = ()=>{
    axios.get(BASE_URL+Recipe.GET_ALL).then(res=>setRecipes(res.data)
    ).catch(err=>console.log(err)
    )

  }

  useEffect(()=>{
    getAllRecipes()
  },[])

  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState([""]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleDelete = () => {
    setImage(null);
    fileInputRef.current.value = null;
  };

  const handleInputChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    if (ingredients.length < 4) {
      setIngredients([...ingredients, ""]);
    }
  };

  return (
    <>
      <h3>Create new recipe</h3>
      <hr />
      <div className="container">
        <div className="w-50">
          <form>
            <label htmlFor="recpieTitle">Recipe Title:</label>
            <input
              id="recpieTitle"
              type="text"
              className="form-control "
            />

            <label htmlFor="recipeImg">Recipe Image:</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            {image ? (
              <div className={styles.imageWrapper}>
                <img
                  src={image}
                  alt="Uploaded"
                  className={styles.uploadedImage}
                />
                <div className={styles.buttonsContainer}>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={openFilePicker}
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={handleDelete}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.uploadBox} onClick={openFilePicker}>
                <span className={styles.placeholderText}>
                  Click to upload image
                </span>
              </div>
            )}

            <label className="my-2">Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                value={ingredient}
                placeholder={`Ingredient ${index + 1}`}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="form-control my-2"
              />
            ))}

            {ingredients.length < 4 && (
              <button
                type="button"
                onClick={addIngredient}
                className={styles.addButton}
              >
                <i className="fa-solid fa-plus"></i> Add Ingredient
              </button>
            )}

            <label htmlFor="servings">
              Servings:
            </label>
            <input type="number" className="form-control" />
            <p className={styles.smallText}>how many portions does this recipe make </p >
            <label htmlFor="cookingTime">Cooking Time:</label>
            <input type="number" placeholder="Minutes" className="form-control w-25"/>
            <label htmlFor="prepTime">preparing Time:</label>
            <input type="number" placeholder="Minutes" className="form-control w-25"/>
      <label htmlFor="cuisine">Cuisine:</label>
<div className={`${styles.dropdownWrapper} position-relative w-25`}>
  <select className={`form-control ${styles.customSelect}`} id="cuisine">
    <option disabled selected>Select cuisine</option>
    {[...new Set(recipes.map((rec) => rec.cuisine).filter(Boolean))].map(
      (uniqueCuisine, index) => (
        <option key={index} value={uniqueCuisine}>
          {uniqueCuisine}
        </option>
      )
    )}
  </select>
  <i className={`fa-solid fa-chevron-down ${styles.chevronIcon}`}></i>
</div>

          </form>
        </div>
      </div>
    </>
  );
}
