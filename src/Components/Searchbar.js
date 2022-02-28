import React, { useEffect, useState } from 'react';
import './Searchbar.css'
import { useForm } from "react-hook-form";
import { Table } from 'react-bootstrap';

const Searchbar = () => {

    const [values,setValues]=useState({})
    const {minValue,maxValue}=values

    const { register, handleSubmit } = useForm();
    const onSubmit = data =>{
        setValues(data);
        
    }
    const [infos,setInfos]=useState([]);
    useEffect(()=>{
      fetch('https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&request%5Bpage%5D=1&request%5Bper_page%5D=400')
      .then(res=>res.json())
      .then(data=>setInfos(data.plugins))
    })

    return (
        <>

                      {/* search bar  */}

     <div className='search_bar container'>
     <form onSubmit={handleSubmit(onSubmit)}>
       <input placeholder='min installation' type="number" {...register("minValue", )} />
       <input placeholder='max installation' type="number" {...register("maxValue", )} />
    <button type='submit' className='custom_button'>Search</button>
    </form>
     </div>



                    {/* table  */}


    <div className='container results'>
    <Table striped bordered hover variant="dark">
       <thead>
        <tr>
            <th>Name</th>
            <th>Active Installation</th>
            <th>Ratings</th>
            <th>Last Update</th>
        </tr>
       </thead>
       <tbody>
           
    
        {infos.map(info=>
        ( minValue <= info.active_installs && maxValue >= info.active_installs)  &&
          <tr>
          <td className='text-start'>{info?.name}</td>
          <td>{info?.active_installs}</td>
          <td>{info?.num_ratings}</td>
          <td>{info?.last_updated}</td>
         </tr>
         )}
   
      </tbody>
     </Table>
    </div>
       
        </>    );
};

export default Searchbar;