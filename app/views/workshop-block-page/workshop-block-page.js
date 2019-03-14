const frameModule = require("tns-core-modules/ui/frame");
const WorkshopBlockViewModel = require("./workshop-block-view-model");
const LoadDataModule = require("../../helperModules/loadData");
const firebase = require("nativescript-plugin-firebase/app");


let workshopBlockViewModel;
let workshopBlockListener;
let loadDataModule;

function onNavigatedTo(args)
{
    const context = args.context;
    workshopBlockViewModel = new WorkshopBlockViewModel(context);

    var page = args.object;
    page.bindingContext = workshopBlockViewModel;

    workshopBlockViewModel.initialize();

    loadDataModule = new LoadDataModule();
    setWorkshopListener();
}

function goBack(args)
{
    const button = args.object;
    const page = button.page;
    page.frame.goBack();

    workshopBlockListener();
}

function setWorkshopListener()
{
    const docDCON = firebase.firestore().collection("events").doc("DCON");
    const colWorkshops = docDCON.collection("workshops");

    workshopBlockListener = colWorkshops.onSnapshot(() => {
        loadDataModule.loadWorkshops().then(() => {
            workshopBlockViewModel.initialize();
        });
    });
}

exports.onNavigatedTo = onNavigatedTo;
exports.goBack = goBack;
