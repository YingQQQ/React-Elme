/* HistoryList组件 主要功能点击传递数据 */
import React, {
  Component,
  Children,
} from 'react';
import {
  hot
} from 'react-hot-loader';
import PropTypes from 'prop-types';
import { listen } from '../utils/dom-helpers/events';

const axisProperties = {
  root: {
    x: {
      overflowX: 'hidden',
    },
    'x-reverse': {
      overflowX: 'hidden',
    },
    y: {
      overflowY: 'hidden',
    },
    'y-reverse': {
      overflowY: 'hidden',
    },
  },
  transform: {
    x: translate => `translate(${-translate}%, 0)`,
    y: translate => `translate(0, ${-translate}%)`,
  },
  flexDirection: {
    x: 'row',
  },
  length: {
    x: 'width',
  },
  rotationMatrix: {
    x: {
      x: [1, 0],
      y: [0, 1],
    },
    'x-reverse': {
      x: [-1, 0],
      y: [0, 1],
    },
    y: {
      x: [0, 1],
      y: [1, 0],
    },
    'y-reverse': {
      x: [0, -1],
      y: [1, 0],
    },
  },
  scrollPosition: {
    x: 'scrollLeft',
    'x-reverse': 'scrollLeft',
    y: 'scrollTop',
    'y-reverse': 'scrollTop',
  },
  scrollLength: {
    x: 'scrollWidth',
    'x-reverse': 'scrollWidth',
    y: 'scrollHeight',
    'y-reverse': 'scrollHeight',
  },
  clientLength: {
    x: 'clientWidth',
    'x-reverse': 'clientWidth',
    y: 'clientHeight',
    'y-reverse': 'clientHeight',
  },
};

const createTransition = (property, options) => {
  const { duration, easeFunction, delay } = options;

  return `${property} ${duration} ${easeFunction} ${delay}`;
};

const constant = {
  isSwiping_min: 3 // px
};


const computedIndex = (params) => {
  const { children, startIndex, startX, pageX, viewLength, resistance } = params;

  const indexMax = Children.count(children) - 1;
  let index = startIndex + ((startX - pageX) / viewLength);
  let newStartX;
  if (!resistance) {
    if (index < 0) {
      index = 0;
      newStartX = ((index - startIndex) * viewLength) + pageX;
    } else if (index > indexMax) {
      index = indexMax;
      newStartX = ((index - startIndex) * viewLength) + pageX;
    }
  }
  return {
    index,
    startX: newStartX,
  };
};

const getDomTreeShapes = (element, container) => {
  let domTreeShapes = [];
  while (element && element !== container) {
    if (element.hasAttribute('data-swipeable')) {
      break;
    }
    const style = window.getComputedStyle(element);
    if (style.getPropertyValue('position') === 'absolute'
      || style.getPropertyValue('overflow-x') === 'hidden') {
      domTreeShapes = [];
    } else if ((element.clientWidth > 0 && element.scrollWidth > element.clientWidth) ||
      (element.clientHeight > 0 && element.scrollHeight > element.clientHeight)) {
      domTreeShapes.push({
        element,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
      });
    }

    // eslint-disable-next-line no-param-reassign
    element = element.parentNode;
  }

  return domTreeShapes;
};

let nodeHowClaimedTheScroll = null;

const findNativeHandler = (params) => {
  const { domTreeShapes, pageX, startX, axis } = params;

  return domTreeShapes.some((shape) => {
    // 判断前进还是后退
    let goingForward = pageX >= startX;
    if (axis === 'x') {
      goingForward = !goingForward;
    }

    const scrollPosition = shape[axisProperties.scrollPosition[axis]];
    const areNotAtStart = scrollPosition > 0;
    const areNotAtEnd =
      scrollPosition + shape[axisProperties.clientLength[axis]] <
      shape[axisProperties.scrollLength[axis]];

    if ((goingForward && areNotAtEnd) || (!goingForward && areNotAtStart)) {
      nodeHowClaimedTheScroll = shape.element;
      return true;
    }

    return false;
  });
};

