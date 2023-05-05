import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function ModalContainer(){
    const {modalStore} = useStore();

    return (
        <>
        {modalStore.modal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
            <div className="bg-green-900 rounded-lg shadow-lg p-6 w-1/2 transition-transform transform translate-y-0 opacity-100">
              <button
                className="absolute top-2 right-2 text-white hover:text-gray-300"
                onClick={modalStore.closeModal}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              {modalStore.modal.title && (
                <h1 className="text-2xl text-white font-bold mb-4">{modalStore.modal.title}</h1>
              )}
              {modalStore.modal.body}
            </div>
          </div>
        )}
      </>
    )
})