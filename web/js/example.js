
var array = [
  {
    firstname:'Galileo',
    lastname:'Galiléi',
    born:1564,
    died:1642
  },
  {
    firstname:'Nikola',
    lastname:'Tesla',
    born:1856,
    died:1943
  },
  {
    firstname:'Albert',
    lastname:'Einstein',
    born:1879,
    died:1955
  }
];
var exportButton = Wee.Dom.findById('csv');
exportButton.addEventListener('click', function() {
  CSVx.Export.data('scientists',array, {separator:';'});
});

var data = '"Firstname";"Lastname";"Born";"Died"\r\n\
"Galileo";"Galilei";"1564";"1642"\r\n\
"Nikola";"Tesla";"1856";"1943"\r\n\
"Albert";"Einstein";"1879";"1955"\r\n\ ';
 document.getElementById("table").innerHTML = CSVx.Convert.table(data,{separator: ';'}, {table: 'table table-striped'});