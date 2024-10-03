// app/[lang]/api/user/[userId]/route.js

// export async function DELETE(request) {
//   try {
//     const { userId } = await request.json(); // Ensure that userId is being sent in the body

//     // Perform the delete operation
//     const { rowCount } = await query(
//       'DELETE FROM users WHERE userId = $1',
//       [userId]
//     );

//     // Check if any rows were deleted
//     if (rowCount === 0) {
//       return new Response(
//         JSON.stringify({ success: false, message: 'User not found' }),
//         {
//           status: 404,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({ success: true, message: 'User deleted successfully' }),
//       {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   }
// }
export async function DELETE(request) {
  try {
    const { userId } = await request.json();
    console.log("Suspend user request for userId:", userId); 

    const { rowCount } = await query(
      'DELETE FROM users WHERE userId = $1',
      [userId]
    );

    if (rowCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'User deleted successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function PUT(request) {
  try {
    const { userId, fullName, email, role, password } = await request.json();
    const { rows } = await query(
      'UPDATE users SET fullName = $1, email = $2, role = $3, password = $4 WHERE userId = $5 RETURNING *',
      [fullName, email, role, password, userId]
    );

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
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
