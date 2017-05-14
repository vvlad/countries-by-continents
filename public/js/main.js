
var STATE = {
  "continents": {},
  "contries": {}
};

$(document).ready(function(){

  var $continents = $("#continents"),
      $countries = $("#countries");


  $.get("/api/countries.json", stateDidChange)

  function stateDidChange(newState) {

    var continentValues = $.map(newState.continents, function(continent, key){
      return "<option value='" + key + "'>"+continent+"</option>";
    })

    $continents.html("<option value=''>Select a contry</option>" + continentValues.join(""))
    $countries.html("")

    STATE.continents = newState.continents;
    STATE.countries = {}

    $.each(newState.countries, function(index) {
      STATE.countries[this.continent] = STATE.countries[this.continent] || []
      STATE.countries[this.continent].push(this)
    })

  }

  $continents.on("change", function(evt) {
    var $el = $(this),
        val = $el.val(),
        countries = STATE.countries[val];

    if ( countries != null ) {
      var countriesValues = $.map(countries, function(contry, key) {
        return "<li>" + contry.name + "</li>";
      });
      $countries.html(countriesValues.join(""));
    }
  })

  stateDidChange(STATE);
})

