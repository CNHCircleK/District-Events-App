const observableModule = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

var viewModel;

function EventDetailViewModel()
{
    viewModel = observableModule.fromObject({
        eventName: "General Session 1",
        date: "Friday, 3:00p--12:00mn",
        location: "Exhibit Hall A & B",
        buttonText: "Seating Map",
        eventSub_1: "Attire",
        eventList_1: new ObservableArray([
            { eventList_1_Item: "Casual" }
        ]),
        eventSub_2: "Agenda",
        eventList_2: new ObservableArray([
            { eventList_2_Item: "Masters of Ceremony" },
            { eventList_2_Item: "Flag Salute" },
            { eventList_2_Item: "National Anthem" },
            { eventList_2_Item: "Opening Thoughts" },
            { eventList_2_Item: "Introduction of Guests" },
            { eventList_2_Item: "District Governor's Address" },
            { eventList_2_Item: "DCON Chair's Address" },
            { eventList_2_Item: "Kiwanis Governor's Address" },
            { eventList_2_Item: "District Administrator's Address" },
            { eventList_2_Item: "Closing Thoughts" },
            { eventList_2_Item: "Adjournment" }
        ])
    });

    return viewModel;
}

module.exports = EventDetailViewModel;