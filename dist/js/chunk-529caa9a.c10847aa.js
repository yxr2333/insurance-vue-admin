(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-529caa9a"],{a192:function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{margin:"20px"}},[a("div",{staticClass:"header-text"},[t._v("保险分类管理")]),a("div",[a("div",{staticStyle:{display:"flex","justify-content":"flex-end"}},[a("div",[a("el-button",{attrs:{icon:"el-icon-plus"},on:{click:t.handleAdd}},[t._v("添加分类")]),a("el-button",{attrs:{type:"primary",icon:"el-icon-upload"}},[t._v("导入数据")]),a("el-button",{attrs:{type:"primary",icon:"el-icon-download"},on:{click:t.handleExport}},[t._v("导出数据")])],1)]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.cateList}},[a("el-table-column",{attrs:{type:"selection"}}),a("el-table-column",{attrs:{prop:"cateName",label:"分类编号"}}),a("el-table-column",{attrs:{prop:"name",label:"中文名称"}}),a("el-table-column",{attrs:{prop:"parent",label:"父级分类"},scopedSlots:t._u([{key:"default",fn:function(e){return[null===e.row.parent?a("el-tag",{attrs:{type:"primary"}},[t._v("无父级菜单")]):a("el-popover",{attrs:{placement:"right-start",title:"详情",width:"200",trigger:"click"}},[a("el-form",{attrs:{"label-width":"80"}},[a("el-form-item",{attrs:{label:"父级分类编号:"}},[a("div",[t._v(t._s(t.detailData.cateName))])]),a("el-form-item",{attrs:{label:"父级分类名称："}},[a("div",[t._v(t._s(t.detailData.name))])])],1),a("el-tag",{staticStyle:{cursor:"pointer"},attrs:{slot:"reference",type:"success"},on:{click:function(a){return t.handleLookDetail(e.row.parent)}},slot:"reference"},[t._v("查看详情")])],1)]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.handleEdit(e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.editData,"label-width":"80px",rules:t.rules}},[a("el-form-item",{attrs:{prop:"cateName",label:"分类编号"}},[a("el-input",{attrs:{disabled:""},model:{value:t.editData.cateName,callback:function(e){t.$set(t.editData,"cateName",e)},expression:"editData.cateName"}})],1),a("el-form-item",{attrs:{prop:"name",label:"分类名称"}},[a("el-input",{attrs:{placeholder:"请输入分类名称..."},model:{value:t.editData.name,callback:function(e){t.$set(t.editData,"name",e)},expression:"editData.name"}})],1),null!==t.editData.parent?a("el-form-item",{attrs:{prop:"parent",label:"父级菜单"}},[a("el-select",{attrs:{placeholder:"请选择父级菜单..."},model:{value:t.editData.parent.cateName,callback:function(e){t.$set(t.editData.parent,"cateName",e)},expression:"editData.parent.cateName"}},t._l(t.cateList,(function(e,l){return null===e.parent?a("el-option",{key:l,attrs:{label:e.name,value:e.cateName}}):t._e()})),1)],1):a("el-form-item",{attrs:{label:"父级菜单"}},[a("el-tag",{attrs:{type:"warning"}},[t._v("无")])],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.handleConfirm}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"提示",visible:t.addDialogVisible,width:"30%"},on:{"update:visible":function(e){t.addDialogVisible=e}}},[a("el-form",{ref:"addForm",attrs:{model:t.addData,"label-width":"80px",rules:t.rules}},[a("el-form-item",{attrs:{prop:"cateName",label:"分类编号"}},[a("el-input",{attrs:{disabled:""},model:{value:t.addData.cateName,callback:function(e){t.$set(t.addData,"cateName",e)},expression:"addData.cateName"}})],1),a("el-form-item",{attrs:{prop:"name",label:"分类名称"}},[a("el-input",{attrs:{placeholder:"请输入分类名称..."},model:{value:t.addData.name,callback:function(e){t.$set(t.addData,"name",e)},expression:"addData.name"}})],1),a("el-form-item",{attrs:{prop:"check",label:"根菜单"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},on:{change:t.calcBySwitch},model:{value:t.isRootCate,callback:function(e){t.isRootCate=e},expression:"isRootCate"}})],1),t.isRootCate?t._e():a("el-form-item",{attrs:{prop:"parent",label:"父级菜单"}},[a("el-select",{attrs:{placeholder:"请选择父级菜单"},on:{change:t.calcHead},model:{value:t.addData.parent.cateName,callback:function(e){t.$set(t.addData.parent,"cateName",e)},expression:"addData.parent.cateName"}},t._l(t.cateList,(function(e,l){return null===e.parent?a("el-option",{key:l,attrs:{value:e.cateName,label:e.name}}):t._e()})),1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.addDialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.handleConfirmAdd}},[t._v("确 定")])],1)],1)],1)},i=[],n=(a("d3b7"),a("159b"),a("b0c0"),a("e9c4"),{name:"Category",data:function(){return{rules:{name:[{required:!0,message:"分类名称不可为空！",trigger:"blur"}]},loading:!1,activeName:1,cateList:[],detailData:{cateName:"",name:""},addDialogVisible:!1,dialogVisible:!1,editData:{cateName:"",name:"",parent:{}},isRootCate:!1,addData:{cateName:"",name:"",parent:{cateName:""}}}},computed:{},mounted:function(){this.initData()},methods:{initData:function(){var t=this;this.loading=!0,this.getRequest("/category/all").then((function(e){e&&(t.cateList=e.data)})),this.loading=!1},calcHead:function(){var t=this,e=[];this.cateList.forEach((function(a,l){null!==a.parent&&a.parent.cateName===t.addData.parent.cateName&&e.push(a)})),this.addData.cateName=this.addData.parent.cateName.substr(0,6)+"_"+(e.length+1)},handleExport:function(){window.open("http://localhost:8081/file/download/excel/category")},handleLookDetail:function(t){this.detailData.cateName=t.cateName,this.detailData.name=t.name},handleDelete:function(t){var e=this;this.$confirm("该操作将删除["+t.name+"]分类，确认继续？","警告",{confirmButtonText:"确 认",cancelButtonText:"取消",type:"warning"}).then((function(){e.deleteRequest("/category/"+t.cateName).then((function(t){e.initData()}))})).catch((function(){e.$message.info("已取消")}))},handleEdit:function(t){this.dialogVisible=!0,console.log(t),this.editData=JSON.parse(JSON.stringify(t))},handleConfirm:function(){var t=this;this.$refs.form.validate((function(e){if(!e)return t.$message.error("请检查输入是否有误！"),!1;t.putRequest("/category",t.editData).then((function(e){e&&(t.dialogVisible=!1,t.initData())}))}))},handleAdd:function(){this.addDialogVisible=!0},handleConfirmAdd:function(){var t=this;console.log(this.addData),this.$refs.addForm.validate((function(e){if(!e)return!1;t.postRequest("/category",t.addData).then((function(e){e&&(t.addDialogVisible=!1,t.initData())}))}))},calcBySwitch:function(t){if(t){var e=[];this.cateList.forEach((function(t,a){null===t.parent&&e.push(t)})),this.addData.cateName="cate_"+(e.length+1),this.addData.parent=null}else this.addData.cateName="",this.addData.parent={cateName:""}}}}),o=n,r=(a("bb0d"),a("2877")),c=Object(r["a"])(o,l,i,!1,null,null,null);e["default"]=c.exports},aad1:function(t,e,a){},bb0d:function(t,e,a){"use strict";a("aad1")},e9c4:function(t,e,a){var l=a("23e7"),i=a("d066"),n=a("d039"),o=i("JSON","stringify"),r=/[\uD800-\uDFFF]/g,c=/^[\uD800-\uDBFF]$/,s=/^[\uDC00-\uDFFF]$/,d=function(t,e,a){var l=a.charAt(e-1),i=a.charAt(e+1);return c.test(t)&&!s.test(i)||s.test(t)&&!c.test(l)?"\\u"+t.charCodeAt(0).toString(16):t},u=n((function(){return'"\\udf06\\ud834"'!==o("\udf06\ud834")||'"\\udead"'!==o("\udead")}));o&&l({target:"JSON",stat:!0,forced:u},{stringify:function(t,e,a){var l=o.apply(null,arguments);return"string"==typeof l?l.replace(r,d):l}})}}]);
//# sourceMappingURL=chunk-529caa9a.c10847aa.js.map