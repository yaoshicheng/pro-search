import React, { useState } from 'react';
import SearchBar from '../index';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Radio, Modal, Checkbox } from 'antd';
import { FieldKeyValue } from '../types';

export default () => {
  const onChange = (changeValue: FieldKeyValue, allValue: FieldKeyValue, form: any) => {
    console.log('触发change事件，当前触发项：', changeValue, ',全部搜索项：', allValue);
  };

  const onSearch = (values: FieldKeyValue) => {
    Modal.info({ content: `搜索参数： ${JSON.stringify(values)}` });
  };

  const plainOptions = ['Apple', 'Pear', 'Orange'];

  const props = {
    fields: [
      {
        name: 'radio组件', // label名称
        code: 'radio1',
        defaultValue: 'apple',
        widget: (
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        ),
      },
      {
        name: 'checkbox组件', // label名称
        code: 'checkbox1',
        defaultValue: ['Apple', 'Orange'],
        widget: <Checkbox.Group options={plainOptions} />,
      },
    ],
    value: { radio1: 'apple', checkbox1: ['Apple', 'Orange'] },
  };
  // @ts-ignore
  return <SearchBar {...props} onChange={onChange} onSearch={onSearch} />;
};
