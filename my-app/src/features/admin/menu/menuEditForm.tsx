
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

interface Props {
    id?: string;
  }
export default observer(function MenuEditForm(props: Props){
  const {menuStore,modalStore,restaurantStore} = useStore();
  const{loadMenu, updateMenu} =menuStore
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<Menu>({
    id: '',
    name: '',
    description:'',
    image: '',
    files:'',
    imagePath:'',
    restaurantId:'',
  });
  useEffect(()=>{
    if(props.id){
        loadMenu(props.id).then((loadedMenu:Menu|void)=>{
            setMenu(loadedMenu!);
            setLoading(false);
            restaurantStore.loadRestaurants();
        })
    }
  },[props.id,loadMenu,restaurantStore.loadRestaurants]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(menu: Menu){
    const formData = new FormData();
    formData.append('id',props.id!);
    formData.append('name',menu.name);
    formData.append('description',menu.description);
    formData.append('restaurantId',menu.restaurantId);
    formData.append('files',(document.getElementById('files') as HTMLInputElement).files![0]);
    updateMenu(formData).then(()=>
    {
      modalStore.closeModal();
      navigate('dashboard/listMenus')
  }); 
  }

  return (
    
    <Formik
    initialValues={menu}
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
              placeholder="Enter menu name"
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
              placeholder="Enter menu description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            <label className="block text-white font-bold mb-2" htmlFor="restaurantId">
              Restaurant:
            </label>
            <Field as="select" id="restaurantId" name="restaurantId" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" >
                        {restaurantStore.getRestaurants.map((restaurant)=>(
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