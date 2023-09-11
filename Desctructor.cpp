#include<iostream>
using namespace std;
class Cons{
  private:
  char obj;
  public:
  Cons(char obj){
  this->obj=obj;
  cout<<"I am from"<<" "<<obj<<endl;
  }
  ~Cons(){
    cout<<"I am destroyed"<<" "<<obj<<endl;
  }
};
int main(){
    
   Cons a('a'),b('b'),c('c');
   {
     Cons d('d');
   } 
      return 0;
}