import pool from "../database.js";

//Post one Character

export const postCharacter = async(req, res) => {
    try {
        const { name, species, alignment, standing, goals } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const newCharacter = await pool.query(
            "INSERT INTO people (name, species, alignment, standing, goals) VALUES($1, $2, $3, $4, $5) returning *", 
            [name, species, alignment, standing, goals]
        );
        res.json(newCharacter.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};

//Get all Characters

export const getCharacters = async(req,res) => {
    try {
        const allCharacters =  await pool.query("SELECT * FROM people");
        res.json(allCharacters.rows);
        
    } catch (err) {
        console.error(err.message)
    }
};

//Delete one Character

export const deleteOneCharacter = async(req,res) => {
    try{
        const { id } = req.params;
        const deleteCharacter = await pool.query("DELETE FROM people WHERE characterid = $1", [id]);

        res.json("Character has been deleted");
    } catch (err) {
        console.error(err.message)
    }
};

//Update one Character

export const updateOneCharacter = async(req, res) => {
    try{
        const { id } = req.params;
        const { name, species, alignment, standing, goals } = req.body;

        const updatedCharacter = await pool.query(`UPDATE people SET name = COALESCE($1, name),
                                                               species = COALESCE($2, species),
                                                               alignment = COALESCE($3, alignment),
                                                               standing = COALESCE($4, standing),
                                                               goals = COALESCE($5, goals) WHERE characterid = $6 returning *`, [name, species, alignment, standing, goals, id])
        
        res.json(updatedCharacter.rows[0]);
    } catch  (err) {
        console.error(err.message)
    }
};

//Get one Character

export const getOneCharacter = async(req, res) => {
    try{
        const { id } = req.params;
        const getCharacter = await pool.query("SELECT * FROM people WHERE characterid = $1", [id])

        if (getCharacter.rows.length === 0) {
            return res.status(404).json({ error: "Character not found" });
        }

        res.json(getCharacter.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};