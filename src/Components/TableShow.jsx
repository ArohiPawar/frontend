import { Space, Table, Tag,Input } from 'antd';
import { Col, Row } from 'antd';
import axios from 'axios';
import React,{useEffect,useState} from 'react';
// import { useEffect } from 'react';
// import axios from "axios";
import config from './config';
import { Button, Modal } from 'antd';



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

  const columns = [
    {
      title: 'productName',
      dataIndex: 'productname',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'ProductRate',
      dataIndex: 'productrate',
      key: 'age',
    },
    {
      title: 'ProductQuantity',
      dataIndex: 'productquantity',
      key: 'address',
    },
   
    {
      title: 'ProductQuality',
     dataIndex: 'productquality', 
     key: 'tags',

    },
    {
      title: 'Profile picture',
      key: 'profilePicture',
      render: (row, record) => (
        
        <img width="50px" height="50px" src={`${config.URL}${record.profilePicture}`}/>
      ),

    },
    {
        title: 'Action',
        key: '_id',
        render: (row, record) => (
          <Space size="middle">
            
           <Button type='primary' onClick={()=>EditData(row)}>Edit </Button>
          </Space>
        ),
      },
  
  ];
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
    <Table columns={columns} dataSource={data} />;
    </Col>
    </Row>
    )
    }


export default Show;