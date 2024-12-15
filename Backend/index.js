import express from 'express';
// var mysql = require('mysql');
import mysql from 'mysql2'
import cors from 'cors'
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Database123#",
  database: "frontend admin"
});


const app = express()
// let corsOptions = {
//   origin : ['*'],
// }
app.use(express.json());
app.use(cors());

// app.options('*', cors()) // include before other routes
// app.use(cors(corsOptions))
const port = 3000;

app.get('/', (req, res) => {
  res.send('server is ready')
})

app.get('/categories', (req, res) => {
  

  con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT * FROM category", function (err, result, fields) {
      if (err) throw err;
      res.json(result)

    });
  });
})

// app.get('/items', (req, res) => {
//   res.json(items);
// });

app.post('/item', (req, res) => {
  console.log(req.body); // Log the incoming request body

  const { Category, item_id, item_name, unit, buying_price, selling_price, quantity, expiry_date, description } = req.body;
  const finalExpiryDate = expiry_date.trim() === '' ? null : expiry_date;

  console.log('Received data:', req.body); // Debugging log

  con.connect(function(err) {
      if (err) {
          console.error('Error connecting to the database:', err);
          return res.status(500).json({ message: 'Database connection error', error: err });
      }

      const query = `
          INSERT INTO items (category, item_id, item_name, unit, buying_price, selling_price, quantity, expiry_date, description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [Category, item_id, item_name, unit, buying_price, selling_price, quantity, expiry_date, description];

      con.query(query, values, (err, result) => {
          if (err) {
              console.error('Error inserting data:', err);
              return res.status(500).json({ message: 'Error inserting data', error: err });
          }
          res.status(200).json({ message: 'Item added successfully' });
      });
  });
});



app.get('/item', (req, res) => {
  
  con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT * FROM items", function (err, result, fields) {
      if (err) throw err;
      res.json(result)

    });
  });
})



app.post('/employee', (req, res) => {
  
  const { employee_id, name, email, password, confirm_password,phone, gender } = req.body;

  console.log('Received data:', req.body);

  // Basic validation
  if (!employee_id || !name || !email || !password || !confirm_password|| !phone || !gender) {
      return res.status(400).send({ message: 'All fields are required' });
  }

  con.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:', err);
        return res.status(500).json({ message: 'Database connection error', error: err });
    }
  

  // SQL query to insert data
  const query = `
      INSERT INTO employee (employee_id, name, email, password,confirm_password, phone, gender)
      VALUES (?, ?, ?, ?, ?, ?,?)
  `;
  const values = [employee_id, name, email, password,confirm_password, phone, gender];

  con.query(query, values, (err, result) => {
      if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).send({ message: 'Database error', error: err });
      }
      res.status(200).send({ message: 'Employee added successfully', employeeId: result.insertId });
  });
});
});

app.get('/employee', (req, res) => {
  
  con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT * FROM employee", function (err, result, fields) {
      if (err) throw err;
      res.json(result)

    });
  });
})

app.delete('/delete-item/:item_id', (req, res) => {
  const item_id = req.params.item_id;

  if (!item_id || item_id === 'null') {
    return res.status(400).json({ success: false, message: "Invalid item ID." });
  }

  const query = `DELETE FROM items WHERE id = ?`;

  con.query(query, [item_id], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ success: false, message: 'Database deletion failed.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    res.json({ success: true, message: 'Item deleted successfully.' });
  });
});

app.get('/delete-item/:item_id', (req, res) => {
  
  con.connect(function(err) {
    if (err) throw err;

    con.query('DELETE FROM items WHERE item_id = ?', function (err, result, fields) {
      if (err) throw err;
      res.json(result)

    });
  });
})


app.listen(port, () => {
  console.log(`server at ${port}`);
});
