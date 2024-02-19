import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { Parent } from '../../../app/models/Parent';
interface Props {
  id?: string;
}

export default observer(function ParentEditForm(props: Props) {
  const { parentStore, modalStore } = useStore();
  const { loadParent, updateParent } = parentStore;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [parent, setParent] = useState({
    id: '',
    name: '',
    birthYear: '',
  });


  const Spinner = () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );

  useEffect(() => {
    if (props.id) {
        loadParent(props.id)
        .then((loadedParent) => {
          if (loadedParent) {
            setParent(loadedParent);
          }
          setLoading(false);
        })
        .catch((error: Error) => {
          // Handle any potential errors here
          console.error(error);
        });
    }
  }, [props.id, loadParent]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    birthYear: Yup.string().required('Birth Year is required'),
  });

  function handleFormSubmit(updatedParent: Parent) {
    updateParent(updatedParent)
    .then(() => {
        loadParent(updatedParent.id)
        .then((loadedPArent) => {
          if (loadedPArent) {
            setParent(loadedPArent);
          }
          window.location.reload();
        })
        .catch((error: Error) => {
          console.error(error);
        });
      
      modalStore.closeModal();
    })
    .catch((error: Error) => {
      console.error(error);
    });
  }

  if (loading) {
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

            {/* Add more fields for parent details here */}
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
