import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gudang_in',
  multipleStatements: true
});

db.connect(err => {
  if (err) throw err;
  console.log('Koneksi ke db!');
});

export default db;
