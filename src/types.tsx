import React, { ReactNode } from 'react';

type FieldItemSelectOption = {
  label: string;
  value: string | number;
};

type TabsProps = {
  code?: string;
  defaultActiveKey?: string;
  tabItems?: Array<TabItem>;
  [prop: string]: any;
};

type TabItem = {
  tab: ReactNode;
  key: string;
  [prop: string]: any;
};

type FieldItem = {
  colSpan?: number; // 占位长度， 默认占位1格
  name: string; // label名称
  code: string;
  type?:
    | undefined
    | 'text'
    | 'select'
    | 'multipleSelect'
    | 'provincePicker'
    | 'cityPicker'
    | 'areaPicker'
    | 'streetPicker'
    | 'dateRangePicker'
    | 'timeRangePicker'
    | 'timePicker'
    | 'datePicker'
    | 'number'
    | 'numberRange'
    | 'email'
    | 'monthPicker'
    | 'monthRangePicker'
    | 'yearPicker'
    | 'yearRangePicker'
    | 'weekPicker'
    | 'weekRangePicker'
    | 'quarterPicker'
    | 'quarterRangePicker';
  required?: boolean; // 默认false
  selectOptions?: Array<FieldItemSelectOption>; // 默认空数组
  placeholder?: string; // text, number, email等默认请输入， 其他默认请选择
  widget?: React.Component; //ReactComponent 或 () => {}
  isPermanent?: boolean;
  searchImmediate?: boolean;
  fieldProps?: SearchBarValue;
};

type SearchBarValue = {
  [propName: string]: any;
};

type FieldKeyValue = {
  [name: string]: any;
};

type SearchProps = {
  fields: Array<FieldItem>;
  moreText?: string;
  searchText?: string;
  resetText?: string;
  searchType?: 'primary' | 'default' | 'link' | 'text' | 'ghost' | 'dashed' | undefined;
  resetType?: 'primary' | 'default' | 'link' | 'text' | 'ghost' | 'dashed' | undefined;
  value?: SearchBarValue;
  onChange?: Function;
  onReset?: Function;
  onSearch?: Function;
  showSearchConditionBar?: boolean; // 是否显示已选搜索条件
  extra?: React.Component;
  formats?: { [name: string]: any };
  tabs?: TabsProps;
  tabExtra?: ReactNode;
};

export { FieldItem, SearchBarValue, SearchProps, FieldKeyValue, TabItem };
