/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  useState, useCallback, useEffect, forwardRef,
} from 'react';
import { Cascader } from 'antd';
import { getSACbyProvinceName } from './request';
import { CascaderProps, DefaultOptionType, CascaderRef } from 'antd/lib/cascader';
// @ts-ignore
import provinces from './provinces.json';

type Provice = {
  code: string, name: string
}

export enum PcasSelectorType {
  STREET=1,
  AREA=2,
  CITY=3,
  PROVINCE=4
}

const defaultPlaceholder = {
  [PcasSelectorType.PROVINCE]: '请选择省份',
  [PcasSelectorType.CITY]: '请选择省市',
  [PcasSelectorType.AREA]: '请选择省市区',
  [PcasSelectorType.STREET]: '请选择省市区街道',
};

type Item = {value?: string|number|null, label?: string}

export type PCASSelectorProps = Omit<CascaderProps<DefaultOptionType>, 'options' | 'onChange' | 'value' |'defaultValue'> & {
  type?: PcasSelectorType,
  value?: Array<Item|string>,
  defaultValue?: Array<Item|string>,
  onChange?: (value: Array<string>, selectedOptions: Array<Item>) => void
}

export default forwardRef((props: PCASSelectorProps, ref: React.Ref<CascaderRef>): React.ReactElement => {
  const {
    type = PcasSelectorType.AREA,
    value: propsValue,
    defaultValue: propsDefaultValue,
    onChange: propsOnChange,
    ...restProps
  } = props;
  const [options, setOptions] = useState<DefaultOptionType[]>(provinces.map((province: Provice) => ({
    value: province.code, label: province.name, isLeaf: type === PcasSelectorType.PROVINCE,
  })));
  const [value, setValue] = useState<(string | number)[]>();
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    if (Array.isArray(props.defaultValue) && props.defaultValue.length) {
      // props.defaultValue 有值时，通过displayRender方法渲染选择框文案，组件value可忽略
      setValue(['']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(propsValue) && propsValue.length) {
      // propsValue 有值时，通过displayRender方法渲染选择框文案，组件value可忽略
      setValue(['']);
    } else if ('value' in props) {
      setValue(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsValue]);

  const loadData = useCallback(async (selectedOptions?: DefaultOptionType[]) => {
    const [province] = selectedOptions || [];
    const provinceName = province?.label;
    if (provinceName) {
      let children: DefaultOptionType[] = [];
      province.loading = true;
      const result = await getSACbyProvinceName(provinceName as string);
      province.loading = false;

      if (Array.isArray(result)) {
        children = result.map(({ code, name, children }) => ({
          value: code,
          label: name,
          isLeaf: type === PcasSelectorType.CITY,
          children: type !== PcasSelectorType.CITY
            ? Array.isArray(children) ? children.map(({ code, name, children }) => ({
              value: code,
              label: name,
              isLeaf: type === PcasSelectorType.AREA,
              children: type !== PcasSelectorType.AREA
                ? Array.isArray(children) ? children.map(({ code, name }) => ({
                  value: code,
                  label: name,
                  isLeaf: true,
                })) : undefined
                : undefined,
            })) : undefined
            : undefined,
        }));
      }

      setOptions((options) => {
        const provinceIndex = options.findIndex(option => option.label === provinceName);
        options[provinceIndex].children = children;
        return [...options];
      });
    }
  }, [type]);

  function handleChange(value: (string | number)[], selectedOptions?: DefaultOptionType[]) {
    setChanged(true);
    if (!('value' in props)) {
      setValue(value);
    }
    if (typeof propsOnChange === 'function' && selectedOptions) {
      propsOnChange(
        selectedOptions.map(({ label }) => String(label)),
        selectedOptions.map(({ value, label }) => ({ value, label: String(label) })),
      );
    }
  }

  const displayRender = (label: string[]) => {
    if (Array.isArray(propsValue)) {
      return (propsValue as Array<string|Item>).map(item => (typeof item === 'string' ? item : item.label)).join(' / ');
    }
    if (Array.isArray(props.defaultValue) && !isChanged) {
      return (props.defaultValue as Array<string|Item>).map(item => (typeof item === 'string' ? item : item.label)).join(' / ');
    }
    return label.join(' / ');
  };

  return (
    <Cascader
      placeholder={defaultPlaceholder[type]}
      {...restProps}
      multiple={false}
      ref={ref}
      value={value}
      defaultValue={[]}
      options={options}
      loadData={loadData}
      onChange={handleChange}
      displayRender={displayRender}
    />
  );
});
