declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "markdown-it";
declare module "markdown-it-sup";
declare module "markdown-it-sub";
declare module "markdown-it-mark";
declare module "markdown-it-task-lists";

type ESQLType = "CREATE" | "DELETE" | "INSERT" | "UPDATE" | "SELECT";

declare interface IMybaitsParameterItem {
  type: ESQLType;
  parameterList: string[];
  keyParameterList: string[];
}

declare interface IOperateItem extends IMybaitsParameterItem {
  key: string;
  title: string;
}

declare interface IParsedCreateTableResponseParameter {
  type: string;
  datatype: string;
  field: string;
  fieldInSql: string;
  comment: string;
  defaultValue: any;
}

declare interface IParsedCreateTableResponse {
  /**
   * @field 表名
   */
  tableName: string;
  /**
   * @field 类名
   */
  className: string;
  /**
   * @field 包名
   */
  packageName: string;
  /**
   * @field 主键
   */
  primaryKey: string;
  /**
   * @field 字段列表
   */
  parameters: IParsedCreateTableResponseParameter[];
}

declare interface IParsedJavaResponse {
  /**
   * @field 表名
   */
  tableName: string;
  /**
   * @field 类名
   */
  className: string;
  /**
   * @field 包名
   */
  packageName: string;
  /**
   * @field 字段列表
   */
  fieldList: string[];
}

declare interface ISeriesTab extends IParsedJavaResponse {
  /**
   * @field Tab 的 key
   */
  key: string;
  /**
   * @field Tab 的标题
   */
  title: string;
  /**
   * @field 输入代码
   */
  code: string;
  /**
   * @field 活动标签
   */
  active: string;
  /**
   * @field 索引计数器
   */
  counter: number;
  operateList: IOperateItem[];
}

declare interface IGenerateByJavaRequestItem extends IParsedJavaResponse {
  generatorMybatisParameterList: IMybaitsParameterItem[];
}

declare type TGenerateByJavaRequest = IGenerateByJavaRequestItem[];
