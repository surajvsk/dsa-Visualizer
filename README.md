# DSA Visualizer — Animated Learning App

Ek interactive React app jisme DSA (Data Structures & Algorithms) ke concepts animations ke through easily samajh aaye — beginner ho ya experienced, dono ke liye.

> **Note for Cursor / AI coding agent:** Is README ko spec ki tarah follow karo. Har section mein component structure, animation logic, aur behavior explain kiya gaya hai. Step-by-step build karo — pehle project setup, phir ek-ek visualizer component.

---

## 🎯 Goal

User kisi bhi DSA topic (Array, Linked List, Stack, Queue, Sorting, Recursion, Tree, Graph) ko select kare aur us par ek **animated, step-by-step visualization** dekhe — jaise:
- Array mein element insert/delete hote hue dikhana
- Sorting algorithm ke steps (swap, compare) live animate karna
- Recursion ka call stack build/unwind hote dikhana
- Tree/Graph traversal (BFS/DFS) mein nodes highlight karna

---

## 🛠 Tech Stack

| Purpose | Library |
|---|---|
| Framework | React (Vite setup, not CRA) |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| State management | React `useState` / `useReducer` (Redux ki zaroorat nahi) |
| Icons | lucide-react |
| Charts (agar complexity graph dikhana ho) | recharts |

```bash
npm create vite@latest dsa-visualizer -- --template react
cd dsa-visualizer
npm install framer-motion tailwindcss lucide-react recharts
npx tailwindcss init -p
```

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Sidebar.jsx          # Topic list (left nav)
│   │   └── TopBar.jsx           # Play/Pause/Speed controls
│   ├── Visualizers/
│   │   ├── ArrayVisualizer.jsx
│   │   ├── SortingVisualizer.jsx
│   │   ├── LinkedListVisualizer.jsx
│   │   ├── StackQueueVisualizer.jsx
│   │   ├── RecursionVisualizer.jsx
│   │   ├── TreeVisualizer.jsx
│   │   └── GraphVisualizer.jsx
│   ├── Controls/
│   │   ├── SpeedSlider.jsx
│   │   ├── PlayPauseButton.jsx
│   │   └── StepCounter.jsx
│   └── Explanation/
│       └── CodePanel.jsx        # Side-by-side code + current line highlight
├── hooks/
│   └── useAnimationQueue.js     # Core hook: manages step-by-step animation queue
├── algorithms/
│   ├── sorting.js               # bubbleSort, mergeSort, quickSort — return step arrays
│   ├── searching.js
│   ├── graphTraversal.js        # bfs(), dfs() — return step arrays
│   └── recursion.js             # factorial, fibonacci — return call-stack steps
├── App.jsx
└── main.jsx
```

---

## 🧠 Core Concept: "Step Array" Pattern

Har algorithm ko **animate karne ke bajaye directly**, pehle uske saare steps ek array mein generate karo. Phir ek player (jaise video player) un steps ko ek-ek karke dikhaye.

Ye pattern **har visualizer ke liye reuse hoga** — isliye pehle isse achhe se samjho.

### Example: Bubble Sort ke steps generate karna

```js
// algorithms/sorting.js
export function bubbleSortSteps(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      // Step 1: comparing dikhana
      steps.push({ array: [...a], comparing: [j, j + 1], swapped: false });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        // Step 2: swap ke baad dikhana
        steps.push({ array: [...a], comparing: [j, j + 1], swapped: true });
      }
    }
  }
  steps.push({ array: [...a], comparing: [], swapped: false, done: true });
  return steps;
}
```

Har `step` object mein current array state + kya highlight karna hai — ye info hoti hai. Animation component sirf ye steps ko sequentially render karega.

---

## ⏯ useAnimationQueue Hook

Ye hook sabhi visualizers mein reuse hoga — play, pause, next, prev, speed control.

```js
// hooks/useAnimationQueue.js
import { useState, useEffect, useRef } from 'react';

export function useAnimationQueue(steps, speed = 500) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying && currentIndex < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else if (currentIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(intervalRef.current);
  }, [isPlaying, currentIndex, steps.length, speed]);

  return {
    currentStep: steps[currentIndex],
    currentIndex,
    isPlaying,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    next: () => setCurrentIndex((i) => Math.min(i + 1, steps.length - 1)),
    prev: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    reset: () => setCurrentIndex(0),
  };
}
```

---

## 🎨 Visualizer Components

### 1. SortingVisualizer.jsx (sabse zyada priority — pehle ye banao)

Bars (divs) as array elements. Framer Motion se:
- Comparing elements ka color change (yellow highlight)
- Swap hone par smooth position transition (`layout` prop use karo)

```jsx
import { motion } from 'framer-motion';
import { useAnimationQueue } from '../hooks/useAnimationQueue';
import { bubbleSortSteps } from '../algorithms/sorting';

