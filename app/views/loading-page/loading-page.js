const frameModule = require("tns-core-modules/ui/frame");
const LoadingViewModel = require("./loading-view-model");
const LoadDataModule = require("../../helperModules/loadData");


const numberToLoad = 3;
let numberLoaded = 0;

let loadingViewModel;
let loadDataModule;

function pageLoaded(args)
{
    loadingViewModel = new LoadingViewModel();

    const page = args.object;
    page.bindingContext = loadingViewModel;

    loadingViewModel.initialize();

    loadDataModule = new LoadDataModule();
    loadActivities();
    loadWorkshops();
    loadCaucuses();
}

function loadActivities()
{
    loadDataModule.loadActivities().then(() => {
        navigateToLogin();
    });
}

function loadWorkshops()
{
    loadDataModule.loadWorkshops().then(() => {
        navigateToLogin();
    });
}

function loadCaucuses()
{
    loadDataModule.loadCaucuses().then(() => {
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