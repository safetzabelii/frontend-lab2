
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { OfferDto } from '../../../app/models/Menu/OfferDto';
import { off } from 'process';

export default observer(function OfferCreateForm(){
  const {offerStore,modalStore,restaurantStore} = useStore();
  const navigate = useNavigate();

  const{createOffer}=offerStore;

  const [offerDto, setOffer] = useState<OfferDto>({
    id:'',
    name: '',
    description: '',
    discountPercent: 0,
    price:0,
    startDate: null,
    endDate: null,
    restaurantId:'',
    files:'',
  });
  useEffect(()=>{
    restaurantStore.loadRestaurants();
  },[restaurantStore])

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(offerDto: OfferDto){
    const formData = new FormData();
    formData.append('name',offerDto.name);
    formData.append('description',offerDto.description);
    formData.append('files',(document.getElementById('files')as HTMLInputElement).files![0]);
    formData.append('restaurantId',offerDto.restaurantId);
    formData.append('discountPercent',offerDto.discountPercent.toString());
    if(offerDto.price && offerDto.startDate && offerDto.endDate){
    formData.append('price',offerDto.price.toString());
    formData.append('startDate', offerDto.startDate.toISOString());
    formData.append('endDate', offerDto.endDate.toISOString());
    }
    createOffer(formData).then(()=>{
      modalStore.closeModal();
      navigate('dashboard/listOffers')
    }); 
  }

  return (
    
        <Formik
          initialValues={offerDto}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {formik => (
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

              
            <label className="block text-white font-bold mb-2" htmlFor="discountpercent">
              Discount percent:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="number"
              name="discountpercent"
              id="discountpercent"
              placeholder="Enter discount percent"
            />
            <ErrorMessage
              name="discountpercent"
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
              name="startdate"
              id="startdate"
            />
            <ErrorMessage
              name="startdate"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <label className="block text-white font-bold mb-2" htmlFor="endDate">
              End Date:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="date"
              name="enddate"
              id="enddate"
            />
            <ErrorMessage
              name="enddate"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            <label className="block text-white font-bold mb-2" htmlFor="restaurantId">
                          Restaurant:
            </label>
              <Field component="select" name="restaurantId">
               <option>Nothing Selected</option>
              {restaurantStore.getRestaurants.map((restaurant)=>(
               <option value={restaurant.id}>{restaurant.name}</option>
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
        </Formik>
      
  );
});