<?php

class MySQL
{
    //保存类实例的静态成员变量
    private static $_instance;

    //private标记的构造方法
    private function __construct()
    {
        $this->server = "127.0.0.1";
        $this->user = "root";
        $this->pwd = "123456";
        $this->database ="beautiful";
        $this->init();
    }


    //创建__clone方法防止对象被复制克隆
    public function __clone()
    {
        trigger_error('Clone is not allow!',E_USER_ERROR);
    }


    //单例方法,用于访问实例的公共的静态方法
    public static function getInstance()
    {
        if(!(self::$_instance instanceof self))
        {
            self::$_instance = new self;
        }
        return self::$_instance;
    }

    private function init()
    {

        $this->conn = mysqli_connect($this->server, $this->user, $this->pwd);
        if (!$this->conn) 
        {
            die("MySQL 连接失败: " . mysqli_error());
            return;
        }
        mysqli_query($this->conn, "set names 'utf8'");
        mysqli_select_db($this->conn, $this->database);
    }


    public function query($queryStr)
    {
        $resultArry = array();
        $_result = mysqli_query($this->conn, $queryStr);
        while($row=mysqli_fetch_assoc($_result))
        {
            array_push($resultArry, $row);
        }
        return $resultArry;
    }


    public function update($tabname, $params, $where)
    {
        $_paramsArray = array();
        foreach ($params as $key => $value)
        {
            array_push($_paramsArray, sprintf("`%s`='%s'", $key, $value));
        }

        $_whereArray = array();
        foreach ($where as $key => $value)
        {
            array_push($_whereArray, sprintf("`%s`='%s'", $key, $value));
        }

        $queryStr = sprintf ("UPDATE `%s` SET %s WHERE %s;", $tabname, implode(" , ", $_paramsArray), implode(" and ", $_whereArray));

        $_result = mysqli_query($this->conn, $queryStr);
        return $_result;
    }


    public function insert($tabname, $params)
    {
        $_insertName = array();
        $_insertValue = array();
        foreach ($params as $key => $value)
        {
            array_push($_insertName, sprintf("`%s`", $key));
            array_push($_insertValue, sprintf("'%s'", $value));
        }

        $queryStr = sprintf ("INSERT INTO `%s` (%s) VALUE (%s);", $tabname, implode(" , ", $_insertName), implode(" , ", $_insertValue));
        $_result = mysqli_query($this->conn, $queryStr);
        return $_result;
    }


    public function del($tabname, $where)
    {
        $_whereArray = array();
        foreach ($where as $key => $value)
        {
            array_push($_whereArray, sprintf("`%s`='%s'", $key, $value));
        }

        $queryStr = sprintf ("DELETE FROM `%s` WHERE %s;", $tabname, implode(" and ", $_whereArray));
        $_result = mysqli_query($this->conn, $queryStr);
        return $_result;
    }
}

// $mysql = MySQL::getInstance();
// $sql = "select * from protocol";
// $result = $mysql->query($sql);

// foreach ($result as $key => $value) 
// {
//     // print_r($value);
//     $msg11 = '<textarea style="resize:none" disabled="disabled" id="returnParam" cols="100" rows="10" oninput=changeReturnRows()>' . 

//     $value["return"] .

// '</textarea>';
//     echo $msg11;
// }




