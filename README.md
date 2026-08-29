# DSA Visualizer

Learn Data Structures and Algorithms by **watching pictures move** and **hearing a simple English explanation** for every step.

This is a React classroom app, not a code editor. Beginners start at Array and walk down a numbered path. Code is hidden until you ask for it.

---

## Run it

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173/`).

| Script | What it does |
|---|---|
| `npm run dev` | Start the learning app |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

Turn your **speaker on**. The first click on **Start** or **Play** unlocks the browser voice.

---

## How to use it

1. Read the welcome screen, then click **Start with arrays**.
2. A teacher voice explains the topic in plain English (lockers, plates, a ticket line).
3. Click **Play**. Each animation step is spoken, then the picture moves.
4. Yellow / red / green have meanings — the legend sits under the picture.
5. **Hear this topic** repeats the intro. **Voice on / Voice off** mutes the speaker.
6. Code is optional: **Show code**.
7. When you are ready, **Next topic** follows the easy → harder path.

**Keyboard:** `Space` play/pause · `←` `→` prev/next · `R` reset.

---

## Learning path

| # | Topic | What you watch |
|---|---|---|
| 1 | Array | Insert / delete — neighbors slide to make space |
| 2 | Stack & Queue | Plates (LIFO) vs a ticket line (FIFO) |
| 3 | Linked List | Train carriages — add at head/tail, delete a node |
| 4 | Searching | Linear scan, then binary search on a sorted list |
| 5 | Sorting | Bubble, Merge, Quick — compare, swap, sorted spots |
| 6 | Recursion | Factorial, Fibonacci, Fibonacci with a notebook (memo) |
| 7 | Tree | Inorder / preorder / postorder on a BST |
| 8 | Graph | BFS (queue) and DFS (stack) on a city map |
| 9 | DP | Fibonacci table and longest common subsequence |

---

## How animation works

Algorithms are **not** animated live. Each one first builds a **step array** (current state + what to highlight + a plain-English sentence). A player, like a video player, shows those steps one by one.

```js
// algorithms/sorting.js — one step looks like this
{ array: [...], comparing: [j, j + 1], swapped: false, description: 'Look at these two neighbors…' }
```

`useAnimationQueue` plays, pauses, steps, and resets. When **Voice on**, it **waits until the sentence is finished** before advancing.

Lesson copy and spoken intros live in `src/data/topics.js` (`LESSONS`).

---

## Tech stack

| Purpose | Library |
|---|---|
| App | React 19 + Vite 6 |
| Motion | Framer Motion |
| Style | Tailwind CSS 3 |
| Icons | lucide-react |
| Voice | Browser `speechSynthesis` (`src/lib/speech.js`) |
| State | React context — no Redux |

---

## Folder structure

```
src/
├── algorithms/           # Step generators (no UI)
│   ├── sorting.js        # bubble, merge, quick
│   ├── searching.js      # linear, binary
│   ├── linear.js         # array, linked list, stack, queue
│   ├── recursion.js
│   ├── tree.js
│   ├── graphTraversal.js
│   └── dp.js
├── components/
│   ├── Layout/           # Welcome, sidebar path, top bar, lesson shell
│   ├── Visualizers/      # One screen per topic
│   ├── Controls/         # Play, speed, step slider
│   └── Explanation/      # Optional code panel
├── context/
│   ├── LearnContext.jsx  # Topic + welcome
│   └── PlayerContext.jsx # Speed, voice, player controls
├── data/
│   ├── topics.js         # Path, analogies, spoken intros
│   └── codeSnippets.js
├── hooks/
│   ├── useAnimationQueue.js
│   └── useVisualizerPlayer.js
├── lib/
│   └── speech.js         # English text-to-speech
├── App.jsx
└── main.jsx
```

---

## Adding a new algorithm

1. Write a `xyzSteps(input)` function that returns an array of step objects. Each step needs a `description` in simple English (that sentence is what the voice reads).
2. Reuse the existing visualizer if the picture is the same (for example another sort only needs a new generator in `sorting.js`).
3. Keep animations slow. Fast motion is hard to learn from.

---

## Notes

- First-visit welcome is stored in `localStorage` as `dsa-welcome`.
- Speech uses the system English voice. Chrome may stay silent until the user clicks once.
- If PowerShell blocks `npm` (`running scripts is disabled`), run `npm.cmd run dev` or use Command Prompt.
