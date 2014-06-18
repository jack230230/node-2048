# Node-2048

这是一个修改版的 2048，添加了 NodeJS 后端，提供了可以查询和更新 MySQL 数据库中排行榜数据的 REST API。

本示例演示了怎样在应用内通过读取 `VCAP_SERVICES` 环境变量的值来获取服务信息并连接到服务。

### 关于 VCAP_SERVICES 环境变量

给应用绑定了服务，重启应用后，服务的相关信息就会被设置到 `VCAP_SERVICES` 的值里，该环境变量的值为 `JSON` 字符串，如果给一个应用绑定了多个服务或同一个服务的多个实例，它们的信息也会出现在这个环境变量的值里。

> **格式说明：**

> JSON 对象的格式为 `服务名 -> 数组`，数组内容为该服务的每个实例信息。数组的值对象中，`name` 为实例名，`credentials` 该服务实例的连接信息，在应用中需要获取的就是 `credentials` 的内容。

### `VCAP_SERVICES` 环境变量示例：

```
{
    "mysql": [
        {
            "name": "mysql", 
            "label": "mysql", 
            "tags": [
                "mysql"
            ], 
            "plan": "100mb-dev", 
            "credentials": {
                "hostname": "192.168.0.134", 
                "port": 3306, 
                "name": "cf_a77f5575_4cd2_45d7_8744_a42b3410d362", 
                "username": "XndXUYoadzgNyBQr", 
                "password": "7hzSmuhaUEpLuQZa", 
                "uri": "mysql://XndXUYoadzgNyBQr:7hzSmuhaUEpLuQZa@192.168.0.134:3306/cf_a77f5575_4cd2_45d7_8744_a42b3410d362?reconnect=true", 
                "jdbcUrl": "jdbc:mysql://XndXUYoadzgNyBQr:7hzSmuhaUEpLuQZa@192.168.0.134:3306/cf_a77f5575_4cd2_45d7_8744_a42b3410d362"
            }
        }
    ], 
    "elephantsql": [
        {
            "name": "elephantsql-c6c60", 
            "label": "elephantsql", 
            "tags": [
                "postgres", 
                "postgresql", 
                "relational"
            ], 
            "plan": "turtle", 
            "credentials": {
                "uri": "postgres://seilbmbd:PHxTPJSbkcDakfK4cYwXHiIX9Q8p5Bxn@babar.elephantsql.com:5432/seilbmbd"
            }
        }
    ]
}
```

------------------------------------

# 2048
A small clone of [1024](https://play.google.com/store/apps/details?id=com.veewo.a1024), based on [Saming's 2048](http://saming.fr/p/2048/) (also a clone).

Made just for fun. [Play it here!](http://gabrielecirulli.github.io/2048/)

The official app can also be found on the [Play Store](https://play.google.com/store/apps/details?id=com.gabrielecirulli.app2048) and [App Store!](https://itunes.apple.com/us/app/2048-by-gabriele-cirulli/id868076805)

### Contributions

 - [TimPetricola](https://github.com/TimPetricola) added best score storage
 - [chrisprice](https://github.com/chrisprice) added custom code for swipe handling on mobile
 - [elektryk](https://github.com/elektryk) made swipes work on Windows Phone
 - [mgarciaisaia](https://github.com/mgarciaisaia) added support for Android 2.3

Many thanks to [rayhaanj](https://github.com/rayhaanj), [Mechazawa](https://github.com/Mechazawa), [grant](https://github.com/grant), [remram44](https://github.com/remram44) and [ghoullier](https://github.com/ghoullier) for the many other good contributions.

### Screenshot

<p align="center">
  <img src="http://pictures.gabrielecirulli.com/2048-20140309-234100.png" alt="Screenshot"/>
</p>

That screenshot is fake, by the way. I never reached 2048 :smile:

## Contributing
Changes and improvements are more than welcome! Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into `master`! If you can, please make sure the game fully works before sending the PR, as that will help speed up the process.

You can find the same information in the [contributing guide.](https://github.com/gabrielecirulli/2048/blob/master/CONTRIBUTING.md)

## License
2048 is licensed under the [MIT license.](https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt)

## Donations
I made this in my spare time, and it's hosted on GitHub (which means I don't have any hosting costs), but if you enjoyed the game and feel like buying me coffee, you can donate at my BTC address: `1Ec6onfsQmoP9kkL3zkpB6c5sA4PVcXU2i`. Thank you very much!
