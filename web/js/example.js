
var array = [
  {
    firstname:'Galileo',
    lastname:'Galilei',
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
  CSVx.Export.data('scientists',array);
});
