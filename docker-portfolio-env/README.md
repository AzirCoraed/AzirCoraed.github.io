### 1. 安装Docker
确保您已经在您的计算机上安装了Docker。您可以从[Docker官方网站](https://www.docker.com/get-started)下载并安装Docker。

### 2. 创建Dockerfile
在您的项目根目录下创建一个名为`Dockerfile`的文件。这个文件将定义您的Docker镜像的构建过程。以下是一个简单的示例Dockerfile，适用于一个基本的HTML/CSS/JavaScript项目：

```dockerfile
# 使用官方的Nginx镜像作为基础镜像
FROM nginx:alpine

# 将当前目录下的所有文件复制到Nginx的默认目录
COPY . /usr/share/nginx/html

# 暴露80端口
EXPOSE 80
```

### 3. 创建`.dockerignore`文件
为了避免将不必要的文件复制到Docker镜像中，您可以创建一个名为`.dockerignore`的文件，内容如下：

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
```

### 4. 构建Docker镜像
在终端中导航到您的项目目录，并运行以下命令来构建Docker镜像：

```bash
docker build -t my-portfolio .
```

这里，`my-portfolio`是您为镜像指定的名称。

### 5. 运行Docker容器
构建完成后，您可以运行一个Docker容器来启动您的应用程序：

```bash
docker run -d -p 8080:80 my-portfolio
```

这条命令会在后台运行一个容器，并将容器的80端口映射到主机的8080端口。

### 6. 访问您的应用
打开浏览器并访问 `http://localhost:8080`，您应该能够看到您的项目在Docker容器中运行。

### 7. 停止和删除容器
如果您想停止并删除容器，可以使用以下命令：

```bash
# 列出所有运行中的容器
docker ps

# 停止容器（用实际的容器ID替换<container_id>）
docker stop <container_id>

# 删除容器
docker rm <container_id>
```

### 8. 清理未使用的镜像和容器
您可以使用以下命令清理未使用的镜像和容器：

```bash
# 删除所有未使用的镜像
docker image prune

# 删除所有停止的容器
docker container prune
```

### 总结
通过以上步骤，您可以为您的项目创建一个Docker环境并进行操作练习。您可以根据需要修改Dockerfile以添加其他依赖项或配置。