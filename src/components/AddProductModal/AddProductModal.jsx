/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { sizeOptions } from "../../mockData/sizeOptions";
import { convertRgbaToColorName } from "../../util/convertRgba";

const AddProductModal = ({ handleCancel, showModal, setProductsData }) => {
  const storeId = localStorage.getItem("store_id") || 101;
  const [form] = Form.useForm();
  const [formInstance, setFormInstance] = useState();

  useEffect(() => {
    onFormInstanceReady(form);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormInstanceReady = (form) => {
    setFormInstance(form);
  };

  const normFile = (e) => {
    console.log("Upload event:", e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onCreate = (values) => {
    const color = values.color.metaColor;
    const id = crypto.randomUUID().slice(0, 4);
    const finalColorString = convertRgbaToColorName(
      `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
    );
    const formReq = {
      id: id,
      title: values.title,
      price: values.price,
      image: values,
      sizes: [values.size],
      color: finalColorString,
      inventory: [
        {
          store_id: storeId,
          product_id: id,
          quantity: values.quantity,
        },
      ],
    };
    console.log("Received values of form: ", formReq);
    setProductsData((prev) => [...prev, formReq]);
  };
  return (
    <>
      <Modal
        title='Add Product'
        open={showModal}
        onCancel={handleCancel}
        destroyOnClose
        okText='Submit'
        onOk={async () => {
          try {
            const values = await formInstance?.validateFields();
            formInstance?.resetFields();
            onCreate(values);
            handleCancel();
          } catch (error) {
            console.log("Failed:", error);
          }
        }}
      >
        <Form form={form} name='validateOnly'>
          <Form.Item
            name='title'
            label='Product Name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='image'
            label='Upload'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please upload a product image",
              },
            ]}
          >
            <Upload name='logo' listType='picture' beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name='price'
            label='Price'
            type='number'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name='sizes'
            label='Size'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder='Select'
              style={{
                width: 100,
              }}
              options={sizeOptions}
            />
          </Form.Item>
          <Form.Item
            name='color'
            label='Color'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <ColorPicker />
          </Form.Item>
          <Form.Item
            name='quantity'
            label='Quantity'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddProductModal;
