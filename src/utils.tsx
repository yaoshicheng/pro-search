import React from 'react';
import { Input, InputNumber, Select, TimePicker, DatePicker } from 'antd';
import InputNumberRange from './components/inputNumberRange';
import ChinaPcasSelector, { PcasSelectorType } from './components/chinaPcasSelector';
import moment from 'moment';
import { FieldItem } from './types';

const { Option } = Select;

const renderItem = (fieldItem: FieldItem) => {
  let item;

  const { fieldProps, type, selectOptions, placeholder = '请选择' } = fieldItem;

  switch (type) {
    case 'text':
      item = <Input {...fieldProps} placeholder={placeholder} style={{ width: '100%' }} />;
      break;
    case 'number':
      item = <InputNumber {...fieldProps} placeholder="请输入" style={{ width: '100%' }} />;
      break;
    case 'provincePicker':
      item = (
        <ChinaPcasSelector
          style={{ width: '100%' }}
          type={PcasSelectorType.PROVINCE}
          {...fieldProps}
        />
      );
      break;
    case 'cityPicker':
      item = (
        <ChinaPcasSelector style={{ width: '100%' }} type={PcasSelectorType.CITY} {...fieldProps} />
      );
      break;
    case 'areaPicker':
      item = <ChinaPcasSelector style={{ width: '100%' }} {...fieldProps} />;
      break;
    case 'streetPicker':
      item = (
        <ChinaPcasSelector
          style={{ width: '100%' }}
          type={PcasSelectorType.STREET}
          {...fieldProps}
        />
      );
      break;
    case 'numberRange':
      item = <InputNumberRange {...fieldProps} placeholder="请输入" />;
      break;
    case 'select':
      item = (
        <Select {...fieldProps} placeholder={placeholder} style={{ width: '100%' }}>
          {(selectOptions || []).map((option) => {
            const { label, value } = option;
            return (
              <Option value={value} key={value}>
                {label}
              </Option>
            );
          })}
        </Select>
      );
      break;
    case 'multipleSelect':
      item = (
        <Select
          mode={'multiple'}
          maxTagCount={2}
          {...fieldProps}
          placeholder={placeholder}
          style={{ width: '100%' }}
        >
          {(selectOptions || []).map((option) => {
            const { label, value } = option;
            return (
              <Option value={value} key={value}>
                {label}
              </Option>
            );
          })}
        </Select>
      );
      break;
    case 'timePicker':
      item = <TimePicker placeholder={placeholder} style={{ width: '100%' }} />;
      break;
    case 'timeRangePicker':
      item = (
        <TimePicker.RangePicker
          {...fieldProps}
          placeholder={[placeholder, placeholder]}
          style={{ width: '100%' }}
        />
      );
      break;
    case 'datePicker':
      item = <DatePicker {...fieldProps} placeholder={placeholder} style={{ width: '100%' }} />;
      break;
    case 'dateRangePicker':
      item = (
        <DatePicker.RangePicker
          {...fieldProps}
          placeholder={[placeholder, placeholder]}
          style={{ width: '100%' }}
        />
      );
      break;

    case 'weekPicker':
      item = (
        <DatePicker
          picker="week"
          {...fieldProps}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      );
      break;
    case 'weekRangePicker':
      item = (
        <DatePicker.RangePicker
          picker="week"
          {...fieldProps}
          placeholder={[placeholder, placeholder]}
          style={{ width: '100%' }}
        />
      );
      break;

    case 'monthPicker':
      item = (
        <DatePicker
          picker="month"
          {...fieldProps}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      );
      break;
    case 'monthRangePicker':
      item = (
        <DatePicker.RangePicker
          picker="month"
          {...fieldProps}
          placeholder={[placeholder, placeholder]}
          style={{ width: '100%' }}
        />
      );
      break;

    case 'quarterPicker':
      item = (
        <DatePicker
          picker="quarter"
          {...fieldProps}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      );
      break;
    case 'quarterRangePicker':
      item = (
        <DatePicker.RangePicker
          picker="quarter"
          {...fieldProps}
          placeholder={[placeholder, placeholder]}
          style={{ width: '100%' }}
        />
      );
      break;

    case 'yearPicker':
      item = (
        <DatePicker
          picker="year"
          {...fieldProps}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      );
      break;
    case 'yearRangePicker':
      item = (
        <DatePicker.RangePicker
          picker="year"
          {...fieldProps}
          placeholder={[placeholder, placeholder]}
          style={{ width: '100%' }}
        />
      );
      break;

    default:
      item = (
        <Input {...fieldProps} placeholder={placeholder || '请输入'} style={{ width: '100%' }} />
      );
      break;
  }
  return item;
};

const getSpanByDisplayCount = (count: number) => {
  let span = 8;
  if (count === 2) {
    span = 12;
  }
  if (count === 3) {
    span = 8;
  } else if (count === 4) {
    span = 6;
  } else if (count === 5) {
    span = 4;
  }
  return span;
};

const getCountByWidth = (width: number) => {
  let count;
  if (width >= 2560) {
    count = 5;
  } else if (width >= 1920 && width < 2560) {
    count = 4;
  } else if (width < 1920 && width >= 1280) {
    count = 3;
  } else {
    count = 2;
  }
  return count;
};

export { renderItem, getSpanByDisplayCount, getCountByWidth };
