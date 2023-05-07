
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { OfferDto } from '../../../app/models/Menu/OfferDto';

export default observer(function OffersCreateForm(){
  const {offerStore} = useStore();
  const navigate = useNavigate();

  const{createOffer}=offerStore;

  const [offerDto, setOffer] = useState<OfferDto>({
    id: '',
    name: '',
    description: '',
    image: '',
    discountPercent: 0,
    startDate: new Date(),
    endDate: new Date(),
  });``

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(offerDto: OfferDto){
    let newOfferDto = {
      ...offerDto,
    }
    createOffer(newOfferDto).then(()=>navigate('dashboard/listOffers')); 
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

            <label className="block text-white font-bold mb-2" htmlFor="image">
              Image:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="image"
              id="image"
              placeholder="Enter offer image"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <label className="block text-white font-bold mb-2" htmlFor="discountpercent">
              Discount percent:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="discountpercent"
              id="discountpercent"
              placeholder="Enter discount percent"
            />
            <ErrorMessage
              name="discountpercent"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            <label className="block text-white font-bold mb-2" htmlFor="startDate">
              Start Date:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="startdate"
              id="startdate"
              placeholder="Enter start date"
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
              type="text"
              name="enddate"
              id="enddate"
              placeholder="Enter end date"
            />
            <ErrorMessage
              name="enddate"
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