import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import "@tensorflow/tfjs-backend-cpu"
import "@tensorflow/tfjs-backend-webgl"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import Spinner from 'react-bootstrap/Spinner';
const ObjectDetectorContainer =styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const DetectorContainer=styled.div`
 min-width:200px;
 height: 500px; 
 border: 3px solid #fff;
 border-radius: 5px;
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
`
const TargetImg=styled.img`
    height: 100%;
`
const HiddenFileInput = styled.input`
  display: none;
`;
const SelectButton = styled.button`
width: 150px;
height: 50px;
border-radius: 32px;
  padding: 7px 10px;
  border: 2px solid transparent;
  background-color: #FFC107;
  color: #0a0f22;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-top: 2em;
  cursor: pointer;
  transition: all 260ms ease-in-out;
  &:hover {
    background-color: transparent;
    border: 2px solid #FFC107;
    color: #fff;
  }
`;
const TargetBox = styled.div`
    position: absolute;
    left: ${({ x }) => x + "px"};
    top: ${({ y }) => y + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  border:  4px solid green;
  background-color: transparent;
  &::before{
    content: "${({classType,score})=> `${classType} ${score.toFixed(2)}%`}";
    color:green;
    font-weight:800;
    font-size:20;
    position:absolute;
    top:-2rem;
    left:50% ;
  }

`
const ObjectDetector = () => {
  const [imgData, setimgData] = useState(null)
  const imageRef = useRef();
  const [predicition, setpredicition] = useState([])
  const [isLoading, setLoading] = useState(false);
  const isEmptyPredictions = !predicition || predicition.length === 0;
    const fileInputRef=useRef();
    const openFile = ()=>{
        if(fileInputRef.current){
            fileInputRef.current.click()
        }
    }
    const normalizePerdicition = (predictions,imgSize)=>{
      if (!predictions || !imgSize || !imageRef) return predictions || [];
      return predictions.map((prediction)=>{
        const { bbox } = prediction;
        const oldX = bbox[0];
        const oldY = bbox[1];
        const oldWidth = bbox[2];
        const oldHeight = bbox[3];
        const imgWidth = imageRef.current.width;
        const imgHeight = imageRef.current.height;
        const x = (oldX * imgWidth) / imgSize.width;
        const y = (oldY * imgHeight) / imgSize.height;
        const width = (oldWidth * imgWidth) / imgSize.width;
        const height = (oldHeight * imgHeight) / imgSize.height;
  
        return { ...prediction, bbox: [x, y, width, height] };
      }

      )

    }
    const detectObjectOnImage= async (imageElement,imgSize)=>{
      const model  = await cocoSsd.load({ }) 
       const predicitions= await model.detect(imageElement,6);
        const normalizePerdicitio = normalizePerdicition(predicitions,imgSize)
       setpredicition(normalizePerdicitio)
    }
    const readImage = (file) => {
      return new Promise((rs, rj) => {
        const fileReader = new FileReader();
        fileReader.onload = () => rs(fileReader.result);
        fileReader.onerror = () => rj(fileReader.error);
        fileReader.readAsDataURL(file);
      });
    };

    const onSelectIamge = async (e)=>{
      setpredicition([])
      setLoading(true)
      const file = e.target.files[0];
      const imageData = await readImage(file)
       setimgData(imageData)
       const imageElement = document.createElement("img")
       imageElement.src = imageData;
       imageElement.onload= async()=>{
        const imgSize = {
          width: imageElement.width,
          height: imageElement.height,
        };
        await detectObjectOnImage(imageElement,imgSize)
        setLoading(false)
       }
    }

  return <>
  <ObjectDetectorContainer>
    <DetectorContainer>
      {imgData &&<TargetImg src={imgData} ref={imageRef}/>}
      {!isEmptyPredictions && predicition.map((predicition,index)=>(
        <TargetBox key={index}
         x={predicition.bbox[0]}
              y={predicition.bbox[1]}
              width={predicition.bbox[2]}
              height={predicition.bbox[3]}
              classType={predicition.class}
              score={predicition.score * 100}
         />
      ))}
    </DetectorContainer>
    <HiddenFileInput type='file' ref={fileInputRef} onChange={onSelectIamge}/> 
    <SelectButton onClick={openFile}>{isLoading?  <Spinner animation="border" variant="dark" /> : "Select Image "}</SelectButton>
  </ObjectDetectorContainer>

        </>
}

export default ObjectDetector

