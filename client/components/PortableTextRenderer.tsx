'use client';

import { PortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

// Custom components for different content types
const components = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8">
          <img
            src={urlFor(value).url()}
            alt={value.alt || 'Blog image'}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <div className="my-6">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{value.code}</code>
          </pre>
          {value.language && (
            <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-t-lg text-xs font-mono">
              {value.language}
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-gray-700 mt-5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold text-gray-700 mt-4 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="text-gray-700">{children}</li>
  ),
  marks: {
    link: ({ children, value }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
};

interface PortableTextRendererProps {
  content: any;
  className?: string;
}

export default function PortableTextRenderer({ content, className = '' }: PortableTextRendererProps) {
  if (!content) {
    return <p className="text-gray-500 italic">No content available.</p>;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={content} components={components} />
    </div>
  );
}
