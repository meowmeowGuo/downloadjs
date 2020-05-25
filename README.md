# downloadjs
下载支持post，get

# JS下载工具
```
Download("http://127.0.0.1:3001/api/download/get");
Download("http://127.0.0.1:3001/api/download/post", {
            method: "POST",
            data:{
              id: [1, 2],
            }
          });
```

## 基本用法

### 1. 引入代码

下载download.js 用script标签引入

### 2. 使用

```
Download("http://127.0.0.1:3001/api/download/post", {
            method: "POST",
            data:{
              id: [1, 2],
            }
          });
```

## 参数说明

* `url` - 下载链接  
* `options` - 下载参数
  * `method` - string:['POST','GET']两种方法中的一个，默认GET
  * `data` -  objtect:下载链接需要的参数信息，get方法时可以自己将querystring拼接到url后面，也可以将数据传给Download，由Download进行拼接，post方法接受一个对象，由Download转化为formData进行提交
  
