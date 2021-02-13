/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Portal from "./Portal";

export default function NorificationModal({
  // eslint-disable-next-line react/prop-types
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  // eslint-disable-next-line prettier/prettier
	// eslint-disable-next-line no-unused-vars
  children,
}) {
  const onMaskClick = e => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = e => {
    if (onClose) {
      onClose(e);
    }
  };
  useEffect(() => {
    document.body.style.cssText = ` top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      // eslint-disable-next-line radix
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && (
            <CloseButton className="modal-close" onClick={close}>
              X
            </CloseButton>
          )}
          {children}
          <ConfirmButton onClick={close}>확인</ConfirmButton>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
}
NorificationModal.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  closable: true,
  // eslint-disable-next-line react/default-props-match-prop-types
  maskClosable: true,
  visible: false,
};
NorificationModal.propTypes = {
  visible: PropTypes.bool,
};
const CloseButton = styled.button`
  border: 0px;
  display: block;
  float: right;
  background: white;
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${props => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  text-align-last: center;

  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;
const ConfirmButton = styled.button`
  border: 1px solid #76a264;
  padding: 0.5em 2em;
  color: #76a264;
  border-radius: 10px;
  background: white;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #76a264;
    color: #fff;
  }
`;
