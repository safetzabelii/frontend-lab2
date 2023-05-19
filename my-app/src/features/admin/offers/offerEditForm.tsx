import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../app/stores/store';
import { OfferDto } from '../../../app/models/Menu/OfferDto';
import { MenuItem } from '../../../app/models/Menu/MenuItem';
import { CircleLoader } from 'react-spinners';
interface Props {
  id?: string;
}

export default observer(function OfferEditForm(props: Props) {
  const { offerStore, modalStore, restaurantStore, menuItemStore, menuStore } = useStore();
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{ MenuItemId: number; Quantity: any; }[]>([]);
  const { loadOffer,updateOffer } = offerStore;

  const [offer, setOffer] = useState<OfferDto>({
    id: 0,
    name: '',
    description: '',
    discountPercent: 0,
    price: 0,
    startDate: null,
    endDate: null,
    restaurantId: '',
    files: '',
  });

  useEffect(() => {
    if(props.id){
      loadOffer(props.id).then((loadedOffer:OfferDto|void)=>{
        setOffer(loadedOffer!);
      })
    }
   
  }, [props.id,offerStore]);
  

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });
  

  function handleFormSubmit(offer: OfferDto) {
    const formData = new FormData();
    formData.append('id',props.id!);
    formData.append('name', offer.name);
    formData.append('description', offer.description);
    formData.append('files', (document.getElementById('files') as HTMLInputElement).files![0]);
    formData.append('discountPercent', offer.discountPercent.toString());
    formData.append('price', offer.price!.toString());
    formData.append('startDate', offer.startDate!.toString());
    formData.append('endDate', offer.endDate!.toString());

    updateOffer(formData).then(() => {
      modalStore.closeModal();
      navigate('dashboard/listOffers');
    });
  }
  if (restaurantStore.loading || menuStore.loading) {
    return <CircleLoader color="#ffffff" size={30} loading={true} />;
  }
  

  return (
    <>
        <Formik
          initialValues={offer}
          onSubmit={handleFormSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form className="mt-6">
              <div className="flex">
                {/* Left Side */}
                <div className="w-1/2 pr-4">
                  <div className="mb-4">
                    <label className="block text-black font-bold mb-2" htmlFor="name">
                      Name:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter offer name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />

                    <label className="block text-black font-bold mb-2" htmlFor="description">
                      Description:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter offer description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    <label className="block text-black font-bold mb-2" htmlFor="discountPercent">
                      Discount percent:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      name="discountPercent"
                      id="discountPercent"
                      type="number"
                      placeholder="Enter discount percent"
                    />
                    <ErrorMessage
                      name="discountPercent"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    <label className="block text-black font-bold mb-2" htmlFor="price">
                      Price:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter price"
                    />
                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />

                    <label className="block text-black font-bold mb-2" htmlFor="startDate">
                      Start Date:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      name="startDate"
                      id="startDate"
                      type="date"
                      placeholder="Enter start date"
                      value={formik.values.startDate ? formik.values.startDate.toString().slice(0, 10) : ''}
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    <ErrorMessage
                      name="selectedMenu"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />

                    <label className="block text-black font-bold mb-2" htmlFor="endDate">
                      End Date:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      id="endDate"
                      type="date"
                      name="endDate"
                      placeholder="Enter end date"
                      value={formik.values.endDate ? formik.values.endDate.toString().slice(0, 10) : ''}
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />

                    

                    <label className="block text-black font-bold mb-2" htmlFor="files">
                      Image:
                    </label>
                    <Field
                      className="border border-gray-400 p-2 w-full rounded-md"
                      type="file"
                      name="files"
                      id="files"
                      placeholder="Upload restaurant image"
                      accept="*"
                    />
                    <ErrorMessage name="files" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end mt-6">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update Offer
                </button>
                <Link
                  to="/dashboard/listOffers"
                  className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
    </>
  );
});
