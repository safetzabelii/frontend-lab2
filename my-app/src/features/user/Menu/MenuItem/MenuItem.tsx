import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import menuItemStore from "../../../../app/stores/menuItemStore";
import { useStore } from "../../../../app/stores/store";

export default observer(function MenuItems (){
    const {menuItemStore} = useStore();
    const {loadMenuItems, deleteMenuItem, getMenuItems} = menuItemStore;
    const [target, setTarget] = useState('');

    function handleMenuItemDelete(e: SyntheticEvent<HTMLButtonElement>, id: number) {
      setTarget(e.currentTarget.name);
      deleteMenuItem(id);
    }

    useEffect(() => {
        loadMenuItems();
    },[loadMenuItems]);

    return(
        <>
        {getMenuItems.map((menuitem) => (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getMenuItems.map((menuitem) => (
            <div key={menuitem.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="relative">
                <button className="absolute top-0 right-0 m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e) => handleMenuItemDelete(e, menuitem.id)} name={menuitem.name}>
                  {target === menuitem.name ? "Deleting..." : "Delete"}
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{menuitem.name}</h3>
                <p className="text-gray-700 text-base mb-4">{menuitem.description}</p>
                <div>
                  <a href="#">
                          <img className="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />    
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold text-xl">${menuitem.price}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        ))}
        </>
    );
})