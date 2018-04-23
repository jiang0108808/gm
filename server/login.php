<?php 

function login($account, $password)
{
    if ($account == "" or $password == "")
    {
        return array("msg"=>"账号或密码为空");
    }

    $mysql = MySQL::getInstance();
    $sql = "select `id`, `account`, `password` from account where `account`='$account'";
    $_result = $mysql->query($sql);

    if (count($_result) < 1)
    {
        return array("msg"=>"账号错误");
    }

    if ($_result[0]["password"] != $password)
    {
        return array("msg"=>"密码错误");
    }
    return array('account'=>$account);
}


function checklogin()
{
    return true;
}