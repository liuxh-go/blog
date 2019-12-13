# 初篇

## 一、博客的搭建以及自动化部署更新

### 本博客采用vuepress框架进行搭建,具体搭建方法请查看官方文档

### 使用Github托管项目代码,项目的自动化构建步骤如下:
  1. 初始化Github仓库并将项目代码放置于master分支
  2. 新建gh-pages分支用于放置构建后的代码
  3. 使用Travis将代码仓库设置自动化构建发布,设置推送master代码时自动构建发布到gh-pages分支
  4. 在博客服务器上搭建自动pull服务器,使用githooks设置回调,当gh-pages分支有新推送时触发自动pull脚本,实现自动更新

### 在搭建自动化构建发布更新的过程中遇到了一些问题如下:
  * githooks的使用<br>
在github项目设置界面的`Webhooks`选项中设置

  * golang执行shell命令<br>
使用`exec.Cmd()`方法;<br>
注意多条命令需用`&&`连接在一起拼接成单条命令执行

  * git强制使用远程代码覆盖本地代码
```bash
git fetch --all
git git reset --hard origin/${branch_name}
git pull
```

  * 新建develop分支用于开发,只有当合并且推送到master分支时才会触发自动化构建发布流程