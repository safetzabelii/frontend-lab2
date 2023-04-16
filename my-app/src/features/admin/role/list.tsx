import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';
import Navbar from '../../../app/layout/navbar';

export default observer(function List() {
  const { roleStore } = useStore();
  const [target, setTarget] = useState('');
  const { RoleByName, loading, loadKlasat } = roleStore;

  useEffect(() => {
    loadKlasat().catch((error) => console.log(error));
  }, [loadKlasat]);

  return (
    <div className="flex flex-col  items-center bg-white min-h-screen mt-20">
  <div className="w-full max-w-3xl ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-10 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y  divide-gray-200">
                <thead className="bg-green-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 items-space-between text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Role Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {RoleByName.map((role) => (
                    <tr key={role.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {role.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-10">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
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
