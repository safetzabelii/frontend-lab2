import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';


export default observer(function ErrorFlashCard() {
  const {commonStore} = useStore();
    const {error} = commonStore;
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mt-8 mb-4">Server Error</h1>
      {error?.message && (
        <h5 className="text-red-500 text-sm mb-4">{error.message}</h5>
      )}
      {error?.errors && (
        <div className="bg-gray-100 p-4 mt-4">
          <h4 className="text-lg font-semibold mb-2">Stack Trace</h4>
          <code>{error.errors}</code>
        </div>
      )}
    </div>
  );
});
