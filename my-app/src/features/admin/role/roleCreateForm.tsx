import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Role } from '../../../app/models/Role/Role';

export default observer(function RoleCreateForm(){
  const {roleStore,modalStore} = useStore();
  const navigate = useNavigate();

  const{createRole}=roleStore;

  const [role, setRole] = useState<Role>({
    name: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  
  function handleFormSubmit(role: Role){
    let newRole = {
      ...role,
    }
    createRole(newRole).then(()=>{
      modalStore.closeModal();
      navigate('/dashboard/listRoles')}); 
  }

  return (
    
        <Formik
          initialValues={role}
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
                  placeholder="Enter role name"
                />
                <ErrorMessage
                  name="name"
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
})
