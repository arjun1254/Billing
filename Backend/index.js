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

app.delete('/delete-item', (req, res) => {
  const item_id = req.body.item_id; // Extract item_id from the request body

  if (!item_id) {
    return res.status(400).json({ success: false, message: "Invalid item ID." });
  }

  // Search query: Look for item_id in the items table
  const searchQuery = `SELECT * FROM items WHERE item_id = ?`;

  con.query(searchQuery, [item_id], (err, results) => {
    if (err) {
      console.error('Error searching for item:', err);
      return res.status(500).json({ success: false, message: 'Database search failed.' });
    }

    // Check if the item exists
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }

    // If the item exists, proceed to delete it
    const deleteQuery = `DELETE FROM items WHERE id = ?`;

    con.query(deleteQuery, [item_id], (err, result) => {
      if (err) {
        console.error('Error deleting item:', err);
        return res.status(500).json({ success: false, message: 'Database deletion failed.' });
      }

      res.json({ success: true, message: 'Item deleted successfully.' });
    });
  });
});
// app.post('/customer', (req, res) => {
//   console.log(req.body); // Log the incoming request body

//   const { contact_number, Name, Email, Address } = req.body;

//   console.log('Received data:', req.body); // Debugging log

//   con.connect(function(err) {
//       if (err) {
//           console.error('Error connecting to the database:', err);
//           return res.status(500).json({ message: 'Database connection error', error: err });
//       }

//       const query = `
//           INSERT INTO customer (contact_number, Name, Email, Address)
//           VALUES (?, ?, ?, ?)
//       `;

//       const values = [contact_number, Name, Email, Address];

//       con.query(query, values, (err, result) => {
//           if (err) {
//               console.error('Error inserting data:', err);
//               return res.status(500).json({ message: 'Error inserting data', error: err });
//           }
//           res.status(200).json({ message: 'customer details added successfully' });
//       });
//   });
// });




app.listen(port, () => {
  console.log(`server at ${port}`);
});
