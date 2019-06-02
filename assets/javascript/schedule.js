// initialize firebase and configuire
var firebaseConfig = {
    apiKey: "AIzaSyAcs4BzwhmwjA3z9EKEKgLf3uw2SZPvIo8",
    authDomain: "clickcounter2-e8f52.firebaseapp.com",
    databaseURL: "https://clickcounter2-e8f52.firebaseio.com",
    projectId: "clickcounter2-e8f52",
    storageBucket: "clickcounter2-e8f52.appspot.com",
    messagingSenderId: "126671713668",
    appId: "1:126671713668:web:518e71ef3ac00cda"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

database.ref().on("child")

// listen for user input click to push data to firebase
$("#add-train").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // log user inputs
    console.log(trainName, destination, firstTime, frequency);

    // push as a child to firebase
    database.ref().push({
        TrainName: trainName,
        Destination: destination,
        FirstTime: firstTime,
        Frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    })
})

database.ref().on("child_added", function(childShapshot) {
    var trainNameAdd = childShapshot.val().TrainName
    var destinationAdd = childShapshot.val().Destination

    // use this to get minutes away ((first + (X)frequency) - current time)
    var firstTimeAdd = childShapshot.val().FirstTime
    var frequencyAdd = childShapshot.val().Frequency
    var minutesAway = "";
    var nextArrival = "";
    
    console.log(trainNameAdd, destinationAdd, firstTimeAdd, frequencyAdd)

    newRow = $("#trainScheudleRow-display").append("<tr>" + trainNameAdd + destinationAdd + frequencyAdd + nextArrival + minutesAway + "</tr>")
    newRow.attr("class", "trainDataRow");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});