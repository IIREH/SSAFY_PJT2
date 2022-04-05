import React, { useState, useEffect } from 'react';
import Styled from './ContractListMenu.styled';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ContractListMenu = (props) => {
  const [pageState, setPageState] = useState(0);

  const changePage = (e) => {
    setPageState(e.target.innerText);
  };

  useEffect(() => {
    props.handleState(pageState);
  }, [pageState]);

  return (
    <Styled.MainContainer>
      <ListSubheader component="div" disableGutters>
        생성
      </ListSubheader>

      <List component="div">
        <ListItem button onClick={changePage}>
          <ListItemText primary="작성" disableTypography />
        </ListItem>
      </List>

      <ListSubheader component="div" disableGutters>
        승인
      </ListSubheader>
      <List component="div">
        <ListItem button onClick={changePage}>
          <ListItemText primary="승인 대기" disableTypography />
        </ListItem>
      </List>

      <ListSubheader component="div" disableGutters>
        내 계약조회
      </ListSubheader>
      <List component="div">
        <ListItem button onClick={changePage}>
          <ListItemText primary="성립전" disableTypography />
        </ListItem>
      </List>
      <List component="div">
        <ListItem button onClick={changePage}>
          <ListItemText primary="이행중" disableTypography />
        </ListItem>
      </List>
    </Styled.MainContainer>
  );
};

export default ContractListMenu;
