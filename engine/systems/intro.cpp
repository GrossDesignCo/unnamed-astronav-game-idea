#include <chrono>
#include <ctime>
#include <thread>
#include <vector>
#include <iostream>
#include "../object.cpp"
#include "../structs/force.cpp"
#include "../utils/equations.cpp"
#include <sys/time.h>

using namespace std;

int intro()
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
  vector<Object> objects;

  Object earth("Earth", 6378100, Point(0, 0), 5.972e+24, Velocity(0, 0));
  Object luna("Luna", 1737400, Point(0, 3.2889e+08), 7.438e+22, Velocity(10000, 0));

  objects.push_back(earth);
  objects.push_back(luna);

  // Object one("One", 10, Point(100, 100), 1000000, Velocity(1, -1));
  // Object two("Two", 10, Point(50, 50), 1000000, Velocity(0, 0));

  // objects.push_back(one);
  // objects.push_back(two);

  // Configs
  int running = 1;
  // number of in-sim-seconds to pass per real second
  int timeScale = 8640000; // 1 sim day / real second

  chrono::high_resolution_clock::time_point prevTime = chrono::high_resolution_clock::now();

  while (running)
  {
    chrono::high_resolution_clock::time_point currentTime = chrono::high_resolution_clock::now();

    chrono::duration<double> time_span = chrono::duration_cast<chrono::duration<double> >(currentTime - prevTime);

    // Loop no faster than 60fps (fudge until we figure out how to actually run at N-fps)
    if (time_span.count() < 1)
    {
      this_thread::sleep_for(chrono::seconds(1 / 4));
    }

    // 0.0167 = 1/60th
    if (time_span.count() > 1)
    {
      prevTime = currentTime;

      for (int i = 0; i < objects.size(); i++)
      {
        Object *current = &objects[i];
        Force total(0, 0);

        cout << current->name << "";
        cout << endl;

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

        cout << setw(10) << "- Force: " << total;
        cout << endl;

        // 2. Get Accelerations caused by those forces for 1s * timeScale
        // Should be 1.62 m/s^2
        double currentAx = total.x * timeScale / current->mass;
        double currentAy = total.y * timeScale / current->mass;

        cout << setw(10) << "- Accel: " << currentAx << ", "
             << currentAy;
        cout << endl;

        // 3. Get updated velocity for the next second based on acceleration
        Velocity v(current->velocity.x + currentAx, current->velocity.y + currentAy);
        current->setVelocity(v);

        cout << setw(10) << "- Velocity: " << current->velocity;
        cout << endl;

        // 4. Get new positions for the next second based on velocity
        Point p(current->pos.x + current->velocity.x, current->pos.y + current->velocity.y);
        current->setPos(p);

        // 5. "Render" changes
        cout << setw(10) << "- Pos: " << current->pos;
        cout << endl;
        cout << endl;
      }
    }
  }

  return 0;
}