import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

export const ScrollingGallery = (prop) => {
  const [rerender, setRerender] = useState(false);
  const [summary, setSummary] = useState('');
  const [normal, setDefault] = useState(['Hello','World','This','Is','IEEE',"Asia's",'Largest','Hackathon']);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const track = document.getElementById("image-track");

    const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";  
      track.dataset.prevPercentage = track.dataset.percentage;
    }

    const handleOnMove = e => {
      if(track.dataset.mouseDownAt === "0") return;
      
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;
      
      const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -71);
      
      track.dataset.percentage = nextPercentage;
      
      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 200, fill: "forwards" });
      
      for(const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 200, fill: "forwards" });
      }
    }


    const handleKey = e => {
      var percentage = 0;
      console.log(track.dataset.prevPercentage);
      if ((e.keyCode === 39)||(e.keyCode === 40)){
        percentage = -20
      }
      else{
        percentage = 20
      }
      const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -71);
      
    
      /*
      track.style.translate = `${track.dataset.nextPercentage-percentage})%`;   
      for(const image of track.getElementsByClassName("image")) {
        image.style.translate = `${track.dataset.nextPercentage-percentage}%`;
      }

      track.animate({
        transform: `translate(${track.dataset.prevPercentage}%, -50%)`
      }, { duration: 0, fill: "forwards" });
      for(const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + track.dataset.prevPercentage}% center`
        }, { duration: 0, fill: "forwards" });
      }
      */
      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 600, fill: "forwards" });
      
      for(const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 600, fill: "forwards" });
      }
      track.dataset.prevPercentage = nextPercentage;

      }


    /* -- Had to add extra lines for touch events -- */

    window.onmousedown = e => handleOnDown(e);

    window.ontouchstart = e => handleOnDown(e.touches[0]);

    window.onmouseup = e => handleOnUp(e);

    window.ontouchend = e => handleOnUp(e.touches[0]);

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);

    window.onkeydown = e => handleKey(e);

  }, [rerender])

  function onClickSelect(e){
    if (e.target.selected==="false"){
      e.target.setAttribute('style','border:#0011ff 6px outset;');
      e.target.selected="true";
    }
    else{
      e.target.setAttribute('style','border:none;');
      e.target.selected="false";
    }
  }

  function showSummary(e,num){
    setSummary(normal[num]);
  }

  function presentMode(e){
    console.log('Presentation Mode');
    
    for (let i = 0; i < 8; i++) {
      var image = document.getElementsByClassName("image")[i];
      console.log(image.selected);
      if (image.selected == 'true'){
        setSelected(selected.concat(i));
      }
    }

    axios.post('http://localhost:5000/user/present/',{selected:selected})
      .then((res) => console.log(res))
      .catch ((err)=>  console.log(err))
    }

  return (
    <body>
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        <img class="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" selected="false" onMouseOver={(e)=>showSummary(e,0)} onClick={(e)=>onClickSelect(e)}/>
        <img class="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" selected="false" onMouseOver={(e)=>showSummary(e,1)} onClick={(e)=>onClickSelect(e)}/>
        <img class="image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" selected="false" onMouseOver={(e)=>showSummary(e,2)} onClick={(e)=>onClickSelect(e)}/>
        <img class="image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" selected="false" onMouseOver={(e)=>showSummary(e,3)} onClick={(e)=>onClickSelect(e)}/>
        <img class="image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false"  selected="false" onMouseOver={(e)=>showSummary(e,4)} onClick={(e)=>onClickSelect(e)}/>
        <img class="image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80" draggable="false"  selected="false" onMouseOver={(e)=>showSummary(e,5)} onClick={(e)=>onClickSelect(e)}/>
        <img class="image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80" draggable="false"  selected="false" onMouseOver={(e)=>showSummary(e,6)} onClick={(e)=>onClickSelect(e)}/>
        <img class="image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false"  selected="false" onMouseOver={(e)=>showSummary(e,7)} onClick={(e)=>onClickSelect(e)}/>
        </div>
        <div id="summary">
          <h4 draggable="false">{summary}</h4>
        </div>
      

      <a id="source-link" class="meta-link" onClick={(e)=>presentMode(e)}><span>📊Present</span></a>
    </body>
    )
}