import React, { useState } from 'react';
import SearchBar from '../index';
import { Button, Modal } from 'antd';
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
        name: '文本框', // label名称
        code: 'test1',
      },
      {
        name: '时间选择器', // label名称
        code: 'timePicker',
        type: 'timePicker',
        fieldProps: {
          format: 'hh:mm:ss',
        },
      },
      {
        name: '日期范围选择器', // label名称
        code: 'dateRangePicker',
        type: 'dateRangePicker',
        fieldProps: {
          format: 'YYYY/MM/DD',
        },
      },
      {
        name: '日期选择器', // label名称
        code: 'datePicker',
        type: 'datePicker',
      },
      {
        name: '日期选择器2', // label名称
        code: 'datePicker2',
        type: 'datePicker',
        fieldProps: {
          format: 'YYYY/MM/DD',
        },
      },
    ],
  };
  // @ts-ignore
  return <SearchBar {...props} onChange={onChange} onSearch={onSearch} />;
};
