import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { SearchConditionResultProps } from './types';
import { renderItem, transValue } from './utils';
// @ts-ignore
import { debounce } from 'lodash';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const SearchConditionResultBar = (props: SearchConditionResultProps) => {
  const containerRef2 = useRef(null);
  const [expand, setExpand] = useState(false);
  const [hasMoreLine, setHasMoreLine] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [wrapStartIndex, setWrapIndex] = useState(0);
  const [listenCount, setListenCount] = useState(0);

  useEffect(() => {
    // 给全局绑定一个修改分辨率的操作, 当窗口发生变化的时候就修改分辨率
    if (listenCount === 0) {
      window.addEventListener(
        'resize',
        debounce(
          () => {
            resizeContainer2();
          },
          500,
          false,
        ),
      );
      setListenCount(1);
    }
  }, [listenCount]);

  const {
    extra = null, //ReactComponent 或 () => {},
    onClean = () => {},
    formats = {},
    selectedFieldValues = [],
  } = props;

  const filterData = selectedFieldValues.filter((_item) => !!_item.value);

  const handleClean = () => {
    onClean();
  };

  const resizeContainer2 = () => {
    const containerBound = ((containerRef2.current as unknown) as HTMLElement)?.getBoundingClientRect();
    if (containerBound) {
      const { width: cWidth } = containerBound || {};
      // @ts-ignore
      const _nodes = containerRef2?.current?.children;
      const nodes = Array.from(_nodes);
      if (nodes && nodes.length > 0) {
        let wrapIndex = 0;
        let tmpWidth = 0;
        let flag = true;
        while (flag && nodes.length) {
          let node = nodes.shift();
          const { width = 0 } = ((node as unknown) as Element).getBoundingClientRect();
          tmpWidth += width + 10;
          wrapIndex++;
          if (tmpWidth > cWidth) {
            flag = false;
            if (!hasMoreLine) {
              setHasMoreLine(true);
            }
            break;
          }
        }
        if (_nodes.length === wrapIndex && flag) {
          setHasMoreLine(false);
        }
        if (wrapStartIndex !== wrapIndex) {
          setWrapIndex(wrapIndex);
        }
      }
    }
  };

  setTimeout(() => {
    resizeContainer2();
  }, 0);

  const renderItems = () => {
    const items = filterData.map((item) => {
      const _transItem = transValue(item, formats);
      return renderItem(_transItem);
    });

    const clearEle = (
      <Button type="link" onClick={handleClean} size={'small'}>
        清空搜索条件
      </Button>
    );
    if (items.length > 0) {
      items.push(clearEle);
    }

    return items.map((item, index) => {
      // style={{display: (expand || index < wrapIndex) ? '' : 'none'}}
      return <div style={{ display: expand || index < wrapStartIndex ? '' : 'none' }}>{item}</div>;
    });
  };

  return (
    <div className={'xforceplus_ux_search_condition_result_bar'} style={{ display: 'flex' }}>
      <div
        ref={containerRef2}
        style={{
          display: 'flex',
          overflow: expand ? 'auto' : 'hidden',
          flexWrap: 'wrap',
          flex: 1,
          height: expand ? 'auto' : '32px',
        }}
      >
        {renderItems()}
      </div>
      {hasMoreLine && filterData.length ? (
        <div style={{ width: '50px' }}>
          <a
            style={{ fontSize: 12, alignSelf: 'flex-end' }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? '收起' : '更多'} {expand ? <UpOutlined /> : <DownOutlined />}
          </a>
        </div>
      ) : (
        <></>
      )}
      {extra && <>{extra}</>}
    </div>
  );
};

export default SearchConditionResultBar;
