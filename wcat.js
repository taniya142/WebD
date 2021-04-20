const { clear } = require("console");
let fs = require("fs");
let input = process.argv.slice(2);
// console.log("input", input);

let options = [];
let filePath = [];

for (let i = 0; i < input.length; i++) {
    // let firstChar = input[i].charAt(0);
    if (input[i] == "-s" || input[i] == "-b" || input[i] == "-n") {
        options.push(input[i]);
    } else {
        filePath.push(input[i]);
    }
}

// console.log('options', options);
// console.log('file path', filePath);

// check if file exists or not

for (let i = 0; i < filePath.length; i++) {
    let isFileExist = fs.existsSync(filePath[i]);
    if (!isFileExist) {
        // console.log('filepath', filePath[i], 'does not exist');
        return;
    }
}
let totalContent=" ";

for (let i = 0; i < filePath.length; i++) {
    let contentOfCurrent=fs.readFileSync(filePath[i],"utf-8");
    totalContent+=contentOfCurrent + "\r\n";
}
// console.log(totalContent);


// -s OPTION
let isSOption=options.includes("-s");

if(isSOption){
    let outputArr=totalContent.split("\r\n");
    console.log(outputArr);
    let tempArr=[];
    for(let i=0;i<outputArr.length;i++){
        let isElementValid=outputArr[i]!=="";
        if(isElementValid){
            tempArr.push(outputArr[i]);
        }
    }
    totalContent=tempArr.join("\r\n"); //convert array to string har index ke baad new line kr dia

}
// console.log(totalContent);


// -n OPTION
let isN=options.includes("-n");
let isB=options.includes("-b");

let finalOption;
if(isN==true){
    if(isB==true){ //b and n dono hai
        let idxB=options.indexOf("-b");
        let idxN=options.indexOf("-n");
        finalOption=idxB<idxN ? "-b" : "-n"; // jo bhi b ya n me se pehle wala hai vo final option me aa jayega

    }else{
        finalOption="-n"; //sirf n hai
    }
}else if(isB==true){
    finalOption="-b"; //sirf b hai
}

if(finalOption=="-n"){
    let count=1;
    let contentArr=totalContent.split("\r\n");
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=count+ ". " + contentArr[i];
        count++;
    }

    totalContent=contentArr.join("\r\n");
}
// console.log(totalContent);

// -b OPTION

if(finalOption=="-b"){
    let count=1;
    let contentArr=totalContent.split("\r\n");
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=count+ ". " + contentArr[i];
            count++;
        }
    }
    totalContent=contentArr.join("\r\n");
}
console.log(totalContent);