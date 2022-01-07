import { useEffect, useState } from 'react'
import './App.css'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'
import ScoreBoard from './components/ScoreBoard'
const width=8
const candyColors=[
  blueCandy,greenCandy,orangeCandy,purpleCandy,redCandy,yellowCandy
]


const App=()=> {
  const[currentColorArrangement,setCurrentColorArrangement]=useState([])
  const[squareBeingDragged,setSquareBeingDragged]=useState(null)
  const[squareBeingReplaced,setSquareBeingReplaced]=useState(null)
  const [scoreDisplay,setScoreDisplay]=useState(0)
  const checkForColumnOfThree=()=>{
    for (let i=0;i<=47;i++){
      const columnOfThree=[i,i+width,i+width*2]
      const decidedColor=currentColorArrangement[i]
      const isBlank=currentColorArrangement[i]===blank
      if(columnOfThree.every(square=> currentColorArrangement[square]===decidedColor&&!isBlank)){
        setScoreDisplay((score)=>score+3)
        columnOfThree.forEach(square => currentColorArrangement[square]=blank)
        return true
      }
    }

  }
  const checkForColumnOfFour=()=>{
    for (let i=0;i<=39;i++){
      const columnOfFour=[i,i+width,i+width*2,i+width*3]
      const decidedColor=currentColorArrangement[i]
      const isBlank=currentColorArrangement[i]===blank
      if(columnOfFour.every(square=> currentColorArrangement[square]===decidedColor&&!isBlank)){
        setScoreDisplay((score)=>score+4)
        columnOfFour.forEach(square => currentColorArrangement[square]=blank)
        return true
      }
    }

  }
  const checkForRowOfThree=()=>{
    for (let i=0;i<64;i++){
      const rowOfThree=[i,i+1,i+2]
      const decidedColor=currentColorArrangement[i]
      const isBlank=currentColorArrangement[i]===blank
      const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      if(notValid.includes(i)) continue

      if(rowOfThree.every(square=> currentColorArrangement[square]===decidedColor&&!isBlank)){
        setScoreDisplay((score)=>score+3)
        rowOfThree.forEach(square => currentColorArrangement[square]=blank)
        return true
      }
    }

  }
  const checkForRowOfFour=()=>{
    for (let i=0;i<64;i++){
      const rowOfFour=[i,i+1,i+2,i+3]
      const decidedColor=currentColorArrangement[i]
      const isBlank=currentColorArrangement[i]===blank
      const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64,5,13,21,29,37,45,53,62]
      if(notValid.includes(i)) continue

      if(rowOfFour.every(square=> currentColorArrangement[square]===decidedColor&&!isBlank)){
        setScoreDisplay((score)=>score+4)
        rowOfFour.forEach(square => currentColorArrangement[square]=blank)
        return true
      }
    }

  }

  const moveIntoSquareBelow=()=>{
    for(let i=0;i<56;i++){
      const firstRow=[0,1,2,3,4,5,6,7]
      const isfirstRow=firstRow.includes(i)
      if(isfirstRow&&currentColorArrangement[i]===blank){
        let randomNumber=Math.floor(Math.random()*candyColors.length)
        currentColorArrangement[i]=candyColors[randomNumber]
      }
      if ((currentColorArrangement[i + width])===blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i]
        currentColorArrangement[i] = blank
      }
    }
  }
  console.log(scoreDisplay)
  const dragStart=(e)=>{
   
    setSquareBeingDragged(e.target)
  }
  const dragDrop=(e)=>{
    
    setSquareBeingReplaced(e.target)
  }
  const dragEnd=()=>{
    
    const squareBeingDraggedId=parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId=parseInt(squareBeingReplaced.getAttribute('data-id'))
    currentColorArrangement[squareBeingReplacedId]=squareBeingDragged.getAttribute('src')
    currentColorArrangement[squareBeingDraggedId]=squareBeingReplaced.getAttribute('src')
   
    const validMoves=[
      squareBeingDraggedId -1,
      squareBeingDraggedId-width,
      squareBeingDraggedId+1,
      squareBeingDraggedId+width
    ]
    const validMove=validMoves.includes(squareBeingReplacedId)
    const isARowOfThree=checkForRowOfThree()
    const isARowOfFour=checkForRowOfFour()
    const isAColumnOfThree=checkForColumnOfThree()
    const isAColumnOfFour=checkForColumnOfFour()
    if(squareBeingReplacedId&&validMove&&
      (isARowOfThree||isAColumnOfFour||isAColumnOfThree||isARowOfFour)){
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
      }
      else{
        currentColorArrangement[squareBeingReplacedId]=squareBeingReplaced.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute('src')
        setCurrentColorArrangement([...currentColorArrangement])
      }





  }
  const createBoard=()=>
  {  const randomColorArrangement=[]
    for(let i=0;i<width*width;i++){
      const randomColor=candyColors[Math.floor(Math.random()*candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(()=>{
    createBoard()
  },[])
  useEffect(()=>{
    const timer=setInterval(()=>{
       checkForColumnOfFour()
        checkForColumnOfThree()
        checkForRowOfFour()
        checkForRowOfThree()
        moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    },100)
    return()=> clearInterval(timer)
   
  },[checkForColumnOfFour,checkForRowOfFour,checkForColumnOfThree,checkForRowOfThree, moveIntoSquareBelow,currentColorArrangement])
 

  return (
    <div className='app'>
     <div className="game">
       {currentColorArrangement.map((candyColor,index)=>(
         <img
         key={index}
         src={candyColor}
         data-id={index}
         draggable={true}
         onDragStart={dragStart}
         onDragOver={(e) => e.preventDefault()}
         onDragEnter={(e) => e.preventDefault()}
         onDragLeave={(e) => e.preventDefault()}
         onDrop={dragDrop}
         onDragEnd={dragEnd}
        />
       ))}
     </div>
     <ScoreBoard score={scoreDisplay}/>
    </div>
  )
}

export default App
