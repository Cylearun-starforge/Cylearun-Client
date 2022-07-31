import { useFollowMouse, FollowMouseConfig } from '../use-follow-mouse';
import { createApp, defineComponent, effect, ref, Ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { mount, config, DOMWrapper } from '@vue/test-utils';
config.global.provide = {
  document: {
    body: {
      clientWidth: 1920,
      clientHeight: 1080,
    },
  },
};

const fakeElement = (props: any) => ref(props) as any as Ref<HTMLElement>;

describe('useFollowMouse', () => {
  it('should move to center', () => {
    const element = fakeElement({
      clientWidth: 100,
      clientHeight: 100,
      style: {
        left: 0,
        top: 0,
      },
    });

    const fn = useFollowMouse(element, {
      base: {
        x: 'left',
        y: 'top',
      },
    });
    expect(element.value.style.left).eq(0);
    expect(element.value.style.top).eq(0);
    // move mouse to the center of the screen
    fn({
      clientX: 1920 / 2,
      clientY: 1080 / 2,
    } as any);
    expect(element.value.style.left).eq('910px'); // (1920 - 100) / 2
    expect(element.value.style.top).eq('490px'); // (1080 - 100) / 2
  });

  it('should have offset', () => {
    const element = fakeElement({
      clientWidth: 100,
      clientHeight: 100,
      style: {
        left: 0,
        top: 0,
      },
    });

    const fn = useFollowMouse(element, {
      base: {
        x: 'left',
        y: 'top',
      },
      offset: {
        x: 20,
        y: -10,
      },
    });
    expect(element.value.style.left).eq(0);
    expect(element.value.style.top).eq(0);
    // move mouse to the center of the screen
    fn({
      clientX: 1920 / 2,
      clientY: 1080 / 2,
    } as any);
    expect(element.value.style.left).eq('930px');
    expect(element.value.style.top).eq('480px');
  });

  it('should has limit', () => {
    const element = fakeElement({
      clientWidth: 100,
      clientHeight: 100,
      style: {
        left: 0,
        top: 0,
      },
    });

    const fn = useFollowMouse(element, {
      base: {
        x: 'left',
        y: 'top',
      },
      maxMove: {
        left: 200,
      },
    });
    expect(element.value.style.left).eq(0);
    expect(element.value.style.top).eq(0);
    // move mouse to the center of the screen
    fn({
      clientX: 1920 / 2 - 200,
      clientY: 1080 / 2,
    } as any);
    expect(element.value.style.left).eq('610px'); // (1920 - 100) / 2
  });
});
