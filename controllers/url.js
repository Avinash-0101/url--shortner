import {nanoid} from "nanoid";
import URL from "../models/url.js";

// npm  i nanoid
export async function handleGenerateNewShortURL(req,res){
        const body = req.body;
        if(!body.url) return res.status(400).json({error:'url is required'})

        const shortID= nanoid(5);

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory:[],
            createdBy:req.user._id,

        });
        return res.render('home',{
            id:shortID
        })
        
}
export async function handleGetAnaLytics(req,res){
        const shortId = req.params.shortId;
        const result=await URL.findOne({shortId});
        return res.json({ 
            totalClicks:result.visitHistory.length,
            analytics:result.visitHistory,
        });
        
    
}   