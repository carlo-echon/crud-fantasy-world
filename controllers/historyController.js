import pool from "../database.js";

//Post one History Entry

export const postHistoryEntry = async(req, res) => {
    try {
        const { historyDate, historyEvent, historyDescription } = req.body;
        if (!historyEvent) {
            return res.status(400).json({ error: 'Event is required' });
        }
        const newHistoryEvent = await pool.query(
            "INSERT INTO history (historyDate, historyEvent, historyDescription) VALUES($1, $2, $3) returning *", 
            [historyDate, historyEvent, historyDescription]
        );
        console.log("data posted")
        res.json(newHistoryEvent.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};

//Get all History Entries

export const getHistory = async(req,res) => {
    try {
        const allHistory =  await pool.query("SELECT * FROM history");
        console.log("data fetched")
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
        const { historyDate, historyEvent, historyDescription } = req.body;

        const updatedHistoryEntry = await pool.query(`UPDATE history SET historyDate = COALESCE($1, historyDate),
                                                                         historyEvent = COALESCE($2, historyEvent),
                                                                         historyDescription = COALESCE($3, historyDescription)
                                                                         WHERE historyid = $4 returning *`, [historyDate, historyEvent, historyDescription, id])
        
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
        console.log("We got 1")
        res.json(getHistoryEntry.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};