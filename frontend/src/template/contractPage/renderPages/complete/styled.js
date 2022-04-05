import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';

const MainContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  text-align: center;
  justify-content: space-between;

`;

const useStyles = makeStyles((theme) => ({
  
  root: {
    width: '100%',
  },
  paper: {
    width: '90%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export default {
  MainContainer,
  useStyles,
};
