const dnaModel = require('../models/dna');
const dnasearch = require('../functions/checkIsMutant');

module.exports = app => {

  app.get('/mutant', (req, res) => {
    dnaModel.getDnas((err, data) => {
        if(!err)
        {
            res.status(200).json(data);
        }   
    });
  });

  app.post('/mutant', (req, res) => {
      
    let checkMutant = false;
    let status = 200;
    let varMsg = '';
    
    if(req.body.dna != undefined && req.body.dna.length === req.body.dna[0].length)
    {
        dnasearch.checkIsMutante(req.body, (err, data) =>{
            if(data > 1)
            {    
               varMsg = 'Hewstone, tenemos un mutante!';
               status = 200
               checkMutant = true;

            }else{
                varMsg = 'Forbidden'
                status = 403
            }
            
            let dnaData = {
              id: null,
              dna: req.body.dna.toString(),
              isMutant: checkMutant,

            };
            
            //guardamos el registro despues de comparar
            dnaModel.insertDna(dnaData, (err, data) => {
              if (data && data.insertId) {
                res.status(status).json({
                  success: true,
                  msg: varMsg,
                });
              } else {
                res.status(status).json({
                  success: false,
                   msg: varMsg
                });
              }
            });
            
            
        });
       
    }else{
        res.status(500).json({
              success: false,
              msg: "El json enviado no corresponde a una matriz de ADN valida",
            });
    }
  });
  
  app.get('/stats', (req, res) => {
    dnaModel.getDnas((err, data) => {
        if(!err)
        {
            res.status(200).json(data);
        }   
    });
    
  });
  
    app.get('/test', (req, res) => {
    
        res.status(200).json({"test":"done"});
    });
  
};