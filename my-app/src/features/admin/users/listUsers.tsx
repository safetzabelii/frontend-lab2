import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';



export default observer(function ListUsers() {
  const { userStore,modalStore } = useStore();
  const [target, setTarget] = useState('');
  const navigate = useNavigate();
  const { UserByName, loading, getAllUsersForAdminDashboardDisplay,deleteUser } = userStore;

  useEffect(() => {
    getAllUsersForAdminDashboardDisplay().catch((error) => console.log(error));
  }, [getAllUsersForAdminDashboardDisplay]);

function handleUserDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
  setTarget(e.currentTarget.name);
  deleteUser(id);
}
  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full max-w-screen-xl">
    <div className="w-full max-w-screen-xl">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-20">
        <div className="py-2 align-middle inline-block min-w-full sm:px-10 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="flex justify-center mt-4 mb-5">
    </div>
            <table className="min-w-full divide-y  divide-gray-200">
              
              <thead className="bg-green-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Verified
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
                {UserByName.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.surname}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.isEmailVerified ? (
                  <label className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Verified</label>
  ):
                 ( <label className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Not Verified</label>
)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-center space-x-10">
                        <button className="text-indigo-600  hover:text-indigo-900" onClick={() => navigate(`/dashboard/userDetails/${user.id}`)}>
                          <span className="sr-only">Edit</span>
                          <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" onClick={(e)=>handleUserDelete(e,user.id!)}>
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
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