import { observer } from "mobx-react";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, useFormik } from "formik";

export default observer(function SendEmailForgetPassword(){
    const {userStore} = useStore(); 
    const navigate = useNavigate();
  const initialValues={
    email: ''
  }
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const onSubmit = (values: any, { setSubmitting }: any) => {
      
      try {
        // Send password reset email using email input
        userStore.sendForgotPasswordEmail(values)
  .then(() => {
    setSuccess(true);
    setError("");
    setTimeout(() => {
      navigate("/login");
    }, 10000);

  })
  setSubmitting(false);
      } catch (error) {
        setSuccess(false);
        setError("Unable to send password reset email. Please try again later.");
      }

    };
    
    const formik = useFormik({
      initialValues,
      onSubmit,
      });
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mt-20">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Formik initialValues={initialValues} form onSubmit={onSubmit}>
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    autoComplete="email"
                    required
                    value={formik.values.email}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-600 focus:border-green-600 sm:text-sm"
                  />
                </div>
              </div>
  
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-4v-4a1 1 0 012 0v4a1 1 0 01-2 0zm0-6a1 1 0 110-2 1 1 0 010 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className = "text-sm font-medium text-red-800">{error}</h3>   
                       </div>
                     </div>
                   </div>
                 )}
         
                 {success && (
                   <div className="rounded-md bg-green-50 p-4">
                     <div className="flex">
                       <div className="flex-shrink-0">
                         <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                           <path
                             fillRule="evenodd"
                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7v-1a1 1 0 112 0v1a1 1 0 11-2 0zm0-5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM9 4a1 1 0 112 0v1a1 1 0 11-2 0V4zM7 6a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1z"
                             clipRule="evenodd"
                           />
                         </svg>
                       </div>
                       <div className="ml-3">
                         <h3 className="text-sm font-medium text-green-800">Password reset email sent. Check your inbox!</h3>
                       </div>
                     </div>
                     
                   </div>
                   
                 )}
         
                 <div>
                   <button
                     type="submit"
                     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                   >
                     Send password reset email
                   </button>
                 </div>
                 </Form>
                 )}
               </Formik>
             </div>
           </div>
         </div>
  );
});

