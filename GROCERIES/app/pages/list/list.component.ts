import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  Grocery
} from "../../shared/grocery/grocery";
import {
  GroceryListService
} from "../../shared/grocery/grocery-list.service";
import {
  TextField
} from "ui/text-field";
import * as SocialShare from "nativescript-social-share";
import * as camera from "nativescript-camera";
import {
  Image
} from "ui/image";
import {
  ImageSource,
  fromAsset
} from "image-source";
import * as fs from "file-system";

@Component({
  selector: "cloudinary-page",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers: [GroceryListService]
})
export class ListComponent implements OnInit {
  groceryList: Array < Grocery > = [];
  grocery = "";
  isLoading = false;
  listLoaded = false;
  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  constructor(private groceryListService: GroceryListService) {}

  ngOnInit() {
    this.isLoading = true;
    this.groceryListService.load()
      .subscribe(loadedGroceries => {
        loadedGroceries.forEach((groceryObject) => {
          this.groceryList.unshift(groceryObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }
  share() {
    let listString = this.groceryList
      .map(grocery => grocery.url)
      .join(", ")
      .trim();
    SocialShare.shareText(listString);
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }

    // Dismiss the keyboard
    let textField = < TextField > this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this.groceryListService.add(this.grocery)
      .subscribe(
        groceryObject => {
          this.groceryList.unshift(groceryObject);
          this.grocery = "";
        },
        () => {
          alert({
            message: "An error occurred while adding an item to your list.",
            okButtonText: "OK"
          });
          this.grocery = "";
        }
      )
  }

  takePicture() {
    camera.requestPermissions();
    var isAvailable = camera.isAvailable();
    if (!isAvailable) {
      console.log('Camera is not available')
    }
    var options = {
      width: 300,
      height: 300,
      keepAspectRatio: true,
      saveToGallery: false
    };
    camera.takePicture(options)
      .then((imageAsset) => {
        console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
        console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
        console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");

        console.log("Result is an image asset instance");
        let img = new Image();
        img.src = imageAsset;

        fromAsset(imageAsset).then(res => {
          let myImageSource: ImageSource = res;
          //console.log(myImageSource.toBase64String('png'));

          this.groceryListService.upload("data:image/png;base64," + myImageSource.toBase64String('png'))
            .subscribe(
              groceryObject => {
                this.groceryList.unshift(groceryObject);
                this.grocery = "";
              },
              () => {
                alert({
                  message: "An error occurred while adding an item to your list.",
                  okButtonText: "OK"
                });
                this.grocery = "";
              }
            )
        })



      }).catch((err) => {
        console.log("Error -> " + err.message);
      });
  }

  delete(item: Grocery) {
    this.groceryListService.delete(item.id)
      .subscribe(
        // Running the array splice in a zone ensures that change detection gets triggered.
        () => {
          let index = this.groceryList.indexOf(item);
          this.groceryList.splice(index, 1);
        });
  }

  deleteImage(item: Grocery) {
    console.log('deleting' + item.id)
    this.groceryListService.deleteImage(item.id)
      .subscribe(
        // Running the array splice in a zone ensures that change detection gets triggered.
        () => {
          let index = this.groceryList.indexOf(item);
          this.groceryList.splice(index, 1);
        });
  }
}