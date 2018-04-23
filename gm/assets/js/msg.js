
document.write("<link rel='stylesheet' type='text/css' href='assets/css/msg.css'>")

// 倒计时框
var Msgtime = function(showmsg, _time)
{
    if (_time == undefined || isNaN(_time))
    {
        _time = 5  // 默认倒计时5秒钟
    }

    var _div = document.createElement("div")
    _div.setAttribute('id', 'msgBox'); 
    document.body.appendChild(_div);

    var msgStr = ""
    msgStr += "<link rel='stylesheet' type='text/css' href='assets/css/msg.css'>"
    msgStr += "<div class='msgmask'></div>"
    msgStr += "<div class='msgblock'>"
    msgStr += "    <div class='msgcontent'>"
    msgStr += "        <h3>" + showmsg + "</h3>"
    msgStr += "    </div>"
    msgStr += "    <!-- 分割线 -->"
    msgStr += "    <hr class='msghr'>"
    msgStr += "    <div class='msgclose'>"
    msgStr += "    <span id='showtime'>" + _time + "</span>秒后关闭"
    msgStr += "   </div>"
    msgStr += "<button class='msgbtnclose' onclick='btnclose()'>X</button>"
    msgStr += "</div>"
    _div.innerHTML = msgStr

    // 显示倒计时
    setTimeout(timtoutFun, 1000)
}


// 确认框
var MsgConfirm = function(showmsg)
{
    var _div = document.createElement("div")
    _div.setAttribute('id', 'msgBox'); 
    document.body.appendChild(_div);

    var msgStr = ""
    msgStr += "<link rel='stylesheet' type='text/css' href='assets/css/msg.css'>"
    msgStr += "<div class='msgmask'></div>"
    msgStr += "<div class='msgblock'>"
    msgStr += "    <div class='msgcontent'>"
    msgStr += "        <h3>" + showmsg + "</h3>"
    msgStr += "    </div>"
    msgStr += "    <!-- 分割线 -->"
    msgStr += "    <hr class='msghr'>"
    msgStr += "    <div class='msgclose'>"
    msgStr += "        <button class='msgConfirmOk' onclick='btnclose()'>确认</button>"
    msgStr += "   </div>"
    msgStr += "</div>"
    _div.innerHTML = msgStr
}


// 确认, 取消框
var MsgConfirmEx = function(showmsg, funcok, funccancel)
{
    var _div = document.createElement("div")
    _div.setAttribute('id', 'msgBox'); 
    document.body.appendChild(_div);

    var msgStr = ""
    msgStr += "<link rel='stylesheet' type='text/css' href='assets/css/msg.css'>"
    msgStr += "<div class='msgmask'></div>"
    msgStr += "<div class='msgblock'>"
    msgStr += "    <div class='msgcontent'>"
    msgStr += "        <h3>" + showmsg + "</h3>"
    msgStr += "    </div>"
    msgStr += "    <!-- 分割线 -->"
    msgStr += "    <hr class='msghr'>"
    msgStr += "    <div class='msgclose'>"

    if (funccancel)
    {
        msgStr += "        <button class='msgConfirmExCancel' onclick='" + funccancel + ";btnclose(); '>取消</button>"
    }
    else
    {
        msgStr += "        <button class='msgConfirmExCancel' onclick='btnclose()'>取消</button>"
    }

    if (funcok)
    {
        msgStr += "        <button class='msgConfirmExOk' onclick='" + funcok + ";btnclose(); '>确认</button>"

    }
    else
    {
        msgStr += "        <button class='msgConfirmExOk' onclick='btnclose()'>确认</button>"
    }
    msgStr += "   </div>"
    msgStr += "</div>"
    _div.innerHTML = msgStr
}


var timtoutFun = function()
{
    var msgBox = document.getElementById('msgBox')
    if (msgBox == undefined)
    {
        return
    }

    var _showtime = document.getElementById('showtime')
    if (_showtime == undefined)
    {
        return
    }

    var _time = parseInt(_showtime.innerHTML) -1
    if (_time < 1)
    {
        // 倒计时结束, 关闭
        btnclose()
    }

    _showtime.innerHTML = _time
    setTimeout(timtoutFun, 1000)
}


var btnclose = function()
{
    document.body.removeChild(document.getElementById('msgBox'))
}