import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row, Tabs } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { SearchProps, FieldKeyValue, TabItem } from './types';
import { renderItem, getSpanByDisplayCount, getCountByWidth } from './utils';
// @ts-ignore
import { debounce } from 'lodash';
import SearchConditionResultBar from './components/searchResultBar/index';
import { SearchConditionItem } from './components/searchResultBar/types';

const labelWidth = '110px';
const SearchBar = (props: SearchProps) => {
  // 标志是否开始监听UE4消息，确保只监听一次
  const [listenCount, setListenCount] = useState(0);

  useEffect(() => {
    // 给全局绑定一个修改分辨率的操作, 当窗口发生变化的时候就修改分辨率
    if (listenCount === 0) {
      window.addEventListener(
        'resize',
        debounce(
          () => {
            resizeContainer();
          },
          500,
          false,
        ),
      );
      setListenCount(1);
    }
  }, [listenCount]);

  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);
  const [count, setCount] = useState(getCountByWidth(window.innerWidth));
  const containerRef = useRef(null);
  const [searchConditions, setSearchConditions] = useState<any>([]);
  const {
    fields = [],
    searchText = '搜索',
    resetText = '重置',
    moreText = '更多',
    searchType = 'primary',
    resetType = 'default',
    value,
    onChange = () => {},
    onReset = () => {},
    onSearch = () => {},
    // onFinish = () => {},
    showSearchConditionBar = false,
    extra,
    formats,
    tabs,
    tabExtra,
  } = props;

  let { code = '', defaultActiveKey = '', tabItems = [] } = tabs || {};
  if (!defaultActiveKey && tabItems) {
    defaultActiveKey = tabItems[0]?.key;
  }
  const [activeTabKey, setActiveTabKey] = useState(defaultActiveKey);

  const handleTrans = (key = '') => {
    const fieldValues = form.getFieldsValue();
    const _searchConditions = [];
    for (let key in fieldValues) {
      const find = fields.find((field) => field.code === key);
      const condition: SearchConditionItem = {
        name: find?.name,
        value: fieldValues[key],
        code: find?.code,
        type: find?.type,
        onDelete: (_code: string) => {
          handleDelete(_code);
        },
      };
      if (find?.type === 'select' || find?.type === 'multipleSelect') {
        condition.selectOptions = find.selectOptions;
      }
      _searchConditions.push(condition);
    }
    if (code && key) {
      fieldValues[code] = key;
    }
    setSearchConditions(_searchConditions);
    return [fieldValues, _searchConditions];
  };

  const handleSearch = () => {
    form
      .validateFields()
      .then((values) => {
        const [fieldValues, _searchConditions] = handleTrans(activeTabKey);
        onSearch(fieldValues, _searchConditions);
      })
      .catch(() => {});
  };

  const handleTabClick = (tabKey: string) => {
    setActiveTabKey(tabKey);
    form
      .validateFields()
      .then((values) => {
        const [fieldValues, _searchConditions] = handleTrans(tabKey);
        onSearch(fieldValues, _searchConditions);
      })
      .catch(() => {});
  };

  const handleResetOrDelete = (type: string, code = '') => {
    if (['reset', 'delete'].indexOf(type) === -1) return;

    const values = form.getFieldsValue();
    if (type === 'reset') {
      for (let key in values) {
        const filterData = fields.find((field) => field.code === code);
        const required = filterData?.required;
        if (!required) {
          values[key] = undefined;
        }
      }
    } else {
      const filterData = fields.find((field) => field.code === code);
      const required = filterData?.required;
      if (!required) {
        values[code] = undefined;
      }
    }

    form.setFieldsValue(values);
    type === 'reset' && onReset();
    const [, _searchConditions] = handleTrans();
    setSearchConditions(_searchConditions);
    handleSearch();
  };

  const handleReset = () => {
    handleResetOrDelete('reset');
  };

  const handleDelete = (code: string) => {
    handleResetOrDelete('delete', code);
  };

  const handleChange = (changeValue: FieldKeyValue, allValues: FieldKeyValue) => {
    for (let key in changeValue) {
      const findItem = fields.find((field) => field.code === key);
      const { searchImmediate } = findItem || {};
      if (searchImmediate) {
        handleSearch();
      }
    }
    onChange(changeValue, allValues, form);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  // 根据现有元素调整元素展示
  const adjustDisplay = (items: Array<any>, remainSpan: number) => {
    const children = [];
    let totalSpan = 0;
    for (let item of items) {
      totalSpan += item.props.fieldSpan;
    }
    const hasMoreLine = totalSpan > remainSpan; // 是否是多行
    const btnGroup = {
      props: { fieldSpan: 24 - remainSpan, isBtnGroup: true, isFirstLine: true },
      component: (
        <>
          {hasMoreLine && (
            <a
              style={{ fontSize: 12, width: '50px', marginLeft: '60px' }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {moreText} {expand ? <UpOutlined /> : <DownOutlined />}
            </a>
          )}

          <Button type={resetType} style={{ margin: '0 8px' }} onClick={handleReset}>
            {resetText}
          </Button>
          <Button type={searchType} onClick={handleSearch}>
            {searchText}
          </Button>
        </>
      ),
    };

    let tmpSpan = 0;
    let lineCount = 1;
    while (items.length) {
      const item = items.shift();
      tmpSpan += item?.props?.fieldSpan;

      if (lineCount === 1) {
        //第一行
        if (tmpSpan > remainSpan) {
          // 超出当前行范围,需要调整
          tmpSpan -= item.props.fieldSpan;
          const findIndex = items.findIndex(
            (_item) =>
              !!item.props.isPermanent === !!_item.props.isPermanent &&
              _item.props.fieldSpan + tmpSpan <= remainSpan,
          );
          if (findIndex > -1) {
            const findItem = items.splice(findIndex, 1);
            items.unshift(item);
            items.unshift(findItem[0]);
          } else {
            children.push(btnGroup);
            lineCount += 1;
            tmpSpan = 0;
          }
        } else if (tmpSpan === remainSpan) {
          item.props.isFirstLine = true;
          children.push(item);
          children.push(btnGroup);
          lineCount += 1;
          tmpSpan = 0;
        } else {
          item.props.isFirstLine = true;
          children.push(item);
          if (items.length === 0) {
            children.push(btnGroup);
          }
        }
      } else {
        // 非第一行
        if (tmpSpan > 24) {
          // 超出当前行范围,需要调整
          tmpSpan -= item.props.fieldSpan;
          const findIndex = items.findIndex(
            (_item) =>
              !!item.props.isPermanent === !!_item.props.isPermanent &&
              _item.props.fieldSpan + tmpSpan <= 24,
          );
          if (findIndex > -1) {
            const findItem = items.splice(findIndex, 1);
            items.unshift(item);
            items.unshift(findItem[0]);
          } else {
            lineCount += 1;
            tmpSpan = 0;
          }
        } else if (tmpSpan === 24) {
          item.props.isFirstLine = false;
          children.push(item);
          lineCount += 1;
          tmpSpan = 0;
        } else {
          item.props.isFirstLine = false;
          children.push(item);
        }
      }
    }

    return children.map((item) => {
      const { isPermanent, isBtnGroup, code, fieldSpan, isFirstLine } = item.props;
      return (
        <Col
          span={fieldSpan}
          key={code}
          style={{ display: isPermanent || isBtnGroup || isFirstLine || expand ? '' : 'none' }}
        >
          {item.component}
        </Col>
      );
    });
  };

  const renderSearchBar = (count: number) => {
    const span = getSpanByDisplayCount(count);
    const copy = fields.slice();
    const permanentList = copy.filter((item) => item.isPermanent === true);
    const notPermanentList = copy.filter((item) => item.isPermanent !== true);
    const list = [...permanentList, ...notPermanentList];
    const children = [];

    for (let i = 0; i < list.length; i++) {
      const fieldItem = list[i];
      const { colSpan = 1, name, code, required, widget } = fieldItem;
      const props = widget
        ? { ...fieldItem, fieldSpan: colSpan * span }
        : { ...fieldItem, fieldSpan: colSpan * span > 24 ? 24 : colSpan * span };
      children.push({
        props,
        component: (
          <Form.Item
            key={code}
            name={code}
            label={
              <span
                title={name}
                style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {name}
              </span>
            }
            rules={[{ required: required, message: '' }]}
            labelCol={{ flex: labelWidth }}
          >
            {widget ? ((widget as unknown) as any) : renderItem(fieldItem)}
          </Form.Item>
        ),
      });
    }

    return adjustDisplay(children, 24 - span);
  };

  const resizeContainer = () => {
    const count = getCountByWidth(window.innerWidth);
    setCount(count);
  };

  return (
    <div className={'xforceplus_ux_search_bar'} ref={containerRef}>
      <Form
        initialValues={value}
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
        onValuesChange={handleChange}
      >
        <Row gutter={24}>{renderSearchBar(count)}</Row>
      </Form>

      {showSearchConditionBar && (
        <SearchConditionResultBar
          selectedFieldValues={searchConditions}
          formats={formats}
          extra={extra}
          onClean={handleReset}
          onDelete={handleDelete}
        />
      )}

      {(tabItems || tabExtra) && (
        <div
          className={'xforceplus_ux_search_tabs_bar'}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div style={{ flex: 1 }}>
            {tabs && tabItems && (
              <Tabs
                defaultActiveKey={defaultActiveKey}
                onTabClick={handleTabClick}
                tabBarExtraContent={{ right: tabExtra }}
              >
                {tabItems?.map((tabItem: TabItem, index) => {
                  return <Tabs.TabPane {...tabItem} key={tabItem?.key || index} />;
                })}
              </Tabs>
            )}
            {!tabs && tabItems.length === 0 && tabExtra && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{tabExtra}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
