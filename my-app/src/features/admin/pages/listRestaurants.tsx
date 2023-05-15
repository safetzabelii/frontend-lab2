import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';
import RestaurantCreateForm from './restaurantCreateForm';
import RestaurantEditForm from './restaurantEditForm';

export default observer(function ListRestaurants() {
  const { restaurantStore, modalStore } = useStore();
  const [target, setTarget] = useState('');
  const { restaurantsByName, loading, loadRestaurants, deleteRestaurant,getRestaurants } = restaurantStore;

  useEffect(() => {
    loadRestaurants().catch((error) => console.log(error));
    
  }, [loadRestaurants]);

  function openCreateForm() {
    modalStore.closeModal();
    modalStore.openModal("Create Restaurant", <RestaurantCreateForm />);
  }

  function handleRestaurantDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteRestaurant(id);
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
                            Create Restaurant
                            </button>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-green-800">
                                <tr>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                    Restaurant Name
                                    </th>
                                    <th
                                    scope="col"
                                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                    Restaurant Address
                                    </th>

                                    <th
                                    scope="col"
                                    className="px-6 py-3 items-space-between text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                    Phone Number
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
                                {getRestaurants.map((restaurant) => (
                                    <tr key={restaurant.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                    <div className="text-sm text-gray-500">{restaurant.address}</div>  
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                <div className="text-sm text-gray-500">{restaurant.phoneNumber}</div>
                                                
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="ml-4">
                                                <div className="text-sm text-gray-500">
                                                <img
                                                    src={`data:image/jpeg;base64,${restaurant.imagePath}`}
                                                    alt="Restaurant Image"
                                                    style={{
                                                        width: '50px', 
                                                        height: '50px', 
                                                        borderRadius: '50%', 
                                                        objectFit: 'cover', 
                                                    }}
                                                />
                                                <label>{restaurant.image}</label>
                                                </div>                                               
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button type="button"onClick={()=>{modalStore.openModal("Update Restaurant", <RestaurantEditForm id={restaurant.id}/>)}} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-900" onClick={(e) => handleRestaurantDelete(e, restaurant.id)}>
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