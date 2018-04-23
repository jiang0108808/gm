

// 添加管理员界面
var adminadd = function(_objJson)
{
    var _div = document.createElement("div")
    _div.setAttribute('id', 'adminadd'); 
    document.body.appendChild(_div);

    var msgStr = ""
    msgStr += "<link rel='stylesheet' type='text/css' href='assets/css/adminadd.css'>"
    msgStr += "<div class='mask'></div>"
    msgStr += "<div class='block'>"
    msgStr += "    <div class='content'>"
    msgStr += "        账号:&nbsp&nbsp"

    var _name = ""
    var _password = ""
    if (_objJson !=undefined && _objJson["account"] != undefined) {_name = _objJson["account"]}
    if (_objJson !=undefined && _objJson["password"] != undefined) {_password = _objJson["password"]}

    if (_name != "")
    {
        msgStr += " <input disabled='disabled' type='text' id='name' value='" + _name + "'><br/>"
    }
    else
    {
        msgStr += " <input type='text' id='name' value='" + _name + "'><br/>"
    }
    
    msgStr += " 密码:&nbsp&nbsp"
    msgStr += " <input type='text' id='password' value='" + _password + "'><br/>"
    msgStr += " </div>"

    // 权限选择
    msgStr += "    <div class='permit' id='permit'></div>"

    msgStr += "    <div class='close'>"

    if (_objJson !=undefined)
    {
        msgStr += "        <button onclick='btnadminedit()'>修改</button>"
        msgStr += "        <button class='btndel' onclick='btnadmindel()'>删除</button>"
    }
    else
    {
        msgStr += "        <button onclick='btnadminadd()'>添加</button>"
    }
    msgStr += "    </div>"

    // 关闭按钮
    msgStr += "    <button class='btnclose' onclick='btncloseadd()'>X</button>"
    msgStr += "</div>"
    _div.innerHTML = msgStr

    // 显示所有权限
    var _permit = []
    if (_objJson)
    {
        _permit = _objJson["permit"]
    }

    getpermitall('showPermit('+ _permit +')')
}


// 修改管理员信息
function btnadminedit()
{
    var obj = document.getElementsByName("permit");
    var check_val = [];
    for(k in obj)
    {
        if(obj[k].checked)
        {
            check_val.push(obj[k].value);
        }
    }
    
    var _name = document.getElementById('name').value
    var _password = document.getElementById('password').value

    if (_name == "" || _password =="")
    {
        MsgConfirm("账号或密码不能为空")
        return
    }

    if (check_val == "")
    {
        MsgConfirm("未选择任何权限")
        return
    }

    var _msgStr = "确认修改 <font color='#FF0000'>" + document.getElementById('name').value + " </font>管理员信息?"
    var _data = {"account":_name ,"password":_password, "permit":JSON.stringify(check_val)}

    var _funcStr = 'sendRequest("adminedit", ' + JSON.stringify(_data) + ', adminaddresult);'

    MsgConfirmEx(_msgStr, _funcStr)
}


// 添加管理员
function btnadminadd()
{
    var obj = document.getElementsByName("permit");
    var check_val = [];
    for(k in obj)
    {
        if(obj[k].checked)
        {
            check_val.push(obj[k].value);
        }
    }
    
    var _name = document.getElementById('name').value
    var _password = document.getElementById('password').value

    if (_name == "" || _password =="")
    {
        MsgConfirm("账号或密码不能为空")
        return
    }

    if (check_val == "")
    {
        MsgConfirm("未选择任何权限")
        return
    }

    var _msgStr = "确认添加 <font color='#FF0000'>" + document.getElementById('name').value + " </font>为管理员?"
    var _data = {"account":_name ,"password":_password, "permit":JSON.stringify(check_val)}

    var _funcStr = 'sendRequest("adminadd", ' + JSON.stringify(_data) + ', adminaddresult);'

    MsgConfirmEx(_msgStr, _funcStr)
}


// 删除管理员
function btnadmindel()
{
    var _name = document.getElementById('name').value

    var _funcStr = 'sendRequest("admindel", ' + JSON.stringify({"account":_name}) + ', adminaddresult);'

    var _msgStr = "确认删除 <font color='#FF0000'>" + _name + " </font>管理员?"
    MsgConfirmEx(_msgStr, _funcStr)
}


function adminaddresult()
{
    btncloseadd();
    window.location.href=window.location.href
}

// 关闭按钮
function btncloseadd()
{
    document.body.removeChild(document.getElementById('adminadd'))
}


// 获取所有权限
function getpermitall(_params)
{
    sendRequest("permitall", {}, getPermitResult, _params)
}


// 所有权限显示
function getPermitResult(_data, _params)
{

    var permitHtml = "<fieldset><legend>权限</legend>"
    for(var _key in _data)
    {
        var _value = _data[_key]
        permitHtml += "<div class='select'><label><input name='permit' type='checkbox' value='" + _key + "' />" + _value     + "</label></div> "
    }

    document.getElementById("permit").innerHTML = permitHtml

    eval(_params)
}


// 显示当前账号的权限
function showPermit(_permits)
{

    if (_permits == "" || _permits == undefined)
    {
        return
    }


    var objs = document.getElementsByName("permit");
    for (_key in _permits)
    {
        var _value = _permits[_key]
        for(k in objs)
        {
            var _obj = objs[k]
            if (_obj.value == _value)
            {
                _obj.checked = true
            }
        }
    }
}