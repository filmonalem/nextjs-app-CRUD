
// "use client";

// import React, { useState } from 'react';

// const CommentItem = ({ postId, id, name, email, body, setComments, comments }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedName, setUpdatedName] = useState(name);
//   const [updatedEmail, setUpdatedEmail] = useState(email);
//   const [updatedBody, setUpdatedBody] = useState(body);

//   const deleteComment = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/comments/${id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.ok) {
//         const updatedComments = comments.filter(comment => comment.id !== id);
//         setComments(updatedComments);
//         console.log("Comment deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting the comment", error);
//     }
//   };

//   const updateComment = async () => {
//     try {
//       const response = await fetch(`http://localhost:4000/comments/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           postId,
//           id,
//           name: updatedName,
//           email: updatedEmail,
//           body: updatedBody,
//         }),
//       });

//       if (response.ok) {
     
//         const updatedComments = comments.map(comment =>
//           comment.id === id
//             ? { ...comment, name: updatedName, email: updatedEmail, body: updatedBody }
//             : comment
//         );
//         setComments(updatedComments);
//         setIsEditing(false); // Close the edit form after successful update
//         console.log("Comment updated successfully");
//       }
//     } catch (error) {
//       console.error("Error updating the comment", error);
//     }
//   };

//   return (
//     <>
//       <div className="comment-item bg-orange-400 border border-gray-300 p-4 rounded-lg mb-4 w-full max-w-md">
//         {!isEditing ? (
//           <>
//             <h2 className="text-lg font-semibold mb-2">{name}</h2>
//             <p className="text-sm text-gray-700 mb-1">
//               <strong>Email:</strong> {email}
//             </p>
//             <p className="text-sm text-gray-700 mb-1">
//               <strong>Post ID:</strong> {postId}
//             </p>
//             <p className="text-sm text-gray-700 mb-1">
//               <strong>Comment ID:</strong> {id}
//             </p>
//             <p className="text-sm text-gray-800 mt-2">{body}</p>
//           </>
//         ) : (
//           <form onSubmit={e => { e.preventDefault(); updateComment(); }}>
//             <input
//               className="border border-gray-300 rounded p-2 mb-2 w-full"
//               value={updatedName}
//               onChange={(e) => setUpdatedName(e.target.value)}
//               placeholder="Name"
//             />
//             <input
//               className="border border-gray-300 rounded p-2 mb-2 w-full"
//               value={updatedEmail}
//               onChange={(e) => setUpdatedEmail(e.target.value)}
//               placeholder="Email"
//             />
//             <textarea
//               className="border border-gray-300 rounded p-2 mb-2 w-full"
//               value={updatedBody}
//               onChange={(e) => setUpdatedBody(e.target.value)}
//               placeholder="Body"
//             />
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
//               Save
//             </button>
//             <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
//               Cancel
//             </button>
//           </form>
//         )}
//       </div>

//       {!isEditing && (
//         <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
//           Update
//         </button>
//       )}
//       <button onClick={deleteComment} className="bg-red-500 text-white px-4 py-2 rounded-md">
//         Delete
//       </button>
//     </>
//   );
// };

// export default CommentItem;
"use client";

import React, { useState } from 'react';

const CommentItem = ({ postId, id, name, email, body, setComments, comments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedBody, setUpdatedBody] = useState(body);

  const deleteComment = async () => {
    try {
      const response = await fetch(`http://localhost:4000/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
        console.log("Comment deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting the comment", error);
    }
  };

  const updateComment = async () => {
    try {
      const response = await fetch(`http://localhost:4000/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          id,
          name: updatedName,
          email: updatedEmail,
          body: updatedBody,
        }),
      });

      if (response.ok) {
        const updatedComments = comments.map(comment =>
          comment.id === id
            ? { ...comment, name: updatedName, email: updatedEmail, body: updatedBody }
            : comment
        );
        setComments(updatedComments);
        setIsEditing(false);
        console.log("Comment updated successfully");
      }
    } catch (error) {
      console.error("Error updating the comment", error);
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 p-4 rounded-md mb-4 transition duration-300 ease-in-out transform hover:shadow-lg">
      {!isEditing ? (
        <>
          <h2 className="text-lg font-semibold mb-2">{name}</h2>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Post ID:</strong> {postId}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Comment ID:</strong> {id}
          </p>
          <p className="text-sm text-gray-800 mt-2">{body}</p>
        </>
      ) : (
        <form onSubmit={e => { e.preventDefault(); updateComment(); }}>
          <input
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            placeholder="Email"
          />
          <textarea
            className="border border-gray-300 rounded p-2 mb-2 w-full"
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
            placeholder="Body"
          />
          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
          </div>
        </form>
      )}
      {!isEditing && (
        <div className="flex justify-end space-x-2 mt-2">
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Update
          </button>
          <button onClick={deleteComment} className="bg-red-500 text-white px-4 py-2 rounded-md">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