export default function SortingVisualizer({ initialArray }) {
  const steps = bubbleSortSteps(initialArray);
  const { currentStep, isPlaying, play, pause, next, prev } = useAnimationQueue(steps, 400);

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex items-end gap-2 h-64">
        {currentStep.array.map((value, idx) => {
          const isComparing = currentStep.comparing.includes(idx);
          return (
            <motion.div
              key={idx}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`w-10 flex items-end justify-center text-white text-sm rounded-t-md
                ${isComparing ? 'bg-amber-500' : 'bg-blue-500'}`}
              style={{ height: `${value * 4}px` }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded-lg">⏮ Prev</button>
        <button onClick={isPlaying ? pause : play} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={next} className="px-4 py-2 bg-gray-200 rounded-lg">Next ⏭</button>
      </div>
    </div>
  );
}
```

**Key animation trick:** `layout` prop Framer Motion mein — jab array re-order hota hai (swap), Framer Motion automatically smooth transition kar deta hai bina manual coordinates calculate kiye.

---

### 2. RecursionVisualizer.jsx (call stack dikhana)

Call stack ko **vertically stacked cards** ki tarah dikhao — jaise stack push/pop ho raha ho.

```jsx
<motion.div layout className="flex flex-col-reverse gap-1">
  {callStack.map((call, idx) => (
    <motion.div
      key={call.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-purple-100 border border-purple-400 rounded-md px-4 py-2"
    >
      {call.functionName}({call.args})
    </motion.div>
  ))}
</motion.div>
```

`AnimatePresence` wrap karna mat bhoolna jab items add/remove ho rahe hon:

```jsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {/* stack items yahan */}
</AnimatePresence>
```

---

### 3. LinkedListVisualizer.jsx

Nodes ko boxes ki tarah dikhao, arrows (SVG line ya CSS border) se connect karo. Insert/delete par:
- Naya node fade-in + scale animation se aaye
- Arrow reconnect ho jaye smoothly

```jsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="flex items-center gap-2"
>
  <div className="border-2 border-teal-500 rounded-lg px-4 py-3 flex">
    <span>{node.value}</span>
  </div>
  {node.next && <div className="text-2xl">→</div>}
</motion.div>
```

---

### 4. TreeVisualizer / GraphVisualizer

Traversal (BFS/DFS) ke time har node ko visit hone par color change karo (gray → yellow "visiting" → green "visited"). Steps array pattern yahan bhi same rahega:

```js
export function bfsSteps(graph, start) {
  const steps = [];
  const visited = new Set();
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    steps.push({ visiting: node, visited: [...visited] });
    graph[node].forEach((neighbor) => {
      if (!visited.has(neighbor)) queue.push(neighbor);
    });
  }
  return steps;
}
```

Tree/Graph ko draw karne ke liye SVG use karo (`<circle>` for nodes, `<line>` for edges), Framer Motion ka `motion.circle` aur `motion.line` support karta hai.

---

## 🎛 UI Layout (Overall App)

```
┌─────────────────────────────────────────────┐
│  TopBar: [Speed Slider] [Play/Pause] [Reset] │
├───────────┬───────────────────┬──────────────┤
│           │                   │              │
│  Sidebar  │   Visualizer      │  Code Panel  │
│  (topics) │   (animation area)│  (highlight  │
│           │                   │  current     │
│           │                   │  line)       │
│           │                   │              │
└───────────┴───────────────────┴──────────────┘
```

Sidebar topics list:
- Arrays & Strings
- Sorting (Bubble, Merge, Quick)
- Searching (Linear, Binary)
- Linked List
- Stack & Queue
- Recursion
- Trees & BST
- Graphs (BFS/DFS)
- Dynamic Programming

---

## 🚀 Build Order (Cursor ko is order mein prompt karo)

1. Vite + Tailwind + Framer Motion setup
2. `useAnimationQueue` hook banao
3. `SortingVisualizer` (bubble sort se shuru — sabse simple)
4. Sidebar + routing (topic switch karne ke liye — `react-router-dom` optional)
5. `CodePanel` add karo jo current step ke corresponding code line highlight kare
6. `RecursionVisualizer` (factorial/fibonacci)
7. `LinkedListVisualizer`
8. `TreeVisualizer` + `GraphVisualizer`
9. Speed control aur dark mode (polish)

---

## 💡 Tips

- Har naya sorting algorithm add karte waqt sirf `algorithms/sorting.js` mein naya `xyzSortSteps()` function banao — visualizer component wahi rahega, sirf steps generator change hoga.
- Animations ko **smooth aur slow** rakho (300-600ms) — fast animation confusing lagti hai jab seekh rahe ho.
- Mobile responsive banane ke liye Tailwind ke `flex-wrap` aur `overflow-x-auto` use karo, kyunki sorting bars horizontally overflow ho sakte hain chhoti screen par.

---

## 📚 Reference Algorithms to Implement First

| Category | Algorithm | Priority |
|---|---|---|
| Sorting | Bubble Sort | High |
| Sorting | Merge Sort | High |
| Sorting | Quick Sort | Medium |
| Searching | Binary Search | High |
| Recursion | Factorial | High |
| Recursion | Fibonacci (with memoization comparison) | Medium |
| Graph | BFS | High |
| Graph | DFS | High |
| Tree | Inorder/Preorder/Postorder traversal | Medium |
