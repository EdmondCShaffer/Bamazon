var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var chalk = require('chalk');
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
// Creates connection to the Data base 
connection.connect(function (err) {

  if (err) throw err;

  console.log("connected");

  displayProducts();
});
// Display all porducts from data base in  the cli table
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

    order();

  });

}
// Order function Processes users order and logs it out to the console.
var order = function () {
  console.log(chalk.blue("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(chalk.bold.red("~~~~ Welcome to Bamazon The Shopping Center Of The World ~~~~"));
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(chalk.blue("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));

  inquirer
    .prompt([
      {

        name: 'pickedId',
        type: 'input',
        message: 'Which item would you like to purchase? (Enter the Item ID)',
        validate: function (value) {

          var valid = value.match(/^[0-9]+$/)

          if (valid) {

            return true
          }
          return 'Please enter a valid Product ID'
        }
      },
      {
        name: 'qty',
        type: "input",
        message: 'how many would you like to buy?',
        validate: function (value) {

          var valid = value.match(/^[0-9]+$/)

          if (valid) {

            return true
          }
          return 'Please enter a number value'
        }

      }
      // .then Function processes user input and updates the data base
    ]).then(function (answer) {

      connection.query('SELECT * FROM products WHERE id = ?', [answer.pickedId], function (err, res) {
        if (err) throw err;

        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(chalk.bold.yellow("~/~/~/ Processing Your Order/~/~/~"));
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        if (answer.qty > res[0].quantity) {

          console.log(chalk.bold.red("Sorry We Do Not Have Enough In Stock"));

          order();
        }
        else {
          var totalDue;

          totalDue = res[0].price * answer.qty;

          console.log("Total amount due $ " + totalDue);

          connection.query("UPDATE products SET ? WHERE ?", [{

            quantity: res[0].quantity - answer.qty

          }, {
            id: answer.pickedId

          }], function (err, res) {

          });

          checkout();

        }

      })

    }, function (err, res) { })
};

// Checkout function allows user to continue to shop or checkout.
function checkout() {

  inquirer.prompt([

    {
      type: 'confirm',
      name: 'choice',
      message: 'Would you like to continue shopping?'
    }

  ]).then(function (answer) {

    if (answer.choice) {

      order();
    }
    else {
      console.log(chalk.cyan('////////////////////////////////////////////////'));
      console.log(chalk.cyan('////////////////////////////////////////////////'));
      console.log(chalk.bold.yellow('///////Thank you for shopping at Bamazon!///////'));
      console.log(chalk.cyan('////////////////////////////////////////////////'));
      console.log(chalk.cyan('////////////////////////////////////////////////'));

      connection.end();
    }
  })
};


