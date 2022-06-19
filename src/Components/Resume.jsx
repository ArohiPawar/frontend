import { Button, Form, Input, InputNumber } from 'antd';
import React,{useState} from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Col, Row } from 'antd';
import axios from "axios";
import config from './config';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
 
};
/* eslint-enable no-template-curly-in-string */

const Resume = () => {
  const [file,setFile]=useState("")


 
  const onFinish = (values) => {

    const formData = new FormData();
    formData.append("name",values.name);
    formData.append("email",values.email);
    formData.append("phone",values.phone);
    formData.append("education1",values.education1);
    formData.append("education2",values.education2);
    formData.append("file",file);
    console.log('formData');
    console.log(formData);
    const configs={
      headers:{
          "Content-Type":"multipart/form-data"
      }
  }
axios.post(`${config.URL}addproduct`,formData,configs).then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
})

  };
  const onfilechange=(event)=>{
    setFile(event.target.files[0])
  }

  return (
    <Row style={{marginTop:"120px"}}>
    <Col span={12} offset={6} >
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

    <Form.Item
        label="Name"
        name="name"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
      >
        <Input />
      </Form.Item> <Form.Item
        label="Education1"
        name="education1"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Education2"
        name="education2"
      >
        <Input />
      </Form.Item>
   
      <input type="file" onChange={onfilechange}/>
    
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Col>
    </Row>
  );
};

export default Resume;