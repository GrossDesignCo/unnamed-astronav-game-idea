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
  // Load Earth & Moon
  intro();

  return 0;
}