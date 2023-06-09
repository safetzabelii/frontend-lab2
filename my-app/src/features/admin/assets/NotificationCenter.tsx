import { observer } from "mobx-react";
import { useStore } from "../../../app/stores/store";
import { useEffect } from "react";


export default observer(function NotificationCenter(){
  const {notificationStore,userStore} = useStore();
  const {notifications,loadNotifications,clearAllNotificationsForUser} = notificationStore;
  function handleClearNotifications(){
    clearAllNotificationsForUser(userStore.user?.id!).then(()=>{
      loadNotifications(userStore.user?.id!);
    });
    
  }
  useEffect(()=>{
    loadNotifications(userStore.user?.id!);
  },[userStore.user?.id,loadNotifications])
    return (
        <div className="h-screen grid place-items-center my-8">
  <div className="lg:w-2/5 sm:w-3/5 w-11/12 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10 shadow-sm">
    <div className="inline-flex items-center justify-between w-full">
      <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">Notifications</h3>
    </div>
    {notifications.map((notification)=>(
      <>
      <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <h3 className="font-bold text-base text-gray-800">{notification.title}</h3>
        </div>
        <p className="text-xs text-gray-500">
          {notification.created}
        </p>
      </div>
      <p className="mt-1 text-sm">
        {notification.message}
      </p>
    </div>
    </>
    ))}
    <button
    className="inline-flex text-sm bg-white justify-center px-4 py-2 mt-12 w-full text-red-500 items-center rounded font-medium
     shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500
      hover:text-white hover:-translate-y-1 hover:scale-110 dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800" onClick={handleClearNotifications}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 sm:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    Clear all notifications
  </button>
  </div>
</div>
    );
});