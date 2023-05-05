import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Role } from "../../../app/models/Role/Role";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

interface Props{
    id?:string;
}
export default observer( function RoleEditForm(prop:Props){
    const {roleStore} = useStore();
    const {loadRole,updateRole,selectedRole} = roleStore;
     
     const navigate = useNavigate();
     const [role,setRole] = useState<Role>({
        id:prop.id,
        name:'',
     });
     useEffect(()=>{
        if(prop.id) loadRole(prop.id).then(role =>setRole(selectedRole!))
        console.log(selectedRole);
     },[prop.id, loadRole]);
           
    function handleFormSubmit(Role: Role){
            updateRole(Role).then(() =>navigate(`/listRoles`));
    }
    
    return (


        <Formik
        initialValues={role}
        onSubmit={handleFormSubmit}

      >
        {formik => (
          <Form className="mt-6">
            <div className="mb-4">
              <label className="block text-white font-bold mb-2" htmlFor="name">
                Name:
              </label>
              <Field
                className="border border-gray-400 p-2 w-full rounded-md"
                type="text"
                name="name"
                id="name"
                placeholder="Enter role name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 ease-in-out"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
            

    )
   
})