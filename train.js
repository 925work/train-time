var firebaseConfig = {
    apiKey: "AIzaSyCrSaBVli4EOWc3zULODdgkOw49hNPIK-0",
    authDomain: "firstfirebaseproject-ae306.firebaseapp.com",
    databaseURL: "https://firstfirebaseproject-ae306.firebaseio.com",
    projectId: "firstfirebaseproject-ae306",
    storageBucket: "",
    messagingSenderId: "865763498",
    appId: "1:865763498:web:f10820fa7024b93875d0d3"
}
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStartTime = moment($("#time-input").val().trim(), "HH:mm").format("h:mm:ss A");
    var trainRate = $("#rate-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStartTime,
        rate: trainRate
    }

    database.ref().push(newTrain);

    $("#name-input").val("")
    $("#destination-input").val("")
    $("#time-input").val("")
    $("#rate-input").val("")
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStartTime = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStartTime);
    console.log(trainRate);

    trainRate = parseInt(trainRate);
    trainStartTime = parseInt(trainStartTime);

    var timeLeft = moment().diff(moment.unix(trainStartTime), "minutes") % trainRate;
    var minutesAway = trainRate - timeLeft;
    var nextArrival = moment().add(minutesAway, "m").format("hh:mm A");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainRate),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway),
      );

      $("#trainTable > tbody").append(newRow);
});