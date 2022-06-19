import { Space, Table, Tag,Input } from 'antd';
import { Col, Row } from 'antd';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
// import { useEffect } from 'react';
// import axios from "axios";
import config from './config';
import { Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';

import './resumes.css'



const Show = () => {
  const[data,setData]=useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData,setEditData]=useState({
    productname:"",
    productrate:"",
    productquantity:"",
    productquality:"",
    _id:""
  })
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const headers={
             "Content-Type":"application/json"
         }
        axios.put("http://localhost:8082/user/edit",editData,headers).then(response=>{
          console.log(response)
           setIsModalVisible(false);
          
        }).catch(err=>{
          console.log(err)
        
        })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//     },
//     {
//       title: 'phone',
//       dataIndex: 'phone',
//       key: 'phone',
//     },
   
//     {
//       title: 'education1',
//      dataIndex: 'education1', 
//      key: 'education1',

//     },
//     {
//         title: 'education2',
//        dataIndex: 'education2', 
//        key: 'education1',
  
//       },
//     {
//       title: 'Profile picture',
//       key: 'profilePicture',
//       render: (row, record) => (
        
//         <img width="50px" height="50px" src={`${config.URL}${record.profilePicture}`}/>
//       ),

//     },
//     {
//         title: 'Action',
//         key: '_id',
//         render: (row, record) => (
//           <Space size="middle">
            
//            <Button type='primary' onClick={()=>EditData(row)}>Edit </Button>
//           </Space>
//         ),
//       },
  
//   ];
  useEffect(()=>{
      const headers={
          "Content-Type":"application/json"
      }
    axios.get(`${config.URL}user/`,headers).then(response=>{
      console.log('response');
      console.log(response);
      if(response["data"].data){
        setData(response["data"].data)
      }
    }).catch(err=>{
      console.log(err)
    })
  },[])
  const EditData=(data)=>{
    setEditData({
      productname:data.productname,
      productrate:data.productrate,
      productquantity:data.productquantity,
      productquality:data.productquality,
      _id:data._id

    })
    showModal();
  }
  
  const handleEditChange= (event)=>{
    setEditData({...editData,[event.target.name]:event.target.value});
  }

    return(
        <Row style={{marginTop:"120px"}}>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p><Input placeholder="productName" name='productname' value={editData.productname}  onChange={handleEditChange} /></p>
        <p><Input placeholder="productRate"   name='productrate' value={editData.productrate} onChange={handleEditChange} /></p>
        <p><Input placeholder="productQuantity"   name='productquantity' value={editData.productquantity} onChange={handleEditChange} /></p>
        <p><Input placeholder="productQualitity"   name='productquality' value={editData.productquality} onChange={handleEditChange} /></p>
        <p><Input placeholder="_id" name='_id' type='hidden' value={editData._id} onChange={handleEditChange} /></p>

      
      </Modal>
    <Col span={12} offset={6} >
    {/* <Table columns={columns} dataSource={data} />; */}

    {
        data.map((ele,i)=>{
            return(
                <>
                    {/* <h1>{ele.name}</h1>
                    <img width="50px" height="50px" src={`${config.URL}${ele.profilePicture}`}/> 
                    */}

        <section className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <div className="about-text go-to">
                            <h3 className="dark-color">About Me</h3>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img width="300px" height="300px" src={`${config.URL}${ele.profilePicture}`}/> 

                        </div>
                    </div>
                </div>
                <div className="counter">
                    <div className="row">
                        <div className="row">
                            <div className="count-data text-center">
                                <p className="m-0px font-w-600">{ele.name}</p>
                                <p className="m-0px font-w-600">{ele.email}</p>
                                <p className="m-0px font-w-600">{ele.phone}</p>
                                <p className="m-0px font-w-600">{ele.education1} {ele.education2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                    
                </>
            )
        })

    }
    
    </Col>
    </Row>
    )
    }


export default Show;