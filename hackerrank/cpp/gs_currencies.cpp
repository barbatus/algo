#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <map>
#include <unordered_map>
using namespace std;

const long long dv = 1000000007;

long long gcd(long long a, long long b) {
    while (b) {
        long long m = a % b;
        a = b;
        b = m;
    }
    return a;
}

long long reduce(vector<long long> &v) {
    long long g = 0;
    for (long long x: v) {
        g = gcd(g, x);
    }
    for (long long &x: v) {
        x /= g;
    }
    return g;
}

string key(const vector<long long>& v, long long g) {
    string result;
    for (int x: v) {
        result += (to_string(x) + ", ");
    }
    result += to_string(g);
    return result;
}

long long pw(long long x, long long n) {
    long long res = 1;
    while (n > 0) {
        if (n & 1) res = (res * x) % dv;
        x = (x * x) % dv;
        n >>= 1;
    }
    return res;
}

int main() {
    int n = 9, x = 974, s = 5, f = 5, m = 202;
    int a[9][9] = {
        {0, 6, 7, 4, 7, 3},
        {6, 0, 1, 1, 2, 4},
        {1, 3, 0, 4, 2, 4},
        {2, 3, 4, 0, 1, 2},
        {6, 8, 7, 2, 0, 4},
        {5, 7, 2, 2, 7, 0},
    };
    vector<long long> v(n);

    unordered_map<string, int> keys;
    vector< vector<long long> > vv(2);
    vv[1].resize(n);
    for (int i = 0; i < n; i++) {
        vv[1][i] = a[s][i];
    }

    vector<long long> fin;
    vector<long long> gg(2);

    long long int dd = x;
    for (int w = 2; w <= m; w++) {
        vv.resize(w + 1); gg.resize(w + 1);
        vv[w].resize(n, 0);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                vv[w][i] = max(vv[w][i], vv[w-1][j] * a[j][i]);
            }
        }
        gg[w] = reduce(vv[w]);  

        string k = key(vv[w], gg[w]);
        dd = (dd * gg[w]) % dv;
        if (keys.find(k) != keys.end()) {
            int p = keys[k];

            int l = w - p;
            long long togo = m - w;

            fin = vv[p + togo % l];
            for (int i = p + 1; i <= w; i++) {
                dd = (dd * pw(gg[i], togo / l + ((i - p - 1) < togo % l))) % dv;
            }
            break;
        }

        keys[k] = w;
        if (w == m) {
            fin = vv[w];
        }
    }
    cout << (fin[f] * dd) % dv << endl;
    return 0;
}
