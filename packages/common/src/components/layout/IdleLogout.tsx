import { logout } from '@repo/common';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from 'react-router-dom';

type IdleLogoutProps = {
  enabled: boolean;
  timeout: number;
  name: string;
};

export function IdleLogout({ enabled, timeout, name }: IdleLogoutProps) {
  const navigate = useNavigate();

  useIdleTimer({
    disabled: !enabled,
    timeout,
    onIdle: () => {
      logout({ navigate });
    },
    crossTab: true,
    leaderElection: true,
    name,
  });

  return null;
}
