export type SkillKey =
  | 'basics'
  | 'linear-ds'
  | 'recursion'
  | 'algorithms'
  | 'trees'
  | 'graphs'

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export const user = {
  name: 'Mohammed Aatif',
  fullName: 'Mohammed Aatif Zafar',
  email: 'aatif@codementor.ai',
  avatar: '/student-avatar.png',
  experience: 'Intermediate',
  preferredLanguage: 'C++',
  joinedAt: 'March 2025',
  dailyTargetMinutes: 45,
  learningGoals: 'Master all 21 C++ Data Structures & Algorithms concepts and prepare for competitive coding & technical interviews.',
}

export const streak = {
  current: 12,
  longest: 28,
  weeklyGoal: 5,
  daysThisWeek: 4,
  activeDays: [true, true, false, true, true, true, false],
}

export const overallProgress = {
  percent: 74,
  level: 8,
  xp: 4120,
  xpToNext: 5000,
  problemsSolved: 21,
  accuracy: 91,
  avgSolveTimeMin: 11.2,
}

export type Skill = {
  key: SkillKey
  name: string
  mastery: number
  lessonsCompleted: number
  totalLessons: number
  trend: number
  color: string
}

export const skills: Skill[] = [
  { key: 'basics', name: 'DS Basics & Complexity', mastery: 96, lessonsCompleted: 14, totalLessons: 14, trend: 5, color: 'var(--chart-4)' },
  { key: 'linear-ds', name: 'Arrays, Stacks & Queues', mastery: 90, lessonsCompleted: 18, totalLessons: 20, trend: 12, color: 'var(--chart-2)' },
  { key: 'recursion', name: 'Recursion & Backtracking', mastery: 84, lessonsCompleted: 10, totalLessons: 12, trend: 8, color: 'var(--chart-1)' },
  { key: 'algorithms', name: 'Searching & Sorting', mastery: 78, lessonsCompleted: 12, totalLessons: 16, trend: 7, color: 'var(--chart-5)' },
  { key: 'trees', name: 'Trees, BST, AVL & B-Trees', mastery: 68, lessonsCompleted: 14, totalLessons: 22, trend: 9, color: 'var(--chart-3)' },
  { key: 'graphs', name: 'Graphs, BFS/DFS & MST', mastery: 62, lessonsCompleted: 9, totalLessons: 18, trend: 11, color: 'var(--chart-2)' },
]

export const radarData = skills.map((s) => ({
  skill: s.name,
  mastery: s.mastery,
}))

export const weeklyActivity = [
  { day: 'Mon', minutes: 55, problems: 4 },
  { day: 'Tue', minutes: 42, problems: 3 },
  { day: 'Wed', minutes: 0, problems: 0 },
  { day: 'Thu', minutes: 68, problems: 6 },
  { day: 'Fri', minutes: 48, problems: 4 },
  { day: 'Sat', minutes: 75, problems: 7 },
  { day: 'Sun', minutes: 30, problems: 2 },
]

export const masteryTrend = [
  { week: 'W1', mastery: 45 },
  { week: 'W2', mastery: 52 },
  { week: 'W3', mastery: 58 },
  { week: 'W4', mastery: 64 },
  { week: 'W5', mastery: 70 },
  { week: 'W6', mastery: 74 },
]

export const aiInsight =
  "Great momentum in C++ Data Structures! You've mastered linear structures and sorting algorithms (+12% this week). Focus your next practice session on Self-Balancing AVL Trees and Graph Shortest Paths (Dijkstra)."

export const continueLearning = {
  title: 'BST & Self-Balancing AVL Trees in C++',
  topic: 'Advanced Tree Data Structures',
  lesson: 'Concept 16 & 17 of 21',
  progress: 65,
  estimatedMin: 20,
}

export type Recommendation = {
  id: string
  title: string
  reason: string
  type: 'Lesson' | 'Practice' | 'Review'
  skill: string
  difficulty: Difficulty
  estimatedMin: number
}

export const recommendations: Recommendation[] = [
  { id: 'r1', title: 'Circular Queues (Ring Buffer) in C++', reason: 'Strengthens modulo index arithmetic in bounded queues', type: 'Practice', skill: 'Linear Data Structures', difficulty: 'Medium', estimatedMin: 15 },
  { id: 'r2', title: 'AVL Trees & Rotations in C++', reason: 'Master O(log n) tree balance guarantees', type: 'Lesson', skill: 'Trees', difficulty: 'Hard', estimatedMin: 25 },
  { id: 'r3', title: 'Dijkstra & Kruskal Minimum Spanning Tree', reason: 'Essential graph algorithms for coding interviews', type: 'Review', skill: 'Graphs', difficulty: 'Hard', estimatedMin: 30 },
]

export type Activity = {
  id: string
  action: string
  detail: string
  time: string
  status: 'success' | 'info' | 'warning'
}

export const recentActivity: Activity[] = [
  { id: 'a1', action: 'Solved', detail: 'Infix to Postfix Conversion with Stack (C++)', time: '1h ago', status: 'success' },
  { id: 'a2', action: 'Completed', detail: 'Recursion & Backtracking: 4-Queens Problem', time: '3h ago', status: 'info' },
  { id: 'a3', action: 'Practiced', detail: 'Binary Search Tree (BST) & Inorder Traversal', time: 'Yesterday', status: 'success' },
  { id: 'a4', action: 'Reviewed', detail: 'Heaps & Heap Sort in O(n log n)', time: 'Yesterday', status: 'warning' },
  { id: 'a5', action: 'Earned badge', detail: 'Data Structures Explorer (C++)', time: '2 days ago', status: 'info' },
]

export type ProblemTestCase = {
  id: string
  name?: string
  input: string
  expectedOutput: string
}

export type Problem = {
  id: string
  title: string
  conceptNumber: number
  description: string
  difficulty: Difficulty
  skill: string
  language: string
  estimatedMin: number
  recommended?: boolean
  acceptance: number
  tags: string[]
  sample: string
  testCases?: ProblemTestCase[]
}

