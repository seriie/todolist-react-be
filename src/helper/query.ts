import db from '../config/db';
import { Pool } from 'mysql2/promise';

const queryDb = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err: Error | null, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export default queryDb;