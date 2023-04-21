import { Typography } from '@mui/material';
import { colors } from '../colors';

const HomePage = () => {
  return (
    <div id='home-page'>
      <Typography component="body" sx={{color: colors.mainText}}>
        Homepage where all the cool homepage stuff goes.
      </Typography>
    </div>
  );
}

export default HomePage