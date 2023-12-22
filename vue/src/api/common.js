let qs = require('qs');
let axios = require('axios');
let trytime = 3;

function login(_this, username, password) {
    var params = {
        username: username,
        password: password,
    };
    var data = qs.stringify(params);

    axios
        .get("http://8.139.5.168:8080/BankTransfer/login?" + data)
        .then(
            function (res) {
                if (res.data == "") {
                    trytime -= 1;
                    if(trytime == 0){
                        this.$router.push({ path: "../ReturnCard" });
                    }
                    this.$message({
                        showClose: true,
                        message: "密码错误，请重试，剩余尝试次数：" + trytime + "次",
                        type: "error",
                        trytime: 3,
                    });
                    return;
                }
                console.log(res.data);
                this.$store.commit("addUser", res.data); // 登录的用户信息放到 $store.state 状态里面
                sessionStorage.setItem("user", JSON.stringify(res.data)); // sessionStorage 记录登录信息，一旦关闭浏览器销毁
                this.$router.push({ path: "../OperationView" }); //重定向到bill
                _this.$store.commit("setLogin", "退出");
                getMoney(this);
                if (sessionStorage.getItem("user") != null) {
                    var realname = JSON.parse(sessionStorage.getItem("user")).realname;
                    this.$store.commit(
                        "setUserName",
                        realname.substr(realname.length - 2, 2)
                    );
                }
            }.bind(_this)
        )
        .catch(function (error) {
            console.log(error);
            this.$message({
                showClose: true,
                message: "请重试",
                type: "error",
            });
        });
}

function getMoney(_this) {
    var params = {
        id: JSON.parse(sessionStorage.getItem("user")).id
    };
    var data = qs.stringify(params);
    axios
        .get("http://8.139.5.168:8080/BankTransfer/getMoney?"+ data)
        .then(
            function (res) {
                console.log(res.data);
                _this.$store.commit("setMoney", res.data);
            }.bind(_this)
        )
        .catch(function (error) {
            console.log(error);
        });
}


module.exports = {
    login,
    getMoney
}
