import React, {useState, useRef, useEffect, useContext} from 'react';
import { InputNumber, InputNumberProps, ConfigProvider } from 'antd';
// @ts-ignore
import styled from 'styled-components';

const StyledInputRange = styled.div.attrs({ className: 'xf-input-range' })`
> .${(props:any) => props.prefix}-input-number {
  width: calc(50% - 10px);
}

> .xf-input-range-separator {
  display: inline-block;
  width: 20px;
  text-align: center;
}
`;

export type InputNumberRangeValue = [string|number|null, string|number|null] | null | undefined

export type InputNumberRangeProps = {
  value?: InputNumberRangeValue,
  defaultValue?: InputNumberRangeValue,
  onChange?: (value: InputNumberRangeValue) => void,
  separator?: string|React.ReactNode,
} & Omit<InputNumberProps, 'value'|'defaultValue'|'onChange'>;

export const InputNumberRange  = (props: InputNumberRangeProps) => {
  const {
    value: initValue,
    defaultValue,
    onChange,
    separator = '-',
    style,
    ...restProps
  } = props;
  const context  = useContext(ConfigProvider.ConfigContext);

  const ref = useRef<HTMLInputElement>();

  const rangeValues: [string|number|null, string|number|null] = [null, null];

  const [value, setValue] = useState<InputNumberRangeValue>('value' in props ? initValue : defaultValue);

  const focus = () => {
    ref.current?.focus();
  };

  const _setRangeValue = (index:number, val: string|number|null) => {
    rangeValues[index] = val;
  };

  const _setRangeValueByProps = () => {
    if (Array.isArray(value)) {
      const [s,e] = value;
      _setRangeValue(0, s);
      _setRangeValue(1, e);
    } else {
      _setRangeValue(0, null);
      _setRangeValue(1, null);
    }
  };

  useEffect(() => {
    _setRangeValueByProps()
  }, [value])

  const handleChange = (index:number, val: string|number|null) => {
    _setRangeValue(index, val);
    const nextValue: InputNumberRangeValue = rangeValues[0] == null && rangeValues[1] == null
      ? undefined
      : [rangeValues[0], rangeValues[1]];
    setValue(nextValue);
    if (props.onChange) {
      props.onChange(nextValue);
    }
  }

  return (
      <StyledInputRange className="xf-input-range" style={style} prefix={context.getPrefixCls()}>
        <InputNumber
          {...restProps}
          // @ts-ignore
          ref={ref}
          style={{ width: 'calc(50% - 10px)' }}
          value={(value && value[0]) ?? undefined}
          onChange={val => handleChange(0, val)}
          />
        <span className="xf-input-range-separator">{separator}</span>
        <InputNumber
          {...restProps}
          style={{ width: 'calc(50% - 10px)' }}
          value={(value && value[1]) ?? undefined}
          onChange={val => handleChange(1, val)}
          />
      </StyledInputRange>
    );
}

export default InputNumberRange;
