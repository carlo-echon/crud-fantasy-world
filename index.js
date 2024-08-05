import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js'
import characterRoutes from './routes/people.js'
import magicItemRoutes from './routes/magicitems.js'
import historyRoutes from './routes/history.js'
import locationRoutes from './routes/locations.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Update with your frontend URL
}));

const port = 4000

app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/characters', characterRoutes);
app.use('/magicitems', magicItemRoutes);
app.use('/history', historyRoutes);
app.use('/locations', locationRoutes);

app.get('/', (req, res) => {
    res.send('NodeJS, PostgreSQL, Vercel API following CRUD.');
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

export default app;