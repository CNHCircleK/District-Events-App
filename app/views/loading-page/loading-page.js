const frameModule = require("tns-core-modules/ui/frame");
const fileSystemModule = require("tns-core-modules/file-system");
const firebase = require("nativescript-plugin-firebase/app");


function pageLoaded(args)
{
    const docDCON = firebase.firestore().collection("events").doc("DCON");
    const colActivities = docDCON.collection("activities").orderBy("startTime", "asc");

    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");

    const firstDayFile = folder.getFile("first_day_schedule");
    const secondDayFile = folder.getFile("second_day_schedule");
    const thirdDayFile = folder.getFile("third_day_schedule");

    colActivities.get().then(query => {
        let firstDayString = '{ "daySchedule": [';
        let secondDayString = '{ "daySchedule": [';
        let thirdDayString = '{ "daySchedule": [';

        query.forEach(doc => {
            const dayDate = doc.data().date;
            const eventString = JSON.stringify(doc.data()) + ",";
            switch(dayDate) {
                case "March 22, 2019":
                    firstDayString += eventString;
                    break;
                case "March 23, 2019":
                    secondDayString += eventString;
                    break;
                case "March 24, 2019":
                    thirdDayString += eventString;  
                    break;
            }
        });

        firstDayString = firstDayString.substring(0, firstDayString.length - 1);
        firstDayString += "] }";
        secondDayString = secondDayString.substring(0, secondDayString.length - 1);
        secondDayString += "] }";
        thirdDayString = thirdDayString.substring(0, thirdDayString.length - 1);
        thirdDayString += "] }";

        return [firstDayString, secondDayString, thirdDayString];
    }).then(dayStrArray => {
        firstDayFile.writeText(dayStrArray[0]);
        secondDayFile.writeText(dayStrArray[1]);
        thirdDayFile.writeText(dayStrArray[2]);
    }).then(() => {
        const navigationEntry = {
            moduleName: "views/login-page/login-page",
            transition: { name: "slideTop" }
        };
        
        frameModule.topmost().navigate(navigationEntry);
    });
}

exports.pageLoaded = pageLoaded;