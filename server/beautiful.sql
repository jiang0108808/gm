CREATE DATABASE IF NOT EXISTS `beautiful` CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci';
USE `beautiful`;

/*Table structure for table `account` */
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '账号',
  `password` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户密码',
  `permit` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '权限',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


/*Table structure for table `permit` */
DROP TABLE IF EXISTS `permit`;
CREATE TABLE `permit` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '权限对应代码',
  `dec` varchar(32) COLLATE utf8_unicode_ci NOT NULL COMMENT '权限描述',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

