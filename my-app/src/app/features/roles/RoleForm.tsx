import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaCoffee } from 'react-icons/fa';

import { observer } from 'mobx-react';
import { useStore } from '../../stores/store';
import Navbar from '../../layout/navbar';
import { Role } from '../../models/Role/Role';
import { Button, Header, Input, Segment } from 'semantic-ui-react';

export default observer(function RoleForm(){
  const {roleStore} = useStore();
  const navigate = useNavigate();

  const{createRole}=roleStore;

  const [role] = useState<Role>({
      name:'',
  });
   function handleFormSubmit(role: Role){
   let newRole = {
      ...role,
   }
      createRole(newRole).then(()=>navigate('/roleList')); 
  }
  return(
       <Segment>
          <Header content='Add Role' color='teal'/>
          <Formik
              
          enableReinitialize
           initialValues={role} 
           onSubmit={values=>handleFormSubmit(values)}>
              {({handleSubmit})=>(
                  <Form className='ui form' onSubmit={handleSubmit} autoComplete='of'>
               <Input type='text' name='name' placeholder='Name'/>
              <Button  floated="right" positive type="submit" content='Submit'/>
              <Button as={NavLink} to='/signup' floated="right"  type="button" content='Cancel'/>
              </Form> 
              )}

          </Formik>
         
              
              
      </Segment>
  )
})


