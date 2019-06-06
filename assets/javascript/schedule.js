$(document).ready(function() {

    $("#date").text(moment().format("MMMM Do YYYY"));
    
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


    // listen for user input click to push data to firebase
    $("#add-train").on("click", function (event) {
        event.preventDefault();

        trainName = $("#trainName-input").val().trim();
        destination = $("#destination-input").val().trim();

        firstTime = $("#firstTime-input").val().trim();
        var start = moment(firstTime, "HH:mm").subtract(1, "years");
        var militaryTime = start._i
        console.log(start)

        frequency = $("#frequency-input").val().trim();

        var newTrain = {
            TrainName: trainName,
            Destination: destination,
            FirstTime: militaryTime,
            Frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
        }
        // log user inputs
        console.log(newTrain);

        // push as a child to firebase
        database.ref().push(newTrain);
        
        clearFormInput()

    })

    // clear out the text input by the user
    function clearFormInput() {
        document.getElementById("trainName-input").value = "";
        document.getElementById("destination-input").value = "";
        document.getElementById("firstTime-input").value = "";
        document.getElementById("frequency-input").value = "";
    }

    // update the rows in the train scheudle
    database.ref().on("child_added", function(childShapshot) {
        var trainNameAdd = childShapshot.val().TrainName
        var destinationAdd = childShapshot.val().Destination
        var firstTimeAdd = childShapshot.val().FirstTime 
        var frequencyAdd = childShapshot.val().Frequency
        
        // calculations with moment
        var currentTime = moment()
        var time = moment(firstTimeAdd, "hh:mm");
        var sinceStartTime = (currentTime.diff(time, "minutes"));
        console.log(trainNameAdd + " is " + sinceStartTime + " minutes from First Train Time")

        // function realtimeUpdate() {
            // calculating how many minutes away the train is
            var minutesAwayAdd = (sinceStartTime % frequencyAdd)

            // calculating the next arrival
            var nextArrivalCalc = (frequencyAdd - (sinceStartTime % frequencyAdd))

            newRow = ("<tr>" +
                "<td>" + trainNameAdd + "</td>" +
                "<td>" + destinationAdd + "</td>" +
                "<td>" + firstTimeAdd + "</td>" +
                "<td>" + frequencyAdd + "</td>" +
                "<td>" + minutesAwayAdd + "</td>" +
                "<td>" + nextArrivalCalc + "</td>" +
                "</tr>");

            $("#trainScheudleRow-display").append(newRow);
        // }
        // realtimeUpdate()
        

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


});