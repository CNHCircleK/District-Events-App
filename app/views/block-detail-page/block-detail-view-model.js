const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;
const firebase = require("nativescript-plugin-firebase/app");


function BlockDetailViewModel(eventId)
{
    var viewModel = observableModule.fromObject({
        title: "",
        date: "Friday, 3:00p--12:00mn",
        data: new ObservableArray(),
        id: eventId,
        initialize: function() {
            setBlocks(this);
        }
    });

    return viewModel;
}

function setBlocks(viewModel)
{
    var docDCON = firebase.firestore().collection("events").doc("DCON");
    var colActivities = docDCON.collection("activities");
    var docBlockEvent = colActivities.doc(viewModel.id);
    var colBlocks = docBlockEvent.collection("blocks");

    docBlockEvent.get().then(doc => {
        console.log(doc.exists);
        viewModel.title = doc.data().title;
    });

    colBlocks.get().then(query => {
        query.forEach(doc => {
            viewModel.data.push(doc.data());
        });
    });
}

module.exports = BlockDetailViewModel;