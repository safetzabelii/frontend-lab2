import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import menuItemStore from "../../../../app/stores/menuItemStore";
import { useStore } from "../../../../app/stores/store";

export default observer(function MenuItems (){
    const {menuItemStore} = useStore();
    const {loadMenuItems, deleteMenuItem, getMenuItems} = menuItemStore;
    const [target, setTarget] = useState('');

   

    useEffect(() => {
        loadMenuItems();
    },[loadMenuItems]);

    return(
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-9 ml-4 mr-4">
          {getMenuItems.map((menuitem) => (
           <div key={menuitem.id} className="bg-white shadow rounded-lg overflow-hidden">
           <div className="p-4">
             <div className="relative">
               <a href="#" className="block">
                 <div
                   className="w-64 h-48 bg-cover bg-center"
                   style={{
                     backgroundImage: `url(data:image/jpeg;base64,${menuitem.imagePath})`,
                   }}
                 ></div>
                 <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                  <div>
                   <p className="text-white font-bold text-xl">{menuitem.name}</p>
                   </div>
                   <div >
               <span className="text-gray-900 font-bold text-xl">{menuitem.description}</span>
             </div>
                   <div >
               <span className="text-gray-900 font-bold text-xl">${menuitem.price}</span>
             </div>
                 </div>
               </a>
             </div>
            
           </div>
           <div className="relative">
             <button
               className="absolute bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full bottom-3 right-3"
               onClick={(e) => console.log('hello')}
               name={menuitem.name}
             >
               {target === menuitem.name ? 'Adding...' : 'Add to cart'}
             </button>
           </div>
         </div>
         
          ))}
          </div>
        </>
    );
})