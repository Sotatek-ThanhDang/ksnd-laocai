import 'react-toastify/dist/ReactToastify.css';

import styled from '@emotion/styled';
import {
  ToastContainer as ReactToastifyContainer,
  type ToastContainerProps,
} from 'react-toastify';

import { error, success } from '../../common';
import { defaultToastOptions } from '../../common/toast-config';

const ToastContainer = (props: ToastContainerProps) => {
  return <StyledReactToastifyContainer {...defaultToastOptions} {...props} />;
};

const StyledReactToastifyContainer = styled(ReactToastifyContainer)`
  --toastify-color-success: ${success[500]};

  --toastify-color-error: ${error[500]};

  --toastify-toast-bd-radius: 8px;

  --toastify-toast-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

export { ToastContainer };
