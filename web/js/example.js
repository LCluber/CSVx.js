var customLabels = ['First name', 'Last name', 'city', 'Born', 'Died'];
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
    city:'Smiljan',
    born:1856,
    died:1943
  },
  {
    firstname:'Albert',
    born:1879,
    lastname:'Einstein',
    died:1955
  }
];
var customLabels = {
  firstname: 'First name',
  lastname: 'Last name', 
  city: 'City',
  born: 'Born',
  died: 'Died'
};
var exportButton = Wee.Dom.findById('csv');
exportButton.addEventListener('click', function() {
  CSVx.Export.data('scientists',array, {separator:';', customLabels: customLabels });
});

var data = '"Firstname";"Lastname";"Born";"Died"\r\n\
"Galileo";"Galilei";"1564";"1642"\r\n\
"Nikola";"Tesla";"1856";"1943"\r\n\
"Albert";"Einstein";"1879";"1955"\r\n\ ';
 document.getElementById("table").innerHTML = CSVx.Convert.table(data,{separator: ';'}, {table: 'table table-striped'});