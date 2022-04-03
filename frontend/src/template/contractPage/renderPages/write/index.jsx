import React, { useState, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import { Heading } from '@/components/atoms';
import { useRecoilState } from 'recoil';
import { contractPageState } from '@/states';
import { fileInstance } from '@/libs/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


// 파일 첨부시 pdf 미리보기 처리 하는거 추가
const Write = () => {
  const fileApi = fileInstance();
  const [pageState, setPageState] = useRecoilState(contractPageState);
  const [contractName, setContractName] = useState();
  const [covenantee, setCovenantee] = useState();
  const [files, setFile] = useState([]);

  const onFileChange = useCallback(
    (e) => {
      setFile([...Array.from(e.target.files)]);
    },
    [files],
  );

  const ChangeContractName = useCallback(
    (event) => {
      setContractName(event.target.value);
    },
    [contractName],
  );

  const ChangeCovenantee = useCallback(
    (event) => {
      setCovenantee(event.target.value);
    },
    [covenantee],
  );

  const SubmitContract = () => {
    if (!contractName) {
      alert('제목을 입력해주세요');
      return;
    } else if (!covenantee) {
      alert('계약자(이메일주소)를 입력해주세요');
      return;
    }
    let formData = new FormData();
    formData.append('files', '');
    files.forEach((file) => formData.append('files', file));
    const request = {
      name: contractName,
      participantIds: covenantee,
    };
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    fileApi
      // url변경
      .post('/contract', formData)
      .then((res) => {
        console.log(res);
        alert('계약생성완료');
        setPageState(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <React.Fragment>

      <Typography variant="h5" gutterBottom>
        계약서 작성
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="제목"
            label="제목"
            fullWidth
            maxRows={4}
            value={contractName}
            onChange={ChangeContractName}
            autoComplete="제목"
            variant="standard"
          />
        </Grid>
    
        <Grid item xs={12} sm={3}>
          <TextField
            id="lastName"
            name="lastName"
            label="계약자 성"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="firstName"
            name="firstName"
            label="계약자 이름"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>

        <Grid item xs={7}>
          <TextField
            required
            id="standard-multiline-flexible"
            name="계약자(이메일주소)"
            label="이메일 주소(계약자)"
            fullWidth
            maxRows={4}
            value={covenantee}
            onChange={ChangeCovenantee}
            autoComplete="이메일주소"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveInfo" value="yes" />}
            label="다음에도 이 계약자와 계약하기"
          />
        </Grid>
        

        
   
      <div>
        <input type="file" name="file_upload" accept=".pdf" onChange={onFileChange} multiple />
      </div>
      
        
        </Grid>
      </React.Fragment>

    
        <button onClick={SubmitContract} sx={{ mt: 3, ml: 1 }}>Submit</button>

    </>
  );
};

export default Write;
