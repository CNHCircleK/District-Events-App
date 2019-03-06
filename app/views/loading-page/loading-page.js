const frameModule = require("tns-core-modules/ui/frame");
const fileSystemModule = require("tns-core-modules/file-system");
const LoadingViewModel = require("./loading-view-model");
const firebase = require("nativescript-plugin-firebase/app");


const numberToLoad = 3;
let numberLoaded = 0;

let loadingViewModel;

function pageLoaded(args)
{
    loadingViewModel = new LoadingViewModel();

    const page = args.object;
    page.bindingContext = loadingViewModel;

    loadingViewModel.initialize();

    loadActivities();
    loadWorkshops();
    loadCaucuses();
}

function loadActivities()
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
        navigateToLogin();
    });
}

function loadWorkshops()
{
    const docDCON = firebase.firestore().collection("events").doc("DCON");
    const colWorkshops = docDCON.collection("workshops").orderBy("workshop", "asc");

    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");

    const wsOneFile = folder.getFile("workshop_one");
    const wsTwoFile = folder.getFile("workshop_two");
    const wsThreeFile = folder.getFile("workshop_three");
    const wsFourFile = folder.getFile("workshop_four");
    const wsFiveFile = folder.getFile("workshop_five");
    const wsSixFile = folder.getFile("workshop_six");
    const wsSevenFile = folder.getFile("workshop_seven");
    const wsEightFile = folder.getFile("workshop_eight");

    colWorkshops.get().then(query => {
        let wsOneString = '{ "workshops": [';
        let wsTwoString = '{ "workshops": [';
        let wsThreeString = '{ "workshops": [';
        let wsFourString = '{ "workshops": [';
        let wsFiveString = '{ "workshops": [';
        let wsSixString = '{ "workshops": [';
        let wsSevenString = '{ "workshops": [';
        let wsEightString = '{ "workshops": [';

        query.forEach(doc => {
            const wsNumber = doc.data().workshop;
            const wsString = JSON.stringify(doc.data()) + ",";
            switch(wsNumber) {
                case 1:
                    wsOneString += wsString;
                    break;
                case 2:
                    wsTwoString += wsString;
                    break;
                case 3:
                    wsThreeString += wsString;
                    break;
                case 4:
                    wsFourString += wsString;
                    break;
                case 5:
                    wsFiveString += wsString;
                    break;
                case 6:
                    wsSixString += wsString;
                    break;
                case 7:
                    wsSevenString += wsString;
                    break;
                case 8:
                    wsEightString += wsString;
                    break;    
            }
        });

        wsOneString = wsOneString.substring(0, wsOneString.length - 1);
        wsOneString += "] }";
        wsTwoString = wsTwoString.substring(0, wsTwoString.length - 1);
        wsTwoString += "] }";
        wsThreeString = wsThreeString.substring(0, wsThreeString.length - 1);
        wsThreeString += "] }";
        wsFourString = wsFourString.substring(0, wsFourString.length - 1);
        wsFourString += "] }";
        wsFiveString = wsFiveString.substring(0, wsFiveString.length - 1);
        wsFiveString += "] }";
        wsSixString = wsSixString.substring(0, wsSixString.length - 1);
        wsSixString += "] }";
        wsSevenString = wsSevenString.substring(0, wsSevenString.length - 1);
        wsSevenString += "] }";
        wsEightString = wsEightString.substring(0, wsEightString.length - 1);
        wsEightString += "] }";

        return [wsOneString, wsTwoString, wsThreeString, wsFourString, wsFiveString, wsSixString, wsSevenString, wsEightString];
    }).then(wsStrArray => {
        wsOneFile.writeText(wsStrArray[0]);
        wsTwoFile.writeText(wsStrArray[1]);
        wsThreeFile.writeText(wsStrArray[2]);
        wsFourFile.writeText(wsStrArray[3]);
        wsFiveFile.writeText(wsStrArray[4]);
        wsSixFile.writeText(wsStrArray[5]);
        wsSevenFile.writeText(wsStrArray[6]);
        wsEightFile.writeText(wsStrArray[7]);
    }).then(() => {
        navigateToLogin();
    });
}

function loadCaucuses()
{
    const docDCON = firebase.firestore().collection("events").doc("DCON");
    const colCaucuses = docDCON.collection("caucuses");

    const documents = fileSystemModule.knownFolders.documents();
    const folder = documents.getFolder("data");
    const caucusFile = folder.getFile("caucuses");

    colCaucuses.get().then(query => {
        let caucusString = '{ "caucuses": [';

        query.forEach(doc => {
            caucusString += JSON.stringify(doc.data()) + ",";
        });

        caucusString = caucusString.substring(0, caucusString.length - 1);
        caucusString += "] }";

        return caucusString;
    }).then(caucusStr => {
        caucusFile.writeText(caucusStr);
    }).then(() => {
        navigateToLogin();
    });
}

function navigateToLogin()
{
    numberLoaded++;

    if(numberLoaded >= numberToLoad)
    {
        const navigationEntry = {
            moduleName: "views/home-page/home-page",
            transition: { name: "slideTop" }
        };
        
        frameModule.topmost().navigate(navigationEntry);
    }
}

exports.pageLoaded = pageLoaded;