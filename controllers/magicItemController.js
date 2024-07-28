import pool from "../database.js";

//Post one Magic Item

export const postMagicItem = async(req, res) => {
    try {
        const { name, type, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const newMagicItem = await pool.query(
            "INSERT INTO magicitems (name, type, description) VALUES($1, $2, $3) returning *", 
            [name, type, description]
        );
        res.json(newMagicItem.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};

//Get all Magic Items

export const getMagicItems = async(req,res) => {
    try {
        const allMagicItems =  await pool.query("SELECT * FROM magicitems");
        res.json(allMagicItems.rows);
        
    } catch (err) {
        console.error(err.message)
    }
};

//Delete one Magic Item

export const deleteOneMagicItem = async(req,res) => {
    try{
        const { id } = req.params;
        const deleteMagicItem = await pool.query("DELETE FROM magicitems WHERE magicitemid = $1", [id]);

        res.json("Magic Item has been deleted");
    } catch (err) {
        console.error(err.message)
    }
};

//Update one Magic Item

export const updateOneMagicItem = async(req, res) => {
    try{
        const { id } = req.params;
        const { name, type, description } = req.body;

        const updatedMagicItem = await pool.query(`UPDATE magicitems SET name = COALESCE($1, name),
                                                               type = COALESCE($2, type),
                                                               description = COALESCE($3, description)
                                                               WHERE magicitemid = $4 returning *`, [name, type, description, id])
        
        res.json(updatedMagicItem.rows[0]);
    } catch  (err) {
        console.error(err.message)
    }
};

//Get one Magic Item

export const getOneMagicItem = async(req, res) => {
    try{
        const { id } = req.params;
        const getMagicItem = await pool.query("SELECT * FROM magicitems WHERE magicitemid = $1", [id])

        if (getMagicItem.rows.length === 0) {
            return res.status(404).json({ error: "Magic Item not found" });
        }

        res.json(getMagicItem.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};