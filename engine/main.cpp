#include <chrono>
#include <ctime>
#include <thread>
#include <vector>
#include <iostream>
#include "object.cpp"
#include "structs/force.cpp"
#include "utils/equations.cpp"
#include <sys/time.h>

int main()
{
  // https://www.fabiensanglard.net/timer_and_framerate/index.php

  /**
   * real data to check against:
   * Earth: 5.972*10^24 (kg)
   * Moon: 7.348*10^22 (kg)
   * Dist (from center to center?): 3.2889*10^8 (m)
   * Grav Force: 2.74058e+20 (kg*m/s/s)
   * 8.33317e+11,2.7407e+20
   */
  Object earth("Earth", 6378100, Point(0, 0), 5.972e+24, Velocity(0, 0));
  Object luna("Luna", 1737400, Point(0, 3.2889e+08), 7.438e+22, Velocity(10000, 0));

  Object one("One", 10, Point(100, 100), 1000000, Velocity(1, -1));
  Object two("Two", 10, Point(50, 50), 1000000, Velocity(0, 0));

  // std::array<Object, 2> objects;
  std::vector<Object>
      objects;
  objects.push_back(one);
  objects.push_back(two);

  // Configs
  int running = 1;
  // number of in-sim-seconds to pass per real second
  int timeScale = 8640000; // 1 sim day / real second

  std::chrono::high_resolution_clock::time_point prevTime = std::chrono::high_resolution_clock::now();

  while (running)
  {
    std::chrono::high_resolution_clock::time_point currentTime = std::chrono::high_resolution_clock::now();

    std::chrono::duration<double> time_span = std::chrono::duration_cast<std::chrono::duration<double> >(currentTime - prevTime);

    // Loop no faster than 60fps (fudge until we figure out how to actually run at N-fps)
    if (time_span.count() < 1)
    {
      std::this_thread::sleep_for(std::chrono::seconds(1 / 4));
    }

    // 0.0167 = 1/60th
    if (time_span.count() > 1)
    {
      prevTime = currentTime;

      for (int i = 0; i < objects.size(); i++)
      {
        Object *current = &objects[i];
        Force total(0, 0);

        std::cout << current->name << "";
        std::cout << std::endl;

        for (int j = 0; j < objects.size(); j++)
        {
          Object *target = &objects[j];
          // Ignore self
          if (current != target)
          {
            // 1. Sum/average gravity from all other objects
            total = total + current->gForceFrom(target);
          }
        }

        std::cout << std::setw(10) << "- Force: " << total;
        std::cout << std::endl;

        // 2. Get Accelerations caused by those forces for 1s * timeScale
        // Should be 1.62 m/s^2
        double currentAx = total.x * timeScale / current->mass;
        double currentAy = total.y * timeScale / current->mass;

        std::cout << std::setw(10) << "- Accel: " << currentAx << ", "
                  << currentAy;
        std::cout << std::endl;

        // 3. Get updated velocity for the next second based on acceleration
        Velocity v(current->velocity.x + currentAx, current->velocity.y + currentAy);
        current->setVelocity(v);

        // TODO: Velocity isn't changing when set at constructor

        //         Earth
        //  - Force: 2.96463e+22,2.9646e+27
        //  - Accel: 428909, 4.28904e+10
        // - Velocity:     428909,4.28904e+10
        //    - Pos:     428910,4.28904e+10

        // Luna
        //  - Force: 1.61155e+11,1.61153e+16
        //  - Accel: 0.000187198, 18.7196
        // - Velocity:      10000,   18.7196
        //    - Pos:      10002,    100019

        // o - O
        // Earth
        //  - Force: -1.57398e+11,-1.61153e+16
        //  - Accel: -2.27715e-06, -0.233149
        // - Velocity:     428909,4.28904e+10
        //    - Pos:     857818,8.57809e+10

        // Luna
        //  - Force: 3.98189e+10,4.02882e+15
        //  - Accel: 4.62538e-05, 4.67989
        // - Velocity:      10000,   23.3995
        //    - Pos:      20002,    100042

        std::cout << std::setw(10) << "- Velocity: " << current->velocity;
        std::cout << std::endl;

        // 4. Get new positions for the next second based on velocity
        Point p(current->pos.x + current->velocity.x, current->pos.y + current->velocity.y);
        current->setPos(p);

        // 5. "Render" changes
        std::cout << std::setw(10) << "- Pos: " << current->pos;
        std::cout << std::endl;
        std::cout << std::endl;
      }
    }
  }

  return 0;
}