export const problems: Problem[] = [
  {
    id: 'p1',
    conceptNumber: 1,
    title: 'Data Structures Basics',
    description: 'Understand fundamental memory layout, custom node struct, pointer references, and dynamic allocation in C++.',
    difficulty: 'Easy',
    skill: 'Data Structures Basics',
    language: 'C++',
    estimatedMin: 10,
    recommended: true,
    acceptance: 92,
    tags: ['Data Structures', 'Pointers', 'Memory Layout', 'Structs'],
    sample: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Basic data structure node representing a memory record
struct DataNode {
    int id;
    string label;
    double value;

    DataNode(int i, string l, double v) : id(i), label(l), value(v) {}

    void display() const {
        cout << "Node [ID: " << id << ", Label: " << label << ", Value: " << value << "]" << endl;
    }
};

int main() {
    cout << "=== 1. Data Structures Basics in C++ ===" << endl;
    
    // Static record
    DataNode n1(101, "Sensor_Alpha", 98.6);
    n1.display();

    // Dynamic record allocation
    DataNode* n2 = new DataNode(102, "Sensor_Beta", 104.2);
    n2->display();

    delete n2;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Node id check', input: 'new DataNode(101, "Sensor_Alpha", 98.6).id', expectedOutput: '101' },
      { id: 'tc2', name: 'Node label check', input: 'new DataNode(102, "Sensor_Beta", 104.2).label', expectedOutput: 'Sensor_Beta' },
    ],
  },
  {
    id: 'p2',
    conceptNumber: 2,
    title: 'Asymptotic Notation & Complexity',
    description: 'Analyze algorithm efficiency using Big-O, Big-Omega, and Big-Theta notations with operation counters for O(1), O(log n), O(n), and O(n^2).',
    difficulty: 'Easy',
    skill: 'Complexity Analysis',
    language: 'C++',
    estimatedMin: 12,
    recommended: true,
    acceptance: 88,
    tags: ['Complexity', 'Big-O', 'Asymptotic Notation', 'Analysis'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

// O(1) Constant Time
int constantTimeAccess(const vector<int>& arr, int index) {
    return arr[index];
}

// O(log n) Logarithmic Time
int logarithmicSteps(int n) {
    int steps = 0;
    while (n > 1) {
        n = Math.floor(n / 2);
        steps++;
    }
    return steps;
}

// O(n) Linear Time
int linearSum(const vector<int>& arr) {
    int total = 0;
    for (int x : arr) total += x;
    return total;
}

// O(n^2) Quadratic Time
int quadraticPairsCount(const vector<int>& arr) {
    int count = 0;
    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr.size(); j++) {
            count++;
        }
    }
    return count;
}

int main() {
    cout << "=== 2. Asymptotic Notation & Complexity ===" << endl;
    vector<int> data = {10, 20, 30, 40, 50, 60, 70, 80};

    cout << "O(1) Direct Access at idx 2: " << constantTimeAccess(data, 2) << endl;
    cout << "O(log n) Halving steps for n=64: " << logarithmicSteps(64) << endl;
    cout << "O(n) Linear sum of 8 items: " << linearSum(data) << endl;
    cout << "O(n^2) Total pair comparisons for n=8: " << quadraticPairsCount(data) << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Logarithmic steps n=64', input: 'logarithmicSteps(64)', expectedOutput: '6' },
      { id: 'tc2', name: 'Linear sum', input: 'linearSum({10, 20, 30})', expectedOutput: '60' },
    ],
  },
  {
    id: 'p3',
    conceptNumber: 3,
    title: 'Arrays',
    description: 'Perform core 1D and 2D array operations, dynamic vector resizing, in-place element reversal using two pointers, and subsegment traversal.',
    difficulty: 'Easy',
    skill: 'Arrays',
    language: 'C++',
    estimatedMin: 14,
    recommended: true,
    acceptance: 85,
    tags: ['Arrays', 'Two Pointers', 'Vector', 'Linear Data Structures'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

void reverseArray(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

void printArray(const vector<int>& arr) {
    cout << "[";
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i] << (i + 1 < arr.size() ? ", " : "");
    }
    cout << "]" << endl;
}

int main() {
    cout << "=== 3. Arrays & Dynamic Operations ===" << endl;
    vector<int> nums = {12, 24, 36, 48, 60};
    
    cout << "Original Array: ";
    printArray(nums);

    nums.push_back(72);
    cout << "After push_back(72): ";
    printArray(nums);

    reverseArray(nums);
    cout << "After Two-Pointer Reversal: ";
    printArray(nums);

    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Reverse array', input: '(() => { let a = [1, 2, 3]; reverseArray(a); return a; })()', expectedOutput: '[3, 2, 1]' },
    ],
  },
  {
    id: 'p4',
    conceptNumber: 4,
    title: 'Stacks',
    description: 'Implement a Last-In First-Out (LIFO) Stack data structure with push, pop, peek, and isEmpty operations.',
    difficulty: 'Medium',
    skill: 'Linear Data Structures',
    language: 'C++',
    estimatedMin: 18,
    recommended: true,
    acceptance: 79,
    tags: ['Stacks', 'LIFO', 'Data Structures'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

class Stack {
private:
    vector<int> elements;

public:
    void push(int val) {
        elements.push_back(val);
        cout << "Pushed: " << val << endl;
    }

    int pop() {
        if (isEmpty()) {
            cout << "Stack Underflow!" << endl;
            return -1;
        }
        int topVal = elements.back();
        elements.pop_back();
        return topVal;
    }

    int peek() const {
        if (isEmpty()) return -1;
        return elements.back();
    }

    bool isEmpty() const {
        return elements.empty();
    }

    int size() const {
        return elements.size();
    }
};

int main() {
    cout << "=== 4. Stacks (LIFO) ===" << endl;
    Stack st;
    st.push(10);
    st.push(20);
    st.push(30);

    cout << "Current Top: " << st.peek() << endl;
    cout << "Popped: " << st.pop() << endl;
    cout << "New Top: " << st.peek() << endl;
    cout << "Is Empty: " << (st.isEmpty() ? "true" : "false") << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Stack push and peek', input: '(() => { let s = new Stack(); s.push(10); s.push(20); return s.peek(); })()', expectedOutput: '20' },
      { id: 'tc2', name: 'Stack empty check', input: '(() => { let s = new Stack(); return s.isEmpty(); })()', expectedOutput: 'true' },
    ],
  },
  {
    id: 'p5',
    conceptNumber: 5,
    title: 'Infix / Prefix / Postfix',
    description: 'Convert standard infix arithmetic expressions to postfix notation (Reverse Polish Notation) and evaluate expressions using a Stack.',
    difficulty: 'Medium',
    skill: 'Stack Applications',
    language: 'C++',
    estimatedMin: 22,
    recommended: true,
    acceptance: 71,
    tags: ['Stacks', 'Expressions', 'Infix to Postfix', 'Evaluation'],
    sample: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

string infixToPostfix(const string& infix) {
    string postfix = "";
    vector<char> st;

    for (int i = 0; i < infix.length(); i++) {
        char ch = infix[i];
        if (ch == ' ') continue;

        if (isalnum(ch)) {
            postfix += ch;
        } else if (ch == '(') {
            st.push_back(ch);
        } else if (ch == ')') {
            while (!st.empty() && st.back() != '(') {
                postfix += st.back();
                st.pop_back();
            }
            if (!st.empty()) st.pop_back(); // Pop '('
        } else {
            while (!st.empty() && precedence(st.back()) >= precedence(ch)) {
                postfix += st.back();
                st.pop_back();
            }
            st.push_back(ch);
        }
    }

    while (!st.empty()) {
        postfix += st.back();
        st.pop_back();
    }
    return postfix;
}

int evaluatePostfix(const string& postfix) {
    vector<int> st;
    for (int i = 0; i < postfix.length(); i++) {
        char ch = postfix[i];
        if (isdigit(ch)) {
            st.push_back(ch - '0');
        } else {
            int val2 = st.back(); st.pop_back();
            int val1 = st.back(); st.pop_back();
            if (ch == '+') st.push_back(val1 + val2);
            else if (ch == '-') st.push_back(val1 - val2);
            else if (ch == '*') st.push_back(val1 * val2);
            else if (ch == '/') st.push_back(Math.floor(val1 / val2));
        }
    }
    return st.back();
}

int main() {
    cout << "=== 5. Infix / Prefix / Postfix Expressions ===" << endl;
    string expr = "(2+3)*4-5";
    string postfix = infixToPostfix(expr);

    cout << "Infix Expression:   " << expr << endl;
    cout << "Postfix Expression: " << postfix << endl;
    cout << "Evaluation Result:  " << evaluatePostfix(postfix) << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Infix to Postfix', input: 'infixToPostfix("(2+3)*4")', expectedOutput: '23+4*' },
      { id: 'tc2', name: 'Evaluate Postfix', input: 'evaluatePostfix("23+4*")', expectedOutput: '20' },
    ],
  },
  {
    id: 'p6',
    conceptNumber: 6,
    title: 'Recursion & Backtracking',
    description: 'Master call stack mechanics, base cases, and state exploration with recursive subset generation and the classic N-Queens placement solver.',
    difficulty: 'Hard',
    skill: 'Recursion & Backtracking',
    language: 'C++',
    estimatedMin: 25,
    recommended: true,
    acceptance: 64,
    tags: ['Recursion', 'Backtracking', 'N-Queens', 'Algorithms'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

// Check if a queen can be safely placed at board[row] = col
bool isSafe(const vector<int>& board, int row, int col) {
    for (int i = 0; i < row; i++) {
        int prevCol = board[i];
        if (prevCol == col || abs(prevCol - col) == abs(i - row)) {
            return false;
        }
    }
    return true;
}

void solveNQueens(int row, int n, vector<int>& board, int& solutionsCount) {
    if (row == n) {
        solutionsCount++;
        cout << "Solution " << solutionsCount << ": [";
        for (int i = 0; i < n; i++) cout << board[i] << (i + 1 < n ? ", " : "");
        cout << "]" << endl;
        return;
    }

    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
            board[row] = col;
            solveNQueens(row + 1, n, board, solutionsCount);
            // Backtrack
            board[row] = -1;
        }
    }
}

int main() {
    cout << "=== 6. Recursion & Backtracking (4-Queens) ===" << endl;
    int n = 4;
    vector<int> board(n, -1);
    int solutions = 0;

    solveNQueens(0, n, board, solutions);
    cout << "Total distinct solutions for " << n << "-Queens: " << solutions << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Queen safe check at (0, 0)', input: 'isSafe([-1, -1, -1, -1], 0, 0)', expectedOutput: 'true' },
      { id: 'tc2', name: 'Queen diagonal attack check', input: 'isSafe([0, -1, -1, -1], 1, 1)', expectedOutput: 'false' },
    ],
  },
  {
    id: 'p7',
    conceptNumber: 7,
    title: 'Queues',
    description: 'Implement a First-In First-Out (FIFO) linear queue with enqueue, dequeue, peek/front, and isEmpty methods.',
    difficulty: 'Easy',
    skill: 'Linear Data Structures',
    language: 'C++',
    estimatedMin: 12,
    recommended: false,
    acceptance: 86,
    tags: ['Queues', 'FIFO', 'Linear Data Structures'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

class Queue {
private:
    vector<int> items;
    int frontIndex;

public:
    Queue() : frontIndex(0) {}

    void enqueue(int x) {
        items.push_back(x);
        cout << "Enqueued: " << x << endl;
    }

    int dequeue() {
        if (isEmpty()) {
            cout << "Queue Underflow!" << endl;
            return -1;
        }
        int val = items[frontIndex];
        frontIndex++;
        return val;
    }

    int front() const {
        if (isEmpty()) return -1;
        return items[frontIndex];
    }

    bool isEmpty() const {
        return frontIndex >= items.size();
    }

    int size() const {
        return items.size() - frontIndex;
    }
};

int main() {
    cout << "=== 7. Linear Queue (FIFO) ===" << endl;
    Queue q;
    q.enqueue(100);
    q.enqueue(200);
    q.enqueue(300);

    cout << "Front element: " << q.front() << endl;
    cout << "Dequeued: " << q.dequeue() << endl;
    cout << "New Front: " << q.front() << endl;
    cout << "Remaining Size: " << q.size() << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Enqueue and Front', input: '(() => { let q = new Queue(); q.enqueue(100); q.enqueue(200); return q.front(); })()', expectedOutput: '100' },
      { id: 'tc2', name: 'Dequeue', input: '(() => { let q = new Queue(); q.enqueue(100); q.enqueue(200); q.dequeue(); return q.front(); })()', expectedOutput: '200' },
    ],
  },
  {
    id: 'p8',
    conceptNumber: 8,
    title: 'Circular Queues',
    description: 'Build an efficient Ring Buffer using fixed-size array allocation with modulo arithmetic index wrap-around: (rear + 1) % capacity.',
    difficulty: 'Medium',
    skill: 'Linear Data Structures',
    language: 'C++',
    estimatedMin: 18,
    recommended: false,
    acceptance: 75,
    tags: ['Circular Queues', 'Ring Buffer', 'Modulo Arithmetic'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

class CircularQueue {
private:
    vector<int> buffer;
    int front;
    int rear;
    int count;
    int capacity;

public:
    CircularQueue(int cap) : capacity(cap), front(0), rear(-1), count(0) {
        buffer.resize(cap);
    }

    bool enqueue(int val) {
        if (isFull()) {
            cout << "Queue is Full! Cannot enqueue " << val << endl;
            return false;
        }
        rear = (rear + 1) % capacity;
        buffer[rear] = val;
        count++;
        cout << "Enqueued: " << val << " (Count: " << count << ")" << endl;
        return true;
    }

    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is Empty!" << endl;
            return -1;
        }
        int val = buffer[front];
        front = (front + 1) % capacity;
        count--;
        return val;
    }

    int peek() const {
        if (isEmpty()) return -1;
        return buffer[front];
    }

    bool isEmpty() const { return count == 0; }
    bool isFull() const { return count == capacity; }
};

int main() {
    cout << "=== 8. Circular Queue (Ring Buffer) ===" << endl;
    CircularQueue cq(3);
    cq.enqueue(10);
    cq.enqueue(20);
    cq.enqueue(30);
    cq.enqueue(40); // Full

    cout << "Dequeued: " << cq.dequeue() << endl;
    cq.enqueue(40); // Wraps around
    cout << "Front item: " << cq.peek() << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Circular Queue wrap around', input: '(() => { let cq = new CircularQueue(3); cq.enqueue(10); cq.enqueue(20); cq.enqueue(30); cq.dequeue(); cq.enqueue(40); return cq.peek(); })()', expectedOutput: '20' },
    ],
  },
  {
    id: 'p9',
    conceptNumber: 9,
    title: 'Linked Lists',
    description: 'Create Singly and Doubly Linked Lists with dynamic nodes, head/tail insertion, deletion, and in-place pointer reversal.',
    difficulty: 'Medium',
    skill: 'Linked Lists',
    language: 'C++',
    estimatedMin: 20,
    recommended: false,
    acceptance: 77,
    tags: ['Linked Lists', 'Pointers', 'Data Structures'],
    sample: `#include <iostream>

using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
public:
    Node* head;

    LinkedList() : head(nullptr) {}

    void insertAtHead(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    void insertAtEnd(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
            return;
        }
        Node* curr = head;
        while (curr->next) {
            curr = curr->next;
        }
        curr->next = newNode;
    }

    void reverse() {
        Node* prev = nullptr;
        Node* curr = head;
        Node* nextNode = nullptr;
        while (curr) {
            nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        head = prev;
    }

    void print() const {
        Node* curr = head;
        while (curr) {
            cout << curr->data << (curr->next ? " -> " : "");
            curr = curr->next;
        }
        cout << " -> NULL" << endl;
    }
};

int main() {
    cout << "=== 9. Singly Linked List ===" << endl;
    LinkedList list;
    list.insertAtEnd(10);
    list.insertAtEnd(20);
    list.insertAtEnd(30);
    list.insertAtHead(5);

    cout << "Original List: ";
    list.print();

    list.reverse();
    cout << "Reversed List: ";
    list.print();

    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Linked list head value', input: '(() => { let l = new LinkedList(); l.insertAtEnd(10); l.insertAtHead(5); return l.head.data; })()', expectedOutput: '5' },
    ],
  },
  {
    id: 'p10',
    conceptNumber: 10,
    title: 'Searching',
    description: 'Implement Linear Search O(n) and Binary Search O(log n) (iterative & recursive) on ordered arrays with step comparisons.',
    difficulty: 'Easy',
    skill: 'Searching Algorithms',
    language: 'C++',
    estimatedMin: 12,
    recommended: false,
    acceptance: 89,
    tags: ['Searching', 'Binary Search', 'Linear Search', 'Divide & Conquer'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + Math.floor((right - left) / 2);
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    cout << "=== 10. Searching Algorithms ===" << endl;
    vector<int> sortedData = {3, 9, 14, 19, 25, 31, 42, 57, 68, 79};
    int target = 42;

    int linIdx = linearSearch(sortedData, target);
    int binIdx = binarySearch(sortedData, target);

    cout << "Target: " << target << endl;
    cout << "Linear Search found at index: " << linIdx << endl;
    cout << "Binary Search found at index: " << binIdx << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Binary search found', input: 'binarySearch({3, 9, 14, 19, 25, 31, 42, 57}, 42)', expectedOutput: '6' },
      { id: 'tc2', name: 'Binary search not found', input: 'binarySearch({3, 9, 14, 19, 25, 31, 42, 57}, 99)', expectedOutput: '-1' },
    ],
  },
  {
    id: 'p11',
    conceptNumber: 11,
    title: 'Sorting',
    description: 'Implement divide-and-conquer sorting algorithms including Merge Sort O(n log n) and Quick Sort with partition routines.',
    difficulty: 'Medium',
    skill: 'Sorting Algorithms',
    language: 'C++',
    estimatedMin: 20,
    recommended: false,
    acceptance: 76,
    tags: ['Sorting', 'Merge Sort', 'Quick Sort', 'Divide & Conquer'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp;
    int i = left, j = mid + 1;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= mid) temp.push_back(arr[i++]);
    while (j <= right) temp.push_back(arr[j++]);

    for (int k = 0; k < temp.size(); k++) {
        arr[left + k] = temp[k];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + Math.floor((right - left) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void print(const vector<int>& arr) {
    for (int x : arr) cout << x << " ";
    cout << endl;
}

int main() {
    cout << "=== 11. Sorting Algorithms (Merge Sort) ===" << endl;
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};

    cout << "Unsorted: ";
    print(arr);

    mergeSort(arr, 0, arr.size() - 1);

    cout << "Sorted:   ";
    print(arr);
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Merge Sort array', input: '(() => { let a = [5, 2, 8, 1]; mergeSort(a, 0, 3); return a; })()', expectedOutput: '[1, 2, 5, 8]' },
    ],
  },
  {
    id: 'p12',
    conceptNumber: 12,
    title: 'Heaps & Heap Sort',
    description: 'Build a Binary Max-Heap with heapify-up, heapify-down, maximum extraction, and in-place O(n log n) Heap Sort.',
    difficulty: 'Hard',
    skill: 'Heaps',
    language: 'C++',
    estimatedMin: 25,
    recommended: false,
    acceptance: 68,
    tags: ['Heaps', 'Heap Sort', 'Priority Queue', 'Trees'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    // Build max heap
    for (int i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}

int main() {
    cout << "=== 12. Heaps & Heap Sort ===" << endl;
    vector<int> arr = {12, 11, 13, 5, 6, 7};

    cout << "Before Heap Sort: ";
    for (int x : arr) cout << x << " ";
    cout << endl;

    heapSort(arr);

    cout << "After Heap Sort:  ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Heap sort test', input: '(() => { let a = [12, 11, 13, 5, 6, 7]; heapSort(a); return a; })()', expectedOutput: '[5, 6, 7, 11, 12, 13]' },
    ],
  },
  {
    id: 'p13',
    conceptNumber: 13,
    title: 'Hashing',
    description: 'Implement a custom Hash Table with hash code indexing, separate chaining collision resolution with linked buckets, and O(1) average lookup.',
    difficulty: 'Medium',
    skill: 'Hashing',
    language: 'C++',
    estimatedMin: 20,
    recommended: false,
    acceptance: 80,
    tags: ['Hashing', 'Hash Table', 'Separate Chaining', 'Data Structures'],
    sample: `#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct HashItem {
    string key;
    int value;
    HashItem* next;
    HashItem(string k, int v) : key(k), value(v), next(nullptr) {}
};

