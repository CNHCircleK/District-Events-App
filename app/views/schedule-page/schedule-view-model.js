const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const firebase = require("nativescript-plugin-firebase/app");


function ScheduleViewModel()
{
    var viewModel = observableModule.fromObject({ data: new getSchedule() });
    return viewModel;
}

function getSchedule()
{
    var docDCON = firebase.firestore().collection("events").doc("DCON");
    var actDCON = docDCON.collection("activities");

    var firstDayCol = actDCON.where("date", "==", "March 22, 2019").orderBy("startTime", "asc");
    var secondDayCol = actDCON.where("date", "==", "March 23, 2019").orderBy("startTime", "asc");
    var thirdDayCol = actDCON.where("date", "==", "March 24, 2019").orderBy("startTime", "asc");

    var firstDay = new ObservableArray();
    var secondDay = new ObservableArray();
    var thirdDay = new ObservableArray();

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

    var schedule = new ObservableArray();
    schedule.push({ date: "March 22, 2019", events: firstDay });
    schedule.push({ date: "March 23, 2019", events: secondDay });
    schedule.push({ date: "March 24, 2019", events: thirdDay });

    return schedule;
}

module.exports = ScheduleViewModel;