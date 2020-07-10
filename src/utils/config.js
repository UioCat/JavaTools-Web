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
			// 操作: [操作名称, 需要字段, 需要表名, 关键参数]
			create: ["创建表", true, true, false],
			update: ["更新表", true, true, true],
			insert: ["插入记录", true, true, false],
			delete: ["删除记录", false, true, true],
			query: ["查询记录", true, true, true],
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
			create: ["创建命令", false, true, false],
			update: ["更新命令", true, true, true],
			insert: ["插入命令", true, true, false],
			delete: ["删除命令", false, true, true],
			query: ["查询记录", true, true, true],
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
