import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

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
  const [formData, setFormData] = useState({ categoryName: '', note: '', batch: '' });
  const [loadingDelete, setLoadingDelete] = useState(false);

  if (error) {
    return <div>Error loading categories</div>;
  }

  const validCategories = Array.isArray(response.data) ? response.data : []; 

  const handleUpdate = (category) => {
    setEditingCategory(category);
    setFormData(category);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const updatedValues = {
        ...formData,
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
        throw new Error('Failed to update category');
      }

      await response.json();
      mutate('http://localhost:5005/api/v1/category'); 
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to update category:", error);
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
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      {validCategories.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>
      ) : (
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            
            <tr>
              <th className="border bg-light-background dark:bg-dark-background border-gray-300 p-2">ID</th>
              <th className="border bg-light-background dark:bg-dark-background border-gray-300 p-2">Category Name</th>
              <th className="border bg-light-background dark:bg-dark-background border-gray-300 p-2">Note</th>
              <th className="border bg-light-background dark:bg-dark-background border-gray-300 p-2">Batch</th>
              <th className="border bg-light-background dark:bg-dark-background border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {validCategories.map((record, index) => (
              <tr key={record.categoryId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{record.categoryName}</td>
                <td className="border border-gray-300 p-2">{record.note}</td>
                <td className="border border-gray-300 p-2">{record.batch}</td>
                <td className="border border-gray-300 p-2">
                  <button 
                    onClick={() => handleUpdate(record)} 
                    className="mr-2 text-blue-500 dark:text-blue-300"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(record.categoryId)} 
                    className="text-red-500 dark:text-red-300"
                  >
                    {loadingDelete === record.categoryId ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Update Category</h2>
            <form onSubmit={handleUpdateCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="categoryName">Category Name :</label>
                <input
                  className="mt-1 block w-full  outline px-4 py-4 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
                  type="text"
                  id="categoryName"
                  value={formData.categoryName}
                  onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium" htmlFor="note">Note :</label>
                <input
                  className="mt-1 block w-full px-4 py-4  outline border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
                  type="text"
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>
              <div className="mb-4">
              <label className="block text-sm font-medium" htmlFor="note">Batch :</label>

                <input
                  className="mt-1 block w-full px-4 py-4 border-gray-300 outline rounded-md shadow-sm focus:ring focus:ring-opacity-50 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text"
                  type="text"
                  id="batch"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                />
              </div>
              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={() => setEditingCategory(null)} 
                  className="mr-2 bg-gray-300 text-black dark:bg-gray-600 dark:text-white rounded px-4 py-2"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white dark:bg-blue-700 rounded px-4 py-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
