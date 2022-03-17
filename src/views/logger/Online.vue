<template>
  <div>
    <div class="header">
      <div class="header-left">
        <el-input v-model="searchName" placeholder="请输入姓名进行查询..." style="width: 200px;margin-right: 5px;"></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="header-right">
        <el-button type="primary" icon="el-icon-download">导出数据</el-button>
      </div>
    </div>
    <div style="margin: 20px;">
      <el-form ref="form" :model="form" label-width="80px" label-position="left">
        <el-row >
          <el-col :span="5">
            <el-form-item label="用户">
              <el-input v-model="form.name" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="IP地址">
              <el-input v-model="form.ip" class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="IP来源">
              <el-input v-model="form.ip_address" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="5">
            <el-form-item label="操作系统">
              <el-input v-model="form.os" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="浏览器">
              <el-input v-model="form.browser" class="my-input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备类型">
              <el-input v-model="form.type" clearable class="my-input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin: 20px;">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          fixed="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="loginTime"
          label="登陆时间">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="登录ip">
        </el-table-column>
        <el-table-column
          prop="ip_address"
          label="ip地址">
        </el-table-column>
        <el-table-column
          prop="os"
          label="操作系统">
        </el-table-column>
        <el-table-column
          prop="browser"
          label="浏览器">
        </el-table-column>
        <el-table-column
          prop="type"
          label="设备类型">
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" type="danger" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Online",
  data(){
    return {
      searchName: '',
      form: {
        name: '',
        ip: '',
        ip_address: '',
        os: '',
        browser: '',
        type: ''
      },
      tableData: [
        {
          name: 'yxr',
          loginTime: '2022-03-13 20:54:46',
          ip: '117.150.2.99',
          ip_address: '中国 | 0 | 湖北省 | 宜昌市 | 移动',
          os: 'Windows 10',
          browser: 'Chrome',
          type: 'Computer'
        },
        {
          name: 'yxr2',
          loginTime: '2022-03-13 20:48:46',
          ip: '117.150.2.99',
          ip_address: '中国 | 0 | 湖北省 | 宜昌市 | 移动',
          os: 'Windows 10',
          browser: 'Chrome',
          type: 'Computer'
        },
        {
          name: 'yxr3',
          loginTime: '2022-03-13 20:30:46',
          ip: '117.150.2.99',
          ip_address: '中国 | 0 | 湖北省 | 宜昌市 | 移动',
          os: 'Windows 10',
          browser: 'Chrome',
          type: 'Computer'
        }
      ]
    }
  }
}
</script>

<style type="less">
.header{
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.my-input{
  width: 200px;
}
</style>
