const fs = require('fs');

const drawPoints= (pointA, pointB, matrix)=>{

    let step = 1/(2*Math.sqrt(    Math.pow((pointA.x-pointB.x)  ,2) +    Math.pow((pointA.y-pointB.y)  ,2) )); 
    
    let pX, pY;

    for(let u=0; u<=1;u=u+step){
        pX = Math.round( (pointA.x + (pointB.x- pointA.x)*u));
        pY=  Math.round( (pointA.y + (pointB.y- pointA.y)*u));
        matrix[pX][pY] = '*';
    }
}


try {  

    //inporting lines from input.txt
    let data = fs.readFileSync('input.txt', 'utf8');
    let lines = [];
    let maxWidth = 0;

    require('fs').readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
        lines.push(line);
        if(line.length>maxWidth){
            maxWidth = line.length;
        }
        
    })

    //line width
    let dataString = data.toString();
    //geting characters
    dataString = dataString.toLowerCase();
    //seperating evry character    
    const characters = dataString.split(''); 
    //calculating height
    let maxHeight = 0;
    maxHeight = characters.filter(function(value){
        return value === '\n';
    }).length; 

    //Point class
    class Point{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
        getX(){
            return this.x;
        }
        getY(){
            return this.y;
        }   
    }
    //declare points
    let pointNames  = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let pointValues = new Array(26);
    
    //adding coordinates
    lines.forEach((item,index)=>{
        pointNames.forEach((point,i)=>{
           if(item.indexOf(point)!=-1){
               pointValues[i] = new Point(index,item.indexOf(point));
           } 
       });          
    });

    //making matrix
    let matrix  = [[]];//[...lines];
    for(let i=0; i<10; i++){
        matrix[i]=[];
        for(let k=0; k< 10; k++){
            matrix[i][k]=' ';
        }
    }

    //drawing *
   pointValues.forEach((first, index)=>{
    if(first!=null &&  pointValues[index+1]!=null){
        drawPoints(first,pointValues[index+1],matrix);
    }    
   });

   //getting string from matrix
   let outputStr = '';

    matrix.forEach(element => {
        element.forEach(item => {
            outputStr = outputStr+item;
        });
        outputStr = outputStr + "\n";
    });


    //write string to output.txt
    fs.writeFile('output.txt', outputStr, function (err) {
    if (err) throw err;
    console.log('Ouput saved!');
    });

} catch(e) {
    console.log('Error:', e.stack);
}







