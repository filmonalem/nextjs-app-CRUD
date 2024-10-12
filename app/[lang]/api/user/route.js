import { query } from "../../lib/db";

export async function GET(request) {
  try {
    const { rows } = await query('SELECT * FROM users', []);
    return new Response(
      JSON.stringify({
        success: true,
        data: rows,
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

export async function POST(request) {
  try {
    const { fullName, email, role, password } = await request.json();
    
    const { rows } = await query(
      'INSERT INTO users (fullName, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [fullName, email, role, password]
    );
    
    return new Response(
      JSON.stringify({
        success: true,
        data: rows[0], 
      }),
      {
        status: 201,
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