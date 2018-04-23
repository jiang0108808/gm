
document.write('<script type="text/javascript" src="assets/js/adminadd.js"></script>')

var showWhiteinfo = function(admininfo)
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
}