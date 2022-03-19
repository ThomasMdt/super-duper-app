import Backbone from "backbone";
import { extend, isEmpty } from "underscore";

export const UserModel = Backbone.Model.extend({
  defaults: {
    name: "",
    phone: 0,
  },
  url: "/user",
  validate: function (attrs) {
    const regExp = /^(\d|\+)[\d\\-]+$/;
    const errors = {};
    if (!attrs.name.length) {
      extend(errors, { required: true });
    }
    if (!regExp.test(attrs.phone)) {
      extend(errors, { pattern: true });
    }
    if (!isEmpty(errors)) {
      return errors;
    }
  },
});
