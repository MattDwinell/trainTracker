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
    if (trainName && frequency && trainInput && destination) {

      var firstTrain = moment(trainInput, militaryFormat);
      var timeGap = firstTrain.diff(moment(), "minutes");

      if (timeGap > 0) {
        nextTrain = firstTrain.format(militaryFormat);
        minutesToNextTrain = timeGap;
        console.log(nextTrain, minutesToNextTrain);
      } else if (timeGap == 0) {
        nextTrain = firstTrain.format(militaryFormat);
        minutesToNextTrain = 0;
        console.log(nextTrain, minutesToNextTrain);
      } else {
        var timeGap2 = frequency - Math.abs(timeGap % frequency);
        temp= moment().add(timeGap2, "minutes");
        nextTrain = moment(temp).format("HH:mm");
        minutesToNextTrain = timeGap2;
        console.log(nextTrain);
        console.log(minutesToNextTrain);
      }
nextTrainTime = moment(nextTrain, militaryFormat);
console.log(nextTrainTime);
nextTrainTime = nextTrainTime._i;
console.log(nextTrainTime);
      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextTrainTime: nextTrainTime,
        minutesToNextTrain: minutesToNextTrain
      })
      $("#new-train").val("");;
      $("#new-destination").val("");
      $("#new-frequency").val("");
      $("#new-first-time").val("");
    } else {
      alert("Pleaase fill in all of the input fields properly before clicking submit");
    }
  })
  database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    var newTrain = $("<p>").text(snapshot.val().trainName);
    var newDestination = $("<p>").text(snapshot.val().destination);
    var newFrequency = $("<p>").text(snapshot.val().frequency + "  t4min.");
    var newNextTrain = $("<p>").text(snapshot.val().nextTrainTime);
    var newMinutesToNextTrain = $("<p>").text(snapshot.val().minutesToNextTrain);
    $("#name-display").append(newTrain);
    $("#destination-display").append(newDestination);
    $("#frequency-display").append(newFrequency);
    $("#arrival-display").append(newNextTrain);
    $("#minutes-display").append(newMinutesToNextTrain);

  })




})