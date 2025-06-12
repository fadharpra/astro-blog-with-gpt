type FileNode = {
  name: string;
  isFolder: boolean;
  depth: number;
  children?: FileNode[];
};


function parseFileTree(raw: string): FileNode[] {
  const lines = raw
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\s*)- (.+)/);
      if (!match) return null;
      const depth = Math.floor((match[1] || '').length / 2); // 2 spasi per level
      const name = match[2].trim();
      const isFolder = name.endsWith('/');
      return { name, isFolder, depth, children: [] };
    })
    .filter(Boolean);

  const root: FileNode[] = [];
  const stack: FileNode[] = [];

  for (const node of lines as FileNode[]) {
    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children!.push(node);
    }
    stack.push(node);
  }
  return root;
}
