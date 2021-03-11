
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Node)
    cat: cc.Node = null;

    @property(cc.Node)
    dog: cc.Node = null;

    @property(cc.Node)
    fish: cc.Node = null;

    @property(cc.Node)
    mouse: cc.Node = null;

    @property
    placeHolderPositions = [[-298.061,113.995],
                            [-77.838,113.995],
                            [138.589,113.995],
                            [353.117,113.995]];
    objectOriginalPositions = [[-298.061,-167.066],
                                [-77.838,-167.066],
                                [138.589,-167.066],
                                [353.117,-167.066]];
    

    onLoad () {
        let mouseDown = false;
        this.cat.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
        mouseDown = true;
        this.moveObject(mouseDown,this.cat,'cat',1);
        });

        this.dog.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
        mouseDown = true;
        this.moveObject(mouseDown,this.dog,'dog',2);
        });

        this.fish.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
        mouseDown = true;
        this.moveObject(mouseDown,this.fish,'fish',3);
        });

        this.mouse.on(cc.Node.EventType.MOUSE_DOWN, (event)=>{
        mouseDown = true;
        this.moveObject(mouseDown,this.mouse,'mouse',4);
        });
    }
    
    moveObject(mouseDown,object,objectName,sno){

        object.on(cc.Node.EventType.MOUSE_MOVE,(event)=>{
            if(!mouseDown) 
                return;

            let delta = event.getDelta();

            let minX = -object.parent.width/2 + object.width/2;
            let maxX = object.parent.width / 2 - object.width / 2;
            let minY = -object.parent.height / 2 + object.height / 2;
            let maxY = object.parent.height / 2 - object.height / 2;
            let moveX = object.x + delta.x;
            let moveY = object.y + delta.y;
           
            if(moveX < minX){
                moveX = minX;
            }else if(moveX > maxX){
                moveX = maxX;
            }
            if(moveY < minY){
                moveY = minY;
            }else if(moveY > maxY){
                moveY = maxY;
            }

            object.x = moveX;
            object.y = moveY;
        });

        object.on(cc.Node.EventType.MOUSE_UP, (event)=>{
            mouseDown = false;
            var changedPositionX = this.node.getChildByName(objectName).position.x;
            var changedPositionY = this.node.getChildByName(objectName).position.y;

            var result = this.inPlaceHolder(changedPositionX,changedPositionY);

            if(result != 0){
                object.x = this.placeHolderPositions[result-1][0];
                object.y = this.placeHolderPositions[result-1][1];
            }
            else{

                cc.tween(object)
                .to(1,{position: cc.v2(this.objectOriginalPositions[sno-1][0],this.objectOriginalPositions[sno-1][1])},{easing:'cubicInOut'})
                .start();
            }
        });

    }

    inPlaceHolder(objectPositionX, objectPositionY){
        var distanceList = new Array(4);
        var i = 0;
        var flag = 0;
        for(i=0;i<4;i++){
            distanceList[i] = this.calculateDistance(this.placeHolderPositions[i][0],this.placeHolderPositions[i][1],objectPositionX,objectPositionY);
        }

        for(i=0;i<4;i++){
            if(distanceList[i]<100){
                flag = 1;
                return i+1;
            }
        }

        if(flag == 0)
        return 0;

    }

    calculateDistance(x1,y1,x2,y2){
        var distance = Math.sqrt((Math.pow((x2-x1),2))+(Math.pow((y2-y1),2)));
        return distance;
    }

    start () {

    }

    // update (dt) {}
}
