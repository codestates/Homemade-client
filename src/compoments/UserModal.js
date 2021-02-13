import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// UserModal 주변영역
const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`;
// UserModal영역
const UserModalStyle = styled.div`
  width: 400px;
  padding: 1.5rem;
  background: white;
  border-radius: 5px;
  h3 {
    margin-bottom: 50px;
  }
`;
// 확인 버튼
const Button = styled.button`
  border-radius: 4px;
  font-weight: bold;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 3px;
  display: block;
  width: 100%;
  height: 40px;
  background: #76a264;
  color: white;
  border: 1px solid lightgray;
`;

export default function UserModal({ closeForm }) {
  return (
    <DarkBackground>
      <UserModalStyle>
        <h3>정상적으로 회원가입이 되었습니다.</h3>
        <Button type="button" onClick={closeForm}>
          확인
        </Button>
      </UserModalStyle>
    </DarkBackground>
  );
}

UserModal.propTypes = {
  closeForm: PropTypes.func.isRequired,
};
