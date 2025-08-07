import React from 'react';

interface JsonSyntaxHighlighterProps {
  jsonString: string;
}

const JsonSyntaxHighlighter: React.FC<JsonSyntaxHighlighterProps> = ({ jsonString }) => {
  if (!jsonString) {
    return <code className="text-muted-foreground">Output akan muncul di sini...</code>;
  }

  const highlight = (str: string) => {
    // Basic HTML entity escaping
    let json = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Regex to find and colorize JSON parts
    return json.replace(/"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|true|false|null|-?\d+(\.\d+)?([eE][+\-]?\d+)?/g, (match) => {
      let cls = 'text-sky-600 dark:text-sky-400'; // Number
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-purple-600 dark:text-purple-400'; // Key
        } else {
          cls = 'text-emerald-600 dark:text-emerald-400'; // String
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-amber-600 dark:text-amber-400'; // Boolean
      } else if (/null/.test(match)) {
        cls = 'text-slate-500 dark:text-slate-400'; // Null
      }
      return `<span class="${cls}">${match}</span>`;
    });
  };

  const highlightedHtml = highlight(jsonString);

  return (
    <pre className="text-sm font-mono whitespace-pre-wrap">
      <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
    </pre>
  );
};

export default JsonSyntaxHighlighter;