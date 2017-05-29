"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var SocialShare = require("nativescript-social-share");
var camera = require("nativescript-camera");
var image_1 = require("ui/image");
var image_source_1 = require("image-source");
var ListComponent = (function () {
    function ListComponent(groceryListService) {
        this.groceryListService = groceryListService;
        this.groceryList = [];
        this.grocery = "";
        this.isLoading = false;
        this.listLoaded = false;
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(function (loadedGroceries) {
            loadedGroceries.forEach(function (groceryObject) {
                _this.groceryList.unshift(groceryObject);
            });
            _this.isLoading = false;
            _this.listLoaded = true;
        });
    };
    ListComponent.prototype.share = function () {
        var listString = this.groceryList
            .map(function (grocery) { return grocery.url; })
            .join(", ")
            .trim();
        SocialShare.shareText(listString);
    };
    ListComponent.prototype.add = function () {
        var _this = this;
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }
        // Dismiss the keyboard
        var textField = this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
        this.groceryListService.add(this.grocery)
            .subscribe(function (groceryObject) {
            _this.groceryList.unshift(groceryObject);
            _this.grocery = "";
        }, function () {
            alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
            _this.grocery = "";
        });
    };
    ListComponent.prototype.takePicture = function () {
        var _this = this;
        camera.requestPermissions();
        var isAvailable = camera.isAvailable();
        if (!isAvailable) {
            console.log('Camera is not available');
        }
        var options = {
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: false
        };
        camera.takePicture(options)
            .then(function (imageAsset) {
            console.log("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
            console.log("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
            console.log("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
            console.log("Result is an image asset instance");
            var img = new image_1.Image();
            img.src = imageAsset;
            image_source_1.fromAsset(imageAsset).then(function (res) {
                var myImageSource = res;
                //console.log(myImageSource.toBase64String('png'));
                _this.groceryListService.upload("data:image/png;base64," + myImageSource.toBase64String('png'))
                    .subscribe(function (groceryObject) {
                    _this.groceryList.unshift(groceryObject);
                    _this.grocery = "";
                }, function () {
                    alert({
                        message: "An error occurred while adding an item to your list.",
                        okButtonText: "OK"
                    });
                    _this.grocery = "";
                });
            });
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    ListComponent.prototype.delete = function (item) {
        var _this = this;
        this.groceryListService.delete(item.id)
            .subscribe(
        // Running the array splice in a zone ensures that change detection gets triggered.
        function () {
            var index = _this.groceryList.indexOf(item);
            _this.groceryList.splice(index, 1);
        });
    };
    ListComponent.prototype.deleteImage = function (item) {
        var _this = this;
        console.log('deleting' + item.id);
        this.groceryListService.deleteImage(item.id)
            .subscribe(
        // Running the array splice in a zone ensures that change detection gets triggered.
        function () {
            var index = _this.groceryList.indexOf(item);
            _this.groceryList.splice(index, 1);
        });
    };
    return ListComponent;
}());
__decorate([
    core_1.ViewChild("groceryTextField"),
    __metadata("design:type", core_1.ElementRef)
], ListComponent.prototype, "groceryTextField", void 0);
ListComponent = __decorate([
    core_1.Component({
        selector: "list",
        templateUrl: "pages/list/list.html",
        styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
        providers: [grocery_list_service_1.GroceryListService]
    }),
    __metadata("design:paramtypes", [grocery_list_service_1.GroceryListService])
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUt1QjtBQUl2QixrRkFFbUQ7QUFJbkQsdURBQXlEO0FBQ3pELDRDQUE4QztBQUM5QyxrQ0FFa0I7QUFDbEIsNkNBR3NCO0FBU3RCLElBQWEsYUFBYTtJQU94Qix1QkFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFOMUQsZ0JBQVcsR0FBc0IsRUFBRSxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFHMEMsQ0FBQztJQUU5RCxnQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFO2FBQzNCLFNBQVMsQ0FBQyxVQUFBLGVBQWU7WUFDeEIsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUFDLGFBQWE7Z0JBQ3BDLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsNkJBQUssR0FBTDtRQUNFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXO2FBQzlCLEdBQUcsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLEVBQVgsQ0FBVyxDQUFDO2FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDVixJQUFJLEVBQUUsQ0FBQztRQUNWLFdBQVcsQ0FBQyxTQUFTLENBQUMs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TUFBTTtRQUNoQixXQUFXLEVBQUUsc0JBQXNCO1FBQ25DLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixFQUFFLHFCQUFxQixDQUFDO1FBQ2hFLFNBQVMsRUFBRSxDQUFDLHlDQUFrQixDQUFDO0tBQ2hDLENBQUM7cUNBUXdDLHlDQUFrQjtHQVAvQyxhQUFhLENBMkh6QjtBQTNIWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIEdyb2Nlcnlcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9ncm9jZXJ5L2dyb2NlcnlcIjtcbmltcG9ydCB7XG4gIEdyb2NlcnlMaXN0U2VydmljZVxufSBmcm9tIFwiLi4vLi4vc2hhcmVkL2dyb2NlcnkvZ3JvY2VyeS1saXN0LnNlcnZpY2VcIjtcbmltcG9ydCB7XG4gIFRleHRGaWVsZFxufSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmVcIjtcbmltcG9ydCAqIGFzIGNhbWVyYSBmcm9tIFwibmF0aXZlc2NyaXB0LWNhbWVyYVwiO1xuaW1wb3J0IHtcbiAgSW1hZ2Vcbn0gZnJvbSBcInVpL2ltYWdlXCI7XG5pbXBvcnQge1xuICBJbWFnZVNvdXJjZSxcbiAgZnJvbUFzc2V0XG59IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibGlzdFwiLFxuICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9saXN0L2xpc3QuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcInBhZ2VzL2xpc3QvbGlzdC1jb21tb24uY3NzXCIsIFwicGFnZXMvbGlzdC9saXN0LmNzc1wiXSxcbiAgcHJvdmlkZXJzOiBbR3JvY2VyeUxpc3RTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZ3JvY2VyeUxpc3Q6IEFycmF5IDwgR3JvY2VyeSA+ID0gW107XG4gIGdyb2NlcnkgPSBcIlwiO1xuICBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgbGlzdExvYWRlZCA9IGZhbHNlO1xuICBAVmlld0NoaWxkKFwiZ3JvY2VyeVRleHRGaWVsZFwiKSBncm9jZXJ5VGV4dEZpZWxkOiBFbGVtZW50UmVmO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvY2VyeUxpc3RTZXJ2aWNlOiBHcm9jZXJ5TGlzdFNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmxvYWQoKVxuICAgICAgLnN1YnNjcmliZShsb2FkZWRHcm9jZXJpZXMgPT4ge1xuICAgICAgICBsb2FkZWRHcm9jZXJpZXMuZm9yRWFjaCgoZ3JvY2VyeU9iamVjdCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3QudW5zaGlmdChncm9jZXJ5T2JqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XG4gICAgICB9KTtcbiAgfVxuICBzaGFyZSgpIHtcbiAgICBsZXQgbGlzdFN0cmluZyA9IHRoaXMuZ3JvY2VyeUxpc3RcbiAgICAgIC5tYXAoZ3JvY2VyeSA9PiBncm9jZXJ5LnVybClcbiAgICAgIC5qb2luKFwiLCBcIilcbiAgICAgIC50cmltKCk7XG4gICAgU29jaWFsU2hhcmUuc2hhcmVUZXh0KGxpc3RTdHJpbmcpO1xuICB9XG5cbiAgYWRkKCkge1xuICAgIGlmICh0aGlzLmdyb2NlcnkudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICBhbGVydChcIkVudGVyIGEgZ3JvY2VyeSBpdGVtXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERpc21pc3MgdGhlIGtleWJvYXJkXG4gICAgbGV0IHRleHRGaWVsZCA9IDwgVGV4dEZpZWxkID4gdGhpcy5ncm9jZXJ5VGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcblxuICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmFkZCh0aGlzLmdyb2NlcnkpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICBncm9jZXJ5T2JqZWN0ID0+IHtcbiAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0LnVuc2hpZnQoZ3JvY2VyeU9iamVjdCk7XG4gICAgICAgICAgdGhpcy5ncm9jZXJ5ID0gXCJcIjtcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgYWRkaW5nIGFuIGl0ZW0gdG8geW91ciBsaXN0LlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmdyb2NlcnkgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICApXG4gIH1cblxuICB0YWtlUGljdHVyZSgpIHtcbiAgICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XG4gICAgdmFyIGlzQXZhaWxhYmxlID0gY2FtZXJhLmlzQXZhaWxhYmxlKCk7XG4gICAgaWYgKCFpc0F2YWlsYWJsZSkge1xuICAgICAgY29uc29sZS5sb2coJ0NhbWVyYSBpcyBub3QgYXZhaWxhYmxlJylcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB3aWR0aDogMzAwLFxuICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICBrZWVwQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICBzYXZlVG9HYWxsZXJ5OiBmYWxzZVxuICAgIH07XG4gICAgY2FtZXJhLnRha2VQaWN0dXJlKG9wdGlvbnMpXG4gICAgICAudGhlbigoaW1hZ2VBc3NldCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNpemU6IFwiICsgaW1hZ2VBc3NldC5vcHRpb25zLndpZHRoICsgXCJ4XCIgKyBpbWFnZUFzc2V0Lm9wdGlvbnMuaGVpZ2h0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJrZWVwQXNwZWN0UmF0aW86IFwiICsgaW1hZ2VBc3NldC5vcHRpb25zLmtlZXBBc3BlY3RSYXRpbyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGhvdG8gc2F2ZWQgaW4gUGhvdG9zL0dhbGxlcnkgZm9yIEFuZHJvaWQgb3IgaW4gQ2FtZXJhIFJvbGwgZm9yIGlPU1wiKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCBpcyBhbiBpbWFnZSBhc3NldCBpbnN0YW5jZVwiKTtcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcuc3JjID0gaW1hZ2VBc3NldDtcblxuICAgICAgICBmcm9tQXNzZXQoaW1hZ2VBc3NldCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGxldCBteUltYWdlU291cmNlOiBJbWFnZVNvdXJjZSA9IHJlcztcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKG15SW1hZ2VTb3VyY2UudG9CYXNlNjRTdHJpbmcoJ3BuZycpKTtcblxuICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLnVwbG9hZChcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxcIiArIG15SW1hZ2VTb3VyY2UudG9CYXNlNjRTdHJpbmcoJ3BuZycpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgZ3JvY2VyeU9iamVjdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm9jZXJ5TGlzdC51bnNoaWZ0KGdyb2NlcnlPYmplY3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvY2VyeSA9IFwiXCI7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBhbGVydCh7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyBhbiBpdGVtIHRvIHlvdXIgbGlzdC5cIixcbiAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm9jZXJ5ID0gXCJcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICB9KVxuXG5cblxuICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIC0+IFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cblxuICBkZWxldGUoaXRlbTogR3JvY2VyeSkge1xuICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmRlbGV0ZShpdGVtLmlkKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgLy8gUnVubmluZyB0aGUgYXJyYXkgc3BsaWNlIGluIGEgem9uZSBlbnN1cmVzIHRoYXQgY2hhbmdlIGRldGVjdGlvbiBnZXRzIHRyaWdnZXJlZC5cbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ3JvY2VyeUxpc3QuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlSW1hZ2UoaXRlbTogR3JvY2VyeSkge1xuICAgIGNvbnNvbGUubG9nKCdkZWxldGluZycgKyBpdGVtLmlkKVxuICAgIHRoaXMuZ3JvY2VyeUxpc3RTZXJ2aWNlLmRlbGV0ZUltYWdlKGl0ZW0uaWQpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAvLyBSdW5uaW5nIHRoZSBhcnJheSBzcGxpY2UgaW4gYSB6b25lIGVuc3VyZXMgdGhhdCBjaGFuZ2UgZGV0ZWN0aW9uIGdldHMgdHJpZ2dlcmVkLlxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5ncm9jZXJ5TGlzdC5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfSk7XG4gIH1cbn0iXX0=