const getDisplaySameSlide = (props, nextProps) => {
  let displaySameSlide = false;

  if (props.children.length && nextProps.children.length) {
    const oldChildren = props.children[props.index];
    const oldKey = oldChildren ? oldChildren.key : 'empty';

    if (oldKey !== null) {
      const newChildren = nextProps.children[nextProps.index];
      const newKey = newChildren ? newChildren.key : 'empty';

      if (oldKey === newKey) {
        displaySameSlide = true;
      }
    }
  }

  return displaySameSlide;
};

//  使用坐标明确滑动 transform: matrix(1, 0, 0, 1, 100 = x轴, 100 = y轴)
const applyRotationMatrix = (touch, axis) => {
  const rotationMatrix = axisProperties.rotationMatrix[axis];
  return {
    pageX: (rotationMatrix.x[0] * touch.pageX) + (rotationMatrix.x[1] * touch.pageY),
    pageY: (rotationMatrix.y[0] * touch.pageX) + (rotationMatrix.y[1] * touch.pageY),
  };
};


class Swiper extends Component {
  constructor(props, context) {
    super(props, context);
    this.setIndexCurrent(this.props.index);
    this.state = {
      indexLatest: this.props.index,
      isDragging: false,
      isFirstRender: true,
      displaySameSlide: true,
      heightLatest: 0,
    };
  }
  componentDidMount() {
    this.transitionListener = listen(this.containerNode, 'transitionend', (event) => {
      if (event.target !== this.containerNode) {
        return;
      }
      this.handleTransitionEnd();
    });

    this.touchMoveListener = listen(this.rootNode, 'touchmove', (event) => {
      this.handleSwipeMove(event);
    }, {
      passive: false
    });

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(() => ({
      isFirstRender: false
    }));
  }
  componentWillReceiveProps(nextProps) {
    const { index } = nextProps;

    if (typeof index === 'number' && index !== this.props.index) {
      this.setIndexCurrent(index);
      this.setState({
        // If true, we are going to change the children. We shoudn't animate i
        displaySameSlide: getDisplaySameSlide(this.props, nextProps),
        indexLatest: index,
      });
    }
  }

  componentWillUnmount() {
    this.transitionListener();
    this.touchMoveListener();
  }

  setIndexCurrent(indexCurrent) {
    if (!this.props.animateTransitions && this.indexCurrent !== indexCurrent) {
      this.handleTransitionEnd();
    }
    this.indexCurrent = indexCurrent;

    if (this.containerNode) {
      const { axis } = this.props;
      const transform = axisProperties.transform[axis](indexCurrent * 100);
      this.containerNode.style.WebkitTransform = transform;
      this.containerNode.style.transform = transform;
    }
  }

  started = false;
  rootNode = null;
  containerNode = null;
  viewLength = 0;
  startX = 0;
  lastX = 0;
  vx = 0;
  startY = 0;
  isSwiping = undefined;
  started = true;
  startIndex= 0;
  transitionListener = null;
  touchMoveListener = null;
  indexCurrent = null;

