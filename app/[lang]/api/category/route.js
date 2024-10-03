
import { query } from "../../lib/db";

export async function GET(request) {
  try {
    const { rows } = await query('SELECT * FROM category', []);
    
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
    const { categoryName, note, batch } = await request.json();
    
    const { rows } = await query(
      'INSERT INTO categories (categoryName, note, batch, ) VALUES ($1, $2, $3) RETURNING *',
      [categoryName, note, batch]
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