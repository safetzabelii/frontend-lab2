import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ChildCreateForm from './childCreateForm';
import ChildEditForm from './childEditForm';

const ListChildren = () => {
  const { childStore, modalStore } = useStore();
  const [target, setTarget] = useState('');
  const {children, loading, loadChildren, deleteChild } = childStore;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchByParentName, setSearchByParentName] = useState(false); // Add this state variable

  function toggleSearchByParentName() {
    setSearchByParentName(!searchByParentName);
    setSearchQuery(''); // Clear the existing search query when switching search options
  }

  useEffect(() => {
    loadChildren().catch((error) => console.log(error));
  }, [loadChildren]);

  function openCreateForm() {
    modalStore.openModal("Create Recipe", <ChildCreateForm />);
  }

  function handleChildDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteChild(id);
  }

//   const filteredChildren = children.filter((child) =>
//   child.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
//   );

const filteredChildren = children.filter((child) => {
    if (searchByParentName) {
      // Search by parent's name
      return child.parent.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      // Search by difficulty
      return child.difficulty.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
  
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
                  Create Recipe
                </button>
              </div>
              <div className="flex justify-center mt-4 mb-5">
                <input
                    type="text"
                    placeholder={searchByParentName ? "Search by parent's name" : "Search by difficulty"}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    className="ml-2 bg-[#111827] text-white active:bg-[#0D0E12] font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={toggleSearchByParentName}
                >
                    {searchByParentName ? "Search by Difficulty" : "Search by Parent's Name"}
                </button>
                </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#111827]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Difficulty
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Chef
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
                  {filteredChildren.map((child) => (
                    <tr key={child.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {child.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {child.difficulty}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm font-medium text-gray-900">
                          {child.parent.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() =>
                            modalStore.openModal(
                              "Update Recipe",
                              <ChildEditForm id={child.id} />
                            )
                          }
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={(e) => handleChildDelete(e, child.id)}
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
};

export default observer(ListChildren);
