// 'use client';

// import React, { useState } from 'react';
// import CommentItem from './CommentItems';
// const Comments = () => {
//   const [comments, setComments] = useState([]);

//   const getComments = async () => {
//     let data = await fetch('http://localhost:4000/comments'); 
//     const res = await data.json();
//     setComments(res);
//   };

//   return (
//     <div>
//       {comments.map((item) => (
//         <CommentItem 
//           key={item.id}
//           postId={item.postId} 
//           id={item.id} 
//           name={item.name} 
//           email={item.email} 
//           body={item.body}
//         />
        
//       ))      
//       }

//       <button className="bg-slate-500 px-2 py-2 rounded" onClick={getComments}>Get Comments</button>
//     </div>
//   );
// };

// export default Comments;
"use client";

import React, { useState,useEffect } from 'react';
import CommentItem from './CommentItems';

const Comments = () => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const response = await fetch('en/api/comment');
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const result = await response.json();
  
      if (Array.isArray(result.data)) {
        setComments(result.data);
      } else {
        console.error('Data is not an array:', result);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {comments.map((item) => (
        <CommentItem 
          key={item.id}
          postId={item.postId} 
          id={item.id} 
          name={item.name} 
          email={item.email} 
          body={item.body}
          setComments={setComments} 
          comments={comments}
        />
      ))}

      <button className="bg-slate-500 px-2 py-2 rounded" onClick={getComments}>
        Get Comments
      </button>
    </div>
  );
};

export default Comments;
