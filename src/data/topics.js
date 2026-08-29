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
  { id: 'arrays', label: 'Array', hint: 'Ek ke baad ek boxes', icon: Braces, step: 1 },
  { id: 'stackqueue', label: 'Stack & Queue', hint: 'Platein aur line', icon: Layers, step: 2 },
  { id: 'linkedlist', label: 'Linked List', hint: 'Train ke dabbe', icon: Link2, step: 3 },
  { id: 'searching', label: 'Khojna', hint: 'Number dhoondhna', icon: Search, step: 4 },
  { id: 'sorting', label: 'Sorting', hint: 'Chhote se bada', icon: BarChart3, step: 5 },
  { id: 'recursion', label: 'Recursion', hint: 'Kaam ko todna', icon: Binary, step: 6 },
  { id: 'trees', label: 'Tree', hint: 'Family tree', icon: GitBranch, step: 7 },
  { id: 'graphs', label: 'Graph', hint: 'Shehron ka naksha', icon: Network, step: 8 },
  { id: 'dp', label: 'DP', hint: 'Jawab yaad rakhna', icon: Sigma, step: 9 },
];

export const LESSONS = {
  arrays: {
    title: 'Array kya hai?',
    analogy: 'Almirah ki ek row socho. Har khane ka number hai — 0, 1, 2, 3… Wahi array hai.',
    goal: 'Dekho: beech mein naya number daalte hi aage wale right ko sarakte hain. Isliye insert slow padta hai.',
    remember: 'Array mein jagah ka address (index) se seedha pahunch sakte ho. Beech mein daalna mehnga hai.',
    next: 'stackqueue',
  },
  stackqueue: {
    title: 'Stack aur Queue',
    analogy: 'Stack = plates ki gaddi — upar wali hi uthati hai. Queue = ticket line — jo pehle aaya, wahi pehle nikalta hai.',
    goal: 'Pehle Stack chalao, phir Queue. Dekho same numbers, ulta niyam.',
    remember: 'Stack = Last In First Out. Queue = First In First Out.',
    next: 'linkedlist',
  },
  linkedlist: {
    title: 'Linked List kya hai?',
    analogy: 'Train ke dabbe. Har dabbe ko agle dabbe ka pata hai, poori row ka nahi.',
    goal: 'Shuruat (head) par naya dabba jodna aasan hai. Beech ka dabba dhoondhna padta hai, isliye time lagta hai.',
    remember: 'Head = pehla dabba. Arrow = agla kaun hai. Last ke baad kuch nahi (null).',
    next: 'searching',
  },
  searching: {
    title: 'Number kaise dhoondhein?',
    analogy: 'Linear = copy ke pehle page se last tak padhna. Binary = dictionary kholna — aadhi kitaab hamesha kaat dena.',
    goal: 'Pehle Linear dekho (seedha scan). Phir Binary — yeh tabhi chalega jab list pehle se sorted ho.',
    remember: 'Binary search sirf sorted array par. Har baar aadha hissa fenk dete ho.',
    next: 'sorting',
  },
  sorting: {
    title: 'Number chhote se bade kaise?',
    analogy: 'Bubble sort = padosi se height compare. Jo lamba hai, wo right ko “bubble” hota hua nikalta hai.',
    goal: 'Pehle sirf Bubble Sort dekho. Peela = dekh rahe ho. Laal = jagah badli. Hara = jagah pakki.',
    remember: 'Do padosiyon ko dekho. Galat order ho to swap. Last wala sabse bada ban jaata hai.',
    next: 'recursion',
  },
  recursion: {
    title: 'Recursion kya hai?',
    analogy: 'Badi problem ko chhoti copy ko de do, wo aur chhoti ko de de… jab jawab mil jaye to wapas jod do. Jaise nested boxes.',
    goal: 'Neeche cards badhte hue dekho — yeh waiting line hai. Jab 1 milta hai, upar wale hisaab laga ke uth jaate hain.',
    remember: 'Har recursion mein rukne ki jagah chahiye (base case), warna yeh kabhi khatam nahi hota.',
    next: 'trees',
  },
  trees: {
    title: 'Tree kya hai?',
    analogy: 'Family tree. Upar parent, neeche children. Left chhota, right bada — yahi BST ka simple rule hai.',
    goal: 'Inorder chalao: pehle left, phir khud, phir right. Numbers sorted nikalenge.',
    remember: 'Inorder = left → khud → right. Preorder = pehle khud. Postorder = last mein khud.',
    next: 'graphs',
  },
  graphs: {
    title: 'Graph kya hai?',
    analogy: 'Shehron ka naksha. Circle = shehar. Line = sadak. Koi “upar-neeche” nahi — kahin se kahin ja sakte ho.',
    goal: 'BFS padosi-padosi ghumta hai (line/queue). DFS ek raasta gehraai tak jaata hai (stack).',
    remember: 'Peela = abhi yahan hain. Neela = agle ummeedwar. Hara = dekh chuke.',
    next: 'dp',
  },
  dp: {
    title: 'Dynamic Programming',
    analogy: 'Homework ka jawab copy mein likh lo. Agli baar wahi sawal aaye to dobara mat gino — copy se padh lo.',
    goal: 'Fibonacci table bharte dekho. Har khana pichle do khanon ka jod hai. Naya kaam nahi, purana jawab use.',
    remember: 'DP = pehle chhota jawab nikaalo, likh lo, bada sawal usse banao.',
    next: null,
  },
};
