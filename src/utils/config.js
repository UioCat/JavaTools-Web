/**
 * 工具列表及其选项
 */

export const toolSet = {
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
			create: ["创建表", "tbName"],
			update: ["更新表", "tbName", "keyParameter"],
			insert: ["插入记录", "tbName"],
			delete: ["删除记录", "tbName", "keyParameter"],
			query: ["查询记录", "tbName", "keyParameter"],
		},
		api: {
			parse: "wordIdentify",
			create: "createSQL",
			update: "updateTable",
			insert: "insertMsg",
			delete: "deleteMsg",
			query: "selectTable",
		},
	},
	mybatis: {
		name: "MyBatis 生成",
		option: {
			create: ["创建命令", "namespace"],
			update: ["更新命令", "tbName", "keyParameter"],
			insert: ["插入命令", "tbName"],
			delete: ["删除命令", "tbName"],
			query: ["查询记录", "tbName", "keyParameter"],
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
