import React from 'react';

type FieldItemSelectOption = {
  [value: string]: any;
};

type Formats = {
  [name: string]: any;
};

type SearchConditionItem = {
  name?: string; // label名称
  code?: string;
  selectOptions?: Array<FieldItemSelectOption>; // 默认空数组
  value?: any;
  required?: boolean;
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
  onDelete?: Function;
  [otherProp: string]: any;
};

type SearchConditionResultProps = {
  extra?: React.Component; //ReactComponent,
  onDelete?: Function;
  onClean?: Function;
  selectedFieldValues: Array<SearchConditionItem>;
  formats?: Formats;
};

export { SearchConditionResultProps, SearchConditionItem };
