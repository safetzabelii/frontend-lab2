import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';
import RoleCreateForm from './roleCreateForm';
import RoleEditForm from './roleEditForm';



export default observer(function ListRoles() {
  const { roleStore,modalStore } = useStore();
  const [target, setTarget] = useState('');
  const { RoleByName, loading, loadRolet } = roleStore;

  useEffect(() => {
    loadRolet().catch((error) => console.log(error));
  }, [loadRolet]);
function openCreateForm(){
  modalStore.closeModal();
  modalStore.openModal("Create Role",<RoleCreateForm/>);
}
  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full max-w-screen-xl">
    <div className="w-full max-w-screen-xl">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-20">
        <div className="py-2 align-middle inline-block min-w-full sm:px-10 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="flex justify-center mt-4 mb-5">
          <button
      className="bg-green-700 text-white active:bg-green-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={openCreateForm}>
      Create Role
    </button>
    </div>
            <table className="min-w-full divide-y  divide-gray-200">
              
              <thead className="bg-green-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Role Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Operations
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {RoleByName.map((role) => (
                  <tr key={role.id}>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                      {role.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-center space-x-10">
                        <a className="text-indigo-600  hover:text-indigo-900" onClick={()=> modalStore.openModal("Edit Role",<RoleEditForm id={role.id}/>)}>
                          <span className="sr-only">Edit</span>
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>   
  );
});