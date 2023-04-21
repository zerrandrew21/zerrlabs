import { Grid } from "@mui/material";
import ProjectCard from "../components/project-card";
import astronaut from '../pages/projects/grid-game/astronaut.jpg'

const project1 =           
  <ProjectCard
    title="PuzzleGame"
    description="A traditional 3x3 puzzle grid written mostly with ChatGPT"
    dateCreated="2023-04-16"
    imagePath={astronaut}
    linkTo="/projects/grid-game"
  />

const project2 = 
  <ProjectCard
    title="ChatThing"
    description="ChatGPT stuff"
    dateCreated="2023-04-18"
    imagePath="/path/to/image.jpg"
    linkTo="/projects/chatly"
  />

  const ProjectsPage = () => {

    return (
      <Grid container>
        <Grid item xs={12} md={4}>
          <Grid container justifyContent="center">
            {project1}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container justifyContent="center">
            {project2}
          </Grid>
        </Grid>
      </Grid>
    );
  }

export default ProjectsPage