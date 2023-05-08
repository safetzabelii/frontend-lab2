import { observer } from 'mobx-react-lite';
import {  useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { Form, Formik } from 'formik';
import { User } from '../../../app/models/User/User';


export default observer(function UserDetails() {
  const { userStore } = useStore();
  const [target, setTarget] = useState('');
  const { loadUser,selectedUser,updateUser } = userStore;
  const {id} = useParams();
  const [user,setUser] = useState<User>({
    id:'',
    name:'',
    surname:'',
    email:'',
    role:'',
    isEmailVerified:true,
  })
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if(id != null){
      loadUser(id).then((loadedUser:User|void)=>{
        setUser(loadedUser!);
        setLoading(false);
      }).catch((error) => console.log(error));
    }
  }, [loadUser]);
  function handleFormSubmit(user: User) {

    updateUser(user).then(() => {
     loadUser(user.id);
    });
  }
  return (
    <>
    <div className="relative flex flex-col min-w-0 break-words bg-gray-200 border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                <div className="flex items-center">
                  <p className="mb-0 dark:text-black/80">Edit Profile</p>
                  <label className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-green-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Verified</label>
                </div>
              </div>
              <Formik initialValues={user} onSubmit={handleFormSubmit}>
                {({isValid,isSubmitting})=>(
                  <Form >
                <div className="flex-auto p-6">
                <p className="leading-normal uppercase dark:text-black dark:opacity-60 text-sm">User Information</p>
                <div className="flex flex-wrap -mx-3">
                   <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="name" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">First name</label>
                      <input type="text" name="name" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>

                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="surname" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Last name</label>
                      <input type="text" name="surname" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="email" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Email address</label>
                      <input type="email" name="email" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                 <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="role" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Role</label>
                      <select name="role" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" >
                        <option value={"2"}>Admin</option>
                        </select>

                    </div>
                  </div>
                </div>
                <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-black dark:to-transparent " />
                
                <p className="leading-normal uppercase dark:text-black dark:opacity-60 text-sm">Contact Information</p>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="address" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Address</label>
                      <input type="text" name="address" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="city" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">City</label>
                      <input type="text" name="city" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="country" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Country</label>
                      <input type="text" name="country" className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                    <div className="mb-4">
                      <label htmlFor="postal code" className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-black/80">Postal code</label>
                      <input type="text" name="postal code"  className="focus:shadow-primary-outline dark:bg-slate-850 dark:text-black text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  
                </div>
              </div>
                  </Form>
                )}
              
              </Formik>
            </div> 
            
    
    <div fixed-plugin>
      <a fixed-plugin-button className="fixed px-4 py-2 bg-white shadow-lg cursor-pointer bottom-8 right-8 text-xl z-990 rounded-circle text-slate-700">
        <i className="py-2 pointer-events-none fa fa-cog"> </i>
      </a>
    </div>
    </>
  );
});