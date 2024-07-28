import pool from "../database.js";

//Post One User

export const postUser = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const newUser = await pool.query(
            "INSERT INTO users (name) VALUES($1) RETURNING *", 
            [name]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};

//Get all Users

export const getUsers = async(req,res) => {
    try {
        const allUsers =  await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
        
    } catch (err) {
        console.error(err.message)
    }
};

//Delete one User

export const deleteOneUser = async(req,res) => {
    try{
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);

        res.json("User has been deleted");
    } catch (err) {
        console.error(err.message)
    }
};

//Update one User

export const updateOneUser = async(req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;

        const updatedNote = await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, id])
        
        res.json("User has been updated")
    } catch  (err) {
        console.error(err.message)
    }
};

//Get one User
export const getOneUser = async(req, res) => {
    try{
        const { id } = req.params;
        const getUser = await pool.query("SELECT * FROM users WHERE id = $1", [id])

        res.json("User has been retrieved");
    } catch (err) {
        console.error(err.message)
    }
};