var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rounaq:rounaq123@ds117061.mlab.com:17061/tenants_list', ['tenants']);

//Get all tenants
router.get('/tenants', function(req, res, next){
  db.tenants.find(function(err, tenants){
    if(err){
      res.send(err);
    }
    res.json(tenants);
  })
});

//Get single tenant
router.get('/tenant/:id', function(req, res, next){
  db.tenants.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, tenant){
    if(err){
      res.send(err);
    }
    res.json(tenant);
  })
});

//Save tenants
router.post('/tenant', function(req, res, next){
  var tenant = req.body;
  if(!tenant.name || !tenant.address || !tenant.pan || !tenant.adhaar || !tenant.phone){
    res.status(400);
    res.json({"error": "Incomplete Data"});
  } else {
    db.tenants.save(tenant, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(tenant);
    });
  }
});

//Delete tenants
router.delete('/tenant/:id', function(req, res, next){
  db.tenants.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, tenant){
    if(err){
      res.send(err);
    }
    res.json(tenant);
  })
});

//Update tenant
router.put('/tenant/:id', function(req, res, next){
  var tenant = req.body;
  var updatetenant = {};

  if(tenant.name){
    updatetenant.name = tenant.name;
  }
  if(tenant.address){
    updatetenant.address = tenant.address;
  }
  if(tenant.pan){
    updatetenant.pan = tenant.pan;
  }
  if(tenant.adhaar){
    updatetenant.adhaar = tenant.adhaar;
  }
  if(tenant.phone){
    updatetenant.phone = tenant.phone;
  }
  if(!updatetenant){
    res.status(400);
    res.json({"error":"Invalid data"});
  } else {
    db.tenants.update({_id: mongojs.ObjectId(req.params.id)}, updatetenant, {} , function(err, tenant){
      if(err){
        res.send(err);
      }
      res.json(tenant);
    })
  }
});

module.exports = router;
