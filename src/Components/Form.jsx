import { Button, Checkbox, Form, Input } from 'antd';
import React,{useState} from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Col, Row } from 'antd';
import axios from "axios";
import config from './config';


const App = () => {
  const [file,setFile]=useState("")

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("productname",values.productname);
    formData.append("productrate",values.productrate);
    formData.append("productquantity",values.productquantity);
    formData.append("productquality",values.productquality);
    formData.append("file",file);
    console.log(values);
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onfilechange=(event)=>{
    setFile(event.target.files[0])
  }

  return (
    <Row style={{marginTop:"120px"}}>
    <Col span={12} offset={6} >
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <input type="file" onChange={onfilechange}/>
    <Form.Item
        label="ProductName"
        name="productname"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="ProductRate"
        name="productrate"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="ProductQuantity"
        name="productquantity"
      >
        <Input />
      </Form.Item> <Form.Item
        label="ProductQuality"
        name="productquality"
      >
        <Input />
      </Form.Item>

      
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Col>
    </Row>
  );
};

export default App;