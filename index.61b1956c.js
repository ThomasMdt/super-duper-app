function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},n={},s=e.parcelRequire2fd7;null==s&&((s=function(t){if(t in i)return i[t].exports;if(t in n){var e=n[t];delete n[t];var s={id:t,exports:{}};return i[t]=s,e.call(s.exports,s,s.exports),s.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){n[t]=e},e.parcelRequire2fd7=s);var o=s("kL2Ep"),a=(o=s("kL2Ep"),o=s("kL2Ep"),o=s("kL2Ep"),o=s("kL2Ep"),s("2q7Wm"));const l=t(o).Model.extend({defaults:{name:"",phone:0},url:"/user",validate:function(t){const e={};if(t.name.length||a.extend(e,{required:!0}),/^(\d|\+)[\d\\-]+$/.test(t.phone)||a.extend(e,{pattern:!0}),!a.isEmpty(e))return e}}),r=t(o).Collection.extend({model:l,url:"/users"});a=s("2q7Wm"),o=s("kL2Ep"),a=s("2q7Wm");const d=t(o).View.extend({events:{"click .remove":"clear","click .edit":"toggleEditMode","click .cancel":"toggleEditMode","click .save":"save"},tagName:"tr",template:a.template('\n        <td>\n            <%=name%>\n        </td>\n        <td>\n            <%=phone%>\n        </td>\n        <td>\n                <button class="edit button is-primary is-small">Edit</button>\n              \n                <button class="remove button is-danger is-small">REMOVE</button>         \n        </td>\n'),editTemplate:a.template('\n    <td>\n            <div class="control">\n                <input class="input is-small" type="text" value="<%=name%>">\n                 <p class="validationNameError is-hidden help is-danger">This name is invalid</p>\n            </div>\n        </td>\n        <td>\n         \n            <div class="control">\n                <input class="input is-small" type="text" value="<%=phone%>">\n                <p class="validationPhoneError is-hidden help is-danger">This phone is invalid</p>\n            </div>\n            </td>\n        <td>\n                <button class="save button is-link is-small">SAVE</button>\n                <button class="cancel button is-link is-small">CANCEL</button>        \n        </td>\n'),isEditMode:!1,initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove),this.listenTo(this.model,"invalid",((t,e)=>this.markAllTouched(t,e))),this.listenTo(this.model,"request",this.removeErrorsBlock)},render:function(){const t=this.isEditMode?this.editTemplate:this.template;return this.$el.html(t(this.model.toJSON())),this},clear:function(){this.model.destroy()},toggleEditMode:function(){this.isEditMode=!this.isEditMode,this.render()},save(){const t=this.$("input")[0].value.trim(),e=this.$("input")[1].value.trim();this.model.save({name:t,phone:e},{patch:!0,validate:!0})},markAllTouched(t,e){e.required&&this.$(".validationNameError").removeClass("is-hidden"),e.pattern&&this.$(".validationPhoneError").removeClass("is-hidden")},removeErrorsBlock(){this.$(".validationNameError").addClass("is-hidden"),this.$(".validationPhoneError").addClass("is-hidden")}});class h{users=[{name:"John Doy1",phone:85564675621},{name:"John Doy2",phone:85564675621},{name:"John Doy3",phone:85564675621},{name:"John Doy4",phone:85564675621},{name:"John Doy5",phone:85564675621}];constructor(){}}const c=t(o=s("kL2Ep")).View.extend({el:".notification-container",initialize(){this.$container=document.querySelector(".notification-container"),this.$button=this.$container.querySelector(".delete"),this.$button.addEventListener("click",(()=>{this.$container.style.visibility="hidden"}))},open(t){const e=this.$container.querySelector(".notification").querySelector("p");this.$container.style.visibility="visible",e.textContent=t}}),u=t(o).View.extend({el:"#app",events:{"click .user-add-button":"createUser"},initialize:function(){this.template=a.template('\n    <table class="table is-fullwidth">\n        <thead>\n            <tr>\n                <th>User</th>\n                <th>Phone</th>\n                <th>Actions</th>\n            </tr>\n        </thead>\n        <tbody>\n        </tbody>\n    </table>\n    <progress class="progress is-small is-primary" max="100">15%</progress>\n    <div class="user-creation is-half">\n       <div class="field">\n            <label class="label">Name</label>\n            <div class="control">\n                <input class="name input" type="text" placeholder="Text input">\n            </div>\n            <p class="validationNameError is-hidden help is-danger">This name is invalid</p>\n        </div>\n        <div class="field">\n            <label class="label">Phone</label>\n            <div class="control">\n                <input class="phone input" type="text" placeholder="Text input">\n            </div>\n            <p class="validationPhoneError is-hidden help is-danger">This phone is invalid</p>\n        </div>\n        <div class="field is-grouped">\n            <div class="control">\n                <button class="user-add-button button is-primary">Submit</button>\n            </div>\n        </div>\n      </div>\n'),this.users=new r((new h).users),this.render(),this.notification=new c,this.notification.open("Welcome!"),this.loader=this.$("progress"),this.$list=this.$("table tbody"),this.listenTo(this.users,"update",this.updateData),this.listenTo(this.users,"change",this.updateData),this.listenTo(this.users,"sync",this.onSync),this.updateData()},updateData:function(){this.onProgressBar(),this.users.fetch({success:function(){this.addAll()},context:this,error:function(){this.notification.open("Server error")}})},render:function(){this.$el.html(this.template()),this.nameInput=this.$("input.name")[0],this.phoneInput=this.$(".phone")[0]},addOne:function(t){const e=new d({model:t});this.$list.append(e.render().el)},createUser:function(){this.listenTo(this.users,"invalid",((t,e)=>this.markAllTouched(t,e))),this.listenToOnce(this.users,"request",this.onRequest),this.users.create({name:this.nameInput.value.trim(),phone:this.phoneInput.value.trim()},{success:function(t){this.unlockButton(!1)}.bind(this),validate:!0})},addAll:function(){this.$list.html(""),this.users.each(this.addOne,this)},markAllTouched(t,e){e.required&&this.$(".validationNameError").toggleClass("is-hidden"),e.pattern&&this.$(".validationPhoneError").toggleClass("is-hidden")},removeErrorsBlock(){this.$(".validationNameError").addClass("is-hidden"),this.$(".validationPhoneError").addClass("is-hidden")},onRequest(){this.removeErrorsBlock(),this.unlockButton(!0)},onProgressBar(){this.loader.removeClass("is-hidden")},offProgressBar(){this.loader.addClass("is-hidden")},onSync(){this.offProgressBar(),this.stopListening(this.users,"invalid")},unlockButton(t){this.$(".user-add-button").prop("disabled",t),t?this.$(".user-add-button").addClass("is-loading"):this.$(".user-add-button").removeClass("is-loading")},openNotification(t){document.querySelector(".notification-container").classList.add("is-hidden")}}),p={routes:{"*path":function(){new u}}},m=t(o).Router.extend(p);console.log("@"),window.onload=()=>{console.log("@"),t(o).ajax=function(t){setTimeout((()=>t.success()),3e3)},new m,t(o).history.start()};
//# sourceMappingURL=index.61b1956c.js.map
