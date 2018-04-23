
document.write('<script type="text/javascript" src="assets/js/adminadd.js"></script>')

function hereDoc(f) {　
    return f.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '');
}

var showAdmininfo = function(admininfo)
{

    var _string = ''
    // _string += '管理员信息'
    _string += '<a style="float:right;" href="javascript:void(0)" onclick="adminadd()">添加管理员</a>'
    _string += '<div style="position: absolute; width:98%; top:50px">'
    _string += '<table id="admininfo" border="0" cellpadding="2" cellspacing="0" width="100%" table-layout: fixed; >'

    var _adminCount = admininfo.length
    for (var i = 0; i < _adminCount/4; i++)
    {
        _string += '    <tr>'

        for (var j = 0; j < 4; j++)
        {
            var _index = 4*i+j
            if (_index < _adminCount)
            {
                var _obj = admininfo[_index]
                _string += '<td width=' + 100/4 + '%>'
                _string += "<a onclick='adminEditor(" + JSON.stringify(_obj) + ")' href='javascript:void(0)'>" + _obj["account"] + '</a>'
                _string += '</td>'
            }
            else
            {
                _string += '<td width=' + 100/4 + '%></td>'
            }
            
        }
        _string += '</tr>'

    }
    return _string

//     var _string = hereDoc(function () {/*
// <a style="float:right;" href="javascript:void(0)" onclick="adminadd()">添加管理员</a>
// <a id="adminedit" href="javascript:void(0)" onclick="adminedit(1)">编辑管理员</a>
// <a id="admineditsave" style="display:none" href="javascript:void(0)" onclick="adminedit(2)">完成</a>

// <div style="position: absolute;top:50px">
// <table id="admininfo" border='1' cellpadding='2' cellspacing='0' width=100% table-layout: fixed; >
//     <tr>
//         <td style='display: none;'>ID</td>
//         <td>名称</td>
//         <td>等级</td>
//         <td>电话</td>
//     </tr>
// */});

//     for (var i = 0; i < admininfo.length; i++) {
//         var _obj = admininfo[i]

//         _string += "<tr>"
//         _string += "      <td style='display: none;width:150px'>"
//         _string += "           <button onclick='adminEditor(" + JSON.stringify(_obj) + ")'>编辑</button>"
//         _string += "           <button onclick='adminDel(" + _obj['id'] + ")'>删除</button>"
//         _string += "       </td>"
//         _string += "       <td style='width:375px'>" + _obj['name'] + "</td>"
//         _string += "       <td style='width:375px'>" + _obj['level'] + "</td>"
//         _string += "       <td style='width:375px'>" + _obj['phone'] + "</td>"
//         _string += "   </tr>"
//     }
//     _string += "</table></div>"
//     return _string
}

// 编辑管理员信息
function adminEditor(_valueJson)
{
    adminadd(_valueJson)
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


// 删除管理员
function adminDel(_id)
{
    var msg = "确认删除该管理员信息?"; 
    MsgConfirmEx(msg, 'sendRequest("admindel", {id:' + _id + '}, function(){window.location.href=window.location.href})')
}
