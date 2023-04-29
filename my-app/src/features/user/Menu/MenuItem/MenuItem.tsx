
const MenuItem = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="flex justify-between items-center px-6 py-4 bg-green-500 text-white">
    <h3 className="font-bold text-lg">Main Dishes</h3>
    <input type="text" placeholder="Search menu items" className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex-grow" />
  <button className="ml-3 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    Search
  </button>
  </div>


  <div className="flex items-center justify-between border-b border-gray-200 py-4">
  <div className="flex items-center">
    <img src="https://via.placeholder.com/64" alt="Menu item" className="h-16 w-16 rounded-lg mr-4" />
    <div>
      <h3 className="text-lg font-medium text-gray-900">Cheeseburger</h3>
      <p className="text-gray-500">$10.99</p>
    </div>
  </div>
  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    Add to Cart
  </button>
</div>

</div>


    );
};
export default MenuItem;