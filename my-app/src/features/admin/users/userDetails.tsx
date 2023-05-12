import { observer } from 'mobx-react-lite';
import {  useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { User } from '../../../app/models/User/User';
import { UserEditDto } from '../../../app/models/User/Dto/UserEditDto';
import Navbar from '../../../app/layout/navbar';


export default observer(function UserDetails() {
  const { userStore,roleStore} = useStore();
  const [target, setTarget] = useState('');
  const { loadUserForEdit,updateUser } = userStore;
  const {RoleByName,loadRolet} = roleStore;
  const navigate = useNavigate();
  const {id} = useParams();
  const [user, setUser] = useState<UserEditDto>({
    id: '',
    name: '',
    surname: '',
    email: '',
    isEmailVerified: true,
    roleId:'',
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id != null) {
      loadUserForEdit(id).then((loadedUser: UserEditDto | void) => {
        if(loadedUser != null){
          setUser(loadedUser!);
          setLoading(false);
          loadRolet();
        }
        else{
          navigate('/dashboard/listUsers');
        }
        
      });
    }
  }, [id]);
  function handleFormSubmit(user: UserEditDto) {
    updateUser(user).then(() => {
      navigate('/dashboard/listUsers')
    });
  }
  return (
    
    <>
    <div className="relative flex flex-col min-w-0 break-words bg-gray-200 border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                <div className="flex items-center">
                  <p className="mb-0 dark:text-black/80">Edit Profile</p>
                  {user?.isEmailVerified ? (
                  <label className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Verified</label>
  ):
                 ( <label className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-red-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Not Verified</label>
)}
                </div>
              </div>
              
                <div className="flex-auto p-6">
                <p className="leading-normal uppercase dark:text-black dark:opacity-60 text-sm">User Information</p>
                <Formik initialValues={user} enableReinitialize onSubmit={handleFormSubmit}>
                {({isValid,isSubmitting})=>(
                  <Form >
                <div className="flex flex-wrap -mx-3">
                   <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="name" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">First name</label>
                      <Field type="text" id="name" name="name" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>

                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="surname" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Last name</label>
                      <Field type="text" id="surname" name="surname" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="email" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Email address</label>
                      <Field type="email" id="email" readOnly name="email" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                 <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="roleId" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Role</label>
                      <Field as="select" id="roleId" name="roleId" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" >
                        {RoleByName.map((role)=>(
                          <option key={role.id!} value={role.id!}>{role.name}</option>
                        ))}
                        </Field>

                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
            <button
              className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
                  </Form>
                )}
              
              </Formik>
              </div>
             
            </div> 
    </>
  );
});