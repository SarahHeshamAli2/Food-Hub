import Card from 'react-bootstrap/Card';

function IngredientCard({recipe, children}) {
  return (
    <Card key={recipe.id} className='border-0 rounded-0 m-2 shadow-lg'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <Card.Img 
                src={recipe.image} 
                className='img-fluid h-100'
                style={{objectFit: 'cover'}}
                alt={recipe.name}
              />
            </div>
            <div className='col-md-8'>
              <Card.Body>
                <Card.Title className='h6 mb-1'>{recipe.name}</Card.Title>
                <Card.Text className='small text-muted mb-1'>
                  {recipe.description || "Light & Simple"}
                </Card.Text>
                <div className='d-flex justify-content-between align-items-center'>
                  <span className='text-warning small'>
                    <i className="fas fa-star"></i> {recipe.rating}
                  </span>
                  <span className='small'>
                    <i className="fas fa-fire text-danger"></i> {recipe.caloriesPerServing || 300} cal
                  </span>
                </div>
                {children && (
                  <div className="d-flex gap-2">
                    {children}
                  </div>
                )}
              </Card.Body>
            </div>
          </div>
        </Card>
  );
}

export default IngredientCard;