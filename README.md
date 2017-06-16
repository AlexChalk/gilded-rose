# Gilded Rose

A 1 1/2 day challenge to complete the gilded rose kata.

## Installation

`git clone git@github.com:adc17/gilded-rose.git`.

## Design Decisions

1. I treated the `shop` object as something that would be exported from the file.
2. I prioritised allowing the user to enter data in a single place for each new object type. I now consider this a mistake.
3. I at one point decided on an implementation for `defaultBehaviours` that separated it from `rules` and removed a dependency where the default settings had to be defined last in `rules`. This also turned out to overcomplicate things.

## Tests

​```
open SpecRunner.html
​```

## Other notes

A challenge from the [Makers Academy](http://www.makersacademy.com) Bootcamp.