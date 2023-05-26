import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItemForCartEditDto } from "../../../app/models/MenuItem/MenuItemForCartEditDto";
import { OfferForCartEditDto } from "../../../app/models/Offer/OfferForCartEditDto";
import { CartForEditDto } from "../../../app/models/Cart/CartForEditDto";

interface CartItemProps {
  imageUrl: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  onRemove:()=>void;
  onQuantityChange:(quantity:number)=>void;
}

interface CartSummaryProps {
  subtotal: string;
  shipping: string;
  total: string;
}

const CartDetails: React.FC = observer(() => {
  const {cartStore,userStore} = useStore();
  const {id} = useParams();
  const {selectedCart,loadCart,removeMenuItem,removeOffer} = cartStore;
  const cartId = Number(selectedCart?.id);
  const [menuItems, setMenuItems] = useState<MenuItemForCartEditDto[]>([]);
const [offers, setOffers] = useState<OfferForCartEditDto[]>([]);
const [cart, setCart] = useState<CartForEditDto>({
  id:'',
  userId:'',
  cartMenuItems:[],
  }
)
  useEffect(()=>{
    loadCart(id!);
  },[cartStore]);

  useEffect(() => {
    if (selectedCart) {
      const updatedMenuItems = selectedCart.menuItems.map((menuItem) => {

        return {
          menuItemId: menuItem.id,
          quantity: menuItem.quantity,

        };
      });
      setMenuItems(updatedMenuItems);
      const updatedOffers = selectedCart.offers.map((offer) => {

        return {
          offerId: offer.id,
          quantity: offer.quantity,
        };
      });
      setOffers(updatedOffers);
    }

  }, [selectedCart]);
function updateCartState(){
  if (selectedCart) {
    const cart = {
      id: selectedCart.id,
      userId: userStore.user?.id!,
      cartMenuItems: [...menuItems],
      cartOffers: [...offers]
    };
    cartStore.updateCartState(cart).then(()=>{
navigate(`/Checkout/${userStore.user?.id}`)
    });
  }
}
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (selectedCart) {
        const cart = {
          id: selectedCart.id,
          userId: userStore.user?.id!,
          cartMenuItems: [...menuItems],
          cartOffers: [...offers]
        };
        cartStore.updateCartState(cart);
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [menuItems, offers, selectedCart, cart, userStore.user?.id]);

  function handleRemoveMenuItem(cartId:number,menuItemId:number){
    removeMenuItem(cartId,menuItemId).then(()=> loadCart(id!));
  }
  function handleRemoveOffer(cartId:number,offerId:number){
    removeOffer(cartId,offerId).then(()=>loadCart(id!));
  }
  const handleQuantityChange = (
    index: number,
    type: 'menuItems' | 'offers',
    quantity: number
  ) => {
    if (type === 'menuItems') {
      const updatedMenuItems = [...menuItems];
      updatedMenuItems[index].quantity = quantity;
      setMenuItems(updatedMenuItems);
    } else if (type === 'offers') {
      const updatedOffers = [...offers];
      updatedOffers[index].quantity = quantity;
      setOffers(updatedOffers);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
        {selectedCart && (selectedCart?.menuItems?.length > 0 || selectedCart?.offers?.length > 0) ? (
  <>
    <h1><b>Menu Items</b></h1>
    {selectedCart?.menuItems?.map((menuItem,index) => (
      <CartItem
        key={menuItem.id}
        imageUrl={menuItem.imagePath}
        title={menuItem.name}
        description={menuItem.description}
        quantity={menuItem.quantity}
        price={menuItem.price}
        onRemove={() => handleRemoveMenuItem(cartId, menuItem.id)}
        onQuantityChange={(quantity) => handleQuantityChange(index, 'menuItems', quantity)
        }
      />
    ))}
    <hr />
    <h1><b>Offers</b></h1>
    {selectedCart?.offers?.map((offer,index) => (
      <CartItem
        key={offer.id}
        imageUrl={offer.imagePath}
        title={offer.name}
        description={offer.description}
        quantity={offer.quantity}
        price={offer.price}
        onRemove={() => handleRemoveOffer(cartId, offer.id)}
        onQuantityChange={(quantity) => handleQuantityChange(index, 'offers', quantity)
        }
      />
    ))}
  </>
) : (
  <h1><b>There are no items in your cart</b></h1>
)}
          
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={updateCartState}>
            Check out
          </button>
        </div>
      </div>
    </div>
  );
});

const CartItem: React.FC<CartItemProps> = ({ imageUrl, title, description, quantity:initialQuantity, price, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const handleRemoveClick = () => {
    onRemove();
  };

  const handleQuantityDecrement = () => {
    if (quantity === 0) {
      return;
    }

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleQuantityIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img src={`data:image/jpeg;base64,${imageUrl}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-xs text-gray-700">{description}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={handleQuantityDecrement}
            >
              -
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={quantity}
              min="1"
              readOnly
            />
            <span
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
              onClick={handleQuantityIncrement}
            >
              +
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">{price}$</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              onClick={handleRemoveClick}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CartDetails;
