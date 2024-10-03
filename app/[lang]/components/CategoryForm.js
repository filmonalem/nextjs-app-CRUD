'use client';
import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import useSWR, { mutate } from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data;
};

const CategoryForm = ({ onClose, editingCategory }) => {
  const [form] = Form.useForm();

  const { data: categories, error } = useSWR('http://localhost:5005/api/v1/category', fetcher);

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        categoryName: editingCategory.categoryName,
        note: editingCategory.note,
        batch: editingCategory.batch,
      });
    } else {
      form.resetFields(); 
    }
  }, [editingCategory, form]);

  const handleSubmit = async (values) => {
    const categoryData = { ...values };

    try {
      let response;
      if (editingCategory) {
        response = await fetch(`http://localhost:5005/api/v1/category/${editingCategory.categoryId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });
      } else {
        response = await fetch('http://localhost:5005/api/v1/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });
      }

      if (response.ok) {
        const result = await response.json();
        form.resetFields();

        mutate('http://localhost:5005/api/v1/category');

        onClose(); 
      } else {
        const errorMessage = await response.text(); 
        console.error('Failed to create/update category:', errorMessage);
        alert(`Error: ${errorMessage}`); 
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (error) return <div>Error loading categories</div>;

  return (
    <div className="max-w-md mx-auto">
      <Form form={form} onFinish={handleSubmit} layout="vertical">
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
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {editingCategory ? 'Update Category' : 'Create Category'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryForm;
