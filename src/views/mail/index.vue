<template>
  <div style="margin: 20px;">
    <div>
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="handleSubmitMail">点击发送</el-button>
        <el-button icon="el-icon-upload" type="primary">上传附件</el-button>
        <el-button @click="handleResetField">重置输入</el-button>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        label-position="left"
        v-loading="loading"
        :rules="rules">
        <el-form-item label="收件人" prop="to">
          <el-input type="text" v-model="form.to" placeholder="请输入收件人..."></el-input>
        </el-form-item>
        <el-form-item label="主题" prop="title">
          <el-input v-model="form.title" placeholder="请输入邮件的主题..."></el-input>
        </el-form-item>
        <el-form-item label="正文" prop="content">
          <quill-editor
            ref="myEditor"
            style="height: 300px;"
            v-model="form.content"
            :options="editorOption"
            class="editor"
            @blur="onEditorBlur"
            @focus="onEditorFocus"
            @change="onEditorChange">
          </quill-editor>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
const toolbarOptions = [
  // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['bold', 'italic', 'underline', 'strike'],
  // 引用  代码块-----['blockquote', 'code-block']
  ['blockquote'],
  // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ header: 1 }, { header: 2 }],
  // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ list: 'ordered' }, { list: 'bullet' }],
  // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ script: 'sub' }, { script: 'super' }],
  // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ indent: '-1' }, { indent: '+1' }],
  // 文本方向-----[{'direction': 'rtl'}]
  // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ size: ['small', false, 'large', 'huge'] }],
  // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ color: [] }, { background: [] }],
  // 字体种类-----[{ font: [] }]
  [{ font: [] }],
  // 对齐方式-----[{ align: [] }]
  [{ align: [] }],
  // 清除文本格式-----['clean']
  ['clean'],
  // 链接、图片、视频-----['link', 'image', 'video']
  ['link']
]
export default {
  name: "Mail",
  components: {
    quillEditor
  },
  data(){
    return{
      rules: {
        to: [
          {required: true,message: '请输入收件人的邮件地址！',trigger: 'blur'},
          {type: 'email',message: '邮箱地址不正确'}
        ],
        title: [{required: true,message: '请输入邮件的标题！',trigger: 'blur'}]
      },
      content: '',
      form: {
        to: '',
        title: '',
        content: ''
      },
      loading: false,
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder: '请输入正文',
      }
    }
  },
  methods: {
    handleSubmitMail(){
      this.$refs.form.validate((valid) => {
        if(valid){
          if(this.form.content === ''){
            this.$message.error('邮件正文不能为空！');
            return false;
          }else{
            let url = '/mail?content=' + this.form.content + '&flag=true&title=' + this.form.title + '&to=' + this.form.to;
            this.postRequest(url).then(resp => {
              if(resp){
                this.$notify.success('发送成功');
                this.form = {
                  to: '',
                  title: '',
                  content: ''
                };
              }
            })
          }
        }else{
          return false;
        }
      })
    },
    handleResetField(){
      this.form = {
        to: '',
        title: '',
        content: ''
      };
    },
    // 失去焦点事件
    onEditorBlur (e) {
      console.log(this.content);
    },
    // 获得焦点事件
    onEditorFocus (e) {
      // console.log('onEditorFocus: ', e)
    },
    // 内容改变事件
    onEditorChange (e) {
      // console.log('onEditorChange: ', e)
    }
  }
}
</script>

<style scoped>

</style>