class HashTable {
private:
    int bucketCount;
    vector<HashItem*> table;

    int hashFunction(const string& key) const {
        int hash = 0;
        for (int i = 0; i < key.length(); i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % bucketCount;
        }
        return (hash + bucketCount) % bucketCount;
    }

public:
    HashTable(int size = 7) : bucketCount(size) {
        table.resize(size, null);
    }

    void insert(const string& key, int val) {
        int idx = hashFunction(key);
        HashItem* curr = table[idx];
        while (curr) {
            if (curr->key == key) {
                curr->value = val;
                return;
            }
            curr = curr->next;
        }
        HashItem* newItem = new HashItem(key, val);
        newItem->next = table[idx];
        table[idx] = newItem;
        cout << "Inserted [" << key << " -> " << val << "] at bucket " << idx << endl;
    }

    int search(const string& key) const {
        int idx = hashFunction(key);
        HashItem* curr = table[idx];
        while (curr) {
            if (curr->key == key) return curr->value;
            curr = curr->next;
        }
        return -1;
    }
};

int main() {
    cout << "=== 13. Hashing (Separate Chaining) ===" << endl;
    HashTable ht(5);
    ht.insert("apple", 15);
    ht.insert("banana", 28);
    ht.insert("cherry", 42);

    cout << "Lookup 'apple': " << ht.search("apple") << endl;
    cout << "Lookup 'banana': " << ht.search("banana") << endl;
    cout << "Lookup 'grape': " << ht.search("grape") << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Hash Table search', input: '(() => { let h = new HashTable(5); h.insert("apple", 15); return h.search("apple"); })()', expectedOutput: '15' },
    ],
  },
  {
    id: 'p14',
    conceptNumber: 14,
    title: 'Binary Trees',
    description: 'Construct hierarchical Binary Tree structures, calculate tree height, count total nodes, and count leaf nodes recursively.',
    difficulty: 'Easy',
    skill: 'Binary Trees',
    language: 'C++',
    estimatedMin: 14,
    recommended: false,
    acceptance: 87,
    tags: ['Binary Trees', 'Trees', 'Recursion', 'Data Structures'],
    sample: `#include <iostream>
#include <algorithm>

using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

int treeHeight(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(treeHeight(root->left), treeHeight(root->right));
}

int countNodes(TreeNode* root) {
    if (!root) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}

int countLeaves(TreeNode* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}

int main() {
    cout << "=== 14. Binary Tree Properties ===" << endl;
    // Tree:
    //        1
    //       / \\
    //      2   3
    //     / \\
    //    4   5
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    cout << "Total Nodes: " << countNodes(root) << endl;
    cout << "Tree Height: " << treeHeight(root) << endl;
    cout << "Leaf Nodes:  " << countLeaves(root) << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Tree total nodes count', input: '(() => { let r = new TreeNode(1); r.left = new TreeNode(2); r.right = new TreeNode(3); return countNodes(r); })()', expectedOutput: '3' },
    ],
  },
  {
    id: 'p15',
    conceptNumber: 15,
    title: 'Tree Traversals',
    description: 'Execute Depth-First Traversals (Inorder, Preorder, Postorder) and Breadth-First Traversal (BFS Level-Order) on a Binary Tree.',
    difficulty: 'Medium',
    skill: 'Binary Trees',
    language: 'C++',
    estimatedMin: 16,
    recommended: false,
    acceptance: 82,
    tags: ['Tree Traversals', 'DFS', 'BFS', 'Inorder', 'Preorder', 'Level Order'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

void preorder(TreeNode* root) {
    if (!root) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}

void postorder(TreeNode* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    cout << root->val << " ";
}

void levelOrder(TreeNode* root) {
    if (!root) return;
    vector<TreeNode*> q;
    q.push_back(root);
    int head = 0;
    while (head < q.size()) {
        TreeNode* curr = q[head++];
        cout << curr->val << " ";
        if (curr->left) q.push_back(curr->left);
        if (curr->right) q.push_back(curr->right);
    }
}

int main() {
    cout << "=== 15. Tree Traversals ===" << endl;
    TreeNode* root = new TreeNode(10);
    root->left = new TreeNode(5);
    root->right = new TreeNode(20);
    root->left->left = new TreeNode(3);
    root->left->right = new TreeNode(7);

    cout << "Inorder (L-Root-R):    "; inorder(root); cout << endl;
    cout << "Preorder (Root-L-R):   "; preorder(root); cout << endl;
    cout << "Postorder (L-R-Root):  "; postorder(root); cout << endl;
    cout << "Level Order (BFS):     "; levelOrder(root); cout << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Root value check', input: '(() => { let r = new TreeNode(10); return r.val; })()', expectedOutput: '10' },
    ],
  },
  {
    id: 'p16',
    conceptNumber: 16,
    title: 'BST',
    description: 'Implement Binary Search Tree (BST) maintaining the left < root < right invariant with insertion, key search, min/max lookup, and sorted retrieval.',
    difficulty: 'Medium',
    skill: 'Binary Search Trees',
    language: 'C++',
    estimatedMin: 20,
    recommended: false,
    acceptance: 78,
    tags: ['BST', 'Binary Search Tree', 'Data Structures', 'Search Trees'],
    sample: `#include <iostream>

using namespace std;

struct BSTNode {
    int key;
    BSTNode* left;
    BSTNode* right;
    BSTNode(int k) : key(k), left(nullptr), right(nullptr) {}
};

class BST {
public:
    BSTNode* root;

    BST() : root(nullptr) {}

    BSTNode* insert(BSTNode* node, int key) {
        if (!node) return new BSTNode(key);
        if (key < node->key) node->left = insert(node->left, key);
        else if (key > node->key) node->right = insert(node->right, key);
        return node;
    }

    bool search(BSTNode* node, int key) const {
        if (!node) return false;
        if (node->key == key) return true;
        if (key < node->key) return search(node->left, key);
        return search(node->right, key);
    }

    int findMin(BSTNode* node) const {
        while (node && node->left) node = node->left;
        return node ? node->key : -1;
    }

    void inorder(BSTNode* node) const {
        if (!node) return;
        inorder(node->left);
        cout << node->key << " ";
        inorder(node->right);
    }
};

int main() {
    cout << "=== 16. Binary Search Tree (BST) ===" << endl;
    BST tree;
    tree.root = tree.insert(tree.root, 50);
    tree.insert(tree.root, 30);
    tree.insert(tree.root, 70);
    tree.insert(tree.root, 20);
    tree.insert(tree.root, 40);
    tree.insert(tree.root, 60);
    tree.insert(tree.root, 80);

    cout << "BST Inorder (Sorted): ";
    tree.inorder(tree.root);
    cout << endl;

    cout << "Search 40: " << (tree.search(tree.root, 40) ? "Found" : "Not Found") << endl;
    cout << "Search 99: " << (tree.search(tree.root, 99) ? "Found" : "Not Found") << endl;
    cout << "Minimum Key: " << tree.findMin(tree.root) << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'BST search found', input: '(() => { let b = new BST(); b.root = b.insert(b.root, 50); b.insert(b.root, 30); return b.search(b.root, 30); })()', expectedOutput: 'true' },
      { id: 'tc2', name: 'BST min', input: '(() => { let b = new BST(); b.root = b.insert(b.root, 50); b.insert(b.root, 20); return b.findMin(b.root); })()', expectedOutput: '20' },
    ],
  },
  {
    id: 'p17',
    conceptNumber: 17,
    title: 'AVL Trees',
    description: 'Construct a Self-Balancing Binary Search Tree (AVL) maintaining balance factor in {-1, 0, +1} using Left & Right rotations.',
    difficulty: 'Hard',
    skill: 'Balanced Trees',
    language: 'C++',
    estimatedMin: 28,
    recommended: false,
    acceptance: 61,
    tags: ['AVL Trees', 'Self Balancing', 'Rotations', 'Trees'],
    sample: `#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

struct AVLNode {
    int key;
    AVLNode* left;
    AVLNode* right;
    int height;
    AVLNode(int k) : key(k), left(nullptr), right(nullptr), height(1) {}
};

int getHeight(AVLNode* n) {
    return n ? n->height : 0;
}

int getBalance(AVLNode* n) {
    return n ? getHeight(n->left) - getHeight(n->right) : 0;
}

AVLNode* rightRotate(AVLNode* y) {
    AVLNode* x = y->left;
    AVLNode* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;
    return x;
}

AVLNode* leftRotate(AVLNode* x) {
    AVLNode* y = x->right;
    AVLNode* T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = max(getHeight(x->left), getHeight(x->right)) + 1;
    y->height = max(getHeight(y->left), getHeight(y->right)) + 1;
    return y;
}

AVLNode* insertAVL(AVLNode* node, int key) {
    if (!node) return new AVLNode(key);
    if (key < node->key) node->left = insertAVL(node->left, key);
    else if (key > node->key) node->right = insertAVL(node->right, key);
    else return node;

    node->height = 1 + max(getHeight(node->left), getHeight(node->right));
    int balance = getBalance(node);

    // Left Left
    if (balance > 1 && key < node->left->key) return rightRotate(node);
    // Right Right
    if (balance < -1 && key > node->right->key) return leftRotate(node);
    // Left Right
    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }
    // Right Left
    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }
    return node;
}

void printPreorder(AVLNode* root) {
    if (!root) return;
    cout << root->key << " ";
    printPreorder(root->left);
    printPreorder(root->right);
}

int main() {
    cout << "=== 17. AVL Self-Balancing Tree ===" << endl;
    AVLNode* root = nullptr;
    vector<int> keys = {10, 20, 30, 40, 50, 25};
    for (int k : keys) {
        root = insertAVL(root, k);
    }

    cout << "AVL Tree Preorder Traversal (Balanced): ";
    printPreorder(root);
    cout << endl;
    cout << "Root key after balancing: " << root->key << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'AVL Root after balancing', input: '(() => { let r = null; for (let k of [10, 20, 30]) r = insertAVL(r, k); return r.key; })()', expectedOutput: '20' },
    ],
  },
  {
    id: 'p18',
    conceptNumber: 18,
    title: 'B-Trees',
    description: 'Implement a multiway search B-Tree of minimum degree t with ordered multi-key nodes, multiway child traversal, and search routines.',
    difficulty: 'Hard',
    skill: 'Multiway Trees',
    language: 'C++',
    estimatedMin: 30,
    recommended: false,
    acceptance: 55,
    tags: ['B-Trees', 'Multiway Trees', 'Indexing', 'Data Structures'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

// B-Tree Node of minimum degree t
struct BTreeNode {
    vector<int> keys;
    vector<BTreeNode*> children;
    bool isLeaf;
    int t;

    BTreeNode(int deg, bool leaf) : t(deg), isLeaf(leaf) {}

    void traverse() {
        int i;
        for (i = 0; i < keys.size(); i++) {
            if (!isLeaf && i < children.size()) children[i]->traverse();
            cout << " " << keys[i];
        }
        if (!isLeaf && i < children.size()) children[i]->traverse();
    }

    BTreeNode* search(int k) {
        int i = 0;
        while (i < keys.size() && k > keys[i]) i++;
        if (i < keys.size() && keys[i] == k) return this;
        if (isLeaf) return nullptr;
        return children[i]->search(k);
    }
};

class BTree {
public:
    BTreeNode* root;
    int t;

    BTree(int deg) : root(nullptr), t(deg) {}

    void traverse() {
        if (root) root->traverse();
        cout << endl;
    }

    BTreeNode* search(int k) {
        return root ? root->search(k) : nullptr;
    }
};

int main() {
    cout << "=== 18. B-Trees (Multiway Indexing) ===" << endl;
    BTree tree(3);
    tree.root = new BTreeNode(3, false);
    tree.root->keys = {20, 40};

    BTreeNode* c1 = new BTreeNode(3, true);
    c1->keys = {5, 10, 15};
    BTreeNode* c2 = new BTreeNode(3, true);
    c2->keys = {25, 30, 35};
    BTreeNode* c3 = new BTreeNode(3, true);
    c3->keys = {45, 50, 60};

    tree.root->children = {c1, c2, c3};

    cout << "B-Tree Inorder Traversal:";
    tree.traverse();

    cout << "Search key 30: " << (tree.search(30) ? "Found" : "Not Found") << endl;
    cout << "Search key 99: " << (tree.search(99) ? "Found" : "Not Found") << endl;
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'BTree search', input: '(() => { let b = new BTreeNode(3, true); b.keys = [10, 20]; return b.search(20) !== null; })()', expectedOutput: 'true' },
    ],
  },
  {
    id: 'p19',
    conceptNumber: 19,
    title: 'Graphs & Representations',
    description: 'Model directed and undirected graphs using Adjacency List (vector of vectors) and Adjacency Matrix in C++ with degree calculation.',
    difficulty: 'Medium',
    skill: 'Graphs',
    language: 'C++',
    estimatedMin: 18,
    recommended: false,
    acceptance: 81,
    tags: ['Graphs', 'Adjacency List', 'Adjacency Matrix', 'Representations'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

class Graph {
private:
    int numVertices;
    vector<vector<int>> adjList;
    vector<vector<int>> adjMatrix;

public:
    Graph(int v) : numVertices(v) {
        adjList.resize(v);
        adjMatrix.resize(v);
        for (int i = 0; i < v; i++) {
            adjMatrix[i] = [];
            for (int j = 0; j < v; j++) adjMatrix[i].push(0);
        }
    }

    void addEdge(int u, int v, bool directed = false) {
        adjList[u].push_back(v);
        adjMatrix[u][v] = 1;
        if (!directed) {
            adjList[v].push_back(u);
            adjMatrix[v][u] = 1;
        }
    }

    void printAdjList() const {
        cout << "--- Adjacency List ---" << endl;
        for (int i = 0; i < numVertices; i++) {
            cout << "Vertex " << i << ": ";
            for (int neighbor : adjList[i]) cout << "-> " << neighbor << " ";
            cout << endl;
        }
    }

    void printAdjMatrix() const {
        cout << "--- Adjacency Matrix ---" << endl;
        for (int i = 0; i < numVertices; i++) {
            for (int j = 0; j < numVertices; j++) {
                cout << adjMatrix[i][j] << " ";
            }
            cout << endl;
        }
    }
};

int main() {
    cout << "=== 19. Graph Representations ===" << endl;
    Graph g(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 3);

    g.printAdjList();
    g.printAdjMatrix();
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Graph node count', input: '(() => { let g = new Graph(4); g.addEdge(0, 1); return 4; })()', expectedOutput: '4' },
    ],
  },
  {
    id: 'p20',
    conceptNumber: 20,
    title: 'BFS / DFS / Dijkstra',
    description: 'Implement Breadth-First Search (queue), Depth-First Search (recursion), and Dijkstra Single-Source Shortest Path algorithm on weighted graphs.',
    difficulty: 'Hard',
    skill: 'Graph Algorithms',
    language: 'C++',
    estimatedMin: 28,
    recommended: false,
    acceptance: 63,
    tags: ['BFS', 'DFS', 'Dijkstra', 'Shortest Path', 'Graphs'],
    sample: `#include <iostream>
#include <vector>

using namespace std;

struct Edge {
    int to;
    int weight;
    Edge(int t, int w) : to(t), weight(w) {}
};

void bfs(int start, const vector<vector<int>>& adj, int n) {
    vector<bool> visited;
    for (int i = 0; i < n; i++) visited.push_back(false);
    vector<int> q;
    q.push_back(start);
    visited[start] = true;
    int head = 0;

    cout << "BFS Traversal from " << start << ": ";
    while (head < q.size()) {
        int u = q[head++];
        cout << u << " ";
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push_back(v);
            }
        }
    }
    cout << endl;
}

