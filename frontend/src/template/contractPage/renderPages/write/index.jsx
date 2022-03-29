import React, { useState, useCallback } from 'react';

import { Heading } from '@/components/atoms';
import { useRecoilState } from 'recoil';
import { contractPageState } from '@/states';
import { fileInstance } from '@/libs/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// 파일 첨부시 pdf 미리보기 처리 하는거 추가
const Write = () => {
  const fileApi = fileInstance();
  const [pageState, setPageState] = useRecoilState(contractPageState);
  const [contractName, setContractName] = useState();
  const [covenantee, setCovenantee] = useState();
  const [contractContent, setContractContent] = useState();
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

  const ChangeContractContent = useCallback(
    (event) => {
      setContractContent(event.target.value);
    },
    [contractContent],
  );

  const SubmitContract = () => {
    if (!contractName) {
      alert('제목을 입력해주세요');
      return;
    } else if (!covenantee) {
      alert('계약자를 입력해주세요');
      return;
    } else if (!contractContent) {
      alert('계약 내용을 입력해주세요');
      return;
    }
    let formData = new FormData();
    formData.append('files', '');
    files.forEach((file) => formData.append('files', file));
    const request = {
      contractName: contractName,
      covenantee: covenantee,
      contractContent: contractContent,
    };
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    console.log(formData);

    fileApi
      .post('https://v2.convertapi.com/upload', formData)
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
            label="계약 내용"
            multiline
            maxRows={10}
            value={contractContent}
            onChange={ChangeContractContent}
            variant="standard"
          />
        </div>
      </Box>
      <div>
        <input type="file" name="file_upload" accept=".pdf" onChange={onFileChange} multiple />
      </div>
      <div>
        <button onClick={SubmitContract}>Submit</button>
      </div>
    </>
  );
};

export default Write;
