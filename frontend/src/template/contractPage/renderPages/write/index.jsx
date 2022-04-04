import React, { useState, useCallback } from 'react';
import { Heading } from '@/components/atoms';
import { useRecoilState } from 'recoil';
import { contractPageState } from '@/states';
import { fileInstance } from '@/libs/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Styled from './styled';
import Alert from '@material-ui/lab/Alert';


// 파일 첨부시 pdf 미리보기 처리 하는거 추가
const Write = () => {
  const fileApi = fileInstance();
  const [pageState, setPageState] = useRecoilState(contractPageState);
  const [contractName, setContractName] = useState();
  const [covenantee, setCovenantee] = useState([]);
  const [covenanteeInput, setCovenanteeInput] = useState();
  const [files, setFile] = useState([]);

  const onFileChange = useCallback(
    (e) => {
      setFile([...Array.from(e.target.files)]);
    },
    [files],
  );

  const ChangeContractName = useCallback(
    (e) => {
      setContractName(e.target.value);
    },
    [contractName],
  );

  const ChangeCovenanteeInput = useCallback(
    (e) => {
      setCovenanteeInput(e.target.value);
    },
    [covenanteeInput],
  );

  const InputCovenantee = (e) => {
    e.preventDefault();
    if (covenanteeInput.length > 0) {
      setCovenantee([...covenantee, covenanteeInput]);
      setCovenanteeInput('');
    } else {
      alert('계약자(이메일주소)를 입력해주세요');
    }
  };

  const deleteCovenantee = (e) => {
    e.preventDefault();
    let value = [...covenantee];
    value.splice(e.target.id, 1);
    setCovenantee(value);
  };

  const SubmitContract = () => {
    if (!contractName) {
      alert('제목을 입력해주세요');
      return;
    }
    if (covenantee.length === 0) {
      alert('계약자(이메일주소)를 추가해주세요');
      return;
    }
    if (files.length === 0) {
      alert('계약서(pdf파일)를 선택해주세요');
      return;
    }

    let formData = new FormData();

    formData.append('files', '');
    files.forEach((file) => formData.append('files', file));

    const request = {
      name: contractName,
      participantIds: [...covenantee],
    };

    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    for (var key of formData.keys()) {
      console.log(key);
    }

    for (var value of formData.values()) {
      console.log(value);
    }

    fileApi
      .post('/contract', formData)
      .then((res) => {
        alert('계약생성완료');
        setPageState(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Styled.ContentContainer>
    
      <>
      
      <React.Fragment>
        <div class="text-center text-position">
        <Typography variant="h5" color="#000" gutterBottom>
          계약서 작성
        </Typography>
        </div>
        <div class="component-position">
        <Grid container spacing={5}>
          <Grid item xs={10}>
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
      
          <Grid item xs={12} sm={5}>
            <TextField
              id="lastName"
              name="lastName"
              label="피계약자 성"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id="firstName"
              name="firstName"
              label="피계약자 이름"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              required
              id="standard-multiline-flexible"
              name="계약자(이메일주소)"
              label="이메일 주소(계약자)"
              fullWidth
              maxRows={4}
              value={covenanteeInput}
              onChange={ChangeCovenanteeInput}
              autoComplete="이메일주소"
              variant="standard"
            />
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveInfo" value="yes" />}
             label="다음에도 이 계약자와 계약하기" class="text-neon" 
            />
          </Grid>
          <input type="button" onClick={InputCovenantee} class="label theme-bg2 text-white f-12 btn-round shadow-2 button-position" value="추가" />
          
          </Grid>
          
          <div>
            {covenantee.map((covenantee, idx) => (
              <div key={covenantee + idx}>
                <p class="covenantee-position convenantee-color">계약자: {covenantee}</p>
                <input type="button" value="삭제" onClick={deleteCovenantee} id={idx} class="label theme-bg2 text-white f-12 btn-round shadow-2 delete-position"/>
              </div>
            ))}
          </div>
    
    
          
      </Grid>
      </div>
      </React.Fragment>
      
        <div>
          <input type="file" name="file_upload" accept=".pdf"  class="label theme-bg2 text-white f-12 btn-round shadow-2 file-position" onChange={onFileChange} multiple />
        </div>
      
        <button onClick={SubmitContract}  class="label theme-bg text-white f-12 btn-round shadow-2 submit-position" sx={{ mt: 3, ml: 1 }}>Submit</button>

      </>
  
  </Styled.ContentContainer>
  );
};

export default Write;
