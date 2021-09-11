#pragma once
#include <iostream>
#include <iomanip>

using namespace std;

struct Velocity
{
  // x, y magnitude (m/s?)
  double x;
  double y;

  Velocity()
  {
    x = 0;
    y = 0;
  }

  Velocity(double newX, double newY)
  {
    x = newX;
    y = newY;
  }

  // Overload << operator
  friend ostream &operator<<(ostream &os, const Velocity v)
  {
    os << setw(10) << v.x << "," << setw(10) << v.y;
    return os;
  }
};