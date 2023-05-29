import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { RiDeleteBinLine as TrashIcon, RiPencilLine as PencilIcon } from 'react-icons/ri';
import BadgeComponent from '../assets/BadgeComponent';

export default observer(function MenageOrder() {
  const { orderStore, userStore } = useStore();

  const {getActiveOrderForAgent,selectedOrder} = orderStore;


  useEffect(() => {
    getActiveOrderForAgent(userStore.user?.id!);
  }, [getActiveOrderForAgent]);
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-gray-100 px-4 py-3">
      <h2 className="text-xl font-medium text-gray-800">Order Details</h2>
    </div>
    <div className="px-4 py-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Customer Name</h3>
        <p className="text-sm text-gray-500">{selectedOrder?.user}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Total Amount</h3>
        <p className="text-sm text-gray-500">{selectedOrder?.total}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Delivery Address</h3>
        <p className="text-sm text-gray-500">{selectedOrder?.deliveryAddress}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Order Status</h3>
        <p className="text-sm text-gray-500"><BadgeComponent id={selectedOrder?.orderStatus!}/></p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Agent</h3>
        <p className="text-sm text-gray-500">{selectedOrder?.agent}</p>
      </div>
    </div>
  </div>
 
   

  
  );
});