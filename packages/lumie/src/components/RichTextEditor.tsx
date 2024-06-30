import React, { useState } from 'react';
import marked from 'marked';
import WE from 'wangeditor';

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const renderer = {
  image(href: string, title: string, text: string): string {
    return `
      <div style="display:flex;justify-content:center;flex-wrap:wrap;">
        <img src="${href}" alt="${text || title}" style="width:80%;" />
        <div style="width:100%;text-align:center;color:#777777;padding:8px 0;">${text}</div>
      </div>
    `;
  },
};

marked.use({ renderer });

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [content, setContent] = useState(value);

  const weditor = React.useRef<WE>(null);

  const handleChange = (text: string) => {
    setContent(text);
    if (onChange) onChange(text);
  };

  React.useEffect(() => {
    if (document.querySelector('#article-editor')) {
      weditor.current = new WE('#article-editor');
      weditor.current.config.height = 600;
      weditor.current.config.onchange = handleChange;
      weditor.current.create();
      weditor.current.txt.html(content);
    }
    return () => weditor.current?.destroy();
  }, []);

  return (
    <div>
      <div id="article-editor"></div>
    </div>
  );
}
