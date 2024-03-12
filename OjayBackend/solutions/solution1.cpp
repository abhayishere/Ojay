#include <iostream>
using namespace std;

int main() {
  string xx;
  cin>>xx;
  int x=stoi(xx);
  cout<<x<<endl;
    if (x < 0) {
        return 0;
    }

    long long reversed = 0;
    long long temp = x;

    while (temp != 0) {
        int digit = temp % 10;
        reversed = reversed * 10 + digit;
        temp /= 10;
    }
    cout<<reversed<<endl;
    if(reversed==x)cout<<"true";
    else cout<<"false";
    return 0;
}