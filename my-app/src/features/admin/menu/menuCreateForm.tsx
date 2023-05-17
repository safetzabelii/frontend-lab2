import { Formik, Form, Field, ErrorMessage, FieldProps, useField } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer, useAsObservableSource } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Menu } from '../../../app/models/Menu/Menu';
import Select from "react-select";
import { Restaurant } from '../../../app/models/Menu/Restaurant';
import ModalStore from '../../../app/stores/modalStore';
export default observer(function MenuCreateForm(){
  const {menuStore,restaurantStore,modalStore} = useStore();
  const navigate = useNavigate();

  const{createMenu}=menuStore;
  const{getRestaurantsForSelect,getRestaurants}=restaurantStore;
  const [val, setVal] = useState(null);

  const [menuDto, setMenu] = useState<Menu>({
    id: '',
    name: '',
    description:'',
    image: '',
    files:'',
    imagePath:'',
    restaurantId:'',
  });
  useEffect(()=>{
    getRestaurantsForSelect();
  },[restaurantStore]);
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(menuDto: Menu){
    const formData = new FormData();
    formData.append('name',menuDto.name);
    formData.append('description',menuDto.description);
    formData.append('files',(document.getElementById('files')as HTMLInputElement).files![0]);
    formData.append('restaurantId',menuDto.restaurantId);
    
createMenu(formData).then(()=>{
  modalStore.closeModal();
  navigate('dashboard/listMenus')}); 

  }
  

  

  return (
    <Formik
      initialValues={menuDto}
      onSubmit={handleFormSubmit}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-black font-bold mb-2">
              Name:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="name"
              id="name"
              placeholder="Enter menu name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
  
            <label htmlFor="description" className="block text-black font-bold mb-2">
              Description:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="description"
              id="description"
              placeholder="Enter menu description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
  
            <label htmlFor="restaurantId" className="block text-black font-bold mb-2">
              Restaurant:
            </label>
            <Field
              component="select"
              name="restaurantId"
              className="border border-gray-400 p-2 w-full rounded-md"
            >
              <option value="">Select Restaurant</option>
              {getRestaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="restaurantId"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
  
            <label htmlFor="files" className="block text-black font-bold mb-2">
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
              className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
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