void dfsHelper(int u, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
        if (!visited[v]) dfsHelper(v, adj, visited);
    }
}

void dfs(int start, const vector<vector<int>>& adj, int n) {
    vector<bool> visited;
    for (int i = 0; i < n; i++) visited.push_back(false);
    cout << "DFS Traversal from " << start << ": ";
    dfsHelper(start, adj, visited);
    cout << endl;
}

void dijkstra(int src, const vector<vector<Edge>>& graph, int n) {
    vector<int> dist;
    vector<bool> visited;
    for (int i = 0; i < n; i++) {
        dist.push_back(999999);
        visited.push_back(false);
    }
    dist[src] = 0;

    for (int count = 0; count < n - 1; count++) {
        int minNode = -1;
        int minDist = 999999;
        for (int i = 0; i < n; i++) {
            if (!visited[i] && dist[i] < minDist) {
                minDist = dist[i];
                minNode = i;
            }
        }
        if (minNode == -1) break;
        visited[minNode] = true;

        for (const Edge& e : graph[minNode]) {
            if (!visited[e.to] && dist[minNode] + e.weight < dist[e.to]) {
                dist[e.to] = dist[minNode] + e.weight;
            }
        }
    }

    cout << "Dijkstra Shortest Distances from node " << src << ":" << endl;
    for (int i = 0; i < n; i++) {
        cout << "  To Node " << i << " -> Distance: " << dist[i] << endl;
    }
}

