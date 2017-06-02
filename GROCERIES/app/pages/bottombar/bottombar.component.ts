import { Component } from "@angular/core";
import { StackLayout } from "ui/layouts/stack-layout";
import {
    Router
} from "@angular/router";
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";

 
@Component({
    selector: "my-app",
    templateUrl: "pages/bottombar/bottombar.html",
})
 
export class BottombarComponent {
    public titleAndIcon: any = { title: "Ably", iconSource: "res://selected" };

    public onIndexChanged(args) {
        let tabView = <TabView>args.object;
        console.log("Selected index changed! New inxed: " + tabView.selectedIndex);
        
 }

    constructor(private router: Router) {
    }
    
}