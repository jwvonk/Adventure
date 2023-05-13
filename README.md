A simple adventure game by {who?} based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Dunes, Pyramid, Ship, Heart
- **2+ scenes *not* based on `AdventureScene`**: Intro, Consumed, Destroyed
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: `flicker(obj)`: adds a random flickering effect to an instance of glow FX
    - Enhancement 2: `bob(obj)`: adds a bobbing tween effect to an object
    - Enhancement e: `reveal(obj)`: adds. tween to increases the opacity of an object

Experience requirements:
- **4+ locations in the game world**: The Dunes, The Oceanic Pyramid, The Sunken Ship, The Heart
- **2+ interactive objects in most scenes**: Shell & Dolphin reveal path on click, Heart triggers quick-time event on-click
- **Many objects have `pointerover` messages**: Dolohin has message regarding wanting player to follow, Door has message regarding something behind it calling to aher
- **Many objects have `pointerdown` effects**: Shell & Dolphin reveal path on click, Heart triggers quick-time event on-click
- **Some objects are themselves animated**: Door & Heart have flickering glow effect, Dolphin bobs up and down

Asset sources:

- All background images generated using [Craiyon](https://www.craiyon.com/)
- The Oceanic Pyramid background image has altered tone-value levels, accomplished using [Krita](https://krita.org/en/)


Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.