  handleTouchStart = (e) => {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(e);
    }
    this.handleSwipeStart(e);
  }
  handleTouchEnd = (e) => {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(e);
    }
    this.handleSwipeEnd(e);
  };
  handleTransitionEnd = () => {
    if (!this.props.onTransitionEnd) {
      return;
    }

    if (this.state.displaySameSlide) {
      return;
    }
    if (!this.state.isDragging) {
      this.handleTransitionEnd();
    }
  }
  // 判断父元素的起始点
  handleSwipeStart = (e) => {
    const { axis } = this.props;
    if (this.rootNode === null) {
      return;
    }
    const touch = applyRotationMatrix(e.touches[0], axis);
    // 获取容器宽度
    this.viewLength = this.rootNode.getBoundingClientRect().width;
    // 起始坐标
    this.startX = touch.pageX;
    // 最后的坐标
    this.lastX = touch.pageX;
    this.vx = 0;
    this.startY = touch.pageY;
    this.isSwiping = undefined;
    this.started = true;
    // 获取容器的位置
    const computedStyle = window.getComputedStyle(this.containerNode);
    const transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
    if (transform && transform !== 'none') {
      const transformValues = transform.split('(')[1].split(')')[0].split(',');
      const rootStyle = window.getComputedStyle(this.rootNode);
      const transformNormalized = applyRotationMatrix({
        pageX: parseInt(transformValues[4], 10),
        pageY: parseInt(transformValues[5], 10)
      }, axis);

      this.startIndex = -transformNormalized.pageX /
        (this.viewLength - parseInt(rootStyle.paddingLeft, 10)
        - parseInt(rootStyle.paddingRight, 10));
    }
  }
  handleSwipeMove = (e) => {
    if (!this.started) {
      this.handleTouchStart(e);
      return;
    }
    if (!this.rootNode) {
      return;
    }
    const { axis, children, ignoreNativeScroll, resistance } = this.props;

    const touch = applyRotationMatrix(e.touches[0], axis);
    if (this.isSwiping === undefined) {
      const dx = Math.abs(this.startX - touch.pageX);
      const dy = Math.abs(this.startY - touch.pageY);

      const isSwiping = dx > dy && dx > constant.isSwiping_min;
      if (dx > dy) {
        e.preventDefault();
      }

      if (isSwiping || dy > constant.isSwiping_min) {
        this.isSwiping = isSwiping;
        // 记录起始点
        this.startX = touch.pageX;
        // 返回等待滑动
        return;
      }
    }

    if (this.isSwiping !== true) {
      return;
    }

    e.preventDefault();

    this.vx = (this.vx * 0.5) + ((touch.pageX - this.lastX) * 0.5);
    this.lastX = touch.pageX;
    const { index, startX } = computedIndex({
      children,
      resistance,
      pageX: touch.pageX,
      startX: this.startX,
      startIndex: this.startIndex,
      viewLength: this.viewLength
    });
    if (nodeHowClaimedTheScroll === null && !ignoreNativeScroll) {
      const domTreeShapes = getDomTreeShapes(event.target, this.rootNode);
      const hasFoundNativeHandler = findNativeHandler({
        domTreeShapes,
        startX: this.startX,
        pageX: touch.pageX,
        axis,
      });
      // 终止滑动
      if (hasFoundNativeHandler) {
        return;
      }
    }
    if (startX) {
      this.startX = startX;
    } else if (nodeHowClaimedTheScroll === null) {
      nodeHowClaimedTheScroll = this.rootNode;
    }
    this.setIndexCurrent(index);

    if (this.state.displaySameSlide || !this.state.isDragging) {
      this.setState(() => ({
        isDragging: true,
        displaySameSlide: false
      }));
    }
  }
  handleSwipeEnd = () => {
    nodeHowClaimedTheScroll = null;
    if (!this.started) {
      return;
    }
    this.started = false;

    if (this.isSwiping !== true) {
      return;
    }
    const indexLatest = this.state.indexLatest;
    const indexCurrent = this.indexCurrent;
    const delta = indexLatest - indexCurrent;

    let indexNew;
    if (Math.abs(this.vx) > this.props.min) {
      if (this.vx > 0) {
        indexNew = Math.floor(indexCurrent);
      } else {
        indexNew = Math.ceil(indexCurrent);
      }
    } else if (Math.abs(delta) > this.props.hysteresis) {
      indexNew = delta > 0 ? Math.floor(indexCurrent) : Math.ceil(indexCurrent);
    } else {
      indexNew = indexLatest;
    }
    const indexMax = Children.count(this.props.children) - 1;

    if (indexNew < 0) {
      indexNew = 0;
    } else if (indexNew > indexMax) {
      indexNew = indexMax;
    }

    this.setIndexCurrent(indexNew);
    this.setState(
      {
        indexLatest: indexNew,
        isDragging: false,
      },
      () => {
        if (this.props.onChangeIndex && indexNew !== indexLatest) {
          this.props.onChangeIndex(indexNew, indexLatest, {
            reason: 'swipe',
          });
        }

        if (indexCurrent === indexLatest) {
          this.handleTransitionEnd();
        }
      },
    );
  }
  render() {
    const {
      axis,
      children,
      resistance,
      min,
      hysteresis,
      ignoreNativeScroll,
      index,
      onChangeIndex,
      onTransitionEnd,
      animateTransitions,
      springConfig,
      disableLazyLoading,
      containerStyle: containerStyleProp,
      style,
      slideStyle: slideStyleProp,
      slideClassName,
      ...other
    } = this.props;
    const touchEvents = {
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
    };
    const { displaySameSlide, heightLatest, isDragging, isFirstRender, indexLatest } = this.state;
    let transition;
    let WebkitTransition;
    const styles = {
      container: {
        direction: 'ltr',
        display: 'flex',
        willChange: 'transform',
      },
      slide: {
        width: '100%',
        WebkitFlexShrink: 0,
        flexShrink: 0,
        overflow: 'auto',
      },
    };
    const slideStyle = Object.assign({}, styles.slide, slideStyleProp);

    if (isDragging || !animateTransitions || displaySameSlide) {
      transition = 'all 0s ease 0s';
      WebkitTransition = 'all 0s ease 0s';
    } else {
      transition = createTransition('transform', springConfig);
      WebkitTransition = createTransition('-webkit-transform', springConfig);

      if (heightLatest !== 0) {
        const additionalTranstion = `, ${createTransition('height', springConfig)}`;
        transition += additionalTranstion;
        WebkitTransition += additionalTranstion;
      }
    }
    const containerStyle = {
      height: null,
      WebkitFlexDirection: axisProperties.flexDirection[axis],
      flexDirection: axisProperties.flexDirection[axis],
      WebkitTransition,
      transition,
    };
    if (disableLazyLoading || !isFirstRender) {
      const transform = axisProperties.transform[axis](this.indexCurrent * 100);
      containerStyle.WebkitTransform = transform;
      containerStyle.transform = transform;
    }
    return (
      <div
        ref={(node) => {
          this.rootNode = node;
        }}
        style={Object.assign({}, axisProperties.root[axis], style)}
        {...touchEvents}
        {...other}
      >
        <div
          ref={(node) => {
            this.containerNode = node;
          }}
          style={Object.assign({}, containerStyle, styles.container, containerStyleProp)}
        >
          {
            Children.map(children, (child, indexChild) => {
              if (!disableLazyLoading && isFirstRender && indexChild !== indexLatest) {
                return null;
              }
              let ref;
              let hidden = true;

              if (indexChild === indexLatest) {
                hidden = false;
              }
              return (
                <div
                  ref={ref}
                  style={slideStyle}
                  className={slideClassName}
                  aria-hidden={hidden}
                  data-swipeable="true"
                >
                  {child}
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
Swiper.defaultProps = {
  animateTransitions: true,
  axis: 'x',
  index: 0,
  resistance: false,
  min: 5,
  hysteresis: 0.6,
  disableLazyLoading: false,
  springConfig: {
    duration: '0.35s',
    easeFunction: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
    delay: '0s',
  },
};

Swiper.propTypes = {
  index: PropTypes.number,
  axis: PropTypes.string,
  onTouchStart: PropTypes.func,
  children: PropTypes.node,
  resistance: PropTypes.bool,
  ignoreNativeScroll: PropTypes.bool,
  animateTransitions: PropTypes.bool,
  min: PropTypes.number,
  hysteresis: PropTypes.number,
  onChangeIndex: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTransitionEnd: PropTypes.func,
  disableLazyLoading: PropTypes.bool,
  springConfig: PropTypes.shape({
    duration: PropTypes.string,
    easeFunction: PropTypes.string,
    delay: PropTypes.string,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  containerStyle: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  slideStyle: PropTypes.object,
  slideClassName: PropTypes.string,
};

export default hot(module)(Swiper);
