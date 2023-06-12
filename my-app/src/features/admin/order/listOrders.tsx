import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';
import BadgeComponent from '../assets/BadgeComponent';

export default observer(function ListOrders() {
  const { orderStore, userStore } = useStore();
  const [target, setTarget] = useState('');
  const {loadOrders, loading,orders, acceptOrder } = orderStore;
  const [expandedRows, setExpandedRows] = useState<number[]>([]);


  useEffect(() => {
    loadOrders();
    console.log(orders);
  }, [loadOrders]);
  const handleRowClick = (orderId: string) => {
    const orderIdNumber = Number(orderId); // Convert orderId to number
  
    if (expandedRows.includes(orderIdNumber)) {
      setExpandedRows((prevExpandedRows) => prevExpandedRows.filter((id) => id !== orderIdNumber));
    } else {
      setExpandedRows((prevExpandedRows) => [...prevExpandedRows, orderIdNumber]);
    }
  };
  const handleAcceptOrder = (orderId:string)=>{
    const orderIdNumber = Number(orderId);
    if(userStore.user?.id){
        acceptOrder(orderIdNumber,userStore.user?.id!).then(()=>{
            loadOrders()
        });
    }
    else{
        console.log("hello");
    }
  }
  return (
    <div className="flex flex-col items-center bg-white min-h-screen w-full max-w-screen-xl">
        <div className="w-full max-w-screen-xl">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-20">
                <div className="py-2 align-middle inline-block min-w-full sm:px-10 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="flex justify-center mt-4 mb-5">
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-[#111827]">
                                    <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Customer
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Total
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Delivery Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Order Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                                    >
                                        Agent
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
                                    {orders.map((order) => (
                                        <>
                                    <tr key={order.id} onClick={() => handleRowClick(order.id)}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{order.user}</div>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                            <div className="text-sm text-gray-500">{order.total}</div>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                            <div className="text-sm text-gray-500">{order.deliveryAddress}</div>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                            <BadgeComponent id={order.orderStatus} />
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                            <div className="text-sm text-gray-500">
                                                {order.agent ? order.agent : "No agent has picked the order"}
                                            </div>
                                            </div>
                                        </div>
                                        </td>
                                       
                                       
                                       
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {userStore.user?.role === "Agent" && order.orderStatus === 0 && userStore.user.agentHasOrder === false ? (
                                            <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Stop event propagation
                                                handleAcceptOrder(order.id);
                                            }}
                                            className="text-green-600 hover:text-green-900 mr-4"
                                            >
                                            Accept Order
                                            </button>
                                        ) : null}
                                        </td>
                                     </tr>
                                    
                                    {expandedRows.includes(Number(order.id)) && (
                                    <tr>
                                        <td colSpan={6}>
                                        <div className="px-6 py-4">
                                            <table className="w-full">
                                            <thead>
                                                <tr>
                                                <th className="py-2 text-gray-500">Name</th>
                                                <th className="py-2 text-gray-500">Quantity</th>
                                                <th className="py-2 text-gray-500">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.menuItems.map((menuItem) => (
                                                <tr >
                                                    <td className="py-2 text-gray-500 text-center">{menuItem.name}</td>
                                                    <td className="py-2 text-gray-500 text-center">{menuItem.quantity}</td>
                                                    <td className="py-2 text-gray-500 text-center">{menuItem.price}</td>
                                                </tr>
                                                ))}
                                                {order.offers.map((offer) => (
                                                <tr >
                                                    <td className="py-2 text-gray-500 text-center">{offer.name}</td>
                                                    <td className="py-2 text-gray-500 text-center">{offer.quantity}</td>
                                                    <td className="py-2 text-gray-500 text-center">{offer.price}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                            </table>
                                        </div>
                                        </td>
                                    </tr>
                                    )}
                                        </>
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