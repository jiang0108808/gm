<?php 

define("ACCOUNT_LEN_MIN", 6);
define("ACCOUNT_LEN_MAX", 20);

define("PASSWORD_LEN_MIN", 6);
define("PASSWORD_LEN_MAX", 20);


$Def_Permit = array("admininfo"=>"管理员信息",
                    "serverinfo"=>"服务器信息",
                    "whitelist"=>"白名单信息");

// 获取权限功能对应的描述
function getPermitDec($permit)
{
    global $Def_Permit;

    if (isset($Def_Permit[$permit]))
    {
        return $Def_Permit[$permit];
    }

    return "";
}


// 获取当前用户权限
function getpermit()
{
    global $Def_Permit;
    $mysql = MySQL::getInstance();
    $sql = "select `permit` from account where `id`='10000008'";
    $_result = $mysql->query($sql);
    if (count($_result) < 1)
    {
        return array();
    }

    $_permit = json_decode($_result[0]["permit"]);
    $_permitArray = array();
    foreach ($Def_Permit as $key => $value)
    {
        if (in_array($key, $_permit))
        {
            $_permitArray[$key] = $value;
        }
    }

    // $_permitArray = array();
    // for ($i=0; $i < count($_permit); $i++) { 
    //     $_code = $_permit[$i];
    //     $_dec = getPermitDec($_code);

    //     $_permitArray[$_code] = $_dec;
    // }

    return $_permitArray;
}


// 获取所有权限
function getpermitall()
{
    global $Def_Permit;
    return $Def_Permit;
}


// 获取管理员信息
function getAdminInfo()
{
    $mysql = MySQL::getInstance();
    $sql = "select `id`, `account`, `password`, `permit` from account";
    $_result = $mysql->query($sql);
    return $_result;
}


// 添加管理员
function addAdmin($account, $password, $permit)
{
    // 账号长度错误
    $account_len = strlen($account);
    if ( $account_len < ACCOUNT_LEN_MIN or $account_len > ACCOUNT_LEN_MAX)
    {
        return array("msg"=>"账号长度错误:$account_len");
    }

    // 密码长度错误
    if ( strlen($password) < PASSWORD_LEN_MIN or strlen($password) > PASSWORD_LEN_MAX)
    {
        return array("msg"=>"密码长度错误");
    }

    // 该管理员已经存在
    $mysql = MySQL::getInstance();
    $sql = "select `id` from account where `account`='$account'";
    $_result = $mysql->query($sql);
    if (count($_result) > 0)
    {
        return array("msg"=>"该管理员已经存在");
    }

    // 添加管理员
    $mysql->insert("account", array("account"=>$account, "password"=>$password, "permit"=>$permit));
    return array();
}


// 编辑管理员信息
function editAdmin($account, $password, $permit)
{
    // 密码长度错误
    if ( strlen($password) < PASSWORD_LEN_MIN or strlen($password) > PASSWORD_LEN_MAX)
    {
        return array("msg"=>"密码长度错误");
    }

    // 该管理员不存在
    $mysql = MySQL::getInstance();
    $sql = "select `id` from account where `account`='$account'";
    $_result = $mysql->query($sql);
    if (count($_result) < 1)
    {
        return array("msg"=>"该管理员不存在");
    }
    $mysql->update("account", array("password"=>$password, "permit"=>$permit), array("account"=>$account));
    return array();
}


// 删除管理员
function delAdmin($account)
{
    $mysql = MySQL::getInstance();
    $sql = "select `id` from account where `account`=$account";
    $_result = $mysql->query($sql);
    if (count($_result) < 1)
    {
        return array("msg"=>"没有这个管理员");
    }

    $mysql->del('account', array('account'=>$account));
    return ;
}