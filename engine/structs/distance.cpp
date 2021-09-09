#pragma once
#include <iostream>
#include <cmath>

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
  friend std::ostream &operator<<(std::ostream &os, const Distance d)
  {
    os << d.hyp << "(x: " << d.x << ", y: " << d.y << ")";
    return os;
  }
};