#pragma once
#include <iostream>
#include <iomanip>

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
  friend std::ostream &operator<<(std::ostream &os, const Force f)
  {
    os << std::setw(10) << f.x << "," << std::setw(10) << f.y;
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