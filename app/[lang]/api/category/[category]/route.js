// export async function DELETE(request) {
//   try {
    
//     const { categoryId } = await request.json();

   
//     const { rowCount } = await query(
//       'DELETE FROM category WHERE categoryId = $1',
//       [categoryId]
//     );

    
//     if (rowCount === 0) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'Category not found' }),
//         {
//           status: 404,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({ success: true, message: 'Category deleted successfully' }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   }
// }

//   export async function PUT(request) {
//     try {
//       const { categoryId, categoryName, note, batch } = await request.json();
//       const { rows } = await query(
//         'UPDATE category SET categoryName = $1, note = $2, batch = $3 WHERE categoryId = $4 RETURNING *',
//         [categoryName, note, batch,categoryId]
//       );
  
//       return new Response(
//         JSON.stringify({
//           success: true,
//           data: rows[0],
//         }),
//         {
//           status: 200,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//     } catch (error) {
//       return new Response(
//         JSON.stringify({ success: false, message: error.message }),
//         {
//           status: 500,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//     }
//   }
export async function DELETE(request) {
  try {
    const { categoryId } = await request.json();

    // Validate categoryId
    if (!categoryId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Category ID is required' }),
        {
          status: 400, // Bad Request
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { rowCount } = await query(
      'DELETE FROM category WHERE categoryId = $1',
      [categoryId]
    );

    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Category not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Category deleted successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Delete Error:', error); // Log for debugging
    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function PUT(request) {
  try {
    const { categoryId, categoryName, note, batch } = await request.json();

    // Validate incoming data
    if (!categoryId || !categoryName) {
      return new Response(
        JSON.stringify({ success: false, message: 'Category ID and name are required' }),
        {
          status: 400, // Bad Request
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { rows } = await query(
      'UPDATE category SET categoryName = $1, note = $2, batch = $3 WHERE categoryId = $4 RETURNING *',
      [categoryName, note, batch, categoryId]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'Category not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: rows[0],
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Update Error:', error); 
    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}