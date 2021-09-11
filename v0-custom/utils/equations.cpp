#pragma once
#include <cmath>
#include "../structs/force.cpp"
#include "../structs/distance.cpp"

/**
 * Force = m*a
 * Acceleration = f/m
 * Mass = f/a
 */

/**
 * getForce
 * @param m mass in kg
 * @param a acceleration in m/s^2
 * - return force in kg/s
 */
// int getForce(int m = 0, int a = 0)
// {
//   return m * a;
// }

/**
 * getAcceleration
 * @param f f in kg/s
 * @param m mass in kg
 * - return acceleration in m/s^2
 */
// int getAcceleration(int m = 0, int f = 0)
// {
//   return f / m;
// }

/**
 * getGForce
 * @param mass1 mass in kg
 * @param mass2 mass in kg
 * @param distance Distance between the two masses
 * @return force in kg/s
 *
 * G = 6.674*10^-11 (kg/m)^2
 * Force = G((mass1 (kg) * mass2 (kg))/(distance (m)^2))
 * Force = 6.674*10^-11 (kg/m)^2 * mass1 (kg) * mass2 (kg) / distance (m) * distance (m)
 */
Force getGForce(double m1 = 0, double m2 = 0, Distance d = Distance(0, 0))
{
  const double G = 6.674e-11;
  double total = (G * m1 * m2) / (d.hyp * d.hyp);

  // Take the abs of the proportion,
  // otherwise negative x values could cancel out positive y values & vicce=versa
  double x = total * (d.x / (abs(d.x) + abs(d.y)));
  double y = total * (d.y / (abs(d.x) + abs(d.y)));

  return Force(x, y);
}