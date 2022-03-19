import Backbone from "backbone";
import { UsersView } from "./views/users.view";

const routerOptions = {
  routes: {
    "*path": function () {
      new UsersView();
    },
  },
};
export const AppRouter = Backbone.Router.extend(routerOptions);
