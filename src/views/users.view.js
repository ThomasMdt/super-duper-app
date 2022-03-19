import Backbone from "backbone";
import { UsersCollection } from "../collections/users";
import { template } from "underscore";
import { UserDataView } from "./user-data.view";
import { Users } from "../Users";
import {NotificationWindow} from "./notification.view";

const $template = `
    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>User</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <progress class="progress is-small is-primary" max="100">15%</progress>
    <div class="user-creation is-half">
       <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="name input" type="text" placeholder="Text input">
            </div>
            <p class="validationNameError is-hidden help is-danger">This name is invalid</p>
        </div>
        <div class="field">
            <label class="label">Phone</label>
            <div class="control">
                <input class="phone input" type="text" placeholder="Text input">
            </div>
            <p class="validationPhoneError is-hidden help is-danger">This phone is invalid</p>
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="user-add-button button is-primary">Submit</button>
            </div>
        </div>
      </div>
`;
export const UsersView = Backbone.View.extend({
  el: "#app",
  events: {
    "click .user-add-button": "createUser",
  },
  initialize: function () {
    this.template = template($template);
    this.users = new UsersCollection(new Users().users);
    this.render();
    this.notification = new NotificationWindow();
    this.notification.open('Welcome!');
    this.loader = this.$("progress");
    this.$list = this.$("table tbody");
    this.listenTo(this.users, "update", this.updateData);
    this.listenTo(this.users, "change", this.updateData);
    this.listenTo(this.users, "sync", this.onSync);
    this.updateData();
  },
  updateData: function () {
    this.onProgressBar();
    this.users.fetch({
      success: function () {
        this.addAll();
      },
      context: this,
      error: function () {
        this.notification.open('Server error');
      }
    });
  },
  render: function () {
    this.$el.html(this.template());
    this.nameInput = this.$("input.name")[0];
    this.phoneInput = this.$(".phone")[0];
  },
  addOne: function (user) {
    const view = new UserDataView({ model: user });
    this.$list.append(view.render().el);
  },
  createUser: function () {
    this.listenTo(this.users, "invalid", (model, errors) =>
      this.markAllTouched(model, errors)
    );
    this.listenToOnce(this.users, "request", this.onRequest);
    this.users.create(
      {
        name: this.nameInput.value.trim(),
        phone: this.phoneInput.value.trim(),
      },
      {
        success: function (params) {
          this.unlockButton(false);
        }.bind(this),
        validate: true,
      }
    );
  },
  addAll: function () {
    this.$list.html("");
    this.users.each(this.addOne, this);
  },
  markAllTouched(model, error) {
    if (error.required) {
      this.$(".validationNameError").toggleClass("is-hidden");
    }
    if (error.pattern) {
      this.$(".validationPhoneError").toggleClass("is-hidden");
    }
  },
  removeErrorsBlock() {
    this.$(".validationNameError").addClass("is-hidden");
    this.$(".validationPhoneError").addClass("is-hidden");
  },
  onRequest() {
    this.removeErrorsBlock();
    this.unlockButton(true);
  },
  onProgressBar() {
    this.loader.removeClass("is-hidden");
  },
  offProgressBar() {
    this.loader.addClass("is-hidden");
  },
  onSync() {
    this.offProgressBar();
    this.stopListening(this.users, "invalid");
  },
  unlockButton(unlock) {
    this.$(".user-add-button").prop("disabled", unlock);
    unlock
      ? this.$(".user-add-button").addClass("is-loading")
      : this.$(".user-add-button").removeClass("is-loading");
  },
  openNotification(message) {
    const notificationContainer = document.querySelector('.notification-container');
    notificationContainer.classList.add('is-hidden');
  },
});
