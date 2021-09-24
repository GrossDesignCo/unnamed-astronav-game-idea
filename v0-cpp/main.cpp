#include <chrono>
#include <ctime>
#include <thread>
#include <vector>
#include <iostream>
#include <sys/time.h>
#include "object.cpp"
#include "systems/intro.cpp"
#include "structs/force.cpp"
#include "utils/equations.cpp"

#include <SDL2/SDL.h>

int main()
{
  double test = 3.123e+33;
  double test2 = 6.6e-22;

  std::cout << test * test2 << std::endl;
  // Load Earth & Moon
  intro();

  return 0;
}