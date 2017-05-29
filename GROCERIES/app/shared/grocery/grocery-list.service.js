"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var config_1 = require("../config");
var grocery_1 = require("./grocery");
var GroceryListService = (function () {
    function GroceryListService(http) {
        this.http = http;
    }
    GroceryListService.prototype.load = function () {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + config_1.Config.token2);
        return this.http.get(config_1.Config.apiUrl2 + "resources/image/", {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            var groceryList = [];
            console.dir(data);
            data.resources.forEach(function (grocery) {
                var url = grocery.secure_url;
                groceryList.push(new grocery_1.Grocery(grocery.public_id, url));
            });
            return groceryList;
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    GroceryListService.prototype.upload = function (image) {
        //console.log('called')
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + config_1.Config.token2);
        headers.append("Content-Type", "application/json");
        //console.dir(image)
        return this.http.post(config_1.Config.apiUrl2 + "image/upload", JSON.stringify({
            "file": image,
            "upload_preset": "amqxwue2"
        }), {
            headers: headers
        })
            .map(function (res) {
            console.log(res);
            return res.json();
        })
            .map(function (data) {
            console.dir(data);
            console.dir(data.secure_url);
            return new grocery_1.Grocery(data.public_id, data.secure_url);
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.add = function (name) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Bearer " + config_1.Config.token);
        headers.append("Content-Type", "application/json");
        return this.http.post(config_1.Config.apiUrl + "Groceries", JSON.stringify({
            Name: name
        }), {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .map(function (data) {
            return new grocery_1.Grocery(data.Result.Id, name);
        })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.delete = function (id) {
        var headers = new http_1.Headers();
        headers.append("Authorization", "Bearer " + config_1.Config.token);
        headers.append("Content-Type", "application/json");
        return this.http.delete(config_1.Config.apiUrl + "Groceries/" + id, {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    GroceryListService.prototype.deleteImage = function (id) {
        console.log('deleting' + id);
        var headers = new http_1.Headers();
        headers.append("Authorization", "Basic " + config_1.Config.token2);
        headers.append("Content-Type", "application/json");
        return this.http.delete(config_1.Config.apiUrl2 + "resources/image/upload?public_ids[]=" + id, {
            headers: headers
        })
            .map(function (res) { return res.json(); })
            .catch(this.handleErrors);
    };
    return GroceryListService;
}());
GroceryListService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], GroceryListService);
exports.GroceryListService = GroceryListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUV1QjtBQUN2QixzQ0FJdUI7QUFDdkIsOEJBRWlCO0FBQ2pCLGlDQUErQjtBQUUvQixvQ0FFbUI7QUFDbkIscUNBRW1CO0FBTW5CLElBQWEsa0JBQWtCO0lBQzdCLDRCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFHLENBQUM7SUFFbEMsaUNBQUksR0FBSjtRQUNFLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsUUFBUSxHQUFHLGVBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUxRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsRUFBRTtZQUN0RCxPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDO2FBQ0QsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixHQUFHLENBQUMsVUFBQSxJQUFJO1lBQ1AsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO2dCQUM3QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFBO2dCQUM1QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JC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bkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUNuQixlQUFNLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxFQUFFLEVBQUU7WUFDakMsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FDRjthQUNBLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUM7YUFDdEIsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsd0NBQVcsR0FBWCxVQUFZLEVBQVU7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxRQUFRLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUNuQixlQUFNLENBQUMsT0FBTyxHQUFHLHNDQUFzQyxHQUFHLEVBQUUsRUFBRTtZQUM1RCxPQUFPLEVBQUUsT0FBTztTQUNqQixDQUNGO2FBQ0EsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUN0QixLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF4R0QsSUF3R0M7QUF4R1ksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7cUNBRWUsV0FBSTtHQURuQixrQkFBa0IsQ0F3RzlCO0FBeEdZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEluamVjdGFibGVcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIEh0dHAsXG4gIEhlYWRlcnMsXG4gIFJlc3BvbnNlXG59IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQge1xuICBPYnNlcnZhYmxlXG59IGZyb20gXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuaW1wb3J0IHtcbiAgQ29uZmlnXG59IGZyb20gXCIuLi9jb25maWdcIjtcbmltcG9ydCB7XG4gIEdyb2Nlcnlcbn0gZnJvbSBcIi4vZ3JvY2VyeVwiO1xuaW1wb3J0IHtcbiAgSW1hZ2Vcbn0gZnJvbSBcInVpL2ltYWdlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHcm9jZXJ5TGlzdFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XG5cbiAgbG9hZCgpIHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmFzaWMgXCIgKyBDb25maWcudG9rZW4yKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KENvbmZpZy5hcGlVcmwyICsgXCJyZXNvdXJjZXMvaW1hZ2UvXCIsIHtcbiAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgfSlcbiAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAubWFwKGRhdGEgPT4ge1xuICAgICAgICBsZXQgZ3JvY2VyeUxpc3QgPSBbXTtcbiAgICAgICAgY29uc29sZS5kaXIoZGF0YSlcbiAgICAgICAgZGF0YS5yZXNvdXJjZXMuZm9yRWFjaCgoZ3JvY2VyeSkgPT4ge1xuICAgICAgICAgIGxldCB1cmwgPSBncm9jZXJ5LnNlY3VyZV91cmxcbiAgICAgICAgICBncm9jZXJ5TGlzdC5wdXNoKG5ldyBHcm9jZXJ5KGdyb2NlcnkucHVibGljX2lkLCB1cmwpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBncm9jZXJ5TGlzdDtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICB9XG5cbiAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxuXG4gIHVwbG9hZChpbWFnZTogYW55KSB7XG4gICAgLy9jb25zb2xlLmxvZygnY2FsbGVkJylcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJBdXRob3JpemF0aW9uXCIsIFwiQmFzaWMgXCIgKyBDb25maWcudG9rZW4yKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgLy9jb25zb2xlLmRpcihpbWFnZSlcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoXG4gICAgICAgIENvbmZpZy5hcGlVcmwyICsgXCJpbWFnZS91cGxvYWRcIixcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIFwiZmlsZVwiOiBpbWFnZSxcbiAgICAgICAgICBcInVwbG9hZF9wcmVzZXRcIjogXCJhbXF4d3VlMlwiXG4gICAgICAgIH0pLCB7XG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9XG4gICAgICApXG4gICAgICAubWFwKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCl9KVxuICAgICAgLm1hcChkYXRhID0+IHtcbiAgICAgICAgY29uc29sZS5kaXIoZGF0YSlcbiAgICAgICAgY29uc29sZS5kaXIoZGF0YS5zZWN1cmVfdXJsKVxuICAgICAgICByZXR1cm4gbmV3IEdyb2NlcnkoZGF0YS5wdWJsaWNfaWQsIGRhdGEuc2VjdXJlX3VybCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcbiAgfVxuXG5cblxuICBhZGQobmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIENvbmZpZy50b2tlbik7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KFxuICAgICAgICBDb25maWcuYXBpVXJsICsgXCJHcm9jZXJpZXNcIixcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIE5hbWU6IG5hbWVcbiAgICAgICAgfSksIHtcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5tYXAocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAubWFwKGRhdGEgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEdyb2NlcnkoZGF0YS5SZXN1bHQuSWQsIG5hbWUpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cblxuICBkZWxldGUoaWQ6IHN0cmluZykge1xuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJCZWFyZXIgXCIgKyBDb25maWcudG9rZW4pO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKFxuICAgICAgICBDb25maWcuYXBpVXJsICsgXCJHcm9jZXJpZXMvXCIgKyBpZCwge1xuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cblxuICBkZWxldGVJbWFnZShpZDogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coJ2RlbGV0aW5nJyArIGlkKVxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhvcml6YXRpb25cIiwgXCJCYXNpYyBcIiArIENvbmZpZy50b2tlbjIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKFxuICAgICAgICBDb25maWcuYXBpVXJsMiArIFwicmVzb3VyY2VzL2ltYWdlL3VwbG9hZD9wdWJsaWNfaWRzW109XCIgKyBpZCwge1xuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgLm1hcChyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XG4gIH1cbn0iXX0=