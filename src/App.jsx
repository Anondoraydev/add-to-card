import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cart from './Cart';
import ProductList from './ProductList';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleBuyNow = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-900 ">
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>

      <div className="flex gap-8">
        <div className="flex-1">
          <ProductList products={currentProducts} addToCart={addToCart} />

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
            >
              Prev
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastProduct >= products.length}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>

        <div className="w-80 p-4 border rounded shadow-lg dark:bg-amber-500 bg-gray-100">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            getTotalPrice={getTotalPrice}
            handleBuyNow={handleBuyNow}
          />
        </div>
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center w-96">
            <h2 className="text-xl font-semibold mb-4">Purchase Successful!</h2>
            <p>Your purchase has been completed successfully.</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white py-2 px-6 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

App.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  isPopupVisible: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  getTotalPrice: PropTypes.func.isRequired,
  handleBuyNow: PropTypes.func.isRequired,
};

export default App;
