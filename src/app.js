import Backbone from "backbone";
import { AppRouter } from "./app.router";
window.onload = () => {
  // Server imitation
  Backbone.ajax = function (arg1) {
    setTimeout(() => arg1.success(), 3000);
  };
  new AppRouter();
  Backbone.history.start();
};
