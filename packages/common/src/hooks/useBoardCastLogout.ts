import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BOARD_CAST_AUTH_KEY, BOARD_CAST_AUTH_MESSAGE } from '../common';

const channel = new BroadcastChannel(BOARD_CAST_AUTH_KEY);

const useBoardCastLogoutMultiTabs = ({
  login_path,
}: {
  login_path: string;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    channel.onmessage = (event) => {
      if (
        // only logout in different tabs
        event.data === BOARD_CAST_AUTH_MESSAGE &&
        !sessionStorage.getItem(BOARD_CAST_AUTH_KEY)
      ) {
        navigate(login_path);
      }
    };

    return () => {
      channel.close();
    };
  }, []);
};

export default useBoardCastLogoutMultiTabs;
