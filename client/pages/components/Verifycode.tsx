import React from 'react';
import VerificationCode from 'react-native-verification-code';

/**
 * 通过高阶组件+useMemo避免验证码刷新的问题
 */

class VerifyCode extends React.PureComponent {
  code: React.RefObject<unknown>;
  constructor(props:any) {
    super(props);
    this.code = React.createRef()
  }
  render() {
    return <VerificationCode isColor={true} {...this.props} ref={this.code} />;
  }
}

export default VerifyCode;
