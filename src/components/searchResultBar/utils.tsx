import React from 'react';
import { Tag } from 'antd';
import { SearchConditionItem } from './types';
import moment from 'moment';

const DefaultPickerFormats = {
  timePicker: 'HH:mm:ss',
  datePicker: 'YYYY-MM-DD',
  weekPicker: 'YYYY-wo',
  monthPicker: 'YYYY-MM',
  quarterPicker: 'YYYY-QQ',
  yearPicker: 'YYYY',

  timeRangePicker: 'HH:mm:ss',
  dateRangePicker: 'YYYY-MM-DD',
  weekRangePicker: 'YYYY-wo',
  monthRangePicker: 'YYYY-MM',
  quarterRangePicker: 'YYYY-QQ',
  yearRangePicker: 'YYYY',
};

const renderItem = (fieldItem: SearchConditionItem) => {
  const { name = '', code = '', value = '', onDelete = () => {} } = fieldItem;

  return (
    <Tag color="blue" style={{ display: 'inline-flex', margin: '0 10px 10px 0' }}>
      <div title={name} style={{ color: '#333' }}>
        {name}:{' '}
      </div>
      <span style={{ marginLeft: '4px', fontWeight: '400' }}>{value}</span>

      <div style={{ color: '#666', marginLeft: '6px' }} onClick={() => onDelete(code)}>
        {' '}
        x{' '}
      </div>
    </Tag>
  );
};

type Formats = {
  [propName: string]: string | Function;
};

const transValue = (fieldItem: SearchConditionItem, formats?: Formats) => {
  const {
    name = '',
    code = '',
    value = '',
    onDelete = () => {},
    type = 'text',
    selectOptions = [],
  } = fieldItem;

  let tmpValue;

  switch (type) {
    case 'text':
    case 'number':
      if (formats && formats[type]) {
        const format = formats[type];
        if (typeof format === 'function') {
          tmpValue = format(value);
        } else {
          tmpValue = value;
        }
      } else {
        tmpValue = value;
      }
      break;
    case 'provincePicker':
    case 'cityPicker':
    case 'areaPicker':
    case 'streetPicker':
      if (formats && formats[type]) {
        const format = formats[type];
        if (typeof format === 'function') {
          tmpValue = format(value);
        } else {
          tmpValue = value.join(' / ');
        }
      } else {
        tmpValue = value.join(' / ');
      }
      break;
    case 'numberRange':
      if (formats && formats[type]) {
        const format = formats[type];
        if (typeof format === 'function') {
          tmpValue = format(value);
        } else {
          const [a, b] = value;
          if (a && b) {
            tmpValue = `${a} - ${b}`;
          } else if (!a && b) {
            tmpValue = `${b}及以下`;
          } else if (a && !b) {
            tmpValue = `${a}及以上`;
          }
        }
      } else {
        const [a, b] = value;
        if (a && b) {
          tmpValue = `${a} - ${b}`;
        } else if (!a && b) {
          tmpValue = `${b}及以下`;
        } else if (a && !b) {
          tmpValue = `${a}及以上`;
        }
      }
      break;
    case 'select':
      const find = selectOptions.find((option) => value === option.value);
      if (!find) {
        tmpValue = value;
        break;
      }
      if (formats && formats[type]) {
        const format = formats[type];
        if (typeof format === 'function') {
          tmpValue = format(value);
        } else {
          tmpValue = find?.label;
        }
      } else {
        tmpValue = find?.label;
      }
      break;
    case 'multipleSelect':
      const tmpArr = [];
      for (let _value of value) {
        const find = selectOptions.find((option) => _value === option.value);
        if (find) {
          tmpArr.push(find?.label);
        } else {
          tmpArr.push(_value);
        }
      }
      if (formats && formats[type]) {
        const format = formats[type];
        if (typeof format === 'function') {
          tmpValue = format(value);
        } else {
          tmpValue = tmpArr.join('、');
        }
      } else {
        tmpValue = tmpArr.join('、');
      }
      break;
    case 'timePicker':
    case 'datePicker':
    case 'weekPicker':
    case 'monthPicker':
    case 'quarterPicker':
    case 'yearPicker':
      if (formats && formats[type]) {
        const format = formats[type];
        if (typeof format === 'function') {
          tmpValue = format(value);
        } else if (typeof format === 'string') {
          tmpValue = moment(value.valueOf()).format(format);
        } else {
          tmpValue = moment(value.valueOf()).format(DefaultPickerFormats[type]);
        }
      } else {
        tmpValue = moment(value.valueOf()).format(DefaultPickerFormats[type]);
      }
      break;
    case 'timeRangePicker':
    case 'dateRangePicker':
    case 'weekRangePicker':
    case 'monthRangePicker':
    case 'quarterRangePicker':
    case 'yearRangePicker':
      const [start, end] = value;
      if (formats && formats[type]) {
        const format = formats[type];
        if (typeof format === 'function') {
          tmpValue = format(value);
        } else if (typeof format === 'string') {
          tmpValue = `${moment(start.valueOf()).format(format)} ~ ${moment(end.valueOf()).format(
            format,
          )}`;
        } else {
          tmpValue = `${moment(start.valueOf()).format(DefaultPickerFormats[type])} ~ ${moment(
            end.valueOf(),
          ).format(DefaultPickerFormats[type])}`;
        }
      } else {
        tmpValue = `${moment(start.valueOf()).format(DefaultPickerFormats[type])} ~ ${moment(
          end.valueOf(),
        ).format(DefaultPickerFormats[type])}`;
      }
      break;
    default:
      tmpValue = value;
      break;
  }

  return {
    name,
    code,
    value: tmpValue,
    onDelete,
    type,
  };
};

export { renderItem, transValue };
