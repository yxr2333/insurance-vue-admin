(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62916aef"],{"2ed6":function(e,t,a){},"984b":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"header"},[a("div",{staticClass:"header-left"},[a("el-input",{staticStyle:{width:"200px","margin-right":"5px"},attrs:{placeholder:"请输入姓名进行查询..."},model:{value:e.searchName,callback:function(t){e.searchName=t},expression:"searchName"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"}},[e._v("搜索")])],1),a("div",{staticClass:"header-right"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-download"}},[e._v("导出数据")])],1)]),a("div",{staticStyle:{margin:"20px"}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px","label-position":"left"}},[a("el-row",[a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"用户"}},[a("el-input",{staticClass:"my-input",attrs:{clearable:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"IP地址"}},[a("el-input",{staticClass:"my-input",model:{value:e.form.ip,callback:function(t){e.$set(e.form,"ip",t)},expression:"form.ip"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"IP来源"}},[a("el-input",{staticClass:"my-input",attrs:{clearable:""},model:{value:e.form.ip_address,callback:function(t){e.$set(e.form,"ip_address",t)},expression:"form.ip_address"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"操作系统"}},[a("el-input",{staticClass:"my-input",attrs:{clearable:""},model:{value:e.form.os,callback:function(t){e.$set(e.form,"os",t)},expression:"form.os"}})],1)],1),a("el-col",{attrs:{span:5}},[a("el-form-item",{attrs:{label:"浏览器"}},[a("el-input",{staticClass:"my-input",model:{value:e.form.browser,callback:function(t){e.$set(e.form,"browser",t)},expression:"form.browser"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"设备类型"}},[a("el-input",{staticClass:"my-input",attrs:{clearable:""},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}})],1)],1)],1)],1)],1),a("div",{staticStyle:{margin:"20px",display:"flex","flex-direction":"column","align-items":"flex-end"}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData}},[a("el-table-column",{attrs:{type:"selection",fixed:"left"}}),a("el-table-column",{attrs:{prop:"user.username",label:"用户"}}),a("el-table-column",{attrs:{prop:"time",label:"登陆时间"}}),a("el-table-column",{attrs:{prop:"ip",label:"登录ip"}}),a("el-table-column",{attrs:{prop:"address",label:"ip来源"}}),a("el-table-column",{attrs:{prop:"os",label:"操作系统"}}),a("el-table-column",{attrs:{prop:"browser",label:"浏览器"}}),a("el-table-column",{attrs:{prop:"deviceType",label:"设备类型"}})],1),a("el-pagination",{attrs:{"current-page":e.pageNum,"page-sizes":[5,10,20,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},s=[],i={name:"Logger",data:function(){return{loading:!1,searchName:"",form:{name:"",ip:"",ip_address:"",os:"",browser:"",type:""},tableData:[],pageNum:1,pageSize:10,total:-1}},mounted:function(){this.initData()},methods:{initData:function(){var e=this;this.loading=!0;var t="/logger/all?pageNum="+this.pageNum+"&pageSize="+this.pageSize;this.getRequest(t).then((function(t){t&&(e.total=t.data.total,e.tableData=t.data.data)})),setTimeout((function(){e.loading=!1}),800)},handleSizeChange:function(e){this.pageSize=e,this.initData()},handleCurrentChange:function(e){this.pageNum=e,this.initData()}}},r=i,n=(a("b4aa"),a("2877")),o=Object(n["a"])(r,l,s,!1,null,null,null);t["default"]=o.exports},b4aa:function(e,t,a){"use strict";a("2ed6")}}]);
//# sourceMappingURL=chunk-62916aef.e3fe35a1.js.map