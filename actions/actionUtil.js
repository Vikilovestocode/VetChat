export function actionCreator(type){
    return function(){
            return { type }
    }
}

export function actionCreatorPayload(type){
    return function(payload){
            return { type, payload }
    }
}