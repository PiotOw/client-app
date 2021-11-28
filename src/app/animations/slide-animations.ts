import {group, animate, style, query, AnimationMetadata} from '@angular/animations';

import {Direction} from '../models/direction.enum';


export function slideHorizontally(direction: Direction): AnimationMetadata[] {
  return [
    style({height: '!'}),
    query(':enter',
      style({
        transform: `translateX(${direction === Direction.LEFT ? '100%' : '-100%'})`,
      })),
    query(':enter, :leave',
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      })),
    group([
      query(':leave', [
        animate('0.2s ease-in-out',
          style({
            transform: `translateX(${direction === Direction.LEFT ? '-100%' : '100%'})`,
          })),
      ]),
      query(':enter', [
        animate('0.2s ease-in-out',
          style({
            transform: 'translateX(0)',
          })),
      ]),
    ]),
  ];
}

export function slideVertically(direction: Direction): AnimationMetadata[] {
    return [
      style({height: '!', width: '!'}),
      query(':enter',
        style({
          transform: `translateY(${direction === Direction.DOWN ? '-100%' : '100%'})`,
          opacity: '0',
          position: 'absolute',
          top: 0,
        }), {optional: true}),
      query(':enter', [
        animate('.4s ease-in-out',
          style({
            opacity: '!',
            transform: 'translateY(0)',
          })),
      ], {optional: true}),
    ];
}
