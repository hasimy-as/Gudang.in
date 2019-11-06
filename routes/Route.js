import express from 'express';
import alert from 'alert-node';
import db from '../database/mysql';

const Route = express.Router();

Route.get('/login', (req, res) => res.render('login'));
Route.get('/register', (req, res) => res.render('register'));
Route.get('/beranda', (req, res) => res.render('berandaUtama'));

Route.post('/authlog', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
  if (email && password) {
    db.query(sql, [email, password], (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        res.redirect('/beranda');
      } else {
        alert('Data anda salah!');
        res.redirect('/login');
      }
      res.end();
    });
  }
});

Route.post('/authreg', (req, res) => {
  let dataTeregistrasi = {
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password
  };
  db.query('INSERT INTO user SET ?', dataTeregistrasi, (err, results) => {
    if (err) throw err;
    console.log('Data masuk!', results);
    alert('Selamat! Anda telah terdaftar!');
    res.redirect('/login');
  });
});

Route.get('/', (req, res) => res.render('beranda'));

Route.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/');
  });
});

export default Route;
