'use client';

import { useEffect, useState } from "react";
import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";
import { Layout, Button, Typography, Modal } from "antd";
import Header from "../components/Header";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

const { Title } = Typography;

export default function CategoryPage() {
  const { user } = useUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

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
    try {
      const response = await fetch("api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`);
      }
      // Optionally, update categories state here
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
    <Layout className="min-h-screen bg-light-background dark:bg-dark-background  dark:text-dark-text">
      <Header />
      <Layout.Content className="p-6 bg-light-background dark:bg-dark-background">
        <Title level={2} className="text-light-text dark:text-dark-text">
          Welcome to the Category Dashboard
        </Title>

        <Button
          className="bg-light-background dark:text-dark-text dark:bg-dark-background border border-gray-300 hover:bg-gray-100 dark:bg-secondary"
          onClick={handleOpenModal}
          style={{ marginBottom: '16px' }}
        >
          New
        </Button>

        {error && <p className="text-red-500">{error}</p>}

        {categories.length > 0 && (
          <CategoryTable
            className="bg-light-background dark:bg-dark-background"
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
        className="bg-light-background dark:bg-dark-background"
      >
        <CategoryForm
          onClose={handleCloseModal}
          className="bg-light-background dark:bg-dark-background"
          onCategoryAdded={handleCategoryAdded}
          onCategoryUpdate={handleCategoryUpdate}
          editingCategory={editingCategory}
        />
      </Modal>
    </Layout>
  );
}