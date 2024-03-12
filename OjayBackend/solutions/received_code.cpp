#include <iostream>
using namespace std;

int main ()
{
    int num, reverse = 0, rem, temp;
    string s;
    cin>>s;
    num=stoi(s);
    temp = num;
    if(num<0){
      cout<<"false";
      return 0;
    }
    while(temp != 0)
    {
        rem = temp % 10;
        reverse = reverse * 10 + rem;
        temp /= 10;
    };
    if (num == reverse)
        cout <<"true";
    else
        cout <<"false";

}