import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Child } from '../../../app/models/Child';
import React from 'react';

const Spinner = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

export default observer(function ChildCreateForm() {
  const { childStore, modalStore, parentStore } = useStore();
  const navigate = useNavigate();

  const { createChild } = childStore;
  const { loadParents } = parentStore; // Add this
  const { parentList } = parentStore; // Get the list of parents from the store



  const [child, setChild] = useState({
    id: '',
    name: '',
    difficulty: '',
    parentId: '',
    parent: { id: '', name: '', birthYear: '' },
  });
  

 useEffect(() => {
    parentStore.loadParents(); // Fetch the list of authors when the component mounts
  }, [loadParents]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    difficulty: Yup.string().required('Difficulty is required'),
    parentId: Yup.string().required('Chef ID is required'),
    // Add validation for other fields
  });

  function handleFormSubmit(child: Child) {
    // Handle form submission here
    let newChild = {
      ...child,
      parentId: child.parentId, // Set parentId to the selected parent's ID

    };

    createChild(newChild)
      .then(() => {
        modalStore.closeModal();
        window.location.reload();
        navigate('/dashboard/listChildren');
      })
      .catch((error) => {
        console.error("createRecipe error:", error);
      });
  }

  if (childStore.loading) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={child}
      onSubmit={handleFormSubmit}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className="mt-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-black font-bold mb-2">
              Name:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="name"
              id="name"
              placeholder="Enter recipe title"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="difficulty" className="block text-black font-bold mb-2">
              Difficulty:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="difficulty"
              id="difficulty"
              placeholder="Enter recipe difficulty"
            />
            <ErrorMessage
              name="difficulty"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="parentId" className="block text-black font-bold mb-2">
              Parent:
            </label>
            <Field
              as="select" // Use a select element
              className="border border-gray-400 p-2 w-full rounded-md"
              name="parentId" // Set the field name to authorId
              id="parentId"
            >
              <option value="" disabled>
                Select a chef
              </option>
              {parentList.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="parentId"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Add more fields for child details here */}
          
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