/**
 * 工具列表及其选项
 */

// ALTER
export default {
	decimal: {
		name: "进制转换",
		option: null,
	},
	ascii: {
		name: "ASCII 转换",
		option: null,
	},
	mysql: {
		name: "MySQL 生成",
		option: {
			create: "创建表",
			update: "更新表",
			insert: "插入记录",
			delete: "删除记录",
			search: "查询记录",
		},
	},
	mybatis: {
		name: "MyBatis 生成",
		option: {
			create: "创建基础命令",
			insert: "插入插入命令",
			update: "更新命令",
			delete: "删除命令",
			search: "查询记录",
		},
	},
};
