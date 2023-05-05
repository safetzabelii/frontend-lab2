import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { Role } from '../../../app/models/Role/Role';


interface Props {
  id?: string;
}

export default observer(function RoleEditForm(props: Props) {
  const { roleStore,modalStore } = useStore();
  const { loadRole, updateRole } = roleStore;

  const navigate = useNavigate();
  const [role, setRole] = useState<Role>({
    id: '',
    name: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.id) {
      loadRole(props.id).then((loadedRole:Role|void) => {
        setRole(loadedRole!);
        setLoading(false);
      });
    }
  }, [props.id, loadRole]);

  function handleFormSubmit(role: Role) {

    updateRole(role).then(() => {
        modalStore.closeModal();
        navigate(`/dashboard/listRoles`);
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Formik initialValues={role} onSubmit={handleFormSubmit}>
      {({ isValid, isSubmitting }) => (
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
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
});
