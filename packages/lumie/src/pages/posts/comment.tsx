import React from 'react';
import styled from 'styled-components';

import { IComment } from '@/types';
import { Button } from '@/components/button';

const Container = styled.div`
  width: 100%;
`;

const Inputs = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #999;
  border-radius: 4px;
  div {
    outline: none;
  }
`;

const CommentItem = styled.div`
  max-width: 100%;
  border-top: 1px solid #d1d1d1;
  padding: 16px;
  div {
    padding: 4px 0;
  }
`;

export function Comment () {
  const [cs, setCs] = React.useState<IComment[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = e.target;
    if (e.key === 'Enter') {
      e.preventDefault();
      setCs(cs.concat([{
        createAt: 0,
        updateAt: 0,
        content: target.innerText,
        id: undefined,
        uid: undefined,
        author: '匿名',
      }]));
    }
  };

  const renderCommentItem = (c: IComment) => (
    <CommentItem key={c.uid}>
      <div style={{color:'#777'}}>{ c.author }</div>
      <div>{ c.content }</div>
    </CommentItem>
  );

  return (
    <Container>
      <div><h3>评论</h3></div>
      <Inputs>
        <div
          contentEditable
          onKeyDown={handleKeyDown}
          style={{margin:8,height:84}}
        ></div>
      </Inputs>
      <div style={{marginTop:16,textAlign:'right',width:'100%',}}>
        <Button onClick={e => e.preventDefault()}>提交</Button>
        <Button onClick={e => e.preventDefault()} danger>清空</Button>
      </div>
      <div><h4>热门评论</h4></div>
      <div>
        { cs.length ? cs.map(renderCommentItem) : '还没有评论' }
      </div>
    </Container>
  );
}
