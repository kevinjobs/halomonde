import React from 'react';
import styled from 'styled-components';

import { Plus, } from '@icon-park/react';

const G = styled.div`
  height: 100vh;
  display: flex;
  padding: 0 32px;
  align-items: center;
  justify-content: center;
  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .inner {
      display: inline-block;
      text-align: center;
    }
    .go-search {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 12px 32px 12px;
      background-color: #fff;
      border-radius: 8px;
      input {
        height: 48px;
        width: 100%;
        padding: 0 16px;
        border: none;
        border-radius: 8px;
        background-color: transparent;
        &:focus {
          outline: none;
        }
      }
      button {
        height: 48px;
        width: 84px;
        border: none;
        background-color: #229453;
        border-radius: 0 8px 8px 0;
        color: #fff;
      }
    }
  }
`;

const GOI = styled.span`
  width: 64px;
  display: inline-block;
  margin: 8px;
  .go-item__icon {
    height: 64px;
    width: 64px;
    background-color: rgba(0,0,0,.1);
    border-radius: 8px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    img {
      width: 70%;
      height: 70%;
    }
  }
  .go-item__title {
    margin: 4px 0;
  }
`;

export interface GoItem {
  link: string;
  title: string;
  icon?: React.ReactNode;
}

const DEFAULT_ITEMS: GoItem[] = [
  {
    title: '百度',
    link: 'https://baidu.com'
  },
  {
    title: '必应',
    link: 'https://bing.com'
  },
  {
    title: '爱范',
    link: 'https://ifanr.com'
  },
  {
    title: '摸摸鱼',
    link: 'https://momoyu.cc',
    icon: 'https://momoyu.cc/img/logo-1.4a8f7d71.png',
  },
]

export default function GoPage() {
  const [items, setItems] = React.useState(DEFAULT_ITEMS);

  React.useEffect(() => {
    const itemsStr = localStorage.getItem('go-items');
    if (itemsStr) setItems(JSON.parse(itemsStr));
  }, []);

  return (
    <G className="go-page">
      <div className="container">
        <Search />
        <div className="inner">
          {items.map(i => <Item {...i} />)}
          <Item
            title="增加"
            link="/#/go"
            icon={<Plus theme="outline" size="24" fill="#333"/>}
          />
        </div>
      </div>
    </G>
  )
}

function Search() {
  const bing = 'https://cn.bing.com/search?q=';

  const [s, setS] = React.useState('');

  const handleClick = () => {
    const url = bing + s;
    window.open(url);
    setS('');
  }

  return (
    <div className="go-search">
      <input value={s} onChange={e => setS(e.target.value)} />
      <button onClick={handleClick}>搜索</button>
    </div>
  )
}

function Item({link, title, icon}: GoItem) {
  let ico: React.ReactNode = <img src={link + '/favicon.ico'} alt={title} />;

  if (typeof icon === 'string') {
    ico = <img src={icon} alt={title} />;
  } else if (icon instanceof Object) {
    ico = icon;
  }

  return (
    <GOI className="go-item">
      <div className="go-item__icon">
        <a href={link}>{ico}</a>
      </div>
      <div className="go-item__title">{ title }</div>
    </GOI>
  )
}