int main() {
    cout << "=== 20. BFS, DFS & Dijkstra ===" << endl;
    int n = 5;
    vector<vector<int>> unweighted = [
        [1, 2],
        [0, 3],
        [0, 3, 4],
        [1, 2, 4],
        [2, 3]
    ];

    bfs(0, unweighted, n);
    dfs(0, unweighted, n);

    vector<vector<Edge>> weighted = [[], [], [], [], []];
    weighted[0].push_back(new Edge(1, 4));
    weighted[0].push_back(new Edge(2, 1));
    weighted[2].push_back(new Edge(1, 2));
    weighted[1].push_back(new Edge(3, 1));
    weighted[2].push_back(new Edge(3, 5));
    weighted[3].push_back(new Edge(4, 3));

    dijkstra(0, weighted, n);
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'Edge weight check', input: '(() => { let e = new Edge(1, 4); return e.weight; })()', expectedOutput: '4' },
    ],
  },
  {
    id: 'p21',
    conceptNumber: 21,
    title: "MST — Prim's & Kruskal's",
    description: 'Compute the Minimum Spanning Tree of weighted graphs using Kruskal algorithm with Disjoint Set Union (DSU) and Prim algorithm.',
    difficulty: 'Hard',
    skill: 'Graph Algorithms',
    language: 'C++',
    estimatedMin: 30,
    recommended: false,
    acceptance: 58,
    tags: ['MST', 'Minimum Spanning Tree', 'Kruskal', 'Prims', 'DSU', 'Union-Find'],
    sample: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct MSTEdge {
    int u, v, weight;
    MSTEdge(int src, int dst, int w) : u(src), v(dst), weight(w) {}
};

struct DSU {
    vector<int> parent;
    DSU(int n) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }

    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI != rootJ) {
            parent[rootI] = rootJ;
            return true;
        }
        return false;
    }
};

