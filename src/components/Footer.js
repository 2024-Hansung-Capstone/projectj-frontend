import React from 'react';

const Footer = () => {
  return (
    <div className="footer-container" style={styles.footerContainer}>
        <div className="footer-category" style={styles.footerCategory}>
            <p>회사소개 | 채용정보 | 이용약관  | 개인정보 처리방침 | 위치기반 서비스 이용약관  |  중개사 사이트 바로가기</p>
        </div>
        <div className='footer-detail' style={styles.footerDetail}>
            <p>주소: 서울특별시 성북구 삼선교로16길 116</p>
            <p>전화번호: 02-1234-5678</p>
            <p>상호명: (주)자취만렙</p>
            <p>서비스 이용문의 : 1234-1234</p>
            <p>이메일 : hansung@hansung.com</p>
            <p>소속 : 한성대학교 컴퓨터공학부</p>
        </div>
    </div>
  );
};

export default Footer;

const styles = {
  footerContainer: {
    fontFamily: 'Pretendard-Regular',
    backgroundColor: '#4aadb1',
    color: 'white',
    padding: '10px',
    paddingLeft: '40px',
    textAlign: 'left',
    marginTop: '80px',
  },
  footerCategory: {
    marginBottom: '40px',
    borderBottom: '1px solid white',
  },
  footerDetail: {
    fontSize: '13px',
  }
};
