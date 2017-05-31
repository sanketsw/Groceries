import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
} from "@angular/core";
import {
    Router
} from "@angular/router";
import {
    Page
} from "ui/page";
import {
    Color
} from "color";
import {
    View
} from "ui/core/view";
import { setHintColor } from "../../utils/hint-util";
import { TextField } from "ui/text-field";
import * as webViewModule from "tns-core-modules/ui/web-view";
import { EventData } from 'tns-core-modules/data/observable';

@Component({
    selector: "my-app",
    templateUrl: "pages/map/map.html",
    styleUrls: ["pages/map/map-common.css"],
})
export class MapComponent implements OnInit {

    public firstWebViewSRC = '~/pages/map/test.html'

    ngOnInit() {
        // his.page.actionBarHidden = true;
        // let webView = new webViewModule.WebView();
        // webView.on(webViewModule.WebView.loadFinishedEvent, function (args: webViewModule.LoadEventData) {
        //     let message;
        //     if (!args.error) {
        //         message = "WebView finished loading " + args.url;
        //     }
        //     else {
        //         message = "Error loading " + args.url + ": " + args.error;
        //     }

        // });
        // // webView.src = "<iframe width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" src=\"https://www.google.com/maps/embed/v1/directions?key=AIzaSyAz7mWd2Ho4DFhNnu6RoQ3q_XHU5bafzO0&origin=Oslo+Norway&destination=Telemark+Norway&avoid=tolls|highways\" allowfullscreen></iframe>";
        // webView.src ="https://www.npmjs.com/package/nativescript-googlemaps"
    }

    constructor(private router: Router, private page: Page) {
    }

    webviewtouch(args){
        console.log("touch event");
    }
}