import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';
import ParentCreateForm from './parentCreateForm';
import ParentEditForm from './parentEditForm';


export default observer(function ListParents() {
  const { parentStore, modalStore } = useStore();
  const [target, setTarget] = useState('');
  const { parents, loading, loadParents, deleteParent } = parentStore;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    loadParents().catch((error) => console.log(error));
    console.log(parents);
  }, [loadParents]);
  
  

  function openCreateForm() {
    // modalStore.closeModal();
    modalStore.openModal("Create Chef", <ParentCreateForm />);
  }

  function handleParentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteParent(id);
  }

  const filteredParents = parents.filter((parent) =>
    parent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full max-w-screen-xl">
      <div className="w-full max-w-screen-xl">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-20">
          <div className="py-2 align-middle inline-block min-w-full sm:px-10 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="flex justify-center mt-4 mb-5">
                <button
                  className="bg-[#111827] text-white active:bg-[#0D0E12] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={openCreateForm}
                >
                  Create Chef
                </button>
              </div>
              <div className="flex justify-center mt-4 mb-5">
                {/* Add the search input */}
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#111827]">
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
                      Birth Year
                    </th>
                    {/* Add more table headers for author details */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredParents.map((parent) => (
                    <tr key={parent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {parent.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {parent.birthYear}
                        </div>
                      </td>
                      {/* Add more table cells for parent details */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() =>
                            modalStore.openModal(
                              "Update Chef",
                              <ParentEditForm id={parent.id} />
                            )
                          }
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => handleParentDelete(e, parent.id)}
                        >
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
