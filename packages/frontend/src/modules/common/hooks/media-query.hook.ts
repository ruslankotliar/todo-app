import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';

export function useQuery() {
  const mobile = useMediaQuery(
    json2mq({
      maxWidth: 424
    })
  );
  const tablet = useMediaQuery(
    json2mq({
      minWidth: 425,
      maxWidth: 767
    })
  );
  const desktop = useMediaQuery(
    json2mq({
      minWidth: 768
    })
  );

  return {
    mobile,
    tablet,
    desktop
  };
}
