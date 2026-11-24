import React from 'react';

interface CodeBlockProps {
  code: string;
}

const KEYWORDS = new Set([
  'let',
  'const',
  'var',
  'if',
  'else',
  'for',
  'while',
  'true',
  'false',
  'console',
  'log',
  'push',
  'length',
]);

function highlightLine(line: string): React.ReactNode[] {
  // Tokeniza strings entre aspas, números, operadores e palavras-chave
  const tokenRegex = /(".*?"|'.*?'|\b\d+\b|\b[a-zA-Z_]\w*\b|&&|\|\||===|>=|<=|!=|\+\+|--)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }

    const token = match[0];
    let className = 'text-slate-200';

    if (token.startsWith('"') || token.startsWith("'")) {
      className = 'text-emerald-300';
    } else if (/^\d+$/.test(token)) {
      className = 'text-cyan-300';
    } else if (KEYWORDS.has(token)) {
      if (token === 'true' || token === 'false') {
        className = 'text-amber-300 font-semibold';
      } else if (token === 'if' || token === 'else' || token === 'for' || token === 'while') {
        className = 'text-purple-300 font-semibold';
      } else {
        className = 'text-sky-300 font-semibold';
      }
    } else if (['&&', '||', '===', '>=', '<=', '!=', '++', '--'].includes(token)) {
      className = 'text-fuchsia-300 font-semibold';
    }

    parts.push(
      <span key={`${match.index}-${token}`} className={className}>
        {token}
      </span>
    );
    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [' '];
}

export function CodeBlock({ code }: CodeBlockProps) {
  const lines = code.split('\n');

  return (
    <div className="rounded-xl bg-[#050811] border border-sky-500/25 overflow-hidden shadow-inner">
      <div className="px-4 py-3 overflow-x-auto">
        <pre className="font-mono text-sm sm:text-[15px] leading-relaxed">
          {lines.map((line, index) => (
            <div key={index} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="select-none text-slate-600 text-xs pt-0.5 w-4 text-right tabular-nums shrink-0"
              >
                {index + 1}
              </span>
              <code className="text-slate-100 whitespace-pre">{highlightLine(line)}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
