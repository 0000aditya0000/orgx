import * as React from 'react';
import { Link } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Header({ tableName:tableName}) {
  const [alignment, setAlignment] = React.useState(tableName);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{marginTop:"9rem", marginLeft:'2rem', backgroundColor: "#DDE6ED" , color: "inherit"}}
      >
        <ToggleButton value="Studio"><Link to="/home/company/studio" style={{ textDecoration: 'none',color:'inherit' }}>Studio</Link></ToggleButton>
        <ToggleButton value="Employee"><Link to="/home/company/employee" style={{ textDecoration: 'none', color:'inherit' }}>Employee</Link></ToggleButton>
        <ToggleButton value="Practices"><Link to="/home/company/practices" style={{ textDecoration: 'none', color:'inherit' }}>Practices</Link></ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}