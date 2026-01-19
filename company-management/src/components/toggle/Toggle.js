import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ToggleTable(props) {
  const [checked, setChecked] = React.useState(false);
  return (
    <div >
        <Switch
      color={checked ? 'success' : 'danger'}
      checked={props.status}
      onChange={props.handleSwitch}
      sx={{
        '--Switch-thumbSize': '19px',
        '--Switch-trackWidth': '50px',
        '--Switch-trackHeight': '25px',
        '--Switch-trackBackground': '#6C757D',
        '&:hover': {
          '--Switch-trackBackground': '#6C757D',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': '#198754',
          '&:hover': {
            '--Switch-trackBackground': '#198754',
          },
        },
      }}
    />
    </div>
  );
}


