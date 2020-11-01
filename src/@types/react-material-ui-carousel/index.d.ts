
import React, { ReactNode } from 'react';

export interface CarouselIndicatorProps {
    className: string,
    style: React.CSSProperties
}

export interface RenderIndicatorProps {
    classes: string[]
    length: number
    active: number
    press: Function
    indicatorContainerProps?: CarouselIndicatorProps
    indicatorProps?: CarouselIndicatorProps
    activeIndicatorProps?: CarouselIndicatorProps
}

export interface CarouselProps {
    indicators?: boolean,
    autoPlay?: boolean,
    navButtonsAlwaysVisible?: boolean,
    navButtonsAlwaysInvisible?: boolean,
    fullHeightHover?: boolean,
    interval?: number,
    animation?: 'fade' | 'slide',
    children?: ReactNode,
    className?: string,
    timeout?: number | { appear?: number, enter?: number, exit?: number },
    index?: number,
    strictIndexing?: boolean,
    indicatorContainerProps?: CarouselIndicatorProps,
    indicatorProps?: CarouselIndicatorProps,
    activeIndicatorProps?: CarouselIndicatorProps,
    onChange?: Function,
    changeOnFirstRender?: boolean,
    next?: Function,
    prev?: Function,
    renderIndicator?(index: number, props: RenderIndicatorProps): ReactNode,
}

declare const Carousel: React.ComponentType<CarouselProps>;

export default Carousel;