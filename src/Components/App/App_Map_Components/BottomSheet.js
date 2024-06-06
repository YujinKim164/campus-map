import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './BottomSheet.css';

const BottomSheet = ({ isOpen, onClose, title,content,detail }) => {
  const [{ y }, api] = useSpring(() => ({ y: window.innerHeight }));
  const navigate = useNavigate();
  const open = () => {
    api.start({ y: 0 });
  };
  const { t } = useTranslation();
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
      <div className="bottom-sheet-header">
        <h2>{title}</h2>
        {detail && <img src={require("../../../Assets/img/building/"+detail+".jpeg")} alt="Content" className="bottom-sheet-image" />}
        </div>
        <p>{content}</p>
        <button onClick={navigateToDetail}>{t("detail")}</button>
      </div>
    </animated.div>
    </>
  );
};

export default BottomSheet;
