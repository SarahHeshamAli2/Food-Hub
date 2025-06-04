import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, Recipe } from "../../services/api";
import { Table, Badge } from "react-bootstrap";
import { useUser } from "@clerk/clerk-react";
import { RecipesContext } from "../../context/RecipesContextProvider";

export default function AllPendingRequests() {
  const [activeTab, setActiveTab] = useState("inQueue");
 const{user}= useUser()
 const { pendingRecipe,setRecipes, setDeclinedRecipe,getNotifications,getPendingRecipe,setPendingRecipe,setAcceptedRecipe, getAcceptedRecipes, getDeclinedRecipes ,acceptedRecipe,declinedRecipe,recipes} = useContext(RecipesContext);


  useEffect(() => {

    getPendingRecipe();
    getAcceptedRecipes();
    getDeclinedRecipes();
  }, []);
const handleApprove = async (recipe) => {
  try {
    setPendingRecipe(prev => prev.filter(r => r.id !== recipe.id));
    setAcceptedRecipe(prev => [...prev, recipe]);
    setRecipes(prev => [...prev, recipe]); 
    
    await axios.delete(`${BASE_URL}${Recipe.GET_PENDING_RECIPES}/${recipe.id}`);
    await axios.post(`${BASE_URL}${Recipe.GET_ALL}`, recipe); 
    await axios.post(`${BASE_URL}${Recipe.GET_ACCEPTED_RECIPES}` , recipe)
    
    
    await Promise.all([
      getPendingRecipe(),
      getAcceptedRecipes(),
    ]);
    
await axios.post(`${BASE_URL}/notifications`, {
  userId: recipe.userId, 
  message: `Your recipe '${recipe.name}' has been accepted.`,
  status: "unread"
});

await getNotifications(recipe.userId); 

    
  } catch (err) {
    console.error("Approval failed:", err);
    setPendingRecipe(prev => [...prev, recipe]);
    setAcceptedRecipe(prev => prev.filter(r => r.id !== recipe.id));
    setRecipes(prev => prev.filter(r => r.id !== recipe.id));
  }
};
const handleReject = async (recipe) => {
  try {
    setPendingRecipe(prev => prev.filter(r => r.id !== recipe.id));
    setDeclinedRecipe(prev => [...prev, recipe]);
    
    await axios.post(`${BASE_URL}${Recipe.GET_DECLINED_RECIPES}`, recipe);
    await axios.delete(`${BASE_URL}${Recipe.GET_PENDING_RECIPES}/${recipe.id}`);
    
    await Promise.all([
      getPendingRecipe(),
      getDeclinedRecipes()
    ]);
    
await axios.post(`${BASE_URL}/notifications`, {
  userId: recipe.userId, 
  message: `Your recipe '${recipe.name}' has been rejected.`,
  status: "unread"
});
await getNotifications(recipe.userId); 

  } catch (err) {
    console.error("Rejection failed:", err);
    setPendingRecipe(prev => [...prev, recipe]);
    setDeclinedRecipe(prev => prev.filter(r => r.id !== recipe.id));
    
    alert("Failed to reject recipe. Please try again.");
  }
};


  const renderRecipeTable = (recipes, status = "pending") => (
    <Table responsive bordered hover className="text-center align-middle">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Recipe</th>
          <th>Cuisine</th>
          <th>Servings</th>
          <th>Creator</th>
          <th>Status</th>
          {status === "pending" && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe, index) => (
          <tr key={recipe.id || index}>
         
            <td>{index + 1}</td>
            <td>
            
              <div className="d-flex align-items-center justify-content-center gap-2">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <span>{recipe.name}</span>
              </div>
            </td>
            <td>{recipe.cuisine}</td>
            <td>{recipe.servings}</td>
         
            <td>{recipe.creator || "Unknown"}</td>
            <td>
              <Badge bg={status === "pending" ? "warning" : status === "accepted" ? "success" : "danger"}>
                {status === "pending" ? "Processing" : status === "accepted" ? "Accepted" : "Declined"}
              </Badge>
            </td>
            {status === "pending" && (
              <td>
                <i
                  className="fa fa-check-circle text-success me-3"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  onClick={() => handleApprove(recipe)}
                ></i>
                <i
                  className="fa fa-times-circle text-danger"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  onClick={() => handleReject(recipe)}
                ></i>
              </td>
            )}
          </tr>
        ))}
        {recipes.length === 0 && (
          <tr>
            <td colSpan={status === "pending" ? 7 : 6} className="text-muted">
              No {status} requests.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );

  return (
    <div className="container my-4">
      <div className="d-flex border-bottom mb-3">
        <div
          className={`me-4 fw-bold ${activeTab === "accepted" ? "text-primary border-bottom border-primary pb-2" : "text-muted"}`}
          onClick={() => setActiveTab("accepted")}
          style={{ cursor: "pointer" }}
        >
          Accepted
        </div>
        <div
          className={`me-4 fw-bold ${activeTab === "inQueue" ? "text-primary border-bottom border-primary pb-2" : "text-muted"}`}
          onClick={() => setActiveTab("inQueue")}
          style={{ cursor: "pointer" }}
        >
          In Queue
        </div>
        <div
          className={`fw-bold ${activeTab === "declined" ? "text-primary border-bottom border-primary pb-2" : "text-muted"}`}
          onClick={() => setActiveTab("declined")}
          style={{ cursor: "pointer" }}
        >
          Declined
        </div>
      </div>
      {activeTab === "inQueue" && renderRecipeTable(pendingRecipe, "pending")}
      {activeTab === "accepted" && renderRecipeTable(acceptedRecipe, "accepted")}
      {activeTab === "declined" && renderRecipeTable(declinedRecipe, "declined")}
    </div>
  );
}
