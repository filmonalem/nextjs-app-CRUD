
"use client";

import { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";
import { Layout, Button, Typography, Modal } from "antd";
import Header from "../components/Header";

const { Title } = Typography;

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("api/category", {
        next: { revalidate: 10 },
      });
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      setError("Failed to fetch categories");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    setError(null); 
  };
  const handleCategoryAdded = async (newCategory) => {
    console.log("Adding category:", newCategory);
    try {
      const response = await fetch("api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      const data = await response.json();
      console.log("Response data:", data);
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }

    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleCategoryUpdate = async (updatedCategory) => {
    try {
      const response = await fetch(`api/category/${updatedCategory.categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      if (!response.ok) throw new Error("Failed to update category");

      const updatedData = await response.json();
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.categoryId === updatedData.categoryId ? updatedData : category
        )
      );
      handleCloseModal();
    } catch (error) {
      setError("Failed to update category");

    }
  };

  const handleCategoryDelete = async (categoryId) => {
    try {
      const response = await fetch(`api/category/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.categoryId !== categoryId)
        );
      } else {
        throw new Error("Failed to delete category");
      }
    } catch (error) {
      setError("Failed to delete category");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Layout.Content style={{ padding: "24px" }}>
        <Title level={2}>Welcome to the Category Dashboard</Title>

        <Button
          className="bg-white text-black border border-gray-300 hover:bg-gray-100"
          onClick={handleOpenModal}
          style={{ marginBottom: '16px' }}
        >
          New
        </Button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {categories.length > 0 && (
          <CategoryTable
            categories={categories}
            onDelete={handleCategoryDelete}
            onUpdate={(category) => {
              setEditingCategory(category);
              handleOpenModal();
            }}
          />
        )}
      </Layout.Content>

      <Modal
        title={editingCategory ? "Update Category" : "Add Category"}
        visible={modalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <CategoryForm
          onClose={handleCloseModal}
          onCategoryAdded={handleCategoryAdded}
          onCategoryUpdate={handleCategoryUpdate}
          editingCategory={editingCategory}
        />
      </Modal>
    </Layout>
  );
}