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
  { id: 'arrays', label: 'Array', hint: 'Boxes in a row', icon: Braces, step: 1 },
  { id: 'stackqueue', label: 'Stack & Queue', hint: 'Plates and a line', icon: Layers, step: 2 },
  { id: 'linkedlist', label: 'Linked List', hint: 'Train carriages', icon: Link2, step: 3 },
  { id: 'searching', label: 'Searching', hint: 'Find a number', icon: Search, step: 4 },
  { id: 'sorting', label: 'Sorting', hint: 'Small to big', icon: BarChart3, step: 5 },
  { id: 'recursion', label: 'Recursion', hint: 'Break the job down', icon: Binary, step: 6 },
  { id: 'trees', label: 'Tree', hint: 'A family tree', icon: GitBranch, step: 7 },
  { id: 'graphs', label: 'Graph', hint: 'A city map', icon: Network, step: 8 },
  { id: 'dp', label: 'DP', hint: 'Remember answers', icon: Sigma, step: 9 },
];

export const LESSONS = {
  arrays: {
    title: 'What is an array?',
    analogy:
      'Think of a row of lockers. Each locker has a number: 0, 1, 2, 3… That row is an array.',
    goal: 'Watch what happens when we put a number in the middle: everything after it has to slide right. That is why insert is slow.',
    remember: 'You can jump to any locker by its number (the index). Inserting in the middle is expensive because neighbors must move.',
    speech:
      'Let us learn arrays. Picture a row of lockers, each with a number starting from zero. If you push a new box into the middle, every box after it must slide over to make space. Press play, and watch the boxes move.',
    next: 'stackqueue',
  },
  stackqueue: {
    title: 'Stack and Queue',
    analogy:
      'A stack is a pile of plates — you only take the top one. A queue is a ticket line — the person who came first leaves first.',
    goal: 'Play the stack first, then the queue. Same numbers, opposite rules.',
    remember: 'Stack means last in, first out. Queue means first in, first out.',
    speech:
      'A stack is like plates at a buffet. You put a plate on top, and you take from the top. A queue is like standing in line. The first person in is the first person out. Press play and watch items go on and come off.',
    next: 'linkedlist',
  },
  linkedlist: {
    title: 'What is a linked list?',
    analogy:
      'Think of train carriages. Each carriage only knows the next one — not the whole train.',
    goal: 'Adding a carriage at the front is easy. Finding one in the middle means walking carriage by carriage.',
    remember: 'Head is the first carriage. The arrow says who is next. After the last one comes nothing — we call that null.',
    speech:
      'A linked list is like a train. Each box only knows the next box, not the whole row. Adding a new box at the front is quick. Finding a box in the middle means walking from the start. Press play to watch a new box join the train.',
    next: 'searching',
  },
  searching: {
    title: 'How do we find a number?',
    analogy:
      'Linear search is reading a book from page one. Binary search is opening a dictionary in the middle and throwing away half the pages each time.',
    goal: 'Try linear first — check one by one. Then binary — it only works if the list is already sorted.',
    remember: 'Binary search needs a sorted list. Every step, you throw away half of what is left.',
    speech:
      'Searching means finding a number in a list. Linear search checks every box from left to right, like reading page by page. Binary search is smarter, but the list must be sorted. It always looks at the middle, then throws away the half that cannot have the answer. Press play and watch.',
    next: 'sorting',
  },
  sorting: {
    title: 'How do we sort small to big?',
    analogy:
      'Bubble sort is like people in a line comparing height with their neighbor. The taller one keeps sliding right, like a bubble floating up.',
    goal: 'Start with Bubble Sort. Yellow means we are looking. Red means they swapped. Green means that spot is finished.',
    remember: 'Compare two neighbors. If they are in the wrong order, swap. After each pass, the biggest value sits on the right.',
    speech:
      'Sorting means lining numbers up from small to big. In bubble sort, we look at two neighbors. If the left one is bigger, they swap places. The big numbers slowly drift to the right, like bubbles. Yellow bars are being compared. Red means they just swapped. Green means that place is done. Press play.',
    next: 'recursion',
  },
  recursion: {
    title: 'What is recursion?',
    analogy:
      'Give a big job to a smaller copy of yourself. That copy gives it to an even smaller copy… until the job is tiny. Then answers fold back up, like nested boxes.',
    goal: 'Watch cards stack up — each one is waiting. When we hit 1, they calculate and leave, from the bottom up.',
    remember: 'Every recursion needs a stopping point, called the base case. Without it, it never ends.',
    speech:
      'Recursion means a function asks a smaller version of the same question. Like nested gift boxes. Cards pile up while they wait. When we reach the smallest question, we stop — that is the base case — and answers travel back up. Press play and watch the waiting cards grow and shrink.',
    next: 'trees',
  },
  trees: {
    title: 'What is a tree?',
    analogy:
      'Like a family tree. Parents on top, children below. In a BST, left is smaller and right is bigger.',
    goal: 'Play inorder: left, then me, then right. The numbers should come out already sorted.',
    remember: 'Inorder is left, me, right. Preorder visits me first. Postorder visits me last.',
    speech:
      'A tree is like a family tree. The top node is a parent. The ones below are children. In this binary search tree, smaller numbers live on the left, bigger on the right. Inorder walk means go left, visit me, then go right — and the numbers come out in order. Press play.',
    next: 'graphs',
  },
  graphs: {
    title: 'What is a graph?',
    analogy:
      'A map of cities. Circles are cities. Lines are roads. There is no up or down — you can go from anywhere to anywhere the roads allow.',
    goal: 'BFS walks neighbor by neighbor, like a line. DFS dives down one path, like a stack of choices.',
    remember: 'Yellow is where we are. Blue is next in line. Green means we already visited.',
    speech:
      'A graph is a map of cities and roads. Circles are cities. Lines are roads. B F S, or breadth first search, visits nearby cities first, using a queue, like a waiting line. D F S, or depth first search, goes deep down one road, using a stack. Press play and watch the cities light up.',
    next: 'dp',
  },
  dp: {
    title: 'Dynamic Programming',
    analogy:
      'Write homework answers in a notebook. Next time the same question appears, do not calculate again — just read the notebook.',
    goal: 'Watch the Fibonacci table fill. Each cell is the sum of the two before it. Old answers build new ones.',
    remember: 'DP means: solve a tiny piece, save it, then use it to solve a bigger piece.',
    speech:
      'Dynamic programming means we remember answers so we never solve the same tiny problem twice. For Fibonacci, we keep a table. Zero and one are easy. Every next number is just the two before it added together. Press play and watch the notebook fill in.',
    next: null,
  },
};
