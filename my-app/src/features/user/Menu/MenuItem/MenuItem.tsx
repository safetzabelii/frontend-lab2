import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useStore } from "../../../../app/stores/store";
import { CartForEditDto } from "../../../../app/models/Cart/CartForEditDto";
import { MenuItemForCartEditDto } from "../../../../app/models/MenuItem/MenuItemForCartEditDto";

export default observer(function MenuItems() {
  const { menuItemStore,userStore,cartStore } = useStore();
  const { loadMenuItems, deleteMenuItem, getMenuItems } = menuItemStore;
  const {user} = userStore;
  const {loadCart,selectedCart} = cartStore;
  const [target, setTarget] = useState("");
  const [cart, setCart] = useState<CartForEditDto>({
    id:'',
    userId:'',
    cartMenuItems:[],
    }
  )
  const [menuItem, setMenuItem] = useState<MenuItemForCartEditDto>({
    menuItemId:0,
    quantity:0,
  })
  
  useEffect(() => {
    loadMenuItems();
    loadCart(user?.id!);
  }, [loadMenuItems,loadCart,user?.id]);

  function handleAddMenuItemToCart(id: number) {
    menuItem.menuItemId = id;
    menuItem.quantity = 1;
      if (cart && cart.cartMenuItems) {
      cart.id = selectedCart?.id!;
      cart.userId = user?.id!;
      cart.cartMenuItems.push(menuItem);
      cartStore.addToCart(cart);
      cart.cartMenuItems.pop();
      }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Menu Items</h1>
      {menuItemStore.loadingInitial ? (
        <p>Loading menu items...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {getMenuItems.map((menuitem) => (
            <div
              className="relative transform-gpu transition-transform duration-300 ease-in-out hover:scale-105"
              key={menuitem.id}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <div
                    className="w-full h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(data:image/jpeg;base64,${menuitem.imagePath})` }}
                  ></div>
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <h2 className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">
                    {menuitem.name}
                  </h2>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Description:</span> {menuitem.description}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Price:</span> ${menuitem.price}
                  </p>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>handleAddMenuItemToCart(menuitem.id)}
                    name={menuitem.name}
                  >
                    {target === menuitem.name ? "Adding..." : "Add to cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
