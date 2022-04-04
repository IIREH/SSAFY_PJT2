import React, { useState, useCallback, useEffect } from 'react';

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
            label="계약자(이메일주소)"
            multiline
            maxRows={4}
            value={covenanteeInput}
            onChange={ChangeCovenanteeInput}
            variant="standard"
          />
          <input type="button" onClick={InputCovenantee} value="추가" />
        </div>
        <div>
          {covenantee.map((covenantee, idx) => (
            <div key={covenantee + idx}>
              <p>계약자: {covenantee}</p>
              <input type="button" value="삭제" onClick={deleteCovenantee} id={idx} />
            </div>
          ))}
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
