import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, Recipe } from "../../services/api";
import { Button, Badge } from "react-bootstrap";

export default function AllPendingRequests() {
  const [pendingRecipe, setPendingRecipe] = useState([]);
  const [acceptedRecipe, setAcceptedRecipe] = useState([]);
  const [activeTab, setActiveTab] = useState("inQueue");

  const getPendingRecipe = () => {
    axios
      .get(BASE_URL + Recipe.GET_PENDING_RECIPES)
      .then((res) => setPendingRecipe(res.data))
      .catch((err) => console.log(err));
  };
  const getAcceptedRecipes = () => {
    axios
      .get(BASE_URL + Recipe.GET_ACCEPTED_RECIPES)
      .then((res) => setAcceptedRecipe(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPendingRecipe();
    getAcceptedRecipes()
  }, []);

const handleApprove = (recipe) => {
  axios
    .post(BASE_URL + Recipe.GET_ALL, recipe)
    .then(() => {
      return axios.post(BASE_URL + Recipe.GET_ACCEPTED_RECIPES, recipe);
    })
    .then(() => {
      return axios.delete(`${BASE_URL + Recipe.GET_PENDING_RECIPES}/${recipe.id}`);
    })
    .then(() => {
      setAcceptedRecipe((prev) => [...prev, recipe]);
      setPendingRecipe((prev) => prev.filter((r) => r.id !== recipe.id));
      setActiveTab("accepted");
    })
    .catch((err) => console.error("Approval failed:", err));
};

  const handleReject = (id) => {
    axios
      .delete(`${BASE_URL + Recipe.GET_PENDING_RECIPES}/${id}`)
      .then(() => getPendingRecipe());
  };



  const renderRecipeCards = (recipes, isPending = true) => (
    <div className="row g-4">
      {recipes.map((recipe, index) => (
        <div className="col-md-6 col-xl-4" key={index}>
          <div className="border rounded shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
       
            </div>
            <hr className="my-2" />
            <div className="d-flex align-items-center mb-3">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="rounded-circle me-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <div className="fw-semibold">Recipe Name</div>
                <div>{recipe.name}</div>
              </div>
            </div>
          
            <div className="mb-2">
              <div >Cuisine: <span className="fw-bold">{recipe.cuisine}</span></div>
              
            </div>
            <div className="mb-2">
              <div >Servings: <span className="fw-semibold">{recipe.servings}</span></div>
            </div>
            <div className="mb-2">
              <div >Creator : <span className="fw-semibold"> {recipe.creator || "Unknown"}</span></div>
            </div>
          
            {isPending && (
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="w-50"
                  onClick={() => handleReject(recipe.id)}
                >
                  ✕ Decline
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                     className="w-50"
                  onClick={() => handleApprove(recipe)}
                >
                  ✓ Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
      {recipes.length === 0 && (
        <p className="text-center text-muted">No {isPending ? "pending" : "accepted"} requests.</p>
      )}
    </div>
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
    
      </div>
      {activeTab === "inQueue" && renderRecipeCards(pendingRecipe, true)}
      {activeTab === "accepted" && renderRecipeCards(acceptedRecipe, false)}
    </div>
  );
}
