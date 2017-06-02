import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { MapComponent } from "./pages/map/map.component";
import { BottombarComponent } from "./pages/bottombar/bottombar.component";

export const routes = [
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent },
  { path: "list", component: ListComponent },
  { path: "bottombar", component: BottombarComponent },
  { path: "", component: BottombarComponent}
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  MapComponent,
  BottombarComponent
];