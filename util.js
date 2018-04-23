
document.write('<script type="text/javascript" src="../templates/assets/js/msg.js"></script>')

String.prototype.format = function(args)
{ 
    var result = this; 
    for (var i = 0; i < args.length; i++) { 
        var reg=new RegExp ("({["+i+"]})","g"); 
        result = result.replace(reg, args[i]); 
    }
    return result
}

// 显示弹窗
function showstorey()
{
    document.getElementById('light').style.display='block'
    document.getElementById('fade').style.display='block'
}


// 关闭弹窗
function closestorey()
{
    document.getElementById('light').style.display='none'
    document.getElementById('fade').style.display='none'

    // 还原内容
    document.getElementById("name").disabled = ""
    document.getElementById("name").value = ""
    document.getElementById("id").value = ""
    document.getElementById("password").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("level").value = ""
}


// 添加管理员
function adminadd()
{
    var _id = document.getElementById("id").value
    var _name = document.getElementById("name").value
    var _password = document.getElementById("password").value
    var _phone = document.getElementById("phone").value
    var _level = document.getElementById("level").value

    var msg = "账号:{0}<br/>密码:{1}<br/>联系电话:{2}<br/>权限等级:{3}<br/><br/>{4}?"; 
    if (_id > 0)
    {
        msg = msg.format([_name, _password, _phone, _level, "确定修改管理员信息"])
    }
    else
    {
        msg = msg.format([_name, _password, _phone, _level, "确定添加管理员"])
    }

    Msg.addContent(msg)
    Msg.setFuncOk(function(){sendRequest("adminadd", {id:_id, name:_name, password:_password, phone:_phone, level:_level})})
    Msg.show()
}


// 显示编辑管理员
function adminedit(_result)
{
    var _display = null
    if (_result == 1)
    {
        // 显示编辑信息, 显示完成按钮
        _display = null
    }
    else
    {
        _display = "none"
    }

    // 设置编辑,完成按钮的显示
    document.getElementById("adminedit").style.display=_display?null:"none"
    document.getElementById("admineditsave").style.display=_display

    var _table = document.getElementById("admininfo")
    var _tr = _table.getElementsByTagName("tr")
    for (var i = 0; i < _tr.length; i++)
    {
        var _td = _tr[i].getElementsByTagName("td")
        if (_td[0] != undefined)
        {
            _td[0].style.display = _display    
        }
        
    }

    // 不显示标题上第一列的内容
    var _td = _tr[0].getElementsByTagName("td")
    _td[0].innerHTML="";
}


// 编辑管理员信息
function admineditex(_valueJson)
{
    showstorey()

    document.getElementById("name").disabled = "disabled"
    document.getElementById("name").value = _valueJson["name"]
    document.getElementById("id").value = _valueJson["id"]
    document.getElementById("password").value = _valueJson["password"]
    document.getElementById("phone").value = _valueJson["phone"]
    document.getElementById("level").value = _valueJson["level"]
}

// 删除管理员
function adminedel(_id)
{
    var msg = "确认删除该管理员信息?"; 
    Msg.addContent(msg)
    Msg.setFuncOk(function(){sendRequest("admindel", {id:_id})})
    Msg.show()
}