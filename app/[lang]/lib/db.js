import { Pool } from 'pg';

const pool = new Pool({
  user: "philmon",     
  host:"localhost",    
  database: "super",  
  password:"f3451146", 
  port: 5432,     
});

export const query = (text, params) => pool.query(text, params);
