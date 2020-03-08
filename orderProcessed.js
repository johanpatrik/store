let objectsOrdered = JSON.parse(localStorage.getItem('objectsOrdered'));

var table = document.createElement('table');
var tr = document.createElement('tr');
tr.setAttribute('id','a')
var th1 = document.createElement('th');
var th2 = document.createElement('th');
var th3 = document.createElement('th');
th1.innerText = 'Name'
th2.innerText = 'Price'
th3.innerText = 'Quantity'

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);

table.appendChild(tr);

for (const object of objectsOrdered) {



  // <table>
  //   <tr>
  //     <th>Firstname</th>
  //     <th>Lastname</th>
  //     <th>Age</th>
  //   </tr>
  //   <tr>
  //     <td>Jill</td>
  //     <td>Smith</td>
  //     <td>50</td>
  //   </tr>
  //   <tr>
  //     <td>Eve</td>
  //     <td>Jackson</td>
  //     <td>94</td>
  //   </tr>
  //   <tr>
  //     <td>John</td>
  //     <td>Doe</td>
  //     <td>80</td>
  //   </tr>
  // </table>

  //   <h3>Total: </h3>




  // var node = document.createElement("LI");
  var tr = document.createElement('tr');
  th1 = document.createElement('th');
  th2 = document.createElement('th');
  th3 = document.createElement('th');

  th1.innerText = object.name;
  th2.innerText = object.price;
  th3.innerText = object.quantity;

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);

  table.appendChild(tr);


  console.log(table)

  // var textnode = document.createTextNode(object.name + ' ' + object.price + ' ' + object.quantity);
  // node.appendChild(textnode);
  // document.getElementById("objectsOrdered").appendChild(node);
  document.getElementById("objectsOrdered").appendChild(table);
}

let total = objectsOrdered.map(object => object.price * object.quantity)
  .reduce(function (a, b) {
    return a + b;
  }, 0);

var node = document.createElement("P");
var textnode = document.createTextNode('Total: ' + total);
node.appendChild(textnode);
document.getElementById("objectsOrdered").appendChild(node);


