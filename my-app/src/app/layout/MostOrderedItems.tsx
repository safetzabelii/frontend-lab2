import { observer } from "mobx-react";
import { useStore } from "../stores/store";
import { useEffect } from "react";

export default observer(function MostOrderedItems() {
    const {menuItemStore} = useStore();
    const {getMenuItems,loadMenuItems} = menuItemStore;
    useEffect(()=>{
      loadMenuItems();
    },[menuItemStore])
return(
<div className="min-h-screen bg-white-900 text-black py-20">
      <h1 className="text-3xl text-center mb-10">Most ordered items</h1>
      <div className="flex flex-wrap justify-center mx-auto max-w-screen-lg">
      {getMenuItems.slice(0, 3).map((menuItem) => (
  
    <div key={menuItem.id} className="m-4 w-72">
      <img
        src={`data:image/jpeg;base64,${menuItem.imagePath}`}
        alt={menuItem.image}
        className="h-72 w-full object-cover shadow-2xl"
      />
      <div className="px-6 py-4">
        <h2 className="text-xl font-medium mb-2">{menuItem.name}</h2>
        <p className="text-gray-400 mb-2">{menuItem.description}</p>
        <p className="text-2xl font-bold mb-2">{menuItem.price}$</p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Add To Cart
        </button>
      </div>
    </div>
))}
      </div>
    </div>
)
});