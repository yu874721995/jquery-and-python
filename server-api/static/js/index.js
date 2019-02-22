
function login() {
    var user = document.getElementById('user').value;
    var pwd = document.getElementById('pwd').value;
    if (!user){
        alert('用户名为空，请输入')
    }
    else if(!pwd){
        alert('密码为空，请输入')
    }else {
        $.post('http://192.168.30.207:9001/Loginup', {
            userName: $('#user').val(),
            password: $('#pwd').val()
        }, function (data) {
            console.log(data)
            if (JSON.parse(data).status == 1) {
                var msg = JSON.parse(data).data;
                window.location.href = 'http://192.168.30.207:9001/index';
                // $.post('http://127.0.0.1:8000/session_test',function (data) {
                //     console.log(data)
                //     var s = data.data;
                //     document.getElementById('msg').innerHTML= s
                // }
                // )
            } else if (JSON.parse(data).status == 2) {
                alert(JSON.parse(data).msg)
            } else {
                alert(JSON.parse(data).msg)
            }
        })
    }
}
function ss(a,b,c){
    $.get("http://192.168.30.207:9001/delete?userid="+a+'&pwd='+b+'&id='+c, function(data){
        console.log(data)
        window.location.reload();
    })
    /*window.location.href = "http://127.0.0.1:8000/index?userid="+a+'&pwd='+b;*/
}
function register() {
    var user = document.getElementById('user').value;
    var pwd = document.getElementById('pwd').value;
    if (!user){
        alert('用户名为空，请输入')
    }
    else if(!pwd){
        alert('密码为空，请输入')
    }else {
        $.post('http://192.168.30.207:9001/register', {
            userName: $('#user').val(),
            password: $('#pwd').val()
        }, function (data) {
            //window.location.reload('localhost:8000/register');
            if (JSON.parse(data).status == 1) {
                var msg = JSON.parse(data).data
                window.location.href = 'http://192.168.30.207:9001/index?ss=' + msg;
            } else if (JSON.parse(data).status == 2) {
                alert('用户已注册')
            } else {
                alert('注册失败')
            }
        })
    }
}
function goRegister() {
    window.location.href = 'http://192.168.30.207:9001/goRegister'
}
function back() {
    window.location.href = 'http://192.168.30.207:9001/login'
}
