declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare enum ESQLType {
  DELETE = "DELETE",
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  SELECT = "SELECT",
}

declare interface IMybaitsParameterItem {
  type: ESQLType;
  parameterList: string[];
  keyParameterList: string[];
}

declare interface IOperateItem extends IMybaitsParameterItem {
  key: string;
  title: string;
}

declare interface IParseJavaResponse {
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

declare interface ISeriesTab extends IParseJavaResponse {
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

declare interface IGenerateByJavaRequestItem extends IParseJavaResponse {
  generatorMybatisParameterList: IMybaitsParameterItem[];
}

declare type TGenerateByJavaRequest = IGenerateByJavaRequestItem[];
