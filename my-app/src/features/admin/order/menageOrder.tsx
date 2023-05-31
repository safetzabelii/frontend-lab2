import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../../../app/stores/store';
import TrackOrder from './trackOrder';
import { useParams } from 'react-router-dom';


export default observer(function MenageOrder() {
  const { orderStore} = useStore();
  const {id} = useParams();
  const {getActiveOrderForAgent,selectedOrder,updateOrderStatus} = orderStore;


  useEffect(() => {
    getActiveOrderForAgent(id!);
  }, [getActiveOrderForAgent,id]);
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = parseInt(event.target.value);
    updateOrderStatus(selectedOrder?.id!, newStatus);
  };  
  const badgeOptions = [
    { id: 1, text: 'Order Selected' },
    { id: 2, text: 'Order On Its Way' },
    { id: 3, text: 'Order Has Arrived' },
    { id: 4, text: 'Order Is Delivered' },
    // Add more options as needed
  ];
  return (
    <>
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
        <p className="text-sm text-gray-500">{selectedOrder?.total} $</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Delivery Address</h3>
        <p className="text-sm text-gray-500">{selectedOrder?.deliveryAddress}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Order Status</h3>
        <div className="flex items-center">
          <select
            value={selectedOrder?.orderStatus}
            onChange={handleStatusChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {badgeOptions.map(({ id, text }) => (
              <option key={id} value={id}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Agent</h3>
        <p className="text-sm text-gray-500">{selectedOrder?.agent}</p>
      </div>
    </div>
  </div>
 
  {selectedOrder && (
        <TrackOrder destination={selectedOrder.deliveryAddress!} />
      )}

  </>
  );
});