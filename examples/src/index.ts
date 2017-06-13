import "./app.scss";
import "./favicon.png";

import * as angular from "angular";
import MainController from "./main.controller";

angular
    .module("app", [])
    .controller("MainController", MainController);