import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer, useAsObservableSource } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Parent } from '../../../app/models/Parent';
import { values } from 'mobx';

const Spinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export default observer(function ParentCreateForm() {
  const { parentStore, modalStore } = useStore();
  const navigate = useNavigate();

  const { createParent } = parentStore;

  const [parent, setParent] = useState({
    id: '',
    name: '',
    birthYear: '',
  });

  useEffect(() => {
    // Fetch necessary data if needed (e.g., options for select fields)
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    birthYear: Yup.string().required('Birth Year is required'), // Add validation for birthYear
    // Add validation for other fields
  });

  function handleFormSubmit(parent: Parent) {
    // Handle form submission here
    console.log("handleFormSubmit called"); // Check if this log appears
    let newParent = {
        ...parent,
    };
    console.log("About to createChef"); // Check if this log appears
    createParent(newParent)
        .then(() => {
        console.log("createChef resolved"); // Check if this log appears
        modalStore.closeModal();
        window.location.reload();
        navigate('/dashboard/listParents');
        })
        .catch((error) => {
        console.error("createChef error:", error); // Check for any errors
        });

  }
  

  if (parentStore.loading) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={parent}
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
              placeholder="Enter chef name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />

            {/* Add more fields for author details here */}
          </div>

          <div className="mb-4">
            <label htmlFor="birthYear" className="block text-black font-bold mb-2">
              Birth Year:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="birthYear"
              id="birthYear"
              placeholder="Enter chef's birth year"
            />
            <ErrorMessage
              name="birthYear"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="bg-[#111827] text-white px-4 py-2 rounded-md hover:bg-[#111827] transition-colors duration-300 ease-in-out"
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
