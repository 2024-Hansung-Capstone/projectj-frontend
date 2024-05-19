import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client'; 
import { Form, Upload, Button, Input } from 'antd'; 
import { UploadOutlined } from '@ant-design/icons';
import './css/CookingPost.css';

// 요리 생성하는 GraphQL Mutation
const CREATE_COOK = gql`
  mutation CreateCook($input: CreateCookInput!) {
    createCook(createCookInput: $input) {
      id
      name
      detail
      post_images {
        id
        imagePath
      }
    }
  }
`;

// 요리 글 목록을 가져오는 GraphQL 쿼리
const FETCH_ALL_COOKS = gql`
  query FetchAllCooks {
    fetchAllCooks {
      id
      name
      detail
      post_images {
        id
        imagePath
      }
    }
  }
`;

export default function CookingPost() {
  const [createCook] = useMutation(CREATE_COOK);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  const handleCancel = () => {
    navigate('/cooking');
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { name, detail, images } = values;
  
      // images.fileList에서 File 객체만 추출
      const files = images?.fileList?.map(file => file.originFileObj) ?? [];
  
      await createCook({
        variables: {
          input: {
            name,
            detail,
            post_images: files, // 파일을 직접 전달
          },
        },
      });
  
      navigate('/cooking');
      form.resetFields();
    } catch (error) {
      console.error('레시피 생성 중 오류:', error);
    }
  };
  
  
  
  return (
    <div className="cooking-post-container">
      <h2>요리 등록</h2>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="요리 이름"
          rules={[{ required: true, message: '요리 이름을 입력하세요' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="detail"
          label="요리 설명"
          rules={[{ required: true, message: '요리 설명을 입력하세요' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
  name="images"
  label="요리 이미지"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }}
  rules={[{ required: true, message: '요리 이미지를 업로드하세요' }]}
>

          <Upload
            listType="picture"
            beforeUpload={() => false}
            multiple
          >
            <Button icon={<UploadOutlined />}>이미지 업로드</Button>
          </Upload>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" onClick={handleOk}>등록</Button>
          <Button onClick={handleCancel} style={{ marginLeft: '8px' }}>취소</Button>
        </Form.Item>
      </Form>
    </div>
  );
}


