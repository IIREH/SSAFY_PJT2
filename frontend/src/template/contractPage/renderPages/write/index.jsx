import React, { useState, useCallback } from 'react';
import Axios from 'axios';
import { Heading } from '@/components/atoms';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState, contractPageState } from '@/states';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// 파일 첨부시 pdf 미리보기 처리 하는거 추가
const Write = () => {
  const [pageState, setPageState] = useRecoilState(contractPageState);
  const user = useRecoilValue(userState);
  let formData = new FormData();

  const onFileChange = useCallback(
    (e) => {
      if (e.target && e.target.files[0]) {
        formData.append('file', e.target.files[0]);
      }
    },
    [formData],
  );

  const SubmitContract = () => {
    //API 헤더 설정해서 수정해야 함
    Axios.post('https://v2.convertapi.com/upload', { formData, user })
      .then((res) => {
        console.log(res);
        alert('계약생성완료');
        setPageState(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [contractName, setContractName] = useState();
  const [covenantee, setCovenantee] = useState();
  const [contractContent, setContractContent] = useState();

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

  const ChangeContractContent = useCallback(
    (event) => {
      setContractContent(event.target.value);
    },
    [contractContent],
  );

  return (
    <>
      <Heading>계약서 작성</Heading>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="제목"
            multiline
            maxRows={4}
            value={contractName}
            onChange={ChangeContractName}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="계약자"
            multiline
            maxRows={4}
            value={covenantee}
            onChange={ChangeCovenantee}
            variant="standard"
          />
        </div>
        <div>
          <TextField
            id="standard-multiline-flexible"
            label="내용"
            multiline
            maxRows={10}
            value={contractContent}
            onChange={ChangeContractContent}
            variant="standard"
          />
        </div>
      </Box>
      <div>
        <input type="file" name="file_upload" accept=".pdf" onChange={onFileChange} />
      </div>
      <div>
        <button onClick={SubmitContract}>Submit</button>
      </div>
    </>
  );
};

export default Write;
