#pragma once
#include <iostream>
#include <iomanip>

using namespace std;

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
  friend ostream &operator<<(ostream &os, const Point p)
  {
    os << setw(10) << p.x << "," << setw(10) << p.y;
    return os;
  }
};