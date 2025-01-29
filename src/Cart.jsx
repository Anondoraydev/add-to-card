
import PropTypes from 'prop-types';

const Cart = ({ cart, removeFromCart, updateQuantity, getTotalPrice, handleBuyNow }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h3>{product.title}</h3>
                  <p>Price: ${product.price}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className="px-2 py-1 bg-gray-400 text-white rounded"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className="px-2 py-1 bg-gray-400 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded transition-all hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <h3 className="text-xl font-semibold">Total: ${getTotalPrice().toFixed(2)}</h3>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white py-2 px-6 rounded transition-all hover:bg-green-600"
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
