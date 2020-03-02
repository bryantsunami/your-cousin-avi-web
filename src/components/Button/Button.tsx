import React, { useState, useEffect, useRef, FC } from 'react';
import { useSpring, animated } from 'react-spring';

type TButtonTypes = 'round' | 'square' | 'on-hover';

interface IButtonProps {
  clickAction: () => any;
  buttonType?: TButtonTypes;
}

const Button: FC<IButtonProps> = ({ clickAction, buttonType, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

  const fadeOutProps = useSpring({ opacity: showLoader ? 1 : 0 });
  const fadeInProps = useSpring({ opacity: showLoader ? 0 : 1 });

  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [children]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    }

    if (!isLoading && showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isLoading, showLoader]);

  const handleClick = () => {
    setIsLoading(true);
    clickAction().then(() => {
      setIsLoading(false);
    });
  };

  return (
    <button
      onClick={handleClick}
      ref={ref}
      style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {}
      }
    >
      {showLoader ? (
        <animated.div style={fadeOutProps}>Loading</animated.div>
      ) : (
        <animated.div style={fadeInProps}>{children}</animated.div>
      )}
    </button>
  );
};

Button.defaultProps = {
  buttonType: 'round',
};

export default Button;
