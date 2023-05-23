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
import { MenuItem } from '../../../app/models/MenuItem/MenuItem';

const Spinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export default observer(function MenuItemCreateForm(){
  const {menuItemStore,menuStore,modalStore} = useStore();
  const navigate = useNavigate();

  const{createMenuItem}=menuItemStore;
  const{loadMenus,MenuByName}= menuStore;
  const [val, setVal] = useState(null);

  const [menuItem, setMenuItem] = useState<MenuItem>({
    id: 0,
    name: '',
    description:'',
    files:'',
    menuId:'',
    price:0
  });
  useEffect(()=>{
    loadMenus();
  },[menuStore]);
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(menuItem: MenuItem){
    const formData = new FormData();
    formData.append('name',menuItem.name);
    formData.append('description',menuItem.description);
    formData.append('files',(document.getElementById('files')as HTMLInputElement).files![0]);
    formData.append('menuId',menuItem.menuId);
    formData.append('price',menuItem.price!.toString());
    
    createMenuItem(formData).then(()=>{
  modalStore.closeModal();
  navigate('dashboard/listMenuItems')}); 

  }
  
  if (menuItemStore.loading || menuStore.loading) {
    return <Spinner />;
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
            <label className="block text-black font-bold mb-2" htmlFor="name">
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
  
            <label className="block text-black font-bold mb-2" htmlFor="description">
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
  
            <label className="block text-black font-bold mb-2" htmlFor="price">
              Price:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="number"
              name="price"
              id="price"
              placeholder="Enter menu item's price"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
  
            <label htmlFor="menuId"  className="block text-black font-bold mb-2">
             Menu:
            </label>
            <Field
              as="select"
              id="menuId"
              name="menuId"
              className="border border-gray-400 p-2 w-full rounded-md"
            >
              <option>Select Menu</option>
              {MenuByName.map((menu) => (
                <option key={menu.id!} value={menu.id!}>
                  {menu.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="menuId"
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