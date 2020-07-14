# uio-tools

- [uio-tools](#uio-tools)
    - [使用](#使用)
    - [接口](#接口)
        - [parse](#parse)
        - [MySQL](#mysql)
            - [create](#create)
            - [update](#update)
            - [insert](#insert)
            - [delete](#delete)
            - [query](#query)
        - [MyBatis](#mybatis)
            - [create](#create-1)
            - [update](#update-1)
            - [insert](#insert-1)
            - [delete](#delete-1)
            - [query](#query-1)

![](https://img.shields.io/badge/Vue-inner-green) ![](https://img.shields.io/badge/Build-pass-orange)

## 使用
部署环境

```bash
$ yarn install
```

- 构建
    ```
    $ yarn build
    ```
    `/docs` 文件夹下生成目标文件
- 开发
    ```bash
    $ yarn serve
    ```
    启动调试服务器

## 接口
- 测试用例：
    ```java
    private Integer id;
    private String type;
    private String gist;
    private String typeName;
    private String projectName;
    private String number1;
    private String number2;
    private String number3;
    private String number4;
    private String number5;
    private String teacher1;
    private String teacher2;
    private String intro;
    private String fund;
    private Integer state;
    private String upFileIdArray;
    private String downFileIdArray;
    private String time;
    ```
- 基础 URL：`https://www.uiofield.top`
- 根路径：`/tools`

### parse
该接口为 MySQL 和 MyBatis 共用

- 路径：`/tools/wordIdentify`
- 发送：
    ```json
    {
        "data": "CREATE TABLE tb_untitled (id int(32),username varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL);"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": [
            "Integer id",
            "String username",
            "String password",
            "String level"
        ]
    }
    ```

### MySQL
#### create
- 路径：`/tools/createSQL`
- 发送：
    ```json
    {
        "parameter": ["Integer id", "String username", "String password", "String level"],
        "tbName": "tb_config"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "CREATE TABLE tb_config( id int(32),username varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,password varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,level varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL);"
    }
    ```

#### update
- 路径：`/tools/updateTable`
- 发送：
    ```json
    {
        "parameter": ["String username", "String password", "String level"],
        "keyParameter": ["Integer id"],
        "tbName": "tb_config"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "UPDATE tb_config SET username='username',password='password',level='level' WHERE id=username;"
    }
    ```

#### insert
- 路径：`/tools/insertMsg`
- 发送：
    ```json
    {
        "parameter": ["String username", "String password", "String level"],
        "tbName": "tb_config"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "INSERT INTO tb_config (username,password,level) values ('username','password','level');"
    }
    ```

#### delete
- 路径：`/tools/deleteMsg`
- 发送：
    ```json
    {
        "keyParameter": ["Integer id"],
        "tbName": "tb_announce"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "DELETE FROM tb_announce WHERE id=id;"
    }
    ```

#### query
- 路径：`/tools/selectTable`
- 发送：
    ```json
    {
        "parameter": ["String username", "String password", "String level"],
        "keyParameter": ["Integer id"],
        "tbName": "tb_config"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "SELECT username,password,level FROM tb_config WHERE id=id;"
    }
    ```

### MyBatis
#### create
- 路径：`/tools/mybatisBasics`
- 发送：
    ```json
    {
        "namespace":"com.example.manage_platform.dao.AnnounceDao"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<!DOCTYPE mapper\n PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\"\n\"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\n\n<mappernamespace=\"com.example.manage_platform.dao.AnnounceDao\">\n\n</mapper>"
    }
    ```

#### update
- 路径：`/tools/mybatisUpdate`
- 发送：
    ```json
    {
        "parameter": ["Integer title", "String content", "String dayDate", "String fileArray"],
        "keyParameter": ["Integer id"],
        "tbName": "tb_announce"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "<update id=\"updateMsg\">\n\tUPDATE tb_announce\n\t<set>\n\t\t<if test=\"title!=null\">title=#{title},</if>\n\t<if test=\"content!=null\">content=#{content},</if>\n\t<if test=\"dayDate!=null\">day_date=#{dayDate},</if>\n\t<if test=\"fileArray!=null\">file_array=#{fileArray}</if>\n\t</set>\n\tWHERE id=#{id}\n</update>"
    }
    ```

#### insert
- 路径：`/tools/mybatisInsert`
- 发送：
    ```json
    {
        "parameter": ["Integer title", "String content", "String dayDate", "String fileArray"],
        "tbName": "tb_announce"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "<insert id=\"insertMsg\">\n\tINSERT INTO tb_announce (title,content,day_date,file_array)\n\tVALUES (#{title},#{content},#{dayDate},#{fileArray})\n</insert>\n"
    }
    ```

#### delete
- 路径：`/tools/mybatisDelete`
- 发送：
    ```json
    {
        "keyParameter": ["Integer id"],
        "tbName": "tb_announce"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "<delete id=\"deleteMsg\">\n\tDELETE FROM tb_announce\n\tWHERE id=#{id}\n</delete>"
    }
    ```

#### query
- 路径：`/tools/mybatisSelect`
- 发送：
    ```json
    {
        "parameter": ["Integer title", "String content", "String dayDate", "String fileArray"],
        "keyParameter": ["Integer id"],
        "tbName": "tb_announce"
    }
    ```
- 返回：
    ```json
    {
        "code": 12,
        "message": "请求成功",
        "info": "<select id=\"selectMsg\">\n\tSELECT title,content,day_date,file_array\n\tFROM tb_announce\n\tWHERE id=#{id}\n</select>"
    }
    ```
