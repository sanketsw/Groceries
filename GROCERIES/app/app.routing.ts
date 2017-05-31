import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { MapComponent } from "./pages/map/map.component";

export const routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: MapComponent },
  { path: "list", component: ListComponent }
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  MapComponent
];