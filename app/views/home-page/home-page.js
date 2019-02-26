/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
var frameModule = require("tns-core-modules/ui/frame");
var appModule = require("tns-core-modules/application");

function switchTabs(args)
{
    var tappedTab = args.object;
    var rootView = appModule.getRootView();
    var navBar = rootView.getViewById("navbar");

    navBar.eachChildView((view) => {
        view.class = "bottom-nav-btn";
    });

    var navigationEntry = {
        moduleName: "views/" + tappedTab.id + "/" + tappedTab.id,
        transition: { name:  "slideTop" }
    };

    frameModule.getFrameById("main-display").navigate(navigationEntry);

    tappedTab.class = "bottom-nav-btn btn-active";
}

exports.switchTabs = switchTabs;

