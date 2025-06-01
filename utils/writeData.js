import fs from 'fs'
import path from 'path'

export function writeDataToOutput(filename,obj){
    const filePath = path.join(__dirname,'..', 'data',`${filename}.json`)
    const data = JSON.stringify(obj, null, 2)
    fs.writeFileSync(filePath, data)
}

// export function readDataFromOutput(){
//     const filePath = path.join(__dirname,'..', 'data','output.json')
//     const data = fs.readFileSync(filePath)
//     return data
// }