import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material'

interface ProjectCardProps {
  title: string;
  description: string;
  dateCreated: string;
  imagePath?: string;
  linkTo?: string;
}


const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, dateCreated, imagePath, linkTo }) => {
  return (
    <Card sx={{minHeight: '250px', maxWidth: '450px'}}>
      <CardActionArea component="a" href={linkTo}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            Created on {dateCreated}
          </Typography>
        </CardContent>
        {imagePath && (
          <CardMedia
            title={title}
            style={{height: 150}}
            image={imagePath}
          />
        )}
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;