import React from 'react';
import Styled from './ContractPageList.styled';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { contractPageState } from '@/states/contractPage';
import { useRecoilState } from 'recoil';

const ContractPageList = () => {
  const [pageState, setPageState] = useRecoilState(contractPageState);
  const changePage = (e) => {
    setPageState(e.target.innerText);
  };

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
          <ListItemText primary="요청보기" disableTypography />
        </ListItem>
      </List>

      <ListSubheader component="div" disableGutters>
        내 계약조회
      </ListSubheader>
      <List component="div">
        <ListItem button onClick={changePage}>
          <ListItemText primary="진행중" disableTypography />
        </ListItem>
      </List>
      <List component="div">
        <ListItem button onClick={changePage}>
          <ListItemText primary="완료" disableTypography />
        </ListItem>
      </List>

      <ListSubheader component="div" disableGutters>
        계약번호조회
      </ListSubheader>
      <List component="div">
        <ListItem button onClick={changePage}>
          <ListItemText primary="조회" disableTypography />
        </ListItem>
      </List>
    </Styled.MainContainer>
  );
};

export default ContractPageList;
