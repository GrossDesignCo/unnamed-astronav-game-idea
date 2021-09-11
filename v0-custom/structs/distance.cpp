#pragma once
#include <iostream>
#include <cmath>

using namespace std;

struct Distance
{
  // x, y distance
  double x;
  double y;
  double hyp;

  Distance()
  {
    x = 0;
    y = 0;
    hyp = 0;
  }

  Distance(double newX, double newY)
  {
    x = newX;
    y = newY;
    hyp = hypot(x, y);
  }

  // Overload << operator
  friend ostream &operator<<(ostream &os, const Distance d)
  {
    os << d.hyp << "(x: " << d.x << ", y: " << d.y << ")";
    return os;
  }
};