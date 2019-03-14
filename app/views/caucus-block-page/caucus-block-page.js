const frameModule = require("tns-core-modules/ui/frame");
const CaucusBlockViewModel = require("./caucus-block-view-model");
const LoadDataModule = require("../../helperModules/loadData");
const firebase = require("nativescript-plugin-firebase/app");


let caucusBlockViewModel;
let caucusBlockListener;
let loadDataModule;

function onNavigatedTo(args)
{
    const context = args.context;
    caucusBlockViewModel = new CaucusBlockViewModel(context);

    var page = args.object;
    page.bindingContext = caucusBlockViewModel;

    caucusBlockViewModel.initialize();

    loadDataModule = new LoadDataModule();
    setEventBlockListener();
}

function goBack(args)
{
    const button = args.object;
    const page = button.page;
    page.frame.goBack();

    caucusBlockListener();
}

function setEventBlockListener()
{
    const docDCON = firebase.firestore().collection("events").doc("DCON");
    const colCaucuses = docDCON.collection("caucuses");

    caucusBlockListener = colCaucuses.onSnapshot(() => {
        loadDataModule.loadCaucuses().then(() => {
            caucusBlockViewModel.initialize();
        });
    });      
}

exports.onNavigatedTo = onNavigatedTo;
exports.goBack = goBack;