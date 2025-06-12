import React, { useState } from "react";
import { Folder, FileText, FileCode, FileJson } from "lucide-react";

type FileNode = {
  name: string;
  isFolder: boolean;
  depth: number;
  children: FileNode[];
};

function getIcon(name: string, isFolder: boolean) {
  if (isFolder) return <Folder size={16} className="inline-block mr-1" />;
  if (name.endsWith('.astro')) return <FileCode size={16} className="inline-block mr-1" />;
  if (name.endsWith('.ts') || name.endsWith('.tsx')) return <FileCode size={16} className="inline-block mr-1" />;
  if (name.endsWith('.json')) return <FileJson size={16} className="inline-block mr-1" />;
  if (name.endsWith('.md')) return <FileText size={16} className="inline-block mr-1" />;
  return <FileText size={16} className="inline-block mr-1" />;
}

function parseFileTree(raw: string): FileNode[] {
  const lines = raw
    .trim()
    .split('\n')
    .map((line) => {
      const match = line.match(/^(\s*)- (.+)/);
      if (!match) return null;
      const depth = Math.floor((match[1] || '').length / 2);
      const name = match[2].trim();
      const isFolder = name.endsWith('/');
      return { name, isFolder, depth, children: [] } as FileNode;
    })
    .filter((x): x is FileNode => !!x);
  const root: FileNode[] = [];
  const stack: FileNode[] = [];
  for (const node of lines) {
    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    stack.push(node);
  }
  return root;
}

const RenderNode: React.FC<{ node: FileNode }> = ({ node }) => {
  const [open, setOpen] = useState(true);
  const Icon = getIcon(node.name, node.isFolder);
  return (
    <li style={{ marginLeft: `${node.depth * 0}rem` }}>
      <span
        className="inline-block align-middle mr-1 cursor-pointer select-none"
        style={{ width: "1.5em" }}
        onClick={() => node.isFolder && setOpen((x) => !x)}
      >
        {Icon}
      </span>
      {node.name}
      {node.children && node.children.length > 0 && open && (
        <ul>
          {node.children.map((child, i) => (
            <RenderNode node={child} key={i} />
          ))}
        </ul>
      )}
    </li>
  );
};

// const RenderNode: React.FC<{ node: FileNode }> = ({ node }) => (
//   <li style={{ marginLeft: `${node.depth * 0}rem` }}>
//     {getIcon(node.name, node.isFolder)}
//     {node.name}
//     {node.children && node.children.length > 0 && (
//       <ul>
//         {node.children.map((child, i) => (
//           <RenderNode node={child} key={i} />
//         ))}
//       </ul>
//     )}
//   </li>
// );

const FileTree: React.FC<{ raw: string }> = ({ raw }) => {
  const tree = parseFileTree(raw);
  return (
    <ul className="filetree">
      {tree.map((node, i) => (
        <RenderNode node={node} key={i} />
      ))}
    </ul>
  );
};

export default FileTree;
