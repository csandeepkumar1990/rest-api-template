const replace = require('replace-in-file');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const distFileDir = './dist';
const fsExtra = require('fs-extra')
fsExtra.emptyDirSync(distFileDir);
fsExtra.emptyDirSync('./models');
fsExtra.emptyDirSync('./migrations');

var arguments = process.argv.slice(2);
const templateName = arguments[0];
//console.log(templateName);
const capitalTemplateName = capitalizeFirstLetter(templateName);
//console.log(capitalTemplateName);
console.log("Generating REST Template for : "+templateName);


const { exec } = require("child_process");



const templateDistDir = './dist/' +templateName;
// With a callback:
const generateTemplate = async () => {
    await exec("sequelize init");
    await exec("sequelize model:generate --name "+capitalTemplateName+" --attributes name:string,type:string,description:string,createdBy:string,updatedBy:string");
    await fsExtra.ensureDir(templateDistDir);
    await fsExtra.copy('./template', templateDistDir);

    const files = await fsExtra.readdir(templateDistDir);
    for(let name of files) {
        console.log(name);
        let workingDir = templateDistDir +'/'+ name;
        let destinationDir = workingDir.replace(/contact/g, templateName)
        console.log(workingDir);
        console.log(destinationDir);
        await fsExtra.rename( workingDir, destinationDir);
    };    
    const options = {  
        files: [
        './dist/'+templateName+'/*.*',
        './dist/'+templateName+'/*.yaml'
        ],
        //Replacement to make (string or regex) 
        from: [/contact/g, /Contact/g],
        to: [templateName, capitalTemplateName],
    };
    await replace(options);
    console.log('*******************************');
    console.log('Template generated successfully');
    console.log('*******************************');
}
generateTemplate();






 