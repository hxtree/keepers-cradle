import React from 'react';
import { Meta } from '@storybook/react';
import { IsometricCanvas, IsometricCanvasProps } from '../../src/main';

export default {
  title: 'Game Assets/HUD/IsometricCanvas',
  component: IsometricCanvas,
} as Meta<typeof IsometricCanvas>;

export const Default = (args: IsometricCanvasProps) => (
  <IsometricCanvas {...args} />
);

Default.args = {
  spriteMapRegistry: {
    f: '/game-assets/fadewall-1x1.png',
    t: '/game-assets/tileset-4x4.png',
    b: '/game-assets/barrel-1x1.png',
    d: '/game-assets/door-1x1.png',
    w: '/game-assets/trainwall-8x1.png',
    n: '/game-assets/nightstand-4x3.png',
  },
  grid: [
    [
      ['w1', 'w1', 'w1', 'w4', 'w1', 'f1', 'w1', 'w1'],
      ['w1', 't2', 't2', 't2', 't2', 't2', 't2', 'w1'],
      ['w1', 't2', 't2', 't2', 't2', 't2', 't2', 'w1'],
      ['w1', 't2', 't2', 't2', 't2', 't2', 't2', 't2'],
      ['w1', 't2', 't2', 't2', 't2', 't2', 't2', 'w1'],
      ['w5', 't2', 't2', 't2', 't2', 't2', 't2', 'w1'],
      ['w1', 't2', 't2', 't2', 't2', 't2', 't2', 'w1'],
      ['w1', 'w1', 'w1', 'w1', 't2', 'w1', 'w1', 'w1'],
    ],
    [
      ['0', '0', '0', '0', '0', 'd1', '0'],
      ['0', '0', '0', '0', '0', '0', 'b1'],
      ['0', 't10', 't9', 't9'],
      ['0', 't10', 't9', 't9'],
      ['0'],
      ['0', 'n10'],
      ['0'],
    ],
  ],
  cameraPosition: { x: 0, y: 0, z: 0 },
} as IsometricCanvasProps;