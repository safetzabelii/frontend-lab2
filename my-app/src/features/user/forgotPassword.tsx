import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../app/stores/store';


export default observer(function ChangePassword(){
  const {userStore} = useStore();
  const navigate = useNavigate();
  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object().shape({

    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });
  const [showPassword1, setShowNewPassword] = useState(false);
  const [showPassword2, setShowConfirmPassword] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  
  const onSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    userStore.login(values).then(()=>navigate('/'))
    
    setSubmitting(false);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    });
  return(
    <div className="min-h-screen flex flex-col  py-6 px-4 sm:px-6 lg:px-8 mt-20">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-800">Set your password</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">


          <Formik initialValues={initialValues} form validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6" onSubmit={formik.handleSubmit}>
                
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="newPassword"
                      name="newPassword"
                      type={showPassword1 ? 'text' : 'password'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.newPassword}
                      autoComplete="new-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowNewPassword}>
                      {showPassword1 ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                    </span>
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword && (
      <div className="text-red-500">{formik.errors.newPassword}</div>
    )}
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword2 ? 'text' : 'password'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      autoComplete="confirm-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowConfirmPassword}>
                      {showPassword2 ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                    </span>
                  </div>
                  {formik.touched.newPassword && formik.errors.confirmPassword && (
      <div className="text-red-500">{formik.errors.confirmPassword}</div>
    )}
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                
               <div className="flex items-center justify-between">
            </div>

            <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-green-800  hover:bg-green-700 hover:border-green-800" disabled={isSubmitting}>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-primary-500 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3.707 10.293a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L5.121 10.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Set password
              </button>
            </div>

            
          </Form>
        )}
      </Formik>
    </div>
  </div>
</div>    

  
  )
}
)


