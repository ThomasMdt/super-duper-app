import Backbone from "backbone";
import { UserModel } from "../models/user.model";

export const UsersCollection = Backbone.Collection.extend({
  model: UserModel,
  url: "/users",
});
