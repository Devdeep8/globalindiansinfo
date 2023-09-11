const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const port = process.env.PORT || 5001;
const db = require('./db.js');


// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  host: 'consulting.prabisha.com', // SMTP server hostname
  port: 587, // Port for the SMTP server (587 is commonly used for TLS)
  secure: false, // Set to true if your SMTP server uses SSL/TLS
  auth: {
    user: 'info@prabisha.com', // Your email address
    pass: 'ElzAeL6n', // Your email password
  },
});


const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(cors());


// Multer configuration for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/blogs'); // Specify your image upload folder
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.static('public'));

// Endpoint to post a new blog
app.post('/api/blogs', upload.single('image'), async (req, res) => {
  try {
    const { title, content , categories } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    // Generate a slug from the title
    const slug = title.toLowerCase().replace(/ /g, '-'); // Converts spaces to hyphens

    const [results] = await db.query('INSERT INTO blogs (title, content,categories, image_path, slug) VALUES (?, ?, ?, ? , ?)', [title, content, categories,  imagePath, slug]);
    const blogId = results.insertId;
    res.status(201).json({ message: 'Blog post created successfully', blogId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to edit an existing blog by ID
app.put('/api/blogs/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    // Generate a slug from the title (if needed)
    // const slug = title.toLowerCase().replace(/ /g, '-');

    // Update the blog in the database
    await db.query('UPDATE blogs SET title = ?, content = ?, image_path = ? WHERE id = ?', [title, content, imagePath, id]);
    res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to delete an existing blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the blog from the database
    await db.query('DELETE FROM blogs WHERE id = ?', [id]);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// Endpoint to get all blog slugs
app.get('/api/blogSlugs', async (req, res) => {
  try {
    // Query the database to fetch all blog slugs
    const [rows] = await db.query('SELECT slug FROM blogs'); // Adjust the query as per your database structure

    // Extract the slugs from the database response
    const slugs = rows.map((row) => row.slug);

    res.json(slugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







// Endpoint to get a single blog by slug
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Query the database to find the blog by its slug
    const [results] = await db.query('SELECT * FROM blogs WHERE slug = ?', [slug]);

    // Check if a blog with the given slug exists
    if (results.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // If a blog with the slug exists, return it
    const blog = results[0];
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Endpoint to get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM blogs ORDER BY id DESC');

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});










/**   articles api  */



// Multer configuration for handling image uploads
let Articlestorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/articles'); // Specify your image upload folder
  },
  filename: (req, file, callback) => {
    const uniqueSuffix2 = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + '-' + uniqueSuffix2 + path.extname(file.originalname));
  },
});

const articleupload = multer({ storage : Articlestorage });

app.use(express.json());
app.use(express.static('public'));

// Endpoint to post a new blog
app.post('/api/articles', articleupload.single('image1'), async (req, res) => {
  try {
    const { title, content , categories } = req.body;
    const articleimagePath = req.file ? req.file.filename : null;

    // Generate a slug from the title
    const slug = title.toLowerCase().replace(/ /g, '-'); // Converts spaces to hyphens

    const [results] = await db.query('INSERT INTO articles ( title, description,categories, imagepath, slug) VALUES ( ?, ?, ?, ? , ?)', [title,content, categories,  articleimagePath, slug]);
    const articleId = results.insertId;
    res.status(201).json({ message: 'Article created successfully', articleId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to edit an existing blog by ID
app.put('/api/articles/:id', articleupload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    // Generate a slug from the title (if needed)
     const slug = title.toLowerCase().replace(/ /g, '-');

    // Update the blog in the database
    await db.query('UPDATE articles SET title = ?, description = ? , slug = ?, imagepath = ? WHERE id = ?', [title, content, imagePath, id , slug]);
    res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to delete an existing article by ID
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the article with the given ID exists
    const [article] = await db.query('SELECT * FROM articles WHERE id = ?', [id]);

    if (article.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Delete the article from the database
    await db.query('DELETE FROM articles WHERE id = ?', [id]);
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// Endpoint to get all blog slugs
app.get('/api/articleSlugs', async (req, res) => {
  try {
    // Query the database to fetch all blog slugs
    const [rows] = await db.query('SELECT slug FROM articles'); // Adjust the query as per your database structure

    // Extract the slugs from the database response
    const slugs = rows.map((row) => row.slug);

    res.json(slugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/api/articles', async (req, res) => {
  try {
    
 // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles ORDER BY id DESC');

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});










 app.get('/api/articles/latest', async (req, res) => {
  try {
    const category = "latest"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 

 app.get('/api/articles/education', async (req, res) => {
  try {
    const category = "education"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 


 app.get('/api/articles/events', async (req, res) => {
  try {
    const category = "events"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 

 app.get('/api/articles/jobs', async (req, res) => {
  try {
    const category = "jobs"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 

 app.get('/api/articles/business', async (req, res) => {
  try {
    const category = "business"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 


 app.get('/api/articles/tech', async (req, res) => {
  try {
    const category = "tech"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 

 app.get('/api/articles/travel', async (req, res) => {
  try {
    const category = "travel"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 

 app.get('/api/articles/news', async (req, res) => {
  try {
    const category = "news"; // Get the category from the query parameters

    if (!category) {
      // Handle the case when no category is provided
      return res.status(400).json({ message: 'Category parameter is required' });
    }

    // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM articles WHERE categories LIKE ? ORDER BY id DESC', [`%${category}%`]);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}); 





// Endpoint to get a single blog by slug
app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Query the database to find the blog by its slug
    const [results] = await db.query('SELECT * FROM articles WHERE slug = ?', [slug]);

    // Check if a blog with the given slug exists
    if (results.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // If a blog with the slug exists, return it
    const article = results[0];
    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});















/* business listing api start */


// Multer configuration for handling image uploads
let businessStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/business'); // Specify your image upload folder
  },
  filename: (req, file, callback) => {
    const uniqueSuffix2 = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + '-' + uniqueSuffix2 + path.extname(file.originalname));
  },
});

const businessupload = multer({ storage : businessStorage });

app.use(express.json());
app.use(express.static('public'));

// Endpoint to post a new blog
app.post('/api/business', businessupload.single('image'), async (req, res) => {
  try {
    const { name, type , location } = req.body;
    const status  = false;
    const businessimagepath = req.file ? req.file.filename : null;

    const [results] = await db.query('INSERT INTO business_listings ( name, type,location, status , imagepath) VALUES ( ?, ?, ?, ? , ?)', [name,type, location, status,  businessimagepath,]);
    const businessId = results.id;
    res.status(201).json({ message: 'Business Listing Uploaded Successfully ', businessId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/business', async (req, res) => {
  try {
    
 // Use the SQL LIKE operator to search for the category within the categories column
    const [rows] = await db.query('SELECT * FROM business_listings ORDER BY id DESC');

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// PUT route to update the status of a business listing by businessId
app.put('/api/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params; // Get the businessId from the URL parameter
    const { status } = req.body; // Get the new status from the request body

    // You can add validation logic here to ensure the status is either 'Active' or 'Inactive'


    // Update the status in the database based on businessId
    const [results] = await db.execute('UPDATE business_listings SET status = ? WHERE id = ?', [status, businessId]);

   // Release the connection back to the pool

    if (results.affectedRows === 1) {
      res.status(200).json({ message: 'Business listing status updated successfully' });
    } else {
      res.status(404).json({ message: 'Business listing not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route to delete a business listing by businessId
app.delete('/api/business/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params; // Get the businessId from the URL parameter


    // Delete the business listing from the database based on businessId
    const [results] = await db.execute('DELETE FROM business_listings WHERE id = ?', [businessId]);



    if (results.affectedRows === 1) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Business listing not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});








/* business listing api end */







app.post('/contactus', (req, res) => {
  const { name, email, phone, message } = req.body;
  const query = 'INSERT INTO contact_forms (name, email, phone, message) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, phone, message], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.json({ error: 'failed' });
      return;
    }

    const mailOptions = {
      from: `${email}`,
      to: ['info@prabisha.com'],
      subject: 'Global Indians Info Contact Form Submission',
      html: `
        <html>
          <head>
            <!-- Include Bootstrap CSS -->
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            >
            <style>
              /* Add custom styles here */
              body {
                background-color: #f0f0f0; /* Background color */
                padding: 20px;
              }
              .container {
                background-color: #ffffff; /* Content background color */
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2 class="mb-4">Global Indians Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p> <!-- Corrected variable name here -->
              <p><strong>Message:</strong> ${message}</p>
            </div>
          </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.json({ error: 'Email not sent' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Entry created successfully and email sent', id: results.insertId });
      }
    });
  });
});


    

























    






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
