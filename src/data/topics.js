import {
  BarChart3,
  Binary,
  Braces,
  GitBranch,
  Layers,
  Link2,
  Network,
  Search,
  Sigma,
} from 'lucide-react';

export const TOPICS = [
  { id: 'arrays', label: 'Arrays & Strings', hint: 'Insert, delete, shift', icon: Braces },
  { id: 'sorting', label: 'Sorting', hint: 'Bubble, Merge, Quick', icon: BarChart3 },
  { id: 'searching', label: 'Searching', hint: 'Linear & Binary', icon: Search },
  { id: 'linkedlist', label: 'Linked List', hint: 'Insert & delete nodes', icon: Link2 },
  { id: 'stackqueue', label: 'Stack & Queue', hint: 'LIFO vs FIFO', icon: Layers },
  { id: 'recursion', label: 'Recursion', hint: 'Call stack unwind', icon: Binary },
  { id: 'trees', label: 'Trees & BST', hint: 'In / Pre / Post order', icon: GitBranch },
  { id: 'graphs', label: 'Graphs', hint: 'BFS & DFS', icon: Network },
  { id: 'dp', label: 'Dynamic Programming', hint: 'Tables & memo', icon: Sigma },
];
