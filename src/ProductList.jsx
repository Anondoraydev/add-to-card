 
import PropTypes from 'prop-types';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-sm text-gray-600 mb-4">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 text-white py-2 px-4 rounded transition-all hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
