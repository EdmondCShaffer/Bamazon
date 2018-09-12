var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "SuperSecretPasswordHere",
  database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
  displayProducts();
  });

  function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
     
      var table = new Table({
        head: ['ITEM ID', 'NAME','PRICE']
      , colWidths: [10,40,10]
    });
for(var i=0;i < res.length;i++){
  table.push(
    [res[i].id,res[i].product,res[i].price]
);
}
console.log(table.toString());
    
      start();
    });
   
  }

 var start= function () {
    inquirer
      .prompt([
        {
        name: 'id',
        type: 'input',
        message: 'Which item would you like to purchase? (Enter the Product ID)'
      }
  ]).then(function(answer) {
    console.log(answer)
    console.log("SELECT product FROM PRODUCTS WHERE ID="+answer.id);
    connection.query("SELECT product FROM products WHERE ID="+answer.id,function(err,res){
      if (err) throw err;
      console.log(res[0].product);
      inquirer
      .prompt([
        {
        name: 'qty',
        type: 'input',
        message: 'how many '+res[0].product+" would you like to buy"
      }
  ]).then(function(answer) {
    console.log(answer.qty)
  })
    });
   
      // get the information of the chosen item
      // var chosenItem;
      // for (var i = 0; i < results.length; i++) {
      //   if (results[i].item_name === answer.choice) {
      //     chosenItem = results[i];
      //   }
      //}
    })
  };
