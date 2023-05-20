import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../stores/store';
import Navbar from './navbar';
import { Sidebar } from 'semantic-ui-react';
import commonStore from '../stores/commonStore';

export default observer(function LoginForm(){
  const {userStore, commonStore} = useStore();
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const onSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await userStore.login(values).then(()=>{
       
      const token = commonStore.getToken;
      userStore.getCurrentUser(token!);
        
      navigate('/homepage');    
      });
      
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  

  return(

    <div style={{backgroundImage: "url('backgroundlogin.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh'}}  className="min-h-screen flex flex-col justify-center py-0 px-4 sm:px-6 lg:px-8">
    <div className="min-h-screen flex flex-col  py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-green-800 mb-10">Sign in to your account</h2>

        <button type="button" className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14C8.68 14 6 11.32 6 8s2.68-6 6-6 6 2.68 6 6-2.68 6-6 6zm0 2c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4z"></path>
  </svg>
  Continue as Guest
</button>

<div className="flex items-center justify-center my-4">
  <hr className="border-gray-300 w-full" />
  <div className="mx-3 text-gray-600 font-medium">OR</div>
  <hr className="border-gray-300 w-full" />
</div>


          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <Field id="email" name="email" type="email" autoComplete="email" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleShowPassword}>
                      {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                    </span>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
               <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/sendEmail" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-green-800  hover:bg-green-700 hover:border-green-800" disabled={isSubmitting}>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-primary-500 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3.707 10.293a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L5.121 10.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button>
              
            </div>
            
            

            <div className="text-sm text-center">
              <p className="text-gray-600">
                Don't have an account yet?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign up
                </Link>
              </p>
            </div>
            
          </Form>
        )}
      </Formik>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
  <div>
    <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
      <span className="sr-only">Sign in with Facebook</span>
      <FaFacebook className="h-5 w-5" />
    </button>
  </div>

  <div>
    <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
      <span className="sr-only">Sign in with Twitter</span>
      <FaTwitter className="h-5 w-5" />
    </button>
  </div>

  <div>
    <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
      <span className="sr-only">Sign in with Google</span>
      <FaGoogle className="h-5 w-5" />
    </button>
  </div>
</div>
    </div>
  </div>
</div>    
  </div>
</div>
  )
})


