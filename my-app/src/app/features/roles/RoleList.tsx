
import { observer } from 'mobx-react-lite';
import  { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Table } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function RoleList(){
    
    const {roleStore} = useStore();
    const [target,setTarget]=useState('');
    const{RoleByName,loading,loadKlasat} = roleStore;
    
    // function handleKlasaDelete(e:SyntheticEvent<HTMLButtonElement>,id:string){
    //   setTarget(e.currentTarget.name);
     
    // }
    useEffect(()=>{
        loadKlasat().catch(error=>console.log(error));
},[loadKlasat]);
    return (
     <Container style={{marginTop:'7em'}}>
        <Table >
        <Table.Header>
          <Table.Row >
        <Table.HeaderCell>Name </Table.HeaderCell>
        
          </Table.Row>
          </Table.Header>
            <Table.Body>
        {RoleByName.map((role) =>(
          <Table.Row key={role.id}>
      <Table.Cell>{role.name}</Table.Cell>
        </Table.Row>
        ))}
        </Table.Body>
        </Table>
        </Container>
)
});