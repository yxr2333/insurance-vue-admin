(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-363e44ae"],{"0fa3":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{margin:"20px"}},[n("div",[n("div",{staticStyle:{"margin-bottom":"10px"}},[n("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmitMail}},[t._v("点击发送")]),n("el-button",{attrs:{icon:"el-icon-upload",type:"primary"}},[t._v("上传附件")]),n("el-button",{on:{click:t.handleResetField}},[t._v("重置输入")])],1),n("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"form",attrs:{model:t.form,"label-width":"80px","label-position":"left",rules:t.rules}},[n("el-form-item",{attrs:{label:"收件人",prop:"to"}},[n("el-input",{attrs:{type:"text",placeholder:"请输入收件人..."},model:{value:t.form.to,callback:function(e){t.$set(t.form,"to",e)},expression:"form.to"}})],1),n("el-form-item",{attrs:{label:"主题",prop:"title"}},[n("el-input",{attrs:{placeholder:"请输入邮件的主题..."},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),n("el-form-item",{attrs:{label:"正文",prop:"content"}},[n("quill-editor",{ref:"myEditor",staticClass:"editor",staticStyle:{height:"300px"},attrs:{options:t.editorOption},on:{blur:t.onEditorBlur,focus:t.onEditorFocus,change:t.onEditorChange},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1)],1)])},o=[],l=(n("a753"),n("8096"),n("14e1"),n("953d")),r=[["bold","italic","underline","strike"],["blockquote"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link"]],u={name:"Mail",components:{quillEditor:l["quillEditor"]},data:function(){return{rules:{to:[{required:!0,message:"请输入收件人的邮件地址！",trigger:"blur"},{type:"email",message:"邮箱地址不正确"}],title:[{required:!0,message:"请输入邮件的标题！",trigger:"blur"}]},content:"",form:{to:"",title:"",content:""},loading:!1,editorOption:{modules:{toolbar:r},theme:"snow",placeholder:"请输入正文"}}},methods:{handleSubmitMail:function(){var t=this;this.$refs.form.validate((function(e){if(!e)return!1;if(""===t.form.content)return t.$message.error("邮件正文不能为空！"),!1;var n="/mail?content="+t.form.content+"&flag=true&title="+t.form.title+"&to="+t.form.to;t.postRequest(n).then((function(e){e&&(t.$notify.success("发送成功"),t.form={to:"",title:"",content:""})}))}))},handleResetField:function(){this.form={to:"",title:"",content:""}},onEditorBlur:function(t){console.log(this.content)},onEditorFocus:function(t){},onEditorChange:function(t){}}},s=u,a=n("2877"),c=Object(a["a"])(s,i,o,!1,null,"1bec30d6",null);e["default"]=c.exports},"953d":function(t,e,n){!function(e,i){t.exports=i(n("9339"))}(0,(function(t){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=2)}([function(e,n){e.exports=t},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),o=n.n(i),l=n(6),r=n(5),u=r(o.a,l.a,!1,null,null,null);e.default=u.exports},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.install=e.quillEditor=e.Quill=void 0;var o=n(0),l=i(o),r=n(1),u=i(r),s=window.Quill||l.default,a=function(t,e){e&&(u.default.props.globalOptions.default=function(){return e}),t.component(u.default.name,u.default)},c={Quill:s,quillEditor:u.default,install:a};e.default=c,e.Quill=s,e.quillEditor=u.default,e.install=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={theme:"snow",boundary:document.body,modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]},placeholder:"Insert text here ...",readOnly:!1}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),l=i(o),r=n(3),u=i(r),s=window.Quill||l.default;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t,e){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),i=1;i<arguments.length;i++){var o=arguments[i];if(null!=o)for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(n[l]=o[l])}return n},writable:!0,configurable:!0}),e.default={name:"quill-editor",data:function(){return{_options:{},_content:"",defaultOptions:u.default}},props:{content:String,value:String,disabled:{type:Boolean,default:!1},options:{type:Object,required:!1,default:function(){return{}}},globalOptions:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null,delete this.quill},methods:{initialize:function(){var t=this;this.$el&&(this._options=Object.assign({},this.defaultOptions,this.globalOptions,this.options),this.quill=new s(this.$refs.editor,this._options),this.quill.enable(!1),(this.value||this.content)&&this.quill.pasteHTML(this.value||this.content),this.disabled||this.quill.enable(!0),this.quill.on("selection-change",(function(e){e?t.$emit("focus",t.quill):t.$emit("blur",t.quill)})),this.quill.on("text-change",(function(e,n,i){var o=t.$refs.editor.children[0].innerHTML,l=t.quill,r=t.quill.getText();"<p><br></p>"===o&&(o=""),t._content=o,t.$emit("input",t._content),t.$emit("change",{html:o,text:r,quill:l})})),this.$emit("ready",this.quill))}},watch:{content:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},value:function(t,e){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},disabled:function(t,e){this.quill&&this.quill.enable(!t)}}}},function(t,e){t.exports=function(t,e,n,i,o,l){var r,u=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(r=t,u=t.default);var a,c="function"==typeof u?u.options:u;if(e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o),l?(a=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(l)},c._ssrRegister=a):i&&(a=i),a){var d=c.functional,f=d?c.render:c.beforeCreate;d?(c._injectStyles=a,c.render=function(t,e){return a.call(e),f(t,e)}):c.beforeCreate=f?[].concat(f,a):[a]}return{esModule:r,exports:u,options:c}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"quill-editor"},[t._t("toolbar"),t._v(" "),n("div",{ref:"editor"})],2)},o=[],l={render:i,staticRenderFns:o};e.a=l}])}))}}]);
//# sourceMappingURL=chunk-363e44ae.29ce2d00.js.map