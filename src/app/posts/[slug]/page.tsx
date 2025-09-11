import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), '_posts', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContent);
  console.log({data}, {content})
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <article>
      <h1>{data.title}</h1>
      <p>
        <strong>Date:</strong>
        {data.date}
      </p>
      <p>
        <strong>Description:</strong> 
        {data.description}
      </p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}