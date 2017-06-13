export default class MainController {
    arrowIcon = this.$sce.trustAsHtml(require("./arrow-icon.svg"));
    checkboxSelectList: Array<any>;
    infoIcon = this.$sce.trustAsHtml(require("./info-circle-icon.svg"));

    static $inject = ["$sce"];
    constructor(
        private $sce: ng.ISCEService
    ) {
        this.checkboxSelectList = [
            {isCheck: false, disabled: false, text: "Default"},
            {isCheck: true, disabled: false, text: "Checked"},
            {isCheck: false, disabled: true, text: "Disabled"},
            {isCheck: true, disabled: true, text: "Checked and Disabled"}
        ];
    }
}