
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { OfferDto } from '../../../app/models/Menu/OfferDto';
import { off } from 'process';

export default observer(function OfferCreateForm(){
  const {offerStore,modalStore,restaurantStore,menuItemStore} = useStore();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<{ MenuItemId: number; Quantity: any; }[]>([]);
  const [items, setItems] = useState<{ MenuItemId: number; Quantity: any; }[]>([]);
  const{createOffer}=offerStore;

  const [offer, setOffer] = useState<OfferDto>({
    id:0,
    name: '',
    description: '',
    discountPercent: 0,
    price:0,
    startDate: null,
    endDate: null,
    restaurantId:'',
    files:'',
  });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {

    restaurantStore.loadRestaurants().then(() => {
      menuItemStore.loadMenuItems();
      setLoading(false); // Set loading to false after restaurants are loaded
    });
  }, [restaurantStore,menuItemStore]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(offer: OfferDto) {
    const formData = new FormData();
    formData.append('name', offer.name);
    formData.append('description', offer.description);
    formData.append('files', (document.getElementById('files') as HTMLInputElement).files![0]);
    formData.append('restaurantId', offer.restaurantId);
    formData.append('discountPercent', offer.discountPercent.toString());
    formData.append('price', offer.price!.toString());
    formData.append('startDate', offer.startDate!.toString());
    formData.append('endDate', offer.endDate!.toString());
  
    // Append the menuItemOffersJson as a separate field
    formData.append('menuItemOffersJson', JSON.stringify(selectedItems));
  
    createOffer(formData)
      .then(() => {
        modalStore.closeModal();
        navigate('dashboard/listOffers');
      });
  }
  

 
  const handleMenuItemChange = (e: ChangeEvent<HTMLInputElement>, MenuItemId: number) => {
    if (e.target.checked) {
      setSelectedItems(prevItems => [...prevItems, { MenuItemId, Quantity: 0 }]);
    } else {
      setSelectedItems(prevItems => prevItems.filter(item => item.MenuItemId !== MenuItemId));
    }
  };
  
  
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, MenuItemId: number) => {
    const newQuantity = parseInt(e.target.value);
    setSelectedItems(prevItems =>
      prevItems.map(item =>
        item.MenuItemId === MenuItemId ? { ...item, Quantity: newQuantity } : item
      )
    );
  };
  
  const getMenuItemQuantity = (MenuItemId: number) => {
    const selectedItem = selectedItems.find(item => item.MenuItemId === MenuItemId);
    return selectedItem ? selectedItem.Quantity : 0;
  };
  return (
    <>
    {loading ? (
        <div>Loading...</div> 
      ) :(
    <Formik
    initialValues={offer}
    onSubmit={handleFormSubmit}
    enableReinitialize
    validationSchema={validationSchema}
  >
    {(formik) => (
      <Form className="mt-6">
      <div className="mb-4">
      <label className="block text-white font-bold mb-2" htmlFor="name">
      Name:
    </label>
    <Field
      className="border border-gray-400 p-2 w-full rounded-md"
      type="text"
      name="name"
      id="name"
      placeholder="Enter offer name"
    />
    <ErrorMessage
      name="name"
      component="div"
      className="text-red-500 text-sm mt-1"
    />

    <label className="block text-white font-bold mb-2" htmlFor="description">
      Description:
    </label>
    <Field
      className="border border-gray-400 p-2 w-full rounded-md"
      type="text"
      name="description"
      id="description"
      placeholder="Enter offer description"
    />
    <ErrorMessage
      name="description"
      component="div"
      className="text-red-500 text-sm mt-1"
    />



    <label className="block text-white font-bold mb-2" htmlFor="discountPercent">
      Discount percent:
    </label>
    <Field
      className="border border-gray-400 p-2 w-full rounded-md"
      type="number"
      name="discountPercent"
      id="discountPercent"
      placeholder="Enter discount percent"
    />
    <ErrorMessage
      name="discountPercent"
      component="div"
      className="text-red-500 text-sm mt-1"
    />
 <label className="block text-white font-bold mb-2" htmlFor="price">
      Price:
    </label>
    <Field
      className="border border-gray-400 p-2 w-full rounded-md"
      type="number"
      name="price"
      id="price"
      placeholder="Enter price"
    />
    <ErrorMessage
      name="price"
      component="div"
      className="text-red-500 text-sm mt-1"
    />
    <label className="block text-white font-bold mb-2" htmlFor="startDate">
      Start Date:
    </label>
    <Field
      className="border border-gray-400 p-2 w-full rounded-md"
      type="date"
      name="startDate"
      id="startDate"
      placeholder="Enter start date"
    />
    <ErrorMessage
      name="startDate"
      component="div"
      className="text-red-500 text-sm mt-1"
    />

    <label className="block text-white font-bold mb-2" htmlFor="endDate">
      End Date:
    </label>
    <Field
      className="border border-gray-400 p-2 w-full rounded-md"
      type="date"
      name="endDate"
      id="endDate"
      placeholder="Enter end date"
    />
    <ErrorMessage
      name="endDate"
      component="div"
      className="text-red-500 text-sm mt-1"
    />
     <label htmlFor="restaurantId" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Restaurant</label>
    <Field as="select" id="restaurantId" name="restaurantId" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" >
     <option>Nothing Selected</option>
     {restaurantStore.restaurantsByName.map((restaurant)=>(
          <option key={restaurant.id!} value={restaurant.id!}>{restaurant.name}</option>
       ))}
    </Field>
    <ErrorMessage
      name="restaurantId"
      component="div"
      className="text-red-500 text-sm mt-1"
    />
    <label className="block text-white font-bold mb-2" htmlFor="files">
      Image:
    </label>
    <Field
      className="border border-gray-400 p-2 w-full rounded-md"
      type="file"
      name="files"
      id="files"
      placeholder="Upload restaurant image"
      accept="*"
    />
    <ErrorMessage
      name="files"
      component="div"
      className="text-red-500 text-sm mt-1"
    />
    <label className="block text-white font-bold mb-2">Menu Items:</label>
{menuItemStore.getMenuItems.map((menuItem) => (
  <div key={menuItem.id}>
    <label htmlFor={`menuItem-${menuItem.id}`}>
      <input
        type="checkbox"
        id={`menuItem-${menuItem.id}`}
        value={menuItem.id}
        onChange={(e) => handleMenuItemChange(e, menuItem.id)}
      />
      {menuItem.name}
      <img
      src={`data:image/jpeg;base64,${menuItem.imagePath}`}
      alt={menuItem.image}
      style={{
      width: '50px', 
      height: '50px', 
      borderRadius: '50%', 
      objectFit: 'cover', 
      }}
      />
    </label>

    <input
        type="number"
        min="0"
        id={`menuItemQuantity-${menuItem.id}`}
        defaultValue={getMenuItemQuantity(menuItem.id)}
        onChange={(e) => handleQuantityChange(e, menuItem.id)}
      />


  </div>
))}
      </div>
      <div className="flex justify-end space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      
    </Form>
  )}
</Formik>)}
</>
  );
});