import PropTypes from 'prop-types';

const Cart = ({ cart, removeFromCart, updateQuantity, getTotalPrice, handleBuyNow }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row md:justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 md:w-16 md:h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded transition-all hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Total: ${getTotalPrice().toFixed(2)}</h3>
            <button
              onClick={handleBuyNow}
              className="mt-4 md:mt-0 bg-green-500 text-white py-2 px-6 rounded transition-all hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  getTotalPrice: PropTypes.func.isRequired,
  handleBuyNow: PropTypes.func.isRequired,
};

export default Cart;
