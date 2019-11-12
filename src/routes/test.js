
module.exports = app => {

  app.post('/test', (req, res, next) => {
    
    let body = req.body;
    console.log(body);
    res.set('Content-Type', 'text/plain');
    res.send(body);
  });
};


