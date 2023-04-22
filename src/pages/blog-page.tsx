import { Typography } from '@mui/material';
import { colors } from '../colors';

const BlogPage = () => {
  return (
    <div id='blog-page'>
      <Typography component="body" sx={{color: colors.white500}}>
        Blog where all the cool blog stuff goes.
      </Typography>
    </div>
  );
}

export default BlogPage