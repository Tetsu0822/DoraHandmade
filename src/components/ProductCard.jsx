import { Heart, ShoppingCart } from "lucide-react";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <a href="#" className={`position-relative d-block ${product.bgClass} p-4 rounded-4 mb-4`}>
        <div className="overflow-hidden rounded-4">
          <img src={product.image} className="w-100 hover:zoom-in" alt={product.name} />
        </div>
        <div className="product-card__like">
          <button type="button" className="d-block bg-gray-50 p-4 rounded-5">
            <Heart />
          </button>
        </div>
      </a>
      <div className="product-card-body">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="text-p-24-b text-gray-600">{product.name}</h5>
            <p className="text-p-20-b text-secondary-700 mb-0">NT${product.price}</p>
          </div>
          <div className="p-3">
            <button type="button" className="product-card__cart d-block bg-transparent p-0">
              <ShoppingCart strokeWidth={2.5} className="text-secondary-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
