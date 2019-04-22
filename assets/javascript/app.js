$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDi8_oc1maoKRVdR5EnALQYEnpkDh1mu9o",
    authDomain: "traintracker-f5d33.firebaseapp.com",
    databaseURL: "https://traintracker-f5d33.firebaseio.com",
    projectId: "traintracker-f5d33",
    storageBucket: "traintracker-f5d33.appspot.com",
    messagingSenderId: "112531799652"
  };
  firebase.initializeApp(config);

  database = firebase.database();
  $("#submit").on("click", function () {
    var trainName = $("#new-train").val().trim();
    var destination = $("#new-destination").val().trim();
    var frequency = $("#new-frequency").val().trim();
    var trainInput = $("#new-first-time").val().trim();
    var militaryFormat = "HH:mm";
    var nextTrain = "";
    var minutesToNextTrain = 0;
    var firstTrain = moment(trainInput, militaryFormat);
    var timeGap = firstTrain.diff(moment(), "minutes");

    if (timeGap > 0) {
      nextTrain = firstTrain;
      minutesToNextTrain = timeGap;
      console.log(nextTrain, minutesToNextTrain);
    } else if (timeGap== 0){
      nextTrain = firstTrain;
      minutesToNextTrain = 0;
      console.log(nexttrain, minutesToNextTrain);

    }else {

      var timeGap2 = frequency - Math.abs(timeGap % frequency);
      nextTrain =moment().add(timeGap2, "minutes");
      minutesToNextTrain = timeGap2;
      console.log(nextTrain);
      console.log(minutesToNextTrain);
    }
    if (trainName && frequency && firstTrain && destination) {


    }


  })





})