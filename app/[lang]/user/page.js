"use client";

import UserForm from "@/app/[lang]/components/UserForm";
import UserTable from "@/app/[lang]/components/UserTable";
import { Layout } from "antd/es";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("api/user");
      const data = await response.json();
      setUsers(data.data);
    }

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setFullName("");
    setRole("");
    setEmail("");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>

    <Header/>
    <div className="p-4">
      <main>
        <h1 className="text-2xl font-bold mb-4">Welcome to the User Dashboard</h1>

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleOpenModal}
        >
          Add User
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {!modalOpen && users.length > 0 && (
          <UserTable users={users} />
        )}
      </main>

      {modalOpen && (
        <div className="modal">
          <h2 className="text-lg font-bold mb-4">Add User</h2>
        
          <UserForm
            fullName={fullName}
            setFullName={setFullName}
            role={role}
            setRole={setRole}
            email={email}
            setEmail={setEmail}
            onClose={handleCloseModal}
          />
            <button
            className="mt-4 flex justify-items-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      )}
    </div>
    </Layout>
  );
}