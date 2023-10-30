import React from 'react';
import lodash from 'lodash';

interface ViewportProps {
  children: React.ReactNode;
}

interface IHandleScroll {
  (): void;
}

const viewportContext = React.createContext({width: 0, height: 0, toTop: 0, toBottom: 0});

const ViewportProvider = (props: ViewportProps) :React.ReactElement => {
  const { children } = props;

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const [toTop, setToTop] = React.useState(0);
  const [toBottom, setToBottom] = React.useState(0);

  function handleWindowResize () {
    // console.log(window);
    // to-do: (2021-07-10)
    // chrome 系的浏览器，模拟移动端时
    // innerWidth 在一个区间内不会改变
    // 经测试 firefox 没有这个问题
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  let handleBodyScroll: IHandleScroll;

  // eslint-disable-next-line prefer-const
  handleBodyScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const height = document.documentElement.clientHeight || document.body.clientHeight || 0;
    const scrollbarHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
    const toBottom = scrollbarHeight - top - height;
    const toTop = top;
    setToTop(toTop);
    setToBottom(toBottom);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('scroll', lodash.debounce(handleBodyScroll, 500));
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('scroll', lodash.debounce(handleBodyScroll, 500));
    };
  }, []);

  return (
    <viewportContext.Provider value={{ width, height, toTop, toBottom }}>
      { children }
    </viewportContext.Provider>
  );
};

const breakpoint = 1080;

const useDevice = () :{device: string, clientWidth: number, clientHeight: number} => {
  let device = 'desktop';

  const { width, height } = React.useContext(viewportContext);

  // console.log('window width: ', width);

  if (width < breakpoint) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  const clientWidth = width;
  const clientHeight = height;

  return {
    device,
    clientWidth,
    clientHeight
  };
};

const useScroll = () :{toTop: number, toBottom: number}=> {
  const { toTop, toBottom } = React.useContext(viewportContext);
  return { toTop, toBottom };
};

export {
  ViewportProvider,
  useDevice,
  useScroll,
};