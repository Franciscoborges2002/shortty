const URLSchema = require('../models/URLshortty');
const { nanoid } = require('nanoid');

async function createURL(req, res) {
    const url = req.body.url;
    const slug = req.body.slug;

    if(slug == ''){//If the client doesn't enter one slug generate one with nanoid and query if he is not repeated
        const newSlug = nanoid(6);
        const occupied = true;
        
        if(await URLSchema.find({slug: newSlug}).some() ==true ){
            occupied = true
        }
    } else{//if the user has a slug make the verification
        const shortty = new URLSchema({
            url: url,
            slug: slug
        });

        shortty.save().then(()=>{
            console.log('URL received') 
            res.status(200).send({message:'URL received'})
        }).catch((err)=>{
            console.log('URL not received')
            res.status(500).send({message: err});
        });
    }
}

async function getURL(req, res) {
    res.status(200).send({idURL:req.params.id});
}

module.exports = { createURL, getURL}