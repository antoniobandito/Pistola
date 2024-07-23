declare module 'react-responsive-carousel' {
  import * as React from 'react';

  interface CarouselProps {
    children?: React.ReactNode;
    showArrows?: boolean;
    showStatus?: boolean;
    showIndicators?: boolean;
    infiniteLoop?: boolean;
    showThumbs?: boolean;
    useKeyboardArrows?: boolean;
    autoPlay?: boolean;
    stopOnHover?: boolean;
    swipeable?: boolean;
    dynamicHeight?: boolean;
    emulateTouch?: boolean;
    autoFocus?: boolean;
    thumbWidth?: number;
    selectedItem?: number;
    interval?: number;
    transitionTime?: number;
    swipeScrollTolerance?: number;
    ariaLabel?: string;
  }

  export class Carousel extends React.Component<CarouselProps> {}
}
