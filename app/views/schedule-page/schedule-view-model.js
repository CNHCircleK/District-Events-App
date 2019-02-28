const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const firebase = require("nativescript-plugin-firebase/app");


function ScheduleViewModel()
{
    var viewModel = observableModule.fromObject({ 
        data: new ObservableArray(),
        initialize: function() {
            setSchedule(this);
        } 
    });
    return viewModel;
}

function setSchedule(viewModel)
{
    var docDCON = firebase.firestore().collection("events").doc("DCON");
    var colActivities = docDCON.collection("activities");

    var firstDayCol = colActivities.where("date", "==", "March 22, 2019").orderBy("startTime", "asc");
    var secondDayCol = colActivities.where("date", "==", "March 23, 2019").orderBy("startTime", "asc");
    var thirdDayCol = colActivities.where("date", "==", "March 24, 2019").orderBy("startTime", "asc");

    var firstDay = new ObservableArray();
    var secondDay = new ObservableArray();
    var thirdDay = new ObservableArray();

    viewModel.data.push({ date: "March 22, 2019", events: firstDay });
    viewModel.data.push({ date: "March 23, 2019", events: secondDay });
    viewModel.data.push({ date: "March 24, 2019", events: thirdDay });

    firstDayCol.get().then(query => {
        query.forEach(doc => {
            firstDay.push(doc.data());
        });
    });  
    
    secondDayCol.get().then(query => {
        query.forEach(doc => {
            secondDay.push(doc.data());
        });
    });  

    thirdDayCol.get().then(query => {
        query.forEach(doc => {
            thirdDay.push(doc.data());
        });
    });  
}

module.exports = ScheduleViewModel;