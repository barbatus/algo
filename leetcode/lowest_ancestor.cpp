// Lowest common ancestor in a binary tree

#include <stack>
#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
  int val;
  TreeNode *left;
  TreeNode *right;
  TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

vector<TreeNode*> findPath(TreeNode* root, TreeNode* p) {
  stack<TreeNode*> stack({ root });
  vector<TreeNode*> path;
  while (stack.size()) {
    auto node = stack.top();
    stack.pop();
    if (node != NULL) {
      auto it = find(path.begin(), path.end(), node);
      if (it == path.end()) {
        path.push_back(node);
        if (node == p) {
          return path;
        }
        stack.push(node);
        stack.push(node->right);
        stack.push(node->left);
      } else {
        path.erase(it);
      }
    }
  }
  return path;
}

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
  auto path1 = findPath(root, p);
  auto path2 = findPath(root, q);
  size_t i = 0;
  for (;i < path1.size() && i < path2.size(); i++) {
    if (path1[i] != path2[i]) {
      return path1[i - 1];
    }
  }
  return path1[i - 1];
}

int main() {
  TreeNode node3(3);
  TreeNode node5(5);
  TreeNode node1(1);
  TreeNode node6(6);
  TreeNode node2(2);
  TreeNode node0(0);
  TreeNode node8(8);
  TreeNode node7(7);
  TreeNode node4(4);

  node3.left = &node5;
  node3.right = &node1;
  node5.left = &node6;
  node5.right = &node2;
  node1.left = &node0;
  node1.right = &node8;
  node2.left = &node7;
  node2.right = &node4;

  auto node = lowestCommonAncestor(&node3, &node5, &node1);
  cout << node->val << endl;

  return 0;
}
