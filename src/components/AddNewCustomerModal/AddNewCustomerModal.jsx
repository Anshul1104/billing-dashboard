/* eslint-disable react/prop-types */
import { Checkbox, Form, Input, Modal, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const AddNewCustomerModal = ({ handleCancel, showModal }) => {
  const [form] = Form.useForm();
  const [formInstance, setFormInstance] = useState();
const { finalProducts, setSelectedCustomer } = useContext(GlobalContext);

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

  const onFormInstanceReady = (form) => {
    setFormInstance(form);
  };

  const onCreate = (values) => {
    const id = crypto.randomUUID().slice(0, 4);
    const formReq = {
      id: id,
      name: values.name,
      phone: values.phone,
      isWhatsappOpted: values.isWhatsappOpted,
      addresses: [
        {
          id: `add_${id}`,
          addressline: values.addressline,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        },
      ],
    };
    setSelectedCustomer(formReq)
    console.log("Received values of form: ", formReq);
    message.success('Customer added successfully');
    handleCancel();
  };
  return (
    <>
      <Modal
        title='Add New Customer'
        open={showModal}
        onCancel={handleCancel}
        destroyOnClose
        okText='Submit'
        onOk={async () => {
          try {
            const values = await formInstance?.validateFields();
            formInstance?.resetFields();
            onCreate(values);
          } catch (error) {
            console.log("Failed:", error);
          }
        }}
      >
        <Form
          form={form}
          name='validateOnly'
          layout='vertical'
          autoComplete='off'
        >
          <Form.Item
            name='name'
            label='Customer Name'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='phone'
            label='Phone Number'
            type='text'
            rules={[
              {
                required: true,
                pattern: /^1?\s?(\(\d{3}\)|\d{3})(\s|-)?\d{3}(\s|-)?\d{4}$/gm,
                message: 'Please enter correct number'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='isWhatsappOpted' label='isWhatsapp'>
            <Checkbox.Group options={[{ value: "isWhatsapp" }]} />
          </Form.Item>
          <Form.Item
            name='addressline'
            label='Address'
            rules={[
              {
                required: finalProducts.some(
                  (item) => item.stock_type === "MTO"
                ),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name='city'
            label='City'
            rules={[
              {
                required: finalProducts.some(
                  (item) => item.stock_type === "MTO"
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='state'
            label='State'
            rules={[
              {
                required: finalProducts.some(
                  (item) => item.stock_type === "MTO"
                ),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='pincode'
            label='Pincode'
            rules={[
              {
                required: finalProducts.some(
                  (item) => item.stock_type === "MTO"
                ),
                type: 'number'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddNewCustomerModal;
