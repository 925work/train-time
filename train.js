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
    var trainStartTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainRate = $("#rate-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStartTime,
        rate: trainRate
    }

    database.ref().push(newTrain);


});