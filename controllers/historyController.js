import pool from "../database.js";

//Post one History Entry

export const postHistoryEntry = async(req, res) => {
    try {
        const { date, event, description } = req.body;
        if (!event) {
            return res.status(400).json({ error: 'Event is required' });
        }
        const newHistoryEvent = await pool.query(
            "INSERT INTO history (date, event, description) VALUES($1, $2, $3) returning *", 
            [date, event, description]
        );
        res.json(newHistoryEvent.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};

//Get all History Entries

export const getHistory = async(req,res) => {
    try {
        const allHistory =  await pool.query("SELECT * FROM history");
        res.json(allHistory.rows);
        
    } catch (err) {
        console.error(err.message)
    }
};

//Delete one History Entry

export const deleteOneHistoryEntry = async(req,res) => {
    try{
        const { id } = req.params;
        const deleteHistoryEntry = await pool.query("DELETE FROM history WHERE historyid = $1", [id]);

        res.json("History Entry has been deleted");
    } catch (err) {
        console.error(err.message)
    }
};

//Update one History Entry

export const updateOneHistoryEntry = async(req, res) => {
    try{
        const { id } = req.params;
        const { date, event, description } = req.body;

        const updatedHistoryEntry = await pool.query(`UPDATE history SET date = COALESCE($1, date),
                                                               event = COALESCE($2, event),
                                                               description = COALESCE($3, description)
                                                               WHERE historyid = $4 returning *`, [date, event, description, id])
        
        res.json(updatedHistoryEntry.rows[0]);
    } catch  (err) {
        console.error(err.message)
    }
};

//Get one History Entry

export const getOneHistoryEntry = async(req, res) => {
    try{
        const { id } = req.params;
        const getHistoryEntry = await pool.query("SELECT * FROM history WHERE historyid = $1", [id])

        if (getHistoryEntry.rows.length === 0) {
            return res.status(404).json({ error: "History Entry not found" });
        }

        res.json(getHistoryEntry.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};