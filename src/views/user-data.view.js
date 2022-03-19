import Backbone from "backbone";
import { template } from "underscore";

const template$ = `
        <td>
            <%=name%>
        </td>
        <td>
            <%=phone%>
        </td>
        <td>
                <button class="edit button is-primary is-small">Edit</button>
              
                <button class="remove button is-danger is-small">REMOVE</button>         
        </td>
`;

const $editModeTemplate = `
    <td>
            <div class="control">
                <input class="input is-small" type="text" value="<%=name%>">
                 <p class="validationNameError is-hidden help is-danger">This name is invalid</p>
            </div>
        </td>
        <td>
         
            <div class="control">
                <input class="input is-small" type="text" value="<%=phone%>">
                <p class="validationPhoneError is-hidden help is-danger">This phone is invalid</p>
            </div>
            </td>
        <td>
                <button class="save button is-link is-small">SAVE</button>
                <button class="cancel button is-link is-small">CANCEL</button>        
        </td>
`;
export const UserDataView = Backbone.View.extend({
  events: {
    "click .remove": "clear",
    "click .edit": "toggleEditMode",
    "click .cancel": "toggleEditMode",
    "click .save": "save",
  },
  tagName: "tr",
  template: template(template$),
  editTemplate: template($editModeTemplate),
  isEditMode: false,
  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
    this.listenTo(this.model, "invalid", (model, error) =>
      this.markAllTouched(model, error)
    );
    this.listenTo(this.model, "request", this.removeErrorsBlock);
  },
  render: function () {
    const tpl = this.isEditMode ? this.editTemplate : this.template;
    this.$el.html(tpl(this.model.toJSON()));
    return this;
  },
  clear: function () {
    this.model.destroy();
  },
  toggleEditMode: function () {
    this.isEditMode = !this.isEditMode;
    this.render();
  },
  save() {
    const inputNameValue = this.$("input")[0].value.trim();
    const inputPhoneValue = this.$("input")[1].value.trim();
    this.model.save(
      {
        name: inputNameValue,
        phone: inputPhoneValue,
      },
      { patch: true, validate: true }
    );
  },
  markAllTouched(model, error) {
    if (error.required) {
      this.$(".validationNameError").removeClass("is-hidden");
    }
    if (error.pattern) {
      this.$(".validationPhoneError").removeClass("is-hidden");
    }
  },
  removeErrorsBlock() {
    this.$(".validationNameError").addClass("is-hidden");
    this.$(".validationPhoneError").addClass("is-hidden");
  },
});
