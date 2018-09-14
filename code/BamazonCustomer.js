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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    var table = new Table({
      head: ['ITEM ID', 'NAME', 'PRICE', 'STOCK']
      , colWidths: [10, 40, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].id, res[i].product, res[i].price, + res[i].quantity]
      );
    }
    console.log(table.toString());

    start();

  });

}

var start = function () {
  inquirer
    .prompt([
      {

        name: 'pickedId',
        type: 'input',
        message: 'Which item would you like to purchase? (Enter the Product ID)'
      },
      {
        name: 'qty',
        message: 'how many  would you like to buy?',
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function (answer) {
      // console.log(answer)
      // console.log("SELECT product FROM PRODUCTS WHERE ID=" + answer.id);
      connection.query('SELECT * FROM products WHERE id = ?',[answer.pickedId], function (err, res) {
        if(err) throw err;

        console.log("~/~/~/ Processing /~/~/~")
        console.log(answer);
        console.log(res);
        // console.log(
        //   "Product: " +
        //   res[0].product
        // );
        // for (var j = 0; j < res.length; j++) {
          if (answer.qty > res[0].quantity) {
            console.log("low on stock")
          };

        // };
      })


    })

};


