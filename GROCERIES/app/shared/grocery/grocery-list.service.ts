import {
  Injectable
} from "@angular/core";
import {
  Http,
  Headers,
  Response
} from "@angular/http";
import {
  Observable
} from "rxjs/Rx";
import "rxjs/add/operator/map";

import {
  Config
} from "../config";
import {
  Grocery
} from "./grocery";
import {
  Image
} from "ui/image";

@Injectable()
export class GroceryListService {
  constructor(private http: Http) {}

  load() {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + Config.token2);

    return this.http.get(Config.apiUrl2 + "resources/image/", {
        headers: headers
      })
      .map(res => res.json())
      .map(data => {
        let groceryList = [];
        console.dir(data)
        data.resources.forEach((grocery) => {
          let url = grocery.secure_url
          groceryList.push(new Grocery(grocery.public_id, url));
        });
        return groceryList;
      })
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  upload(image: any) {
    //console.log('called')
    let headers = new Headers();
    headers.append("Authorization", "Basic " + Config.token2);
    headers.append("Content-Type", "application/json");
    //console.dir(image)
    return this.http.post(
        Config.apiUrl2 + "image/upload",
        JSON.stringify({
          "file": image,
          "upload_preset": "amqxwue2"
        }), {
          headers: headers
        }
      )
      .map(res => {
        console.log(res)
        return res.json()})
      .map(data => {
        console.dir(data)
        console.dir(data.secure_url)
        return new Grocery(data.public_id, data.secure_url);
      })
      .catch(this.handleErrors);
  }



  add(name: string) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    headers.append("Content-Type", "application/json");

    return this.http.post(
        Config.apiUrl + "Groceries",
        JSON.stringify({
          Name: name
        }), {
          headers: headers
        }
      )
      .map(res => res.json())
      .map(data => {
        return new Grocery(data.Result.Id, name);
      })
      .catch(this.handleErrors);
  }

  delete(id: string) {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + Config.token);
    headers.append("Content-Type", "application/json");

    return this.http.delete(
        Config.apiUrl + "Groceries/" + id, {
          headers: headers
        }
      )
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  deleteImage(id: string) {
    console.log('deleting' + id)
    let headers = new Headers();
    headers.append("Authorization", "Basic " + Config.token2);
    headers.append("Content-Type", "application/json");

    return this.http.delete(
        Config.apiUrl2 + "resources/image/upload?public_ids[]=" + id, {
          headers: headers
        }
      )
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}