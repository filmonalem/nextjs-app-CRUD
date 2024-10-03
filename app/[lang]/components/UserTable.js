// import UserForm from "./UserForm";

// const UserTable = ({ users, onDelete, onUpdate }) => {
//   const handleUpdate = (user) => {

//     onUpdate(user);
//   };

//   const handleDelete = async (userId) => {
//     try {
      
//       const response = await delete('http://localhost:5005/api/v1/auth/suspendUser',{
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       })  
//       if (response.ok) {
//         console.log('User deleted successfully');
//           }else{

//             console.error('Failed to delete user');;
//           }
//         }
//      catch (error) {
//       console.error('Error:', error);

//     }
//   };

//   return (
//     <div className="overflow-x-auto w-2/3">
//       <table className="table-auto w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2">ID</th>
//             <th className="px-4 py-2">Full Name</th>
//             <th className="px-4 py-2">Role</th>
//             <th className="px-4 py-2">Email</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="hover:bg-gray-100">
//               <td className="border text-black px-4 py-2">{user.userId}</td>
//               <td className="border px-4 py-2">{user.fullName}</td>
//               <td className="border px-4 py-2">{user.role}</td>
//               <td className="border px-4 py-2">{user.email}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-4 py-2 px-4 rounded"
// onClick={()=> handleUpdate(user)}
// >
//                   Update
//                 </button>
//                 <button
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
// onClick={() => handleDelete(user.userId)} 
//     >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserTable;import UserForm from "./UserForm";
import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserTable = ({ users, onDelete, onUpdate }) => {
  const handleUpdate = (user) => {
    onUpdate(user);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5005/api/v1/auth/suspendUser`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Wrap userId in an object
      });

      console.log('Deleting user with ID:', userId);

      if (response.ok) {
        console.log('User deleted successfully');
        onDelete(userId);
      } else {
        console.error('Failed to delete user', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1, // Display index as ID
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.userId)} // Make sure to use the correct userId
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Table
        dataSource={users}
        columns={columns}
        rowKey="userId" // Set the unique identifier for the rows
        pagination={false}
        bordered
      />
    </div>
  );
};

export default UserTable;