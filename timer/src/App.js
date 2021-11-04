import ProjectBar from './components/ProjectBar/ProjectBar';
import Timer from './components/Timer';

import './styles/main.css';


const App = () => {
  return (
    <div className="App">
      <ProjectBar 
          title       =   'Build a 25 + 5 Clock'
          institute   =   'FreeCodeCamp'
          instURL     =   'https://www.freecodecamp.org/'
          course      =   'Front End Development Libraries Certification'
          courseURL   =   'https://www.freecodecamp.org/learn/front-end-development-libraries/'
          userStory   =   'https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock'
          repository  =   'https://github.com/Dmnk28/timer'
          readme      =   'https://github.com/Dmnk28/timer/blob/main/README.md'
      />
      <Timer />
    </div>
  );
}

export default App;
