import React, {useCallback,useRef} from "react";
import styled from "styled-components"
import axios from 'axios'

interface InputFileprops {
    // id: string,
    // name:string,
    // children: React.ReactNode;
}

const InputFileStyle = styled.div`

`
const InputFileButton = styled.button`
    display:block;
    width:150px;
    height:50px;
    background-color:skyblue;
    color:#fff;
    border-radius:8px;
    font-size:20px;
    font-weight:bold;
    border:none;
    outline:none;
`
const Inputfile = styled.input`
    display:none;
`
const Input = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
  
    const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const formData = new FormData();
      formData.append('image', e.target.files[0])
      axios.post('http://localhost:4001/images', {data: formData}, {
        headers: {
            'Content-Type' : 'mutipart/form-data'
        }
      })
    //   axios.get('', {
    //     params: 
    //   })
    //   axios({
    //     baseURL: 'http://localhost:4000',
    //     url: '/images',
    //     method: 'POST',
    //     data: formData,
    //     headers: {
    //         'Content-Type' : 'mutipart/form-data',
    //     },
    //   })
    // //   서버로 요청을 보냈을 때 응답값을 .then 통해서 받음
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })
    }, []);
    
    
    const onUploadImageButtonClick = useCallback(() => {
      if (!inputRef.current) {
        return;
      }
      inputRef.current.click();
    }, []);
    return <div>
        <InputFileStyle>
            <Inputfile name="image" type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
            <InputFileButton onClick={onUploadImageButtonClick}>이미지업로드</InputFileButton>
        </InputFileStyle>
    </div>
}
export default Input