import React, { Component } from 'react';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import autoBind from 'auto-bind';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useSwipeable } from 'react-swipeable';

const styles = {
    root: {
        position: "relative",
        overflow: "hidden",
    },
    indicators: {
        width: "100%",
        textAlign: "center",
        position: 'absolute',
        top: 'calc(100% - 24px)',
    },
    indicator: {
        fontSize: "15px",
        cursor: "pointer",
        transition: "200ms",
        color: "#afafaf",
        '&:hover': {
            color: "#1f1f1f"
        },
        '&:active': {
            color: "#1f1f1f"
        }
    },
    active: {
        color: "#494949"
    },
    buttonWrapper: {
        position: "absolute",
        height: "100px",
        backgroundColor: "transparent",
        top: "calc(50% - 70px)",
        '&:hover': {
            '& $button': {
                backgroundColor: "black",
                filter: "brightness(120%)",
                opacity: 0.4
            }
        }
    },
    fullHeightHoverWrapper: {
        height: "calc(100% - 20px - 10px) !important",
        top: "0 !important"
    },
    button: {
        margin: "0 10px",
        position: "relative",
        backgroundColor: "#494949",
        top: "30px",
        color: "white",
        fontSize: "30px",
        transition: "200ms",
        cursor: "pointer",
        '&:hover': {
            opacity: "0.6 !important"
        }
    },
    fullHeightHoverButton: {
        top: "calc(50% - 20px) !important"
    },
    buttonVisible:{
        opacity: "0.6"
    },
    buttonHidden:{
        opacity: "0",
    },
    next: {
        right: 0
    },
    prev: {
        left: 0
    }
}

function renderIndicator(index, props) {
    const style = props.indicatorProps !== undefined ? props.indicatorProps.style : undefined;
    let className = props.indicatorProps !== undefined ? props.indicatorProps.className : undefined;
    const activeStyle = props.activeIndicatorProps !== undefined ? props.activeIndicatorProps.style : undefined;
    const activeClassName = props.activeIndicatorProps !== undefined ? props.activeIndicatorProps.className : undefined;


    className = index === props.active ? 
        `${props.classes.indicator} ${props.classes.active} ${activeClassName}`: 
        `${props.classes.indicator} ${className}`;
            
    return (
        <FiberManualRecordIcon 
            key={index}
            size='small'
            className={className}
            style={index === props.active ? activeStyle : style}
            onClick={() => {props.press(index)}}
        />
    );
}

const sanitizeProps = (props) =>
{
    const animation = props.animation !== undefined ? props.animation: "fade";
    const timeout = props.timeout !== undefined ? props.timeout : (animation === "fade" ? 500 : 200);

    return {
        children: props.children ? props.children : [],
        index: props.index !== undefined ? props.index : 0,
        strictIndexing: props.strictIndexing !== undefined ? props.strictIndexing : true,
        autoPlay: props.autoPlay !== undefined ? props.autoPlay : true,
        interval: props.interval !== undefined ? props.interval : 4000,
        indicators: props.indicators !== undefined ? props.indicators : true,
        navButtonsAlwaysInvisible: props.navButtonsAlwaysInvisible !== undefined ? props.navButtonsAlwaysInvisible : false,
        navButtonsAlwaysVisible: props.navButtonsAlwaysVisible !== undefined ? props.navButtonsAlwaysVisible : false,
        animation: animation,
        timeout: timeout,
        fullHeightHover: props.fullHeightHover !== undefined ? props.fullHeightHover : true,
        indicatorContainerProps: props.indicatorContainerProps,
        indicatorProps: props.indicatorProps,
        activeIndicatorProps: props.activeIndicatorProps,
        onChange: props.onChange !== undefined ? props.onChange : () => {},
        changeOnFirstRender: props.changeOnFirstRender !== undefined ? props.changeOnFirstRender : false,
        next: props.next !== undefined ? props.next : () => {},
        prev: props.prev !== undefined ? props.prev : () => {},
        className: props.className !== undefined ? props.className : "",
        renderIndicator: props.renderIndicator || renderIndicator,
    }
}

class Carousel extends Component
{
    constructor(props)
    {
        super(props);
        autoBind(this);

        this.state = {
            active: 0,
            prevActive: 0,
            displayed: 0,
        }

        this.timer = null;
    }

    componentDidMount()
    {
        const { index, changeOnFirstRender } = sanitizeProps(this.props)
        this.setActive(index, undefined, changeOnFirstRender);

        this.start();
    }

    componentWillUnmount()
    {
        this.stop();
    }

    componentDidUpdate(prevProps, prevState)
    {
        prevProps = sanitizeProps(prevProps);
        const { autoPlay, interval, children, index } = sanitizeProps(this.props);

        if (autoPlay !== prevProps.autoPlay || interval !== prevProps.interval)
        {
            this.reset();
        }

        if (children.length !== prevProps.children.length)
        {
            this.setActive(index);
        }

        if (prevProps.index !== index)
        {
            this.setActive(index)
        }
    }

    stop()
    {
        if (this.timer)
        {
            clearInterval(this.timer)
            this.timer = null;
        }
    }

    start()
    {
        const { autoPlay, interval } = sanitizeProps(this.props);

        if (autoPlay)
        {
            this.timer = setInterval(this.next, interval);
        }
    }

    reset()
    {

        const { autoPlay } = sanitizeProps(this.props);
        this.stop();

        if (autoPlay)
        {
            this.start();
        }
    }

