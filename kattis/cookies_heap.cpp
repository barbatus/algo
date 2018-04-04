#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <cstdlib>
// #include <time.h>
using namespace std;

class MinMaxHeap {
  public:
    void insert(int cookie) {
      if (_root == -1) {
        _root = cookie;
        return;
      }

      int diff = _minSize - _maxSize;
      switch (diff) {
        case 1:
          if (cookie >= _root) {
            addToHeap(cookie, true);
            addToHeap(_root, false);
            _root = extractRoot(true);
          } else {
            addToHeap(cookie, false);
          }
          break;
        case 0:
          if (cookie >= _root) {
            addToHeap(cookie, true);
          } else {
            addToHeap(cookie, false);
          }
          break;
        case -1:
          if (cookie >= _root) {
            addToHeap(cookie, true);
          } else {
            addToHeap(cookie, false);
            addToHeap(_root, true);
            _root = extractRoot(false);
          }
          break;
      }
    }

    int getMedian() {
      int diff = _minSize - _maxSize;
      switch (diff) {
        case 1:
          return extractRoot(true);
        case 0: {
          int median = _root;
          _root = extractRoot(true);
          return median;
        }
        case -1: {
          int median = _root;
          _root = extractRoot(false);
          return median;
        }
      }
    }

  private:
    int _minHeap[300000];
    int _minSize = 0;
    int _maxHeap[300000];
    int _maxSize = 0;
    int _root = -1;

    inline int parent(int node) { 
      return (node - 1) / 2;
    }

    inline int childLeft(int node) {
      return 2 * node + 1;
    }

    inline int childRight(int node) {
      return 2 * node + 2;
    }

    inline int compare(int a, int b, bool inMin) {
      return inMin ? _minHeap[a] - _minHeap[b] : _maxHeap[b] - _maxHeap[a];
    }

    inline void exchange(int a, int b, bool inMin) {
      int* heap = inMin ? _minHeap : _maxHeap;
      int cookie = heap[a];
      heap[a] = heap[b];
      heap[b] = cookie;
    }

    inline int getChild(int node, bool inMin) {
      int l = childLeft(node);
      int r = childRight(node);
      int size = inMin ? _minSize : _maxSize;
      if (l < size && r < size) {
        return compare(l, r, inMin) > 0 ? r : l;
      }
      return r < size ? r : l;
    }

    inline void moveUp(int node, bool inMin) {
      int p = parent(node);
      while (p >= 0 && compare(node, p, inMin) < 0) {
        exchange(node, p, inMin);
        node = p;
        p = parent(p);
      }
    }

    inline void moveDown(int node, bool inMin) {
      int p = node;
      int size = inMin ? _minSize : _maxSize;
      while (p < size) {
        int c = getChild(p, inMin);
        if (c < size && compare(p, c, inMin) > 0) {
          exchange(p, c, inMin);
          p = c;
          continue;
        }
        break;
      }
    }

    inline int extractRoot(bool inMin) {
      int _root = -1;
      if (inMin && _minSize) {
        _root = _minHeap[0];
        exchange(0, _minSize - 1, inMin);
        _minSize--;
        moveDown(0, true);
      } else if (_maxSize) {
        _root = _maxHeap[0];
        exchange(0, _maxSize - 1, inMin);
        _maxSize--;
        moveDown(0, false);
      }
      return _root;
    }

    inline void addToHeap(int cookie, bool inMin) {
      if (inMin) {
        _minHeap[_minSize] = cookie;
        moveUp(_minSize, true);
        _minSize++;
      } else {
        _maxHeap[_maxSize] = cookie;
        moveUp(_maxSize, false);
        _maxSize++;
      }
    }
};

int main() {
  MinMaxHeap minMax = MinMaxHeap();
  string in;
  int cookie;
  vector<int> res;
  //clock_t tStart = clock();
  while (cin >> in) {
    if (in == "#") {
      int median = minMax.getMedian();
      res.push_back(median);
      continue;
    }
    minMax.insert(stoi(in));
  }

  //cout << (double)(clock() - tStart) / CLOCKS_PER_SEC << endl;

  stringstream ss;
  for(size_t i = 0; i < res.size(); i++) {
    ss << res[i] << '\n';
  }

  cout << ss.str();

  return 0;
}
