import React from 'react';
import './css/TermsOfService.css';

const TermsOfService = ({ onClose }) => {
  const handleAgree = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-Terms" onClick={(e) => e.stopPropagation()}>
        <h2>이용약관</h2>
        <div className="terms-section">
          <h4>제1조 (목적)</h4>
          <p>본 약관은 서비스 이용자가 "자취만렙"에서 제공하는 모든 서비스를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        </div>
        
        <div className="terms-section">
          <h4>제2조 (정의)</h4>
          <p>1. "서비스"란 "자취만렙"이 제공하는 모든 서비스를 의미합니다.</p>
          <p>2. "이용자"란 "자취만렙"에 접속하여 이 약관에 따라 "자취만렙"이 제공하는 서비스를 받는 자를 의미합니다.</p>
        </div>

        <div className="terms-section">
          <h4>제3조 (약관의 효력 및 변경)</h4>
          <p>1. 본 약관은 이용자가 서비스를 신청한 시점에 효력이 발생합니다.</p>
          <p>2. 회사는 필요 시 관련 법령에 위배되지 않는 범위 내에서 본 약관을 개정할 수 있습니다.</p>
          <p>3. 약관이 변경되는 경우 회사는 변경 사항을 이용자에게 알리고, 변경된 약관은 "자취만렙" 내에 공지합니다.</p>
        </div>

        <div className="terms-section">
          <h4>제4조 (서비스의 제공 및 중단)</h4>
          <p>1. 회사는 이용자에게 서비스를 제공할 수 있습니다.</p>
          <p>2. 회사는 특정 사유로 인해 서비스 제공을 일시적으로 중단할 수 있으며, 이 경우 이용자에게 사전 공지합니다.</p>
        </div>

        <div className="terms-section">
          <h4>제5조 (개인정보의 보호 및 이용)</h4>
          <p>1. 회사는 이용자의 개인정보를 보호하기 위해 최선을 다하며, 개인정보 보호에 관한 법령 및 회사의 개인정보 처리방침에 따릅니다.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
