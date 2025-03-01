
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Restaurant } from '../../../app/models/Menu/Restaurant';

export default observer(function RestaurantCreateForm(){
  const {restaurantStore,modalStore} = useStore();
  const navigate = useNavigate();

  const{createRestaurant}=restaurantStore;

  const [restaurant, setRestaurant] = useState<Restaurant>({
    id: '',
    name: '',
    address: '',
    phoneNumber: '',
    image: '',
    files:'',
    imagePath:'',
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(restaurant: Restaurant){
    const formData = new FormData();
    formData.append('name',restaurant.name);
    formData.append('address',restaurant.address);
    formData.append('phoneNumber',restaurant.phoneNumber);
    formData.append('files',(document.getElementById('files') as HTMLInputElement).files![0]);
    formData.append('image','test');
    formData.append('imagePath','test');


    createRestaurant(formData).then(()=>
    {
      modalStore.closeModal();
      navigate('dashboard/listRestaurants')
  }); 
  }

  return (
    
        <Formik
          initialValues={restaurant}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {formik => (
            <Form className="mt-6" encType="multipart/form-data">
              <div className="mb-4">
              <label className="block text-black font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="name"
              id="name"
              placeholder="Enter restaurant name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <label className="block text-black font-bold mb-2" htmlFor="address">
              Address:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="address"
              id="address"
              placeholder="Enter restaurant address"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <label className="block text-black font-bold mb-2" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter restaurant phone"
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

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
            <ErrorMessage
              name="files"
              component="div"
              className="text-red-500 text-sm mt-1"
            />


              </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-[#111827] text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                  {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      
  );
});