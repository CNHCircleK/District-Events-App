const frameModule = require("tns-core-modules/ui/frame");
const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const fileSystemModule = require("tns-core-modules/file-system");
const utilityModule = require("tns-core-modules/utils/utils");


let viewModel;

function InformationViewModel()
{
    viewModel = observableModule.fromObject({
        data: new ObservableArray([
            {
                infoTitle: "Welcomes",
                items: new ObservableArray([
                    { infoCategory: "Manuel Santiago", infoName: "District Governor", hasName: true, onTap: function() {
                        viewPDF("DCON_district_governor_welcome.pdf");
                    } },
                    { infoCategory: "Jennifer Hoang", infoName: "DCON Chair", hasName: true, onTap: function() {
                        viewPDF("DCON_dcon_chair_welcome.pdf");
                    } },
                    { infoCategory: "Armando Velazquez", infoName: "District Administrator", hasName: true, onTap: function() {
                        viewPDF("DCON_district_administrator_welcome.pdf");
                    } },
                    { infoCategory: "Laura Belmont", infoName: "International President", hasName: true, onTap: function() {
                        viewPDF("DCON_international_president_welcome.pdf");
                    } }
                ])
            },
            {
                infoTitle: "General",
                items: new ObservableArray([
                    { infoCategory: "Code of Conduct and Dress Codes", hasName: false, onTap: function() {
                        viewPDF("DCON2019_Code_of_Conduct_and_Dress_Code.pdf");
                    } }
                ])
            },
            {
                infoTitle: "CNH",
                items: new ObservableArray([
                    { infoCategory: "District Board and Advisors", hasName: false, onTap: function() {
                        utilityModule.openUrl("http://www.cnhcirclek.org/district-board-and-advisor-contacts/");
                    } },
                    { infoCategory: "DCON Committee", hasName: false, onTap: function() {
                        utilityModule.openUrl("http://dcon.cnhcirclek.org/#committee");
                    } },
                ])
            },
            {
                infoTitle: "Elections",
                items: new ObservableArray([
                    { infoCategory: "Candidate Literature", hasName: false, onTap: function() {

                    } },
                    { infoCategory: "Caucus Rules", hasName: false, onTap: function() {
                        viewPDF("Caucusing_Rules_2019.pdf");
                    } },
                ])
            },
        ])
    });

    return viewModel;
}

function viewPDF(filename)
{
    const docs = fileSystemModule.knownFolders.currentApp().path;
    const filepath = fileSystemModule.path.join(docs, "resources/pdfs", filename);

    const navigationEntry = {
        context: { pdfUrl: filepath },
        transition: { name:  "slideLeft" },
        moduleName: "views/pdf-view-page/pdf-view-page"
    };

    frameModule.getFrameById("main-display").navigate(navigationEntry);
}

module.exports = InformationViewModel;