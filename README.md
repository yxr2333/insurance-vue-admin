互联网+比赛



**项目名称：** 互联网保险推荐系统

**项目背景：**

## 一、前端

## 二、后端

### 2.1 后台

1. 技术选型
  1. SpringBoot
  2. SpringData JPA
  3. Sa-Token
  4. google kaptcha
  5. Jackson
  6. Hutools
  7. redis
2. 技术介绍

主要使用SpringBoot后台框架进行开发，SpringData JPA对持久层进行ORM操作。角色和权限认证使用的是Sa-Token，使用Google Kaptcha生成验证码传给前端作登录和注册使用。使用jackson来进行对象的序列化和反序列化

1. 功能构想
  1. 用户登录
  2. 用户个人中心
    1. 对自己信息进行修改（修改密码，头像etc）
      1. 修改密码
      2. 修改头像

2. 修改其他

3. 上传文件 **太麻烦，直接调用别人的接口吧。。**

4. 前端网站数据展示
  1. 首页轮播图
  2. 保险推荐
    1. 随机推荐8条保险
  3. 每个保险的数据信息
5. 后台管理系统
  1. 后台管理员登录
  2. 系统信息

6. 查看所有的产品信息
  1. 增删改查
    1. 添加产品（模板JSON）
    2. 修改产品信息（模板JSON）
7. 高级查询
8. 查看所有的注册用户
  1. 用户的增删改查
  2. 查看用户购买过哪些产品（购买记录）
  3. 用户的登录记录

### 2.2 数据库

1. 技术选型：MySQL
2. 表结构分析
  1. 用户表
    1. 用户id（主键）
    2. 用户名
    3. 密码（加密存储）
    4. 头像（存储URL）
    5. 联系电话
    6. 邮箱
    7. 性别
    8. 年龄
    9. 联系地址
    10. 用户状态（启用和未启用）
    11. 用户角色
    12. 用户权限
  2. 角色表
  3. 权限表
  4. 保险商品表
    1. 产品的uuid（主键）
    2. 产品名称
    3. 产品简介
    4. 保险价格
    5. 产品分类
    6. 保险期限
    7. 适用人群
    8. 销售范围
    9. 保单形式
    10. 保障计划
      1. 图片的URL地址
    11. 产品特色
      1. 图片的URL地址数组
    12. 常见问题
      1. 问题
      2. 回答
  5. 常见问题表
    1. 主键id
    2. 问题
    3. 回答
  6. 分类表
    1. 健康险（cate_1）
      1. 少儿健康（cate_1_1）
      2. 成人健康（cate_1_2）
      3. 老人健康（cate_1_3）
      4. 女性保险（cate_1_4）
    2. 意外险（cate_2）
      1. 交通意外险（cate_2_1）
      2. 人身意外险（cate_2_2）
    3. 旅游险（cate_3）
      1. 境内旅游险（cate_3_1）
      2. 境外旅游险（cate_3_2）
    4. 家财险（cate_4）
      1. 家庭财产（cate_4_1）
      2. 个人财产（cate_4_2）
    5. 医疗保险（cate_5）
  7. 首页轮播图
    1. 主键id
    2. 图片的url
    3. 对应产品的uuid

### 2.3 后台管理页面

1. 技术选型：Vue+Element UI实现的中后台管理页面

### 2.4 待办事项

- 给查询所有接口加上分页的功能

- 发送邮件的功能

- 定时任务功能
- 导入导出excel文件
- 修改用户注册的逻辑
  - 用户注册需要结合邮箱进行验证

- 修改用户表
  - 添加真实姓名字段
  - 用户名字段添加唯一约束

- 后天页面添加发送邮件的功能

- 头像裁剪上传功能