
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Restaurant } from '../../../app/models/Menu/Restaurant';
import { Menu } from '../../../app/models/Menu/Menu';
import { OfferDto } from '../../../app/models/Menu/OfferDto';
import { Offer } from '../../../app/models/Menu/Offer';

interface Props {
    id?: string;
  }
export default observer(function OfferEditForm(props: Props){
  const {offerStore,modalStore,restaurantStore} = useStore();
  const{loadOffer, updateOffer} =offerStore
  const navigate = useNavigate();
  
  
  const [offer, setOffer] = useState<Offer>({
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (props.id) {
      restaurantStore.loadRestaurants().then(()=>{
        loadOffer(props.id!).then((loadedOffer: Offer | void) => {
          if (loadedOffer != null) {
            setOffer(loadedOffer!);
          } else {
            navigate('/dashboard/listOffers');
          }
        });
      })
      setLoading(false);
    }
  }, [props.id]);
  
  
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(offer: Offer){
    const formData = new FormData();
    formData.append('id',props.id!);
    formData.append('name',offer.name);
    formData.append('description',offer.description);
    formData.append('files',(document.getElementById('files')as HTMLInputElement).files![0]);
    formData.append('restaurantId',offer.restaurantId);
    formData.append('discountPercent',offer.discountPercent.toString());
    formData.append('price',offer.price!.toString());
    formData.append('startDate', offer.startDate!.toString());
    formData.append('endDate', offer.endDate!.toString());
    
    updateOffer(formData).then(()=>
    {
      modalStore.closeModal();
      navigate('dashboard/listOffers')
  }); 
  }

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
      value={formik.values.startDate ? formik.values.startDate.toString().slice(0, 10) : ''}
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
      value={formik.values.endDate ? formik.values.endDate.toString().slice(0, 10) : ''}
    />
    <ErrorMessage
      name="endDate"
      component="div"
      className="text-red-500 text-sm mt-1"
    />
   <label htmlFor="restaurantId" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Restaurant</label>
   <Field
  as="select"
  id="restaurantId"
  name="restaurantId"// Set the initial value
  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
>
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
</Formik>)}
</>
      
  );
});