import React,{useState, useEffect}from 'react';
import Navbar from '../../components/admin/layout/sidebar/Navbar';
import {Button, Table} from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import moment from 'moment';
import { Redirect } from "react-router";


function Customers (props){
 

  
    const token = window.localStorage.getItem("adminToken");
   
    const [customers, setCustomers] = useState([]);
    const [field, setField] = useState('');
    const [search, setSearch] = useState('');
    const [paginationLinks, setPaginationLinks] = useState({});
    const [url, setUrl] = useState(`http://localhost:8000/api/customer/items/10`);

   const getCustomers = async (id) => {
       
        //const token = window.localStorage.getItem("token");
        
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
           Authorization: "Bearer " + token,
          },
        });
        const result = await response.json();

        console.log(result.data)
        setCustomers(result.data.data);
        setPaginationLinks(result.data);
        
      };

      const handleSearch = () =>{
        setUrl(`http://localhost:8000/api/customer/items/10?field=${field}&search=${search}`)
        // http://localhost:8000/api/customer/items/2?field=name&search=azar
      }
      

      useEffect(() => {
        
        getCustomers();
      }, [url]);


    return (
        <>
        <Navbar/>
        <div className="container" style={{marginLeft:"22%"}}>
            <div className="row">
                 <div className="col-md-10">
                        <div className="row mt-3 mb-1">
                            <div className="col-8 d-flex ">
                                <select onChange={(e)=>setField(e.target.value)} style={{height:"35px"}}>
                                    <option >Search By...</option>
                                    <option value="id">ID</option>
                                    <option value="name">Name</option>
                                    <option value="email"> Email</option>
                                </select>
                                <input onChange={(e)=>setSearch(e.target.value)} style={{height:"35px"}} placeholder="Search"/>
                                <Button className="bg-primary" onClick={()=>handleSearch()} style={{height:"35px"}}>GO</Button>
                            </div>
                            <div className="col-4 d-flex">
                                
                            <p style={{paddingRight:'20px'}}>Customers per page</p>
                            
                                <Pagination aria-label="Customers per page">
                                    <PaginationItem>
                                        <PaginationLink onClick={()=>setUrl(`http://localhost:8000/api/customer/items/20`)}>20</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink onClick={()=>setUrl(`http://localhost:8000/api/customer/items/40`)}>40</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink onClick={()=>setUrl(`http://localhost:8000/api/customer/items/60`)}>60</PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                                

                            </div>
                        </div>

        
            <div className="row">
              <Table  bordered hover responsive>
                <thead>
                  <tr>
                    <th >Customer ID</th>

                    <th>Name</th>

                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Registered At</th>

                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer,key ) => 
                    <tr key={key}>
                    <td>{customer.id}</td>

                    <td>{customer.name}</td>

                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>{moment(customer.created_at).format("YYYY/MM/DD")}</td>
                    </tr>
                     )}
                  
                </tbody>

                
              </Table>
            </div>

            <div className="row">
                <div style={{marginLeft:'30%'}}>
            <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                        <PaginationLink first   onClick={()=>setUrl(paginationLinks.first_page_url)} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink previous onClick={()=>setUrl(paginationLinks.prev_page_url)} />
                    </PaginationItem>
                    
                    <PaginationItem>
                        <PaginationLink next onClick={()=>setUrl(paginationLinks.next_page_url)}  />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last onClick={()=>setUrl(paginationLinks.last_page_url)} />
                    </PaginationItem>
             </Pagination>
             </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Customers;