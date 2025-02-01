import { useState, useEffect, lazy, Suspense } from 'react';
import 'react-quill/dist/quill.snow.css';
import { cn } from '@/lib/utils';

const ReactQuill = lazy(() => import('react-quill'));

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
    [{ color: [] }, { background: [] }],
    ['code-block']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'link', 'image',
  'align',
  'color', 'background',
  'code-block'
];

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
  placeholder?: string;
}

const BlogEditor = ({ content, onChange, className, placeholder }: BlogEditorProps) => {
  const [mounted, setMounted] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleChange = (value: string) => {
    setLocalContent(value);
    onChange(value);
  };

  if (!mounted) {
    return <div className="h-64 w-full animate-pulse bg-gray-100 rounded-md" />;
  }

  return (
    <div className={cn('prose max-w-none', className)}>
      <Suspense fallback={<div className="h-64 w-full animate-pulse bg-gray-100 rounded-md" />}>
        <ReactQuill
          theme="snow"
          value={localContent}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder || 'Write your blog post content here...'}
          className="min-h-[400px]"
        />
      </Suspense>
    </div>
  );
};

export default BlogEditor; 