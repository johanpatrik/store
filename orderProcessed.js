let objectsOrdered = JSON.parse(localStorage.getItem('objectsOrdered'));

var table = document.createElement('table');
var tr = document.createElement('tr');
tr.setAttribute('id','tableRowTitle')
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


