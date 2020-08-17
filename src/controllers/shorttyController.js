const URLSchema = require('../models/URLshortty');
const { nanoid } = require('nanoid');
const validURL = require('valid-url');

async function createURL(req, res) {
    const url = req.body.url;
    const bodySlug = req.body.slug;
    //const nanoid = nanoid(6);
    const baseURL = 'http://localhost:5000'


    if(validURL.isUri(url)){
        try{
            const _url = await URLSchema.findOne({ url });//Veify if there is the same url in the database


            if(_url){//If is one _url send it
                res.send(_url);
            }else{
                if(bodySlug == ''){
                    const slug = nanoid(6);
                    let _url = baseURL + '/' + slug;

                    const shortty = new URLSchema({
                        url: url,
                        slug: slug,
                        date: new Date() 
                    });

                    shortty.save().then(()=>{
                        console.log('URL received');
                    }).catch((err)=>{
                        console.log('URL not received: ' + err)
                        res.status(500).send({message: err});
                    });

                     return res.send(_url);
                }
        
                if(bodySlug){
                    var _slug = await URLSchema.find({ slug: bodySlug });//Verify if there is the same slug in the database
                    var slug = '';

                    if(_slug){
                        do{
                            slug = nanoid(6);
    
                            _slug = await URLSchema.find({ slug });
                        } while(_slug)  

                        
                        let _url = baseURL + '/' + slug;

                        const shortty = new URLSchema({
                            url: url,
                            slug: slug,
                            date: new Date() 
                        });

                        shortty.save().then(()=>{
                            console.log('URL received');
                        }).catch((err)=>{
                            console.log('URL not received: ' + err)
                            res.status(500).send({message: err});
                        });

                        res.send(_url);
                    } else {
                        
                    let _url = baseURL + '/' + bodySlug;

                    const shortty = new URLSchema({
                        url: url,
                        slug: bodySlug,
                        date: new Date() 
                    });

                    shortty.save().then(()=>{
                        console.log('URL received');
                    }).catch((err)=>{
                        console.log('URL not received: ' + err)
                        res.status(500).send({message: err});
                    });

                    res.send(_url);
                    }

                } else {

                    const shortty = new URLSchema({
                        url: url,
                        slug: slug,
                        date: new Date()
                    });

                    shortty.save().then(()=>{
                        console.log('URL received');
                    }).catch((err)=>{
                        console.log('URL not received: ' + err)
                        res.status(500).send({message: err});
                    });
                
                    res.send(_url);
                }
            }
        }catch(err){
            console.log(err);
            res.status(500).send('An error occured in the server')
        }
    }else {//else this is not a URL, send error message
        return res.status(400).send({message: 'This is not a URL'});
    }
}

//get the url from the db and redirect the client to the original url
async function getURL(req, res) {
    //res.status(200).send({idURL:req.params.code});

    try{
        const slug = await URLSchema.findOne({ slug: req.params.code});

        if(slug){
            return res.redirect(slug.url);
        }else {
            return res.status(404).send({message: "There is no such shortty"});
        }
    } catch(err){
        console.log('ERROR: '+ err);
        return res.status(500).send({message: "One error hapenned with the server"});
    }
}

module.exports = { createURL, getURL}