"use client";
import { useEffect, useMemo } from "react";
import { ISourceOptions, tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";

export default function ParticlesAnimation() {
  const options = useMemo<ISourceOptions>(() => {
    return {
      // Name of the preset to use, uses the preset stars
      preset: "stars",
      // The maximum frame rate (fps) of the animation
      fpsLimit: 120,
      // The background color of the container
      background: {
        // The color of the background
        color: "#111",
        // Size of the background (cover or contain)
        size: "cover",
        // Repeat the background image (no-repeat, repeat, repeat-x, repeat-y)
        repeat: "no-repeat"
      },
      // The particles configuration
      particles: {
        // The color of the particles
        color: { value: "#84b6e3" },
        // The movement configuration of the particles
        move: {
          // Enable or disable the movement of the particles
          enable: true,
          // Enables the size of the particles to change during movement
          size: true,
          // Attract other particles (uses the move.attract value from the particle)
          attract: { enable: true, distance: 100, rotate: { x: 600, y: 600 } },
          // Bounce the particles when they hit the edges of the container
          bounce: true,
          // The direction of the particles (none, top, right, bottom, left, random)
          direction: "none",
          // Specifies what happens when a particle moves out of the screen
          outModes: "split",
          // Enable or disable the random movement of the particles
          random: true,
          // The speed of the particles (uses the move.speed value from the particle)
          speed: 0.4,
          // The straight movement of the particles (uses the move.straight value from the particle)
          straight: false
        },
        // The number of particles
        number: {
          // The density of the particles (uses the density value from the particle)
          density: { enable: true, value_area: 800 },
          // The number of particles
          value: 300
        },
        // The opacity of the particles
        opacity: {
          // The animation configuration of the particles
          anim: {
            // Enable or disable the animation of the particles
            enable: true,
            // The minimum opacity of the particles
            opacity_min: 0,
            // The speed of the animation of the particles
            speed: 1,
            // Sync the animation of the particles with the other particles
            sync: false
          },
          // Enable or disable the random opacity of the particles
          random: true,
          // The value of the opacity of the particles
          value: 1
        },
        // Defines the size properties of the particles
        size: {
          //  Enables size animation for the particles
          anim: { enable: true, size_min: 0.3, speed: 4, sync: false },
          // Enables random size for the particles
          random: true,
          // Sets the initial size value
          value: 1
        }
      },
      // Enables detection of Retina displays to optimize the particles' appearance on high-resolution screens
      detectRetina: true
    };
  }, []);

  useEffect(() => {
    const initParticles = async () => {
      await loadStarsPreset(tsParticles);
      await tsParticles.load({
        id: "tsparticles",
        options
      });
    };

    initParticles();
  }, [options]);

  return (
    <div
      id="tsparticles"
      style={{
        position: "absolute",
        backgroundColor: "#111",
        top: 0,
        left: 0,
        width: "100%",
        height: "auto",
        zIndex: -1
      }}
    ></div>
  );
}
