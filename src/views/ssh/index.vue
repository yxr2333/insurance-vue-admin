<template>
  <div>
    <div style="margin: 20px;">
      <div style="margin-bottom: 10px;">
        <el-button type="primary" @click="handleOpenTerminal">连接</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
      <el-form ref="form" :model="connectData" label-width="80px" :inline="true">
        <el-form-item prop="host" label="IP地址：">
          <el-input v-model="connectData.host" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item prop="port" label="端口：">
          <el-input v-model="connectData.port" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名：">
          <el-input v-model="connectData.username" autocomplete="off" style="width: 150px;"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="connectData.password" type="password" style="width: 150px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div id="webssh" style="width: 600px;"></div>
  </div>
</template>

<script>
import { WSSHClient } from "@/utils/webssh";
import { Terminal } from "xterm";
import { FitAddon } from 'xterm-addon-fit';
export default {
  name: "SSH",
  data() {
    return {
      connectData: {
        operate: 'connect',
        host: '',
        port: '22',
        username: 'root',
        password: ''
      }
    }
  },
  methods: {
    openTerminal(options){
      let client = new WSSHClient();
      const term = new Terminal({
        rendererType: 'canvas',
        cols: 97,
        rows: 37,
        cursorBlink: true, // 光标闪烁
        cursorStyle: "underline", // 光标样式  null | 'block' | 'underline' | 'bar'
        scrollback: 10000, //回滚
        tabStopWidth: 8, //制表宽度
        screenKeys: true,
        disableStdin: false,
        theme: {
          foreground: 'yellow', //字体
          background: '#060101', //背景色
          cursor: 'help',//设置光标
        }
      });
      term.onData((data) => {
        client.sendClientData(data);
      })
      let fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(document.querySelector("#webssh"));
      term.write("Connecting....\r\n");
      client.connect({
        onError: (error) => {
          term.write('Error: ' + error + '\r\n');
        },
        onConnect: () => {
          client.sendInitData(options);
        },
        onClose: () => {
          term.write("\rconnection closed");
        },
        onData: (data) => {
          if(data.indexOf('\r\nlogout') > -1){
            this.$message.error('退出成功!');
          }
          term.write(data);
        }
      })
    },
    handleOpenTerminal(){
      this.openTerminal(this.connectData);
    },
    handleReset(){
      this.$refs['form'].resetFields();
    }
  }
}
</script>

<style>
  .xterm-helper-textarea{
    opacity: 0;
  }
  .xterm-char-measure-element{
    opacity: 0;
  }
</style>
