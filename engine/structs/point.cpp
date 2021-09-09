#pragma once
#include <iostream>
#include <iomanip>

struct Point
{
  // x, y position
  double x;
  double y;

  Point()
  {
    x = 0;
    y = 0;
  }

  Point(double newX, double newY)
  {
    x = newX;
    y = newY;
  }

  // Overload << operator
  friend std::ostream &operator<<(std::ostream &os, const Point p)
  {
    os << std::setw(10) << p.x << "," << std::setw(10) << p.y;
    return os;
  }
};