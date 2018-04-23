<?php

header('Access-Control-Allow-Origin:*');

include "login.php";
include "admininfo.php";
include "mysqlConnect.php";

function getParam($key, $def)
{
    if (isset($_GET[$key]))
    {
        return $_GET[$key];
    }
    return $def;
}

function main()
{
    $_action = "";
    if (array_key_exists("action", $_GET))
    {
        $_action = $_GET["action"];
    }

    switch ($_action)
    {
        case 'adminlogin':  // 用户登录
            $_account = getParam("account", "");
            $_password = getParam("password", "");
            return login($_account, $_password);

        case 'adminpermit':  // 获取权限
            return getpermit();

        case 'permitall':  // 获取所有权限
            return getpermitall();

        case 'admininfo':  // 获取管理员信息
            return getAdminInfo();

        case 'adminadd':  // 添加管理员
            return addAdmin(getParam("account", ""), getParam("password", ""), getParam("permit", ""));

        case 'adminedit':  // 修改管理员信息
            return editAdmin(getParam("account", ""), getParam("password", ""), getParam("permit", ""));
            
        case 'admindel':  // 删除管理员
            return delAdmin(getParam("account", ""));

        case 'serverinfo':  // 服务器信息
            return array("服务器信息");

        case 'whitelist':  // 白名单信息
            return array("白名单信息");
            
        default:
            return array("msg"=>"没有这个功能");
    }
    return array();
}

$_result = main();
if (is_array($_result) == false)
{
    echo json_encode(array("data"=>$_result));
}
else
{
    echo json_encode($_result);
}


