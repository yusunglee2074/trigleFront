module.exports = function(app) {
  // auto migrations
  app.dataSources.trigle_test.automigrate('customer', function(err) {
    if (err) throw err;
    app.models.customer.create([{
      "address": "수원시",
      "phone": "01093666639",
      "point": 0,
      "username": "lys2074",
      "email": "lys0333@gmail.com",
      "password": "sjdmlrl4"
    }], function(err, customer) {
      if (err) throw err;
      console.log('Models created: \n');
    });
  });
  app.dataSources.trigle_test.automigrate('trigle', function(err) {
    if (err) throw err;
  })
  app.dataSources.trigle_test.automigrate('post', function(err) {
    if (err) throw err;
  })
  app.dataSources.trigle_test.automigrate('order', function(err) {
    if (err) throw err;
  })
  
};
