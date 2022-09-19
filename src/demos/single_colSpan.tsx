import React, { useState } from 'react';
import SearchBar from '../index';
import { Modal } from 'antd';
import { FieldKeyValue } from '../types';

export default () => {
  const onChange = (changeValue: FieldKeyValue, allValue: FieldKeyValue, form: any) => {
    console.log('触发change事件，当前触发项：', changeValue, ',全部搜索项：', allValue);
  };

  const onSearch = (values: FieldKeyValue) => {
    Modal.info({ content: `搜索参数： ${JSON.stringify(values)}` });
  };

  const props = {
    fields: [
      {
        colSpan: 2,
        name: '文本框', // label名称
        code: 'test1',
      },
      {
        name: '数字框', // label名称
        code: 'number1',
        type: 'number',
      },
      {
        name: '省选择器', // label名称
        code: 'provincePicker',
        defaultValue: ['上海市'], // required为true必传
        type: 'provincePicker',
      },
      {
        name: '市选择器', // label名称
        code: 'cityPicker',
        defaultValue: ['上海市', '市辖区'], // required为true必传
        type: 'cityPicker',
      },
      {
        name: '区域选择器', // label名称
        code: 'areaPicker',
        defaultValue: ['上海市', '市辖区', '宝山区'], // required为true必传
        type: 'areaPicker',
      },
      {
        colSpan: 2,
        name: '街道选择器', // label名称
        code: 'streetPicker',
        defaultValue: ['上海市', '市辖区', '宝山区', '大场镇'], // required为true必传
        type: 'streetPicker',
      },
      // {
      //   name: '下拉框单选', // label名称
      //   code: 'select1',
      //   defaultValue: '', // required为true必传
      //   type: 'select',
      //   selectOptions: [
      //     {label: 'test1', value: 1},
      //     {label: 'test2', value: 2}
      //   ],
      // },
      // {
      //   name: '下拉框多选', // label名称
      //   code: 'select2',
      //   defaultValue: [], // required为true必传
      //   type: 'multipleSelect',
      //   selectOptions: [
      //     {label: 'test1', value: 1},
      //     {label: 'test2', value: 2},
      //     {label: 'test3', value: 3},
      //     {label: 'test4', value: 4},
      //     {label: 'test5', value: 5},
      //     {label: 'test6', value: 6}
      //   ],
      // },
      {
        name: '年选择器', // label名称
        code: 'yearPicker',
        type: 'yearPicker',
      },

      {
        name: '季度选择器', // label名称
        code: 'quarterPicker',
        type: 'quarterPicker',
      },

      {
        name: '月选择器', // label名称
        code: 'monthPicker',
        type: 'monthPicker',
      },

      {
        name: '时间选择器', // label名称
        code: 'timePicker',
        type: 'timePicker',
      },

      {
        colSpan: 2,
        name: '时间范围选择器', // label名称
        code: 'timeRangePicker',
        type: 'timeRangePicker',
      },

      {
        name: '月范围选择器', // label名称
        code: 'monthRangePicker',
        type: 'monthRangePicker',
      },
      {
        colSpan: 2,
        name: '日期范围选择器', // label名称
        code: 'dateRangePicker',
        type: 'dateRangePicker',
      },
      {
        colSpan: 2,
        name: '数字范围选择器', // label名称
        code: 'numberRange',
        type: 'numberRange',
      },
    ],
  };
  // @ts-ignore
  return <SearchBar {...props} onChange={onChange} onSearch={onSearch} />;
};
