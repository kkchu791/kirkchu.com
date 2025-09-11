import { remark } from 'remark';
import html from 'remark-html';

interface MarkdownRendererProps {
  content: string;
}

export default async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = await remark().use(html).process(content);
  return <div dangerouslySetInnerHTML={{ __html: processedContent.toString() }} />;
}
