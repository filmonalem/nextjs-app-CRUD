
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr'; 
import { Table, Button, Modal, Form, Input, message, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

const CategoryTable = () => {
  const { data: response = {}, error } = useSWR('http://localhost:5005/api/v1/category', fetcher);
  
  const [editingCategory, setEditingCategory] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [form] = Form.useForm();

  if (error) {
    return <div>Error loading categories</div>;
  }

  const validCategories = Array.isArray(response.data) ? response.data : []; 

  const handleUpdate = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
  };

  const handleUpdateCategory = async (values) => {
    setLoadingUpdate(true);
    try {
      const updatedValues = {
        ...values,
        categoryId: editingCategory.categoryId,
      };

      const response = await fetch(`http://localhost:5005/api/v1/category/${editingCategory.categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedValues),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        message.error('Failed to update category');
        throw new Error(errorMessage);
      }

      await response.json();
      mutate('http://localhost:5005/api/v1/category'); 
      message.success('Category updated successfully');
      setEditingCategory(null);
      form.resetFields();
    } catch (error) {
      console.error("Failed to update category:", error);
      message.error('An error occurred while updating the category.'); 
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleDelete = async (categoryId) => {
    setLoadingDelete(categoryId);
    try {
      const response = await fetch(`http://localhost:5005/api/v1/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        mutate('http://localhost:5005/api/v1/category'); 
        message.success('Category deleted successfully');
      } else {
        message.error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Error occurred while deleting category');
    } finally {
      setLoadingDelete(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            className="text-gray-600 hover:bg-gray-700 font-bold py-2 px-4 rounded"
            style={{ marginRight: 8 }}
          />
          <Button
            danger
            className="text-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
            icon={<DeleteOutlined />}
            loading={loadingDelete === record.categoryId}
            onClick={() => handleDelete(record.categoryId)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {validCategories.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin tip="Loading..." />
        </div>
      ) : (
        <Table 

          dataSource={validCategories} 
          columns={columns} 
          rowKey="categoryId" 
          pagination={false} 
          bordered 
        />
      )}

      <Modal
        title="Update Category"
        visible={!!editingCategory}
        onCancel={() => setEditingCategory(null)}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateCategory} layout="vertical">
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input placeholder="Category Name" />
          </Form.Item>
          <Form.Item label="Note" name="note">
            <Input placeholder="Note" />
          </Form.Item>
          <Form.Item label="Batch" name="batch">
            <Input placeholder="Batch" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loadingUpdate}>
              Update
            </Button>
            <Button onClick={() => setEditingCategory(null)} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryTable;