import { Typography } from '@mui/material';
import { type StompSubscription } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { EUserManagementStatus, KEY_QUERY_USER_DETAIL } from '../common';
import { Modal } from '../components';
import { StompSocketClient } from '../libs';
import { clearToken, logout, userKeys, userStatusKey } from '../utils';

type MessageStatus = {
  type: string;
  data: {
    ed_id: string;
    employment_status: EUserManagementStatus;
    message: string;
  };
};

export function useUserStatusSocket({
  stompSocketClient,
  fedId,
}: {
  stompSocketClient: StompSocketClient;
  fedId?: string;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const elements: Record<EUserManagementStatus, React.ReactNode> = {
    ACTIVE: null,
    TERMINATED: null,
    RETIRED: null,
    REVOKED: (
      <Modal
        open={true}
        type="dialog"
        title={t('handlerEmploymentStatus.title.revoked')}
        content={
          <Typography>
            {t('handlerEmploymentStatus.content.revoked')}
          </Typography>
        }
        cancelButton={{
          sx: { display: 'none' },
        }}
        confirmButton={{
          onClick: () => logout({ navigate }),
        }}
        onClose={() => {}}
      />
    ),
    STANDBY: null,
  };

  const [status, setStatus] = useState<EUserManagementStatus | null>(null);

  useEffect(() => {
    if (!fedId) return;

    let sub: StompSubscription | undefined;

    (async () => {
      sub = await stompSocketClient.subscribe(
        `/topic/member-status/${fedId}`,
        (message) => {
          let payload: MessageStatus | null = null;

          try {
            payload = JSON.parse(message.body) as MessageStatus;
          } catch (e) {
            console.error('Invalid message body:', message.body);
            return;
          }

          console.log('New message: ', payload);

          const status = payload?.data?.employment_status;

          switch (status) {
            case 'REVOKED':
              clearToken();
              setStatus(status);
              return;

            case 'STANDBY':
            case 'TERMINATED':
            case 'ACTIVE':
            case 'RETIRED':
              setStatus(status);
              queryClient.invalidateQueries({
                queryKey: userKeys.details(KEY_QUERY_USER_DETAIL),
              });
              queryClient.invalidateQueries({
                queryKey: userStatusKey.all(),
              });
              return;

            default:
              setStatus(null);
              return;
          }
        }
      );
    })();

    return () => {
      sub?.unsubscribe();
    };
  }, [fedId]);

  return {
    element: status ? elements[status] : null,
    employmentStatus: status,
  };
}
