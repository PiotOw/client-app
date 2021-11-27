import {
  trigger, group,
  transition, animate, style, query, AnimationTriggerMetadata, AnimationMetadata
} from '@angular/animations';

export const slideInAnimation: AnimationTriggerMetadata =
  trigger('routeAnimations', [
    transition(':increment', slideTo('left')),
    transition(':decrement', slideTo('right')),
  ]);

function slideTo(direction: string): AnimationMetadata[] {
  return [
    style({height: '!'}),
    query(':enter',
      style({
        transform: 'translateX' + (direction === 'left' ? '(100%)' : '(-100%)'),
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
            transform: 'translateX' + (direction === 'left' ? '(-100%)' : '(100%)'),
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
