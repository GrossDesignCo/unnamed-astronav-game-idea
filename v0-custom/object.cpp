#pragma once
#include <iostream>
#include <cmath>
#include "structs/distance.cpp"
#include "structs/force.cpp"
#include "structs/point.cpp"
#include "structs/velocity.cpp"
#include "utils/equations.cpp"

class Object
{
public:
  string name;
  double radius;
  // x, y position (m?)
  Point pos;
  // mass (kg)
  double mass;
  // x, y magnitude (m/s)
  Velocity velocity;

  Object(string n, double r, Point p, double m, Velocity v)
  {
    name = n;
    radius = r;
    setPos(p);
    mass = m;
    setVelocity(v);

    cout << "Object constructed at (" << pos << ")" << endl;
  };

  Velocity getVelocity()
  {
    return velocity;
  };

  void setPos(Point p)
  {
    pos = p;
  };

  void setVelocity(Velocity v)
  {
    velocity = v;
  };

  /**
   * distanceTo
   * @param target (Point)
   * @returns distance from target's x, y coords (m)
   */
  Distance distanceTo(Point target)
  {
    double dx = target.x - pos.x;
    double dy = target.y - pos.y;

    return Distance(dx, dy);
  };

  /**
   * distanceTo
   * @param target (Object)
   * @returns distance from target's center (m)
   */
  Distance distanceTo(Object *target)
  {
    // target - this = dist
    // 100 - 50 = 50
    // -50 - 100 = -150
    double dx = target->pos.x - pos.x;
    double dy = target->pos.y - pos.y;

    return Distance(dx, dy);
    ;
  };

  /**
   * gForceFrom
   * @param target {Object}
   * - gets gravitational force on this object caused by the target
   */
  Force gForceFrom(Object *target)
  {
    double m1 = mass;
    double m2 = target->mass;
    Distance d = distanceTo(target);
    Force f = getGForce(m1, m2, d);

    return f;
  }

  // Overload != operator
  friend bool operator==(const Object a, const Object b)
  {
    return a.name == b.name;
  }

  // Overload != operator
  friend bool operator!=(const Object a, const Object b)
  {
    return a.name != b.name;
  }
};