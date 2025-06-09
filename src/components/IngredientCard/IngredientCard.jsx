import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function IngredientCard({ recipe, children }) {
  return (
    <Card key={recipe.id} className="border-0 rounded m-2">
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={`/recipes/${recipe?.id}`}>
            <Card.Img
              src={recipe.image}
              className="img-fluid h-100"
              style={{ objectFit: 'cover' }}
              alt={recipe.name}
            />
          </Link>
        </div>
        <div className="col-md-8">
          <Card.Body>
            <Link to={`/recipes/${recipe?.id}`} className="text-decoration-none text-dark">
              <Card.Title className="h6 mb-1">{recipe.name}</Card.Title>
              <Card.Text className="small text-muted mb-1">
                {recipe.description || 'Light & Simple'}
              </Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-warning small">
                  <i className="fas fa-star"></i> {recipe.rating}
                </span>
                <span className="small">
                  <i className="fas fa-fire text-danger"></i> {recipe.caloriesPerServing || 300} cal
                </span>
              </div>
            </Link>

            {children && <div className="d-flex gap-2 mt-2">{children}</div>}
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default IngredientCard;