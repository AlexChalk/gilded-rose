# Gilded Rose

A 1 1/2 day challenge to complete the gilded rose kata.

## Installation

`git clone git@github.com:adc17/gilded-rose.git`.

## Project Reflection.

1. I prioritised allowing the user to enter data in a single place for each new object type. Whilst important for ease of use, I neglected other design considerations.
2. I at one point decided on an implementation that separated default behaviours from `rules` and removed a dependency where the default settings have to be defined last in `rules`. I eventually decided this was an unnecessary complication.
3. I spent a lot of time refactoring this, then realized I'd made it less clear and switched back. I'll be careful to avoid this behaviour moving forwards.

## Tests

​```
open SpecRunner.html
​```

## Other notes

A challenge from the [Makers Academy](http://www.makersacademy.com) Bootcamp.