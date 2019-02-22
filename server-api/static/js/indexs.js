function one(){$.post('http://192.168.30.207:9001/session_test',function (data) {
    console.log('+++++++++++++++++++++++'+data)
      var userid = data.data.userid;
      document.getElementById('msg').innerHTML=userid
    })}

    function add(){
        var html = '<tr> <th>key:<input class="key" type="text" value=""></th><th>value:<input class="value" type="text"value=""></th>' +
            '<th><button class="deletes" id="clear" onclick="deleteRow(this)">--</button></th></tr>';
        if($('#mod-1').css('display') =='none') {
            $("#table2").append(html);
        }else{
            $("#table1").append(html);
        }
    }
    //请求用户名
(function(){
        userhistory(),username();
})()
function username() {
        $.post('http://192.168.30.207:9001/user' , function (data) {
        var json_data = JSON.parse(data);
        var username = json_data.data.username;
        document.getElementById('msg').innerHTML = username;
})
}

    function userhistory() {
        var _html = ''
        $.post('http://192.168.30.207:9001/UserHistory' , function (data) {
        json_data = JSON.parse(data);
        console.log(json_data.data);
        for(var i=json_data.data.length-1;i>=0;i--){
            console.log(i,json_data.data)
            _html += '<tr><a href="#" onclick="getBody('+i+')">'+json_data.data[i].host+'</a><br/>'+json_data.data[i].create_date+'</tr>'
        }
        $("#historys").html(_html)
    })}

    function getBody(intstt) {
        $('#table').html('<tr> <th>key:<input class="key" type="text" value=""></th><th>value:<input class="value" type="text"value=""></th>' +
            '<th><button class="deletes" id="clear" onclick="deleteRow(this)">--</button></th></tr>')
        console.log('------',json_data.data[intstt].host)
        document.getElementById('url').value = json_data.data[intstt].host;
        document.getElementById('request-bodys').value = json_data.data[intstt].request_body;
        var len = Object.keys(json_data.data[intstt].body);
        var s = 0;
        for(var i in json_data.data[intstt].body)
        {
            console.log('~~~~~~~~~~~~~',i);
            document.getElementsByClassName('key')[s].value += i;
            console.log('@@@@@@@@@@@',json_data.data[intstt].body[i]);
            document.getElementsByClassName('value')[s].value += json_data.data[intstt].body[i];
            s ++
            if (s == len.length){
                break
            }
            add();
        }
        r_body = json_data.data[intstt].response_body
        console.log(r_body)
        var response_bodys = formatJson(r_body)
        document.getElementById('response_text').innerHTML = '<pre style="word-break:break-all;display:inline-block;">'+response_bodys+'<pre/>';
    }

    function deleteRow(r) {
        var i = r.parentNode.parentNode.rowIndex;
        if($('#mod-1').css('display') == 'none') {
            document.getElementById('table2').deleteRow(i)
        }else{
            document.getElementById('table1').deleteRow(i)
        }
    }

    function reqJson() {
        var url = $('#url').val()
        if($('input[name="name1"]:checked').val() == 'post'){
            var postdata = [];
            var key = $('.key');
            var value = $('.value');
            var requests_body = $('#request-bodys').val();
            if (requests_body){
                 console.log(requests_body,typeof(requests_body));
                requests_body = Object(requests_body);
                 var req = {url:url,data:requests_body,type:'post'};
                 $.post('http://192.168.30.207:9001/reqJson', req , function (data){
                    userhistory();
                    var json_response = JSON.parse(data);
                    var str_rep = formatJson(json_response.data)
                    document.getElementById('response_text').innerHTML='<pre>'+str_rep+'<pre/>';
                });
            }else{
                if(typeof(key)=='object' && typeof(value)=='object' && !requests_body){
                    for(var i=0;i<key.length;i++){
                        var mn =key[i].value +':'+value[i].value;
                        postdata.push(mn);
                    }
                    console.log(JSON.stringify(postdata))
                    var req = {url:url,data:postdata,type:'post'};
                    $.post('http://192.168.30.207:9001/reqJson', req , function (data){
                        userhistory();
                        var json_response = JSON.parse(data);
                        var str_rep = formatJson(json_response.data)
                        document.getElementById('response_text').innerHTML='<pre>'+str_rep+'<pre/>';
                    });
                }else{
                    $.post('http://192.168.30.207:9001/reqJson', {url:url,key:key,value:value,type:'post'}, function (data){
                         userhistory();
                       var json_response = JSON.parse(data);
                        var str_rep = formatJson(json_response.data)
                        document.getElementById('response_text').innerHTML='<pre>'+str_rep+'<pre/>';
                    })
                }
            }
        }else{
            var postdata = [];
            var key = $('.key');
            var value = $('.value');
            if(typeof(key)=='object' && typeof(value)=='object'){
                for(var i=0;i<key.length;i++){
                    var mn =key[i].value +':'+value[i].value;
                    postdata.push(mn);
                }
                console.log(JSON.stringify(postdata))
                var req = {url:url,data:postdata,type:'get'};
                $.post('http://192.168.30.207:9001/reqJson', req , function (data){
                     userhistory();
                    var json_response = JSON.parse(data);
                    var str_rep = formatJson(json_response.data)
                    document.getElementById('response_text').innerHTML='<pre>'+str_rep+'<pre/>';
                });
            }else{
                $.post('http://192.168.30.207:9001/reqJson', {url:url,key:key,value:value,type:'get'}, function (data){
                     userhistory();
                   var json_response = JSON.parse(data);
                    var str_rep = formatJson(json_response.data)
                    document.getElementById('response_text').innerHTML='<pre>'+str_rep+'<pre/>';
                })
            }

        }
    }

//JSON格式化
var formatJson = function (json, options) {
         var reg = null,
                 formatted = '',
                 pad = 0,
                 PADDING = '    ';
         options = options || {};
        options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
        options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
        console.log(typeof json)
        if (typeof json !== 'string') {
            console.log(typeof json)
            json = JSON.stringify(json);
         } else {
            try{
                console.log(typeof json);
                json = JSON.parse(json);
                json = JSON.stringify(json);
            }catch (error){
             json = json;
            }
             // json = JSON.stringify(json);
         }
         reg = /([\{\}])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        reg = /([\[\]])/g;         json = json.replace(reg, '\r\n$1\r\n');
         reg = /(\,)/g;
         json = json.replace(reg, '$1\r\n');
         reg = /(\r\n\r\n)/g;
         json = json.replace(reg, '\r\n');
         reg = /\r\n\,/g;
         json = json.replace(reg, ',');if (!options.newlineAfterColonIfBeforeBraceOrBracket) {reg = /\:\r\n\{/g;
         json = json.replace(reg, ':{');
         reg = /\:\r\n\[/g;
         json = json.replace(reg, ':[');
         }if (options.spaceAfterColon) {reg = /\:/g;
         json = json.replace(reg, ':');
         }
         (json.split('\r\n')).forEach(function (node, index) {
                   var i = 0,         indent = 0,
                            padding = '';

                    if (node.match(/\{$/) || node.match(/\[$/)) {
                        indent = 1;
                     } else if (node.match(/\}/) || node.match(/\]/)) {
    if (pad !== 0) {pad -= 1;
                         }
                     } else {
    indent = 0;
                     }
                   for (i = 0; i < pad; i++) {
    padding += PADDING; }
                   formatted += padding + node + '\r\n';
                   pad += indent; }
       );
       return formatted;
    };
