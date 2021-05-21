<template>
	<Layout style="margin: 3px 50px">
		<Row class="uio-operate" type="flex" :gutter="16">
			<!-- 代码 -->
			<Col span="6">
				<Card>
					<textarea
						class="uio-textarea"
						placeholder="粘贴代码到此处"
						:value="inputCode"
						@change="handleCode($event)"
					/>
				</Card>
			</Col>
			<!-- 字段列表 -->
			<Col span="6" class="uio-fields">
				<Card>
					<section>
						<div style="cursor: pointer" v-for="(i, j, k) in fields" :key="k">
							<div
								class="uio-check-option"
								:class="i ? 'uio-checked' : 'uio-uncheck'"
								@click="handleCheck(j)"
							>
								{{ j }}
							</div>
						</div>
					</section>
					<Button shape="circle" @click="handleAll()">
						<Icon type="md-list" />全 选
					</Button>
				</Card>
			</Col>

			<Col span="12">
				<Card>
					<!-- 操作列表 -->
					<section class="uio-radio-group">
						<label class="uio-radio" v-for="(v, k, i) of options" :key="i">
							<input type="radio" v-model="operate" :value="k" />
							<span>{{ v[0] }}</span>
						</label>
					</section>
					<!-- 参数列表 -->
					<section class="uio-input-group">
						<div>
							<label>填写信息</label>
							<Input
								v-if="isMyBatis && operate === 'create'"
								v-model="tableName"
								placeholder="命名空间"
							/>
							<Input v-else v-model="tableName" placeholder="表  名   " />
						</div>

						<div v-if="needKey">
							<label>关键参数</label>
							<Select v-model="keyField" multiple>
								<Option v-for="(v, k, i) in fields" :value="k" :key="i">{{
									k
								}}</Option>
							</Select>
						</div>
					</section>
					<Button type="primary" shape="circle" @click="handleSubmit()">
						<Icon type="md-checkbox-outline" />提 交
					</Button>
					<!-- 输出 -->
					<textarea
						class="uio-textarea"
						placeholder="命令输出"
						style="height: 20vh"
						:value="outputCode"
						@focus="handleCopy($event)"
					/>
				</Card>
			</Col>
		</Row>
	</Layout>
</template>

<script>
import { copy, generate } from "../utils/tools";
import { toolSet } from "../utils/config";

export default {
	name: "generate",
	props: ["type"],
	data: function() {
		return {
			inputCode: "",
			outputCode: "",
			options: {},
			operate: "query",
			selected: 0,
			fields: {
				"字段 1": false,
				"字段 2": true,
				"字段 3": false,
				"字段 4": true,
				"字段 5": false,
				"字段 6": false,
			},
			keyField: [],
			tableName: "",
			isMyBatis: false,
		};
	},
	created: function() {
		this.isMyBatis = this.type === "mybatis";
		this.options = toolSet[this.type].option;
	},
	computed: {
		needFields: function() {
			return this.options[this.operate][1];
		},
		needKey: function() {
			return this.options[this.operate][3];
		},
	},
	methods: {
		handleCode: function(e) {
			this.inputCode = e.target.value;
			generate(
				toolSet[this.type].api.parse,
				{ data: e.target.value },
				this,
				"解析"
			).then((info) => {
				if (info.length) {
					const res = {};
					info.map((i) => (res[i] = false));
					this.fields = res;
				}
			});
		},
		handleAll: function() {
			if (this.selected === Object.keys(this.fields).length) {
				for (let key in this.fields) {
					this.fields[key] = false;
				}
			} else {
				for (let key in this.fields) {
					this.fields[key] = true;
				}
			}
			this.selected = Object.values(this.fields).filter((i) => i).length;
		},
		handleCheck: function(name) {
			this.fields[name] = !this.fields[name];
			this.selected = Object.values(this.fields).filter((i) => i).length;
		},
		handleSubmit: function() {
			const params = {};
			// 字段
			if (this.needFields) {
				params["parameter"] = Object.keys(this.fields).filter(
					(i) => this.fields[i]
				);
			}
			// 表名或命名空间
			if (this.isMyBatis && this.operate === "create") {
				params["namespace"] = this.tableName;
			} else {
				params["tbName"] = this.tableName;
			}
			// 关键参数
			if (this.needKey) {
				params["keyParameter"] = this.keyField;
			}
			generate(toolSet[this.type].api[this.operate], params, this).then((info) => {
				if (info) this.$data.outputCode = info;
			});
		},
		handleCopy: function(e) {
			copy(e, this);
		},
	},
};
</script>

<style lang="less">
@out-color: #2d8cf0;
@in-color: #e3f5ff;
@code-style: Courier, "Courier New", monospace;

div.ivu-layout-content {
	min-height: 600px;
}

.uio-operate {
	div.ivu-card-body {
		min-height: 400px;
		height: calc(100vh - 64px - 52px - 16 * 2px - 25 * 2px - 42px);
		//         视口高度 - 导航栏 - 备案信息 - 内边距 - 标题
	}
}

.uio-fields div.ivu-card-body {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& > section {
		overflow: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: calc(100% - 32px - 16px * 2);
	}
}

div.ivu-col-span-12 > div.ivu-card-bordered > div.ivu-card-body {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

button.ivu-btn-circle {
	cursor: pointer;
	margin: 5px 0;
}

.uio-check-option {
	width: 100%;
	border-radius: 2px;
	font-weight: bold;
	font-family: @code-style;
	border: solid 1px @out-color;
}

.uio-checked {
	color: @out-color;
	background-color: @in-color;
}

.uio-uncheck {
	color: @out-color;
	background-color: white;
}

section.uio-radio-group {
	display: flex;
	justify-content: space-around;

	.uio-radio {
		cursor: pointer;
		height: 6em;
		font-weight: 500;
		line-height: 1.5em;

		& > input {
			display: none;
		}

		& > span {
			border: solid 1px @out-color;
			border-radius: 2px;
			color: @out-color;
			writing-mode: tb-rl;
			text-align: center;
			height: 100%;
		}

		& > input:checked + span {
			background-color: @in-color;
		}
	}
}

section.uio-input-group {
	label {
		margin: 8px 0;
	}

	label + div {
		margin-top: 5px;
		margin-bottom: 10px;
	}

	input {
		text-align: center;
	}

	input.ivu-input,
	div.ivu-select span,
	div.ivu-select-dropdown > ul {
		font-family: @code-style;
	}
}
</style>
