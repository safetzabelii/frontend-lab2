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
import { Restaurant } from '../../../app/models/Menu/Restaurant';
import { Menu } from '../../../app/models/Menu/Menu';
import { MenuItem } from '../../../app/models/Menu/MenuItem';

const Spinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);
export default observer(function OfferCreateForm() {
  const { offerStore, modalStore, restaurantStore, menuItemStore, menuStore } = useStore();
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{ MenuItemId: number; Quantity: any; }[]>([]);
  const [quantityValues, setQuantityValues] = useState<{ [key: number]: string }>({});
  const { createOffer } = offerStore;

  const [offer, setOffer] = useState<OfferDto>({
    id: 0,
    name: '',
    description: '',
    discountPercent: 0,
    price: 0,
    startDate: null,
    endDate: null,
    restaurantId: '',
    files: '',
  });
  const [loading, setLoading] = useState(true);
  const [menuItemsLoading, setMenuItemsLoading] = useState(false); // Add state for menu items loading

  useEffect(() => {
    restaurantStore.loadRestaurants().then(() => {
      setLoading(false);
    });
  }, [restaurantStore]);
  
  function handleRestaurantSelection(e: string) {
    const selectedRestaurantId = e;
    setSelectedRestaurant(selectedRestaurantId); // Update the state with the selected restaurantId
    setLoading(true);
    menuStore.getMenusByRestaurantId(selectedRestaurantId.toString()).then(() => {
      setLoading(false);
      setMenuItemsLoading(true);
    });
  }
  
  function handleMenuSelection(e: string) {
    const selectedMenuId = e;
    setMenuItemsLoading(true);
  
    menuItemStore.getMenuItemsByMenuId(selectedMenuId.toString()).then(() => {
      setMenuItemsLoading(false);
    });
  }
  const handleAddItem = (menuItem: MenuItem, quantity: number) => {
    const newItem = { MenuItemId: menuItem.id, Quantity: quantity };
    setSelectedItems([...selectedItems, newItem]);
    setQuantityValues({ ...quantityValues, [menuItem.id]: '' }); // Reset the quantity value for the specific menu item after adding the item
  };


  const handleInputChange = (menuItem: MenuItem, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantityValues({ ...quantityValues, [menuItem.id]: value });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  

  function handleFormSubmit(offer: OfferDto) {
    console.log(offer);
    const formData = new FormData();
    formData.append('name', offer.name);
    formData.append('description', offer.description);
    formData.append('files', (document.getElementById('files') as HTMLInputElement).files![0]);
    formData.append('restaurantId', selectedRestaurant);
    formData.append('discountPercent', offer.discountPercent.toString());
    formData.append('price', offer.price!.toString());
    formData.append('startDate', offer.startDate!.toString());
    formData.append('endDate', offer.endDate!.toString());

    formData.append('menuItemOffersJson', JSON.stringify(selectedItems));

    createOffer(formData).then(() => {
      menuStore.menuRegistry.clear();
      menuItemStore.menuItemRegistry.clear();
      modalStore.closeModal();
      navigate('dashboard/listOffers');
    });
  }
  if (restaurantStore.loading || menuStore.loading) {
    return <Spinner />;
  }
  

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={offer}
          onSubmit={handleFormSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className="mt-6">
              <div className="flex flex-wrap">
                {/* Left Side */}
                <div className="w-full md:w-1/2 pr-4">
                  <div className="mb-4">
                    <label className="block text-black font-bold mb-2" htmlFor="name">
                      Name:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter offer name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />

                    <label className="block text-black font-bold mb-2" htmlFor="description">
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

                    <label className="block text-black font-bold mb-2" htmlFor="discountPercent">
                      Discount percent:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      name="discountPercent"
                      id="discountPercent"
                      type="number"
                      placeholder="Enter discount percent"
                    />
                    <ErrorMessage
                      name="discountPercent"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    <label className="block text-black font-bold mb-2" htmlFor="price">
                      Price:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter price"
                    />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />

                    <label className="block text-black font-bold mb-2" htmlFor="startDate">
                      Start Date:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      name="startDate"
                      id="startDate"
                      type="date"
                      placeholder="Enter start date"
                      value={formik.values.startDate ? formik.values.startDate.toString().slice(0, 10) : ''}
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    <ErrorMessage
                      name="selectedMenu"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    <label className="block text-black font-bold mb-2" htmlFor="endDate">
                      End Date:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      id="endDate"
                      type="date"
                      name="endDate"
                      placeholder="Enter end date"
                      value={formik.values.endDate ? formik.values.endDate.toString().slice(0, 10) : ''}
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />

                    <label htmlFor="restaurantId" className="block text-black font-bold mb-2">
                      Restaurant:
                    </label>
                    <Field
                      as="select"
                      id="restaurantId"
                      name="restaurantId"
                      className="border border-gray-400 p-2 w-full rounded-md"
                      value={selectedRestaurant} // Add this line
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        handleRestaurantSelection(e.target.value);
                      }}
                    >
                       <option value="">Select a restaurant</option>
                        {restaurantStore.restaurantsByName.map((restaurant) => (
                          <option key={restaurant.id!} value={restaurant.id!}>
                            {restaurant.name}
                          </option>
                      ))}
                    </Field>
                        <ErrorMessage
                          name="restaurantId"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />

                    <label htmlFor="selectedMenu" className="block text-black font-bold mb-2">
                      Menu:
                    </label>
                    <Field
                      as="select"
                      id="selectedMenu"
                      name="selectedMenu"
                      className="border border-gray-400 p-2 w-full rounded-md"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        handleMenuSelection(e.target.value)
                      }}
                    >
                       <option value="">Select a menu</option>
                        {menuStore.MenuByName.map((menu) => (
                          <option key={menu.id!} value={menu.id!}>
                            {menu.name}
                          </option>
                      ))}
                    </Field>

                    <label className="block text-black font-bold mb-2" htmlFor="files">
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
                    <ErrorMessage name="files" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 pl-4 border-l border-gray-400">
                  
  {menuItemsLoading ? (
    <Spinner />
  ) : (
    <div>
      {menuItemStore.getMenuItems.map((menuItem) => {
  const selectedItem = selectedItems.find((item) => item.MenuItemId === menuItem.id);
  const quantityValue = quantityValues[menuItem.id] || ''; // Use the quantity value for the specific menu item

  const handleRemoveItem = () => {
    // Remove the menuItem from selectedItems array
    const updatedSelectedItems = selectedItems.filter((item) => item.MenuItemId !== menuItem.id);
    setSelectedItems(updatedSelectedItems);

    // Reset the quantity value for the specific menuItem
    const updatedQuantityValues = { ...quantityValues };
    delete updatedQuantityValues[menuItem.id];
    setQuantityValues(updatedQuantityValues);
  };

  return (
    <div key={menuItem.id} className={`flex items-center py-2`} style={{ marginBottom: '10px' }}>
      <div className="flex items-center space-x-2">
        <img
          src={`data:image/jpeg;base64,${menuItem.imagePath}`}
          alt={menuItem.image}
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-lg font-bold">{menuItem.name}</span>
      </div>
      <div className="ml-auto">
        {selectedItem ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            onClick={handleRemoveItem}
          >
            Remove
          </button>
        ) : (
          <>
            <label htmlFor={`quantity-${menuItem.id}`} className="block text-black font-bold">
              Quantity:
            </label>
            <div className="flex">
              <input
                className="border border-gray-400 px-2 py-1 w-16 rounded-md text-center"
                type="number"
                min="0"
                id={`quantity-${menuItem.id}`}
                value={quantityValue}
                onChange={(e) => handleInputChange(menuItem, e)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 ml-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => {
                  const quantity = parseInt(quantityValue);
                  handleAddItem(menuItem, quantity);
                }}
              >
                Add
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
})}
    </div>
)} 
</div>

              </div>
              <div className="flex items-center justify-end mt-6">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Offer
                </button>
                <Link
                  to="/dashboard/listOffers"
                  className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );

});
