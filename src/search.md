---
title: Search Bar 自定义统一搜索栏
---

## 代码演示

### 常规搜索栏

<code src="./demos/single.tsx" background="#f5f5f5" height="500px" title="搜索栏" />

### value 属性

<code src="./demos/single_value.tsx" background="#f5f5f5" height="500px" title="搜索栏 默认值" />

### showSearchConditionBar 属性

<code src="./demos/single_showSearchConditionBar.tsx" background="#f5f5f5" height="500px" title="搜索栏 显示已选项" />

### extra 属性

<code src="./demos/single_extra.tsx" background="#f5f5f5" height="500px" title="搜索栏 显示额外按钮等" />

### tabs 属性

<code src="./demos/single_tabs.tsx" background="#f5f5f5" height="500px" title="搜索栏 tabs" />

### tabExtra 属性

<code src="./demos/single_tabExtra.tsx" background="#f5f5f5" height="500px" title="搜索栏 tabExtra" />

### tabs & tabExtra 属性

<code src="./demos/single_tabs_tabExtra.tsx" background="#f5f5f5" height="500px" title="搜索栏 tabs & tabExtra" />

### moreText、searchText、resetText 属性

<code src="./demos/single_btnText.tsx" background="#f5f5f5" height="500px" title="搜索栏 显示额外按钮等" />

### searchType 和 resetType 属性

<code src="./demos/single_btnType.tsx" background="#f5f5f5" height="500px" title="搜索栏 显示额外按钮等" />

### formats 属性

<code src="./demos/single_formats.tsx" background="#f5f5f5" height="500px" title="搜索栏 自定义已选项展示方式" />

## fields 字段属性

### required 属性

<code src="./demos/single_required.tsx" background="#f5f5f5" height="500px" title="搜索栏 必填项" />

### colSpan 属性

<code src="./demos/single_colSpan.tsx" background="#f5f5f5" height="500px" title="搜索栏 colSpan" />

### isPermanent 属性

<code src="./demos/single_isPermanent.tsx" background="#f5f5f5" height="500px" title="搜索栏 常驻" />

### searchImmediate 属性

<code src="./demos/single_searchImmediate.tsx" background="#f5f5f5" height="500px" title="搜索栏 searchImmediate" />

### fieldProps 属性

<code src="./demos/single_fieldProps.tsx" background="#f5f5f5" height="500px" title="搜索栏 fieldProps" />

### widget 属性

<code src="./demos/single_widget.tsx" background="#f5f5f5" height="500px" title="搜索栏 widget" />

## API

### SearchBar

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 需要展示的搜索字段 | `Array<FieldItem>` | `-` |
| moreText | 更多按钮文本 | `string` | `更多` |
| searchText | 搜索按钮文本 | `string` | `搜索` |
| resetText | 重置按钮文本 | `string` | `重置` |
| searchType | 搜索按钮类型 | `primary、default、link、text、ghost、dashed` | `primary` |
| resetType | 重置按钮类型 | `primary、default、link、text、ghost、dashed` | `primary` |
| value | 初始值 | `{}` | `-` |
| onChange | change 回调事件 | `(changedValue: {[prop: string]: any}, allValues: {[prop: string]: any}, form: Form ) => {}` | `-` |
| onReset | reset 回调事件 | `() => {}` | `-` |
| onSearch | search 回调事件 | `(values: {[prop: string]: any}) => {}` | `-` |
| showSearchConditionBar | 是否显示已选搜索条件栏 | `boolean` | `false` |
| extra | 额外显示组件 | `React.Component` | `-` |
| formats | 自定义搜索栏已选项显示方式，在 showSearchConditionBar 为 true 时生效 | `{[value: string]: any}` | `-` |
| tabs | tabs 组件 | `见TabsProps` | `-` |
| tabExtra | tab 栏额外显示组件 | `React.Component` | `-` |

### FieldItem

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colSpan | 字段需要展示的空间大小 | `number` | `1` |
| name | Form.Item label 名称 | `string` | `-` |
| code | Form.Item field 名称 | `string` | `-` |
| type | 字段支持的类型 | `见type支持类型` | `text` |
| required | 字段是否必填 | `boolean` | `false` |
| selectOptions | 选择框选项，仅在 type 为 select 或 multipleSelect 生效 | `Array<FieldItemSelectOption>` | `undefined` |
| placeholder | 提示文字 | `string` | `请输入` |
| widget | 自定义搜索组件 | `React.Component 或者 () => { return React.component}` | `-` |
| isPermanent | 是否常驻显示 | `boolean` | `false` |
| searchImmediate | 是否变更后立即触发搜索 | `boolean` | `false` |
| fieldProps | 覆盖现有字段的默认属性 | `object` | `-` |

### TabsProps

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | `string` | `第一个面板` |
| code | Form.Item field 名称 | `string` | `""` |
| tabItems | tabs 列表 | `Array<TabItem>` | `-` |

详见 Ant Design V4 中的 Tabs 的其他 prop;

### FieldItemSelectOption

| 属性  | 描述     | 类型                 | 默认值 |
| ----- | -------- | -------------------- | ------ |
| label | 显示名称 | `string`             | `""`   |
| value | 值       | `string 或者 number` | `""`   |

### TabItem

| 属性 | 描述         | 类型        | 默认值 |
| ---- | ------------ | ----------- | ------ |
| tab  | tab 显示名称 | `ReactNode` | `-`    |
| key  | tab key 值   | `string`    | `-`    |

详见 Ant Design V4 中的 Tabs.TabPane 的其他 prop;

### type 支持类型

'text' | 'select' | 'multipleSelect' | 'provincePicker'| 'cityPicker' | 'areaPicker' | 'streetPicker' | 'dateRangePicker' | 'timeRangePicker' | 'timePicker' | 'datePicker' | 'number' | 'numberRange' | 'email' | 'monthPicker' | 'monthRangePicker' | 'yearPicker' | 'yearRangePicker' | 'weekPicker' | 'weekRangePicker' | 'quarterPicker' | 'quarterRangePicker'
