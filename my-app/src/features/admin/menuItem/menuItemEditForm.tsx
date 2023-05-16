
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
import { MenuItem } from '../../../app/models/Menu/MenuItem';

interface Props {
    id?: string;
  }
export default observer(function MenuItemEditForm(props: Props){
  const {menuItemStore,modalStore,menuStore} = useStore();
  const{loadMenuItem,updateMenuItem} =menuItemStore
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menuItem, setMenuItem] = useState<MenuItem>({
    id: '',
    name: '',
    description:'',
    price:0,
    image: '',
    files:'',
    imagePath:'',
    menuId:'',
  });
  useEffect(()=>{
    if(props.id){
        loadMenuItem(props.id).then((loadedMenuItem:MenuItem|void)=>{
            setMenuItem(loadedMenuItem!);
            setLoading(false);
            menuStore.loadMenus();
        })
    }
  },[props.id,loadMenuItem,menuStore.loadMenus]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(menuItem: MenuItem){
    const formData = new FormData();
    formData.append('id',props.id!);
    formData.append('name',menuItem.name);
    formData.append('description',menuItem.description);
    formData.append('price',menuItem.price.toString());
    formData.append('menuId',menuItem.menuId);
    formData.append('files',(document.getElementById('files') as HTMLInputElement).files![0]);
    updateMenuItem(formData).then(()=>
    {
      modalStore.closeModal();
      navigate('dashboard/listMenuItems')
  }); 
  }

  return (
    
    <Formik
    initialValues={menuItem}
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
              placeholder="Enter menu item name"
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
              placeholder="Enter menu item description"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            <label className="block text-white font-bold mb-2" htmlFor="price">
              Price:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="price"
              id="price"
              placeholder="Enter menu item price"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            <label className="block text-white font-bold mb-2" htmlFor="menuId">
              Menu:
            </label>
            <Field as="select" id="restaurantId" name="restaurantId" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" >
                        {menuStore.MenuByName.map((menu)=>(
                          <option key={menu.id!} value={menu.id!}>{menu.name}</option>
                        ))}
                        </Field>
            <ErrorMessage
              name="menuId"
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