    setActive(index, callback=() => {}, runCallbacks=true)
    {
        const { onChange, timeout, children, strictIndexing } = sanitizeProps(this.props);

        // if index is bigger than the children length, set it to be the last child (if strictIndexing)
        if (Array.isArray(children))
        {
            if (strictIndexing && index > children.length - 1) index = children.length - 1;
            if (strictIndexing && index < 0) index = 0;
        }
        else
        {
            index = 0;
        }

        const prevActive = this.state.active;

        this.setState({
            active: index,
            prevActive: prevActive,
            displayed: prevActive
        }, this.reset);

        setTimeout(() => {
            this.setState({
                displayed: index
            }, () => {
                if (runCallbacks)
                {
                    // Call user defined callbacks
                    callback(index, prevActive);
                    onChange(index, prevActive);
                }


            })
        }, timeout);
    }

    next(event)
    {
        const { children, next } = sanitizeProps(this.props);

        const nextActive = this.state.active + 1 > children.length - 1 ? 0 : this.state.active + 1;

        this.setActive(nextActive, next)

        if (event)
            event.stopPropagation();
    }

    prev(event)
    {
        const { children, prev } = sanitizeProps(this.props);

        const nextActive = this.state.active - 1 < 0 ? children.length - 1 : this.state.active - 1;

        this.setActive(nextActive, prev)

        if (event)
            event.stopPropagation();
    }

    render()
    {
        const {
            children,
            indicators,
            navButtonsAlwaysInvisible,
            navButtonsAlwaysVisible,
            animation,
            timeout,
            fullHeightHover,
            indicatorContainerProps,
            indicatorProps,
            activeIndicatorProps,
            className,
            renderIndicator,
        } = sanitizeProps(this.props);

        const classes = this.props.classes;
        
        const buttonCssClassValue = `${classes.button} ${navButtonsAlwaysVisible ? classes.buttonVisible: classes.buttonHidden } ${fullHeightHover ? classes.fullHeightHoverButton : ""}`;
        const buttonWrapperCssClassValue = `${classes.buttonWrapper} ${fullHeightHover ? classes.fullHeightHoverWrapper : ""}`;

        const compareActiveDisplayed = () => {
            if (this.state.active === 0 && this.state.prevActive === children.length - 1)
            {
                return true;
            }

            if (this.state.active === children.length - 1 && this.state.prevActive === 0)
            {
                return false;
            }

            if (this.state.active > this.state.prevActive)
            {
                return true;
            }

            return false;
        }

        return (
            <div className={`${classes.root} ${className ? className : ""}`} onMouseEnter={this.stop} onMouseOut={this.reset}>
                {   
                    Array.isArray(children) ? 
                       children.map( (child, index) => {
                            return (
                                <CarouselItem 
                                    key={`carousel-item${index}`}
                                    display={index === this.state.displayed ? true : false}
                                    active={index === this.state.active ? true : false}
                                    isNext={compareActiveDisplayed()}
                                    child={child}
                                    animation={animation}
                                    timeout={timeout}
                                    next={this.next}
                                    prev={this.prev}
                                />
                            )
                        })
                        :
                        <CarouselItem
                            key={`carousel-item0`}
                            display={true}
                            active={true}
                            child={children}
                            animation={animation}
                            timeout={timeout}
                            // next={this.next}
                            // prev={this.prev}
                        />
                }
                
                {!navButtonsAlwaysInvisible && 
                    <div className={`${buttonWrapperCssClassValue} ${classes.next}`}>
                        <IconButton className={`${buttonCssClassValue} ${classes.next}`} onClick={this.next} aria-label="Next">
                            <NavigateNextIcon/>
                        </IconButton>
                    </div>
                }

                {!navButtonsAlwaysInvisible &&
                    <div className={`${buttonWrapperCssClassValue} ${classes.prev}`}>
                        <IconButton className={`${buttonCssClassValue}  ${classes.prev}`} onClick={this.prev} aria-label="Previous">
                            <NavigateBeforeIcon/>
                        </IconButton>
                    </div>
                }
                
                {
                    indicators ? 
                    <Indicators
                        classes={classes}
                        length={children.length}
                        active={this.state.active}
                        press={this.setActive}
                        indicatorContainerProps={indicatorContainerProps}
                        indicatorProps={indicatorProps}
                        activeIndicatorProps={activeIndicatorProps}
                        render={renderIndicator}
                    /> : null
                }
            </div>
        )
    }
}

const useItemStyles = makeStyles({
    carouselItem: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})

function CarouselItem(props)
{
    const classes = useItemStyles()

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => props.next(),
        onSwipedRight: () => props.prev()
    })

    return (
        <div {...swipeHandlers} className={`CarouselItem ${classes.carouselItem}`} >
            {props.animation === "slide" ?
                <Slide direction={props.active ? (props.isNext ? "left" : "right") : (props.isNext ? "right" : "left")} in={props.active} timeout={props.timeout}>
                    <div>
                        {props.child}
                    </div>
                </Slide>
                :
                <Fade in={props.active} timeout={props.timeout}>
                    <div>
                        {props.child}
                    </div>
                </Fade>
            }
        </div>
    )
}

function Indicators(props)
{
    const classes = props.classes;

    let indicators = [];
    for (let i = 0; i < props.length; i++)
    {
        indicators.push(props.render(i, props));
    }

    const wrapperStyle = props.indicatorContainerProps !== undefined ? props.indicatorContainerProps.style : undefined;
    const wrapperClassName = props.indicatorContainerProps !== undefined ? props.indicatorContainerProps.className: "";

    return (
        <div className={`${classes.indicators} ${wrapperClassName}`} style={wrapperStyle}>
            {indicators}
        </div>
    )
}

export default withStyles(styles)(Carousel);
