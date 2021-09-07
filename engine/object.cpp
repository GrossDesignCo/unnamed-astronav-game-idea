#include <iostream>
#include "object.h"

Object::Object()
{
  x = 0;
  y = 0;

  std::cout << "Object constructed!" << std::endl;
}