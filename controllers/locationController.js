import pool from "../database.js";

//Post one Location Entry

export const postLocationEntry = async (req, res) => {
    try {
        const { name, climate, description, characterIds } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        // Insert the new location into the locations table
        const newLocation = await pool.query(
            "INSERT INTO locations (name, climate, description) VALUES($1, $2, $3) returning *",
            [name, climate, description]
        );

        const locationId = newLocation.rows[0].locationsid;

        // If there are characterIds, insert them into the character_locations table
        if (characterIds && characterIds.length > 0) {
            const insertCharacterLocations = characterIds.map(characterId =>
                pool.query(
                    "INSERT INTO character_locations (characterid, locationsid) VALUES ($1, $2)",
                    [characterId, locationId]
                )
            );
            await Promise.all(insertCharacterLocations);
        }

        res.json(newLocation.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//Get all Location Entries

export const getLocations = async(req,res) => {
    try {
        const allLocations =  await pool.query("SELECT * FROM locations");
        res.json(allLocations.rows);
        
    } catch (err) {
        console.error(err.message)
    }
};

//Delete one Location Entry

export const deleteOneLocationEntry = async(req,res) => {
    try{
        const { id } = req.params;
        const deleteLocation = await pool.query("DELETE FROM locations WHERE locationsid = $1", [id]);

        res.json("Location Entry has been deleted");
    } catch (err) {
        console.error(err.message)
    }
};

//Update one Location Entry

export const updateOneLocationEntry = async(req, res) => {
    try{
        const { id } = req.params;
        const { name, climate, description, characterIds } = req.body;

        const updatedLocationEntry = await pool.query(`UPDATE locations SET name = COALESCE($1, name),
                                                               climate = COALESCE($2, climate),
                                                               description = COALESCE($3, description)
                                                               WHERE locationsid = $4 returning *`, [name, climate, description, id])

        if(characterIds && characterIds.length > 0){
            const updatedCharacterLocations = characterIds.map(characterId =>
                pool.query(
                    `UPDATE character_locations SET characterid = COALESCE($1, characterid),
                                                    locationsid = COALESCE($2, locationsid)`,
                    [characterId, id]
                )
            );
            await Promise.all(insertCharacterLocations);
        }
        
        res.json(updatedLocationEntry.rows[0]);
    } catch  (err) {
        console.error(err.message)
    }
};

//Get one Location Entry

export const getOneLocationEntry = async(req, res) => {
    try{
        const { id } = req.params;
        const getLocationEntry = await pool.query("SELECT * FROM locations WHERE locationsid = $1", [id])

        if (getLocationEntry.rows.length === 0) {
            return res.status(404).json({ error: "Location Entry not found" });
        }

        res.json(getLocationEntry.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
};

//Get Character Locations 

export const getCharacterLocations = async(req, res) => {
    try{
        const { id } = req.params;
        const getCharacterLocations = await pool.query("SELECT * from character_locations WHERE locationsid = $1", [id]);
        res.json(getCharacterLocations.rows);
    } catch (err) {
        console.error(err.message);
    }
};