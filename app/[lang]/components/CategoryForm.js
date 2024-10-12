'use client';

import React, { useEffect, useState } from 'react';
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
  const { data: categories, error } = useSWR('http://localhost:5005/api/v1/category', fetcher);
  const [formData, setFormData] = useState({
    categoryName: '',
    note: '',
    batch: '',
  });

  useEffect(() => {
    if (editingCategory) {
      setFormData({
        categoryName: editingCategory.categoryName || '',
        note: editingCategory.note || '',
        batch: editingCategory.batch || '',
      });
    } else {
      setFormData({
        categoryName: '',
        note: '',
        batch: '',
      });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { ...formData };

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
        await response.json();
        mutate('http://localhost:5005/api/v1/category');
        setFormData({
          categoryName: '',
          note: '',
          batch: '',
        });
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
    <div className="max-w-md mx-auto p-4 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-light-text dark:text-dark-text" htmlFor="categoryName">
            Category Name
          </label>
          <input
            id="categoryName"
            name="categoryName"
            type="text"
            value={formData.categoryName}
            onChange={handleChange}
            placeholder="Category Name"
            required
            className="mt-1 block w-full px-3 py-2 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light-text dark:text-dark-text" htmlFor="note">
            Note
          </label>
          <input
            id="note"
            name="note"
            type="text"
            value={formData.note}
            onChange={handleChange}
            placeholder="Note"
            className="mt-1 block w-full px-3 py-2 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-light-text dark:text-dark-text" htmlFor="batch">
            Batch
          </label>
          <input
            id="batch"
            name="batch"
            type="text"
            value={formData.batch}
            onChange={handleChange}
            placeholder="Batch"
            className="mt-1 block w-full px-3 py-2 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 bg-gray-300 text-black dark:bg-gray-600 dark:text-white rounded px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white dark:bg-blue-700 rounded px-4 py-2"
          >
            {editingCategory ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
