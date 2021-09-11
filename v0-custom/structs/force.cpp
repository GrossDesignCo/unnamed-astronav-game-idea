#pragma once
#include <iostream>
#include <iomanip>

using namespace std;

struct Force
{
  // x, y Force in kg/s
  double x;
  double y;

  Force()
  {
    x = 0;
    y = 0;
  }

  Force(double newX = 0, double newY = 0)
  {
    x = newX;
    y = newY;
  }

  // Overload << operator
  friend ostream &operator<<(ostream &os, const Force f)
  {
    os << setw(10) << f.x << "," << setw(10) << f.y;
    return os;
  }

  // Overload + operator
  friend Force operator+(const Force lhs, const Force rhs)
  {
    double x = lhs.x + rhs.x;
    double y = lhs.y + rhs.y;

    return Force(x, y);
  }
};