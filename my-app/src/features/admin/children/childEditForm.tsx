import React, { useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Child } from '../../../app/models/Child';
import { Parent } from '../../../app/models/Parent';

interface Props {
  id?: string;
}

// Create a type for the form values
interface FormValues {
  id: string;
  name: string;
  difficulty: string;
  parentName: string; // Include the parentName field
}

const ChildEditForm: React.FC<Props> = ({ id }) => {
  const { childStore, modalStore, parentStore } = useStore();
  const { loadChild, updateChild } = childStore;
  const [loading, setLoading] = useState(true);

  const { loadParents } = parentStore;
  const { parentList } = parentStore;

  const [child, setChild] = useState<Child | null>(null);

  useEffect(() => {
    parentStore.loadParents();

    if (id) {
      loadChild(id)
        .then((loadedChild) => {
          if (loadedChild) {
            setChild(loadedChild);
          }
          setLoading(false);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }, [id, loadChild, parentStore]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    difficulty: Yup.string().required('Difficulty is required'),
    parentName: Yup.string().required('Chef name is required'),
  });

  const handleFormSubmit = (values: FormValues) => {
    // Find the selected parent by name and get their ID
    const selectedParent = parentList.find((parent) => parent.name === values.parentName);
  
    if (!selectedParent) {
      console.error('Selected chef not found');
      return;
    }
  
    const newChild: Child = {
      id: values.id,
      name: values.name,
      difficulty: values.difficulty,
      parentId: selectedParent.id, // Set parentId to the selected parent's ID
      parent: selectedParent, // Include the selected parent object
    };
  
    updateChild(newChild)
      .then(() => {
        loadChild(newChild.id)
          .then((loadedChild) => {
            if (loadedChild) {
              setChild(loadedChild);
            }
          })
          .catch((error: Error) => {
            console.error(error);
          });
  
        modalStore.closeModal();
        window.location.reload();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={{
        id: child ? child.id : '',
        name: child ? child.name : '',
        difficulty: child ? child.difficulty : '',
        parentName: child ? child.parent.name : '',
      }}
      onSubmit={(values) => {
        handleFormSubmit(values);
      }}
      enableReinitialize
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-black font-bold mb-2">
              Title:
            </label>
            <Field
              className="border border-gray-400 p-2 w-full rounded-md"
              type="text"
              name="name"
              id="name"
              placeholder="Enter recipe name"
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
            <label htmlFor="parentName" className="block text-black font-bold mb-2">
              Chef:
            </label>
            <Field
              as="select"
              className="border border-gray-400 p-2 w-full rounded-md"
              name="parentName"
              id="parentName"
            >
              <option value="" disabled>
                Select a chef
              </option>
              {parentList.map((parent) => (
                <option key={parent.id} value={parent.name}>
                  {parent.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="parentName"
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
};

export default observer(ChildEditForm);
