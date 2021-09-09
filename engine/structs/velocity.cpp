#pragma once
#include <iostream>
#include <iomanip>

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
  friend std::ostream &operator<<(std::ostream &os, const Velocity v)
  {
    os << std::setw(10) << v.x << "," << std::setw(10) << v.y;
    return os;
  }
};