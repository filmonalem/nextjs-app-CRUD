
export async function GET(params) {
    try {
        const response = await fetch('http://localhost:4000/comments', {
            method: 'GET',
        });

     
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        return new Response(JSON.stringify({ message: 'data', data }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error fetching data', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
