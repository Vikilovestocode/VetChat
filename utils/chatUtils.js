export function initialChatMsg(consultation){
  console.log(' initialChatMsg::::::consultation:: ', consultation)
    const { problemDesc, userId, isDiarrhoea, diarrhoeaPerDay } = consultation;
    const { vomittingPerDay, isAdopted, isLaziness } = consultation;
    const { petName, sex, weight, months, years } = consultation;
    const userObj = { _id: userId}
    let messages = [];
    let tempMsg = getMsg(userObj, `Hi Doctor, Plese go thorugh the issue as follow:
                    ${problemDesc || ' Descrition of the problem attached as audio.' }`);
    console.log(' initialChatMsg:::::::: ', tempMsg)
    messages.push(tempMsg);

    messages.push(getMsg(userObj, 
      `Pet Name: ${petName}
       Sex: ${sex}
       Weight: ${weight} kg
       Age: ${years} years ${months} months
    `));      
    
    if(isAdopted){
      messages.push(getMsg(userObj,`isAdopted: ${isAdopted}`));      
    }

    if(isDiarrhoea && diarrhoeaPerDay){
      messages.push(getMsg(userObj, `Diarrhoea Per Day: ${diarrhoeaPerDay}`));      
    }

    if(vomittingPerDay){
      messages.push(getMsg(userObj,`Vomitting Per Day: ${vomittingPerDay}`));      
    }

    if(isLaziness){
      messages.push(getMsg(userObj,`Showing Laziness`));      
    }
 
    if(consultation.audio){
        consultation.audio.forEach(audio => {
          messages.push(getMsg(userObj, null, audio ));       
            
        });
    }        

    if(consultation.problemImages){
        consultation.problemImages.forEach(image => {
          messages.push(getMsg(userObj, null, null, image ));       
            
        });
    } 
    
    if(consultation.problemVideos){
        consultation.problemVideos.forEach(video => {
          messages.push(getMsg(userObj, null, null, null, video ));       
            
        });
    }  


    return messages
    
}

function getMsg(userObj, str=null, audio=null, image=null, video=null){
    let msg = {
        _id: Math.round(Math.random() * 1000000),
        text: str,
        createdAt: new Date(),
        user: userObj,
        pathUrl: (audio || image || video),
        audio,
        image,
        video,
    }
    
    return msg;
}