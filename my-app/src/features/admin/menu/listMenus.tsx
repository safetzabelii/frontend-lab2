import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';
import MenuCreateForm from './menuCreateForm';

export default observer(function ListMenus() {
  const { menuStore, modalStore } = useStore();
  const [target, setTarget] = useState('');
  const { MenuByName ,loading, loadMenus, deleteMenu } = menuStore;

  useEffect(() => {
    loadMenus().catch((error) => console.log(error));
  }, [loadMenus]);

  function openCreateForm() {
    modalStore.closeModal();
    modalStore.openModal("Create Menu", <MenuCreateForm />);
  }

  function handleMenuDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteMenu(id);
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
                            onClick={openCreateForm}
                            >
                            Create Menu
                            </button>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
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
                                    Description
                                    </th>

                                    <th
                                    scope="col"
                                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                    Image
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
                                {MenuByName.map((menu) => (
                                    <tr key={menu.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{menu.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm text-gray-500">{menu.description}</div>  
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                <div className="text-sm text-gray-500">{menu.image}</div>
                                                
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/restaurants/${menu.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                            </Link>
                                            <button className="text-red-600 hover:text-red-900" onClick={(e) => handleMenuDelete(e, menu.id)}>
                                            Delete
                                            </button>
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