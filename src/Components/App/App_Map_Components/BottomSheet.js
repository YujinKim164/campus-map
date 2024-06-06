import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from "react-router-dom";
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, title,content,detail }) => {
  const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));
  const navigate = useNavigate();
  const open = () => {
    api.start({ y: 0 });
  };

  const close = () => {
    api.start({ y: window.innerHeight });
  };

  React.useEffect(() => {
    if (isOpen) open();
    else close();
  }, [isOpen]);

  const bind = useDrag(
    ({ last, movement: [, my], memo = y.get() }) => {
      if (last) {
        if (my > 100) {
          onClose();
        } else {
          open();
        }
      } else {
        api.start({ y: memo + my });
      }
      return memo;
    },
    { from: () => [0, y.get()] }
  );

  const navigateToDetail = () => {
    onClose();
    navigate('/building/'+detail);
  };

  return (
    <>
    {isOpen && <div className="dimmer" onClick={onClose}></div>}
    <animated.div
      className="bottom-sheet"
      style={{ y }}
      {...bind()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bottom-sheet-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={navigateToDetail}>Go to Detail Page</button>
      </div>
    </animated.div>
    </>
  );
};

export default BottomSheet;
