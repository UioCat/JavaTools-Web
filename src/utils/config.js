/**
 * 工具列表及其选项
 */

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
			query: "查询记录",
		},
		api: {
			parse: "wordIdentify",
			create: "createSQL",
			update: "updateTable",
			insert: "insertMsg",
			delete: "",
			query: "selectTable",
		},
	},
	mybatis: {
		name: "MyBatis 生成",
		option: {
			create: "创建命令",
			update: "更新命令",
			insert: "插入命令",
			delete: "删除命令",
			query: "查询记录",
		},
		api: {
			parse: "wordIdentify",
			create: "mybatisBasics",
			update: "mybatisUpdate",
			insert: "mybatisInsert",
			delete: "mybatisDelete",
			query: "mybatisSelect",
		},
	},
};
