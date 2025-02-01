import PropTypes from 'prop-types';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProductList = ({ products, addToCart }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className=" bg-gray-100 dark:bg-gray-900">
      <nav className="flex justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Product List</h1>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="p-2 flex items-center gap-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md"
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </nav>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md flex flex-col justify-between bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white py-2 px-4 rounded transition-all hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center gap-2"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
