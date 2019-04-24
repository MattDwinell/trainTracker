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
var userName = "";
  $("#sign-in").on("click", function (event) {
    event.preventDefault();
    userName = $("#user-name").val();
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    console.log(email, password);
    if (!email || !password) {
      alert("please input both email and password to sign in, or create one by registering an account.");
    } else{
    firebase.auth().signInWithEmailAndPassword(email, password);
    
    
    
    }
  })

  $("#register").on("click", function (event) {
    event.preventDefault();
    userName = $("#user-name").val().trim();
    var email = $("#email").val().trim();
    var password = $("#password").val().trim();
    console.log(email, password);
    if (!email || !password) {
      alert("please input both email and password to sign in, or create one by registering an account.");
    } else{
    firebase.auth().createUserWithEmailAndPassword(email, password);
   
    }
  })


  $(".sign-out").on("click", function () {
    firebase.auth().signOut();
  })

  firebase.auth().onAuthStateChanged(function (user) {
    if(user){
      user.updateProfile({
        displayName: userName
      })
    console.log(user.displayName);
    $("#current-user").text("current user: " + userName);
      $("#authentication").css("display", "none");
      $("#train-tracker").css("visibility", "visible");
    } else {
      $("#current-user").text("current user: none");
      $("#authentication").css("display", "block");
      $("#train-tracker").css("visibility", "hidden");
    }
   
  })












  //on click function for train submit
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

      //calculating the time to next train
      if (timeGap > 0) {
        nextTrain = firstTrain.format(militaryFormat);
        minutesToNextTrain = timeGap;

      } else if (timeGap == 0) {
        nextTrain = firstTrain.format(militaryFormat);
        minutesToNextTrain = 0;

      } else {
        var timeGap2 = frequency - Math.abs(timeGap % frequency);
        temp = moment().add(timeGap2, "minutes");
        nextTrain = moment(temp).format("HH:mm");
        minutesToNextTrain = timeGap2;

      }
      nextTrainTime = moment(nextTrain, militaryFormat);

      nextTrainTime = nextTrainTime._i;

      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextTrainTime: nextTrainTime,
        minutesToNextTrain: minutesToNextTrain
      })

      //clearing the input fields after a train is successfully added.
      $("#new-train").val("");
      $("#new-destination").val("");
      $("#new-frequency").val("");
      $("#new-first-time").val("");
    } else {
      alert("Pleaase fill in all of the input fields properly before clicking submit");
    }
  })

  //appending the new train's data to the schedule section
  database.ref().on("child_added", function (snapshot) {

    var newTrain = $("<p>").text(snapshot.val().trainName);
    var newDestination = $("<p>").text(snapshot.val().destination);
    var newFrequency = $("<p>").text(snapshot.val().frequency + " min.");
    var newNextTrain = $("<p>").text(snapshot.val().nextTrainTime);
    var newMinutesToNextTrain = $("<p>").text(snapshot.val().minutesToNextTrain);
    $("#name-display").append(newTrain);
    $("#destination-display").append(newDestination);
    $("#frequency-display").append(newFrequency);
    $("#arrival-display").append(newNextTrain);
    $("#minutes-display").append(newMinutesToNextTrain);

  })
$("#clear").on("click", function(event){
  event.preventDefault();
  database.ref().remove();
  $("#name-display").html("");
  $("#destination-display").html("");
  $("#frequency-display").html("");
  $("#arrival-display").html("");
  $("#minutes-display").html("");
})

  // var timer = setInterval(updateTimes, 5000);
  // function updateTimes(){
  // for (i=0; i<database.ref([i]).length; i++){
  //   console.log('test');
  // }
  // }

})