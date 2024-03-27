const { Musician } = require("../models/index")
const { Router } = require("express")
const musicianRouter = Router();

//TODO: Create a GET /musicians route to return all musicians 

musicianRouter.get("/", async (req, res, next) => {
    try {
        const musicians = await Musician.findAll();
        if (!musicians){
            throw new Error('musicians not found');
        }
        res.json(musicians) 
    } catch(error){
        next(error)
    }
})
musicianRouter.get("/:id", async (req, res, next) => {
    try{
        const musicians = await Musician.findByPk(req.params.id);
        if(!musicians){
            throw new Error('musicians not found');
        }
        res.json(musicians)
    }catch(error){
        next(error)
    }
})

musicianRouter.post("/", async (req, res) => {
        await Musician.create(req.body);
        const allMusic = await Musician.findAll()
        res.json(allMusic)
})
musicianRouter.put("/:id", async (req, res, next) => {
    try{
        const foundMusic = await Musician.findByPk(req.params.id);
        const music = await foundMusic.update(req.body)
        if(!music){
            throw new Error('No musician to update')
        }
        res.json(music)
    }catch(error){
        next(error)
    }
})
musicianRouter.delete("/:id", async(req, res, next) => {
    try{
        const foundMusic = await Musician.findByPk(req.params.id)
        if(!foundMusic){
            throw new Error('musician not found')
        }
        const music = await foundMusic.destroy()
        res.json(music);
    }catch(error){
        next(error)
    }
})

module.exports = musicianRouter;