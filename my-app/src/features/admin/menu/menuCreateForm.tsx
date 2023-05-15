import { Formik, Form, Field, ErrorMessage, FieldProps, useField } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer, useAsObservableSource } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Menu } from '../../../app/models/Menu/Menu';
import Select, { OptionProps } from 'react-select';
import { Restaurant } from '../../../app/models/Menu/Restaurant';

export default observer(function MenuCreateForm(){
  const {menuStore,restaurantStore} = useStore();
  const navigate = useNavigate();

  const{createMenu}=menuStore;
  const{getRestaurantsForSelect,getRestaurants}=restaurantStore;

  const [menuDto, setMenu] = useState<Menu>({
    id: '',
    name: '',
    description: '',
    image: '',
    restaurantId:''

  });
  useEffect(()=>{
    getRestaurantsForSelect();
  },[restaurantStore]);
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(menuDto: Menu){
    let newMenuDto = {
      ...menuDto,
    }
    createMenu(newMenuDto).then(()=>navigate('dashboard/listMenus')); 
  }
  type RestaurantOption = {
    value: string;
    label: string;
    data: Restaurant;
  };
  const CustomOption = ({ data, innerProps }: OptionProps<RestaurantOption, false>) => (
    <>
    <div {...innerProps}style={{display:"flex",marginBottom:"10px"}}>
      <img src={`data:image/jpeg;base64,${data.data.imagePath}`} alt="Cover"  
      style={{
            width: '40px', 
            height: '40px', 
            borderRadius: '40%', 
            objectFit: 'cover', 
           }}/>
      <h3>{data.data.name}</h3>
    </div>

    </>
  );
  
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
            <label className="block text-white font-bold mb-2" htmlFor="restaurantId">
              Restaurant:
            </label>

            
            <Field
              name="restaurantId"
              render={({ field }: { field: any }) => (
                <Select
                  options={getRestaurants.map((restaurant) => ({
                    value: restaurant.id!,
                    label: restaurant.name,
                    data: restaurant,
                  }))}
                  components={{ Option: CustomOption }}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />


            <ErrorMessage
              name="restaurantId"
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