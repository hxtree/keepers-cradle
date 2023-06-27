import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import highlighterStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';

export enum CodeSnippetLanguages {
  JSON = 'json',
  HTML = 'html',
  CSS = 'css',
  JAVASCRIPT = 'javascript',
}

export type CodeSnippetProps = {
  data: string;
  language: CodeSnippetLanguages;
};

export const CodeSnippet = (props: CodeSnippetProps) => {
  const { data, language } = props;

  return (
    <div>
      {data ? (
        <SyntaxHighlighter language={language} style={highlighterStyle}>
          {data}
        </SyntaxHighlighter>
      ) : (
        'Loading...'
      )}
    </div>
  );
};