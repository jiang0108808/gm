document.write("<script type='text/javascript' src='assets/js/msg.js'></script>")

var _ip = "127.0.0.1";
var _port = "89"

var xmlhttp;
function createxmlhttprequest()
{
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    { 
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}


function sendRequest(action, data, func, params)
{
    if(xmlhttp==null){
        xmlhttp = createxmlhttprequest();
    }

    var _url = "http://" + _ip + ":" + _port + "/index.php?action=" + action
    for(var key in data)
    {
        _url +="&" + key + "=" + data[key]
    }

    xmlhttp.onreadystatechange= function()
    {
        if (xmlhttp.readyState==4)
        { 
            if (xmlhttp.status==200)
            {
                try {
                    var _data = JSON.parse(xmlhttp.responseText)
                } catch(err) {
                    Msgtime(xmlhttp.responseText)
                    return
                }
                if (_data["msg"])
                {
                    Msgtime(_data["msg"])
                }
                else if (func)
                {
                    func(_data, params)
                }
            }
            else
            {
                alert("Problem retrieving data:" + xmlhttp.statusText);
            }
        }
    };

    xmlhttp.open("GET", _url, true);
    xmlhttp.send(data);
}