void kruskalMST(int n, vector<MSTEdge>& edges) {
    // Sort edges by weight
    for (int i = 0; i < edges.size(); i++) {
        for (int j = 0; j + 1 < edges.size(); j++) {
            if (edges[j].weight > edges[j + 1].weight) {
                MSTEdge temp = edges[j];
                edges[j] = edges[j + 1];
                edges[j + 1] = temp;
            }
        }
    }

    DSU dsu(n);
    int totalCost = 0;
    vector<MSTEdge> result;

    for (const MSTEdge& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            result.push_back(e);
            totalCost += e.weight;
        }
    }

    cout << "Kruskal MST Selected Edges:" << endl;
    for (const MSTEdge& e : result) {
        cout << "  Edge (" << e.u << " - " << e.v << ") Weight: " << e.weight << endl;
    }
    cout << "Total MST Cost: " << totalCost << endl;
}

int main() {
    cout << "=== 21. Minimum Spanning Tree (Kruskal's Algorithm) ===" << endl;
    int n = 4;
    vector<MSTEdge> edges = [
        new MSTEdge(0, 1, 10),
        new MSTEdge(0, 2, 6),
        new MSTEdge(0, 3, 5),
        new MSTEdge(1, 3, 15),
        new MSTEdge(2, 3, 4)
    ];

    kruskalMST(n, edges);
    return 0;
}`,
    testCases: [
      { id: 'tc1', name: 'DSU unite check', input: '(() => { let d = new DSU(4); return d.unite(0, 1); })()', expectedOutput: 'true' },
    ],
  },
]

export type PathNode = {
  id: string
  title: string
  description: string
  lessons: number
  problems: number
  completion: number
  mastery: 'Locked' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastered'
  status: 'completed' | 'in-progress' | 'locked'
}

export const learningPath: PathNode[] = [
  { id: 'n1', title: '1. Foundations & Asymptotic Complexity', description: 'Data Structures Basics, memory records, pointer layouts, Big-O, Big-Ω, and Big-Θ analysis.', lessons: 3, problems: 3, completion: 100, mastery: 'Mastered', status: 'completed' },
  { id: 'n2', title: '2. Linear Data Structures', description: 'Arrays, Stacks (LIFO), FIFO Linear Queues, and Circular Ring Buffers in C++.', lessons: 4, problems: 4, completion: 100, mastery: 'Mastered', status: 'completed' },
  { id: 'n3', title: '3. Expressions & Dynamic Node Lists', description: 'Infix/Prefix/Postfix expression conversion and Singly/Doubly Linked Lists.', lessons: 2, problems: 2, completion: 100, mastery: 'Advanced', status: 'completed' },
  { id: 'n4', title: '4. Recursion, Searching & Sorting', description: 'Call stack recursion, N-Queens backtracking, Linear/Binary Search, Merge Sort & Quick Sort.', lessons: 3, problems: 3, completion: 75, mastery: 'Intermediate', status: 'in-progress' },
  { id: 'n5', title: '5. Heaps, Priority Queues & Hashing', description: 'Binary Max/Min Heaps, Heap Sort O(n log n), and Hash Tables with Separate Chaining.', lessons: 2, problems: 2, completion: 50, mastery: 'Intermediate', status: 'in-progress' },
  { id: 'n6', title: '6. Trees: Binary, BST, AVL & B-Trees', description: 'Tree Traversals (In/Pre/Post/Level Order), Binary Search Trees, Self-Balancing AVL Trees & B-Trees.', lessons: 4, problems: 4, completion: 25, mastery: 'Beginner', status: 'in-progress' },
  { id: 'n7', title: '7. Graph Algorithms & Minimum Spanning Trees', description: 'Adjacency representations, BFS, DFS, Dijkstra shortest paths, and Prim & Kruskal MST with DSU.', lessons: 3, problems: 3, completion: 0, mastery: 'Locked', status: 'locked' },
]

export type Mistake = {
  id: string
  title: string
  occurrences: number
  lastSeen: string
  concept: string
  severity: 'high' | 'medium' | 'low'
  example: string
}

export const mistakes: Mistake[] = [
  {
    id: 'm1',
    title: 'Off-by-one error in array/vector bounds or circular modulo',
    occurrences: 5,
    lastSeen: 'Today',
    concept: 'Arrays & Circular Queues',
    severity: 'high',
    example: 'rear = rear + 1 % size → rear = (rear + 1) % size',
  },
  {
    id: 'm2',
    title: 'Dangling pointer or missing nullptr base check in recursive tree/list traversal',
    occurrences: 4,
    lastSeen: 'Yesterday',
    concept: 'Linked Lists & Trees',
    severity: 'high',
    example: 'if (!root) return 0; // essential base condition',
  },
  {
    id: 'm3',
    title: 'Forgetting to update node heights during AVL rotation',
    occurrences: 3,
    lastSeen: '2 days ago',
    concept: 'AVL Trees',
    severity: 'medium',
    example: 'y->height = 1 + max(getHeight(y->left), getHeight(y->right));',
  },
  {
    id: 'm4',
    title: 'Passing heavy vector containers by value instead of const reference',
    occurrences: 3,
    lastSeen: '3 days ago',
    concept: 'Performance & Sorting',
    severity: 'medium',
    example: 'void merge(vector<int>& arr, int l, int m, int r)',
  },
  {
    id: 'm5',
    title: 'Unintended integer division without Math.floor / integer truncation in midpoint search',
    occurrences: 2,
    lastSeen: '4 days ago',
    concept: 'Binary Search',
    severity: 'low',
    example: 'int mid = left + (right - left) / 2;',
  },
]

export const strengths = [
  { skill: 'Data Structures Basics', mastery: 96 },
  { skill: 'Linear Data Structures', mastery: 90 },
  { skill: 'Recursion & Backtracking', mastery: 84 },
]

export const weaknesses = [
  { skill: 'Graph Algorithms & MST', mastery: 62 },
  { skill: 'Trees, AVL & B-Trees', mastery: 68 },
  { skill: 'Searching & Sorting', mastery: 78 },
]

export const aiRecommendations = [
  'Practice AVL Tree left/right rotations and balance factor updates in C++.',
  'Review Dijkstra shortest path relaxation condition and edge weighting.',
  'Explore Disjoint Set Union (Union-Find) with path compression for Kruskal MST.',
]

export const notifications = [
  { id: 'nt1', title: 'Daily goal almost there', body: 'Just 12 minutes left to hit your 45-min target.', time: '10m ago', unread: true },
  { id: 'nt2', title: 'New recommended problem', body: 'Concept 4: Stacks (LIFO Implementation) is ready for you.', time: '1h ago', unread: true },
  { id: 'nt3', title: 'Streak milestone', body: 'You reached a 12-day streak in C++ Data Structures!', time: '3h ago', unread: false },
]
