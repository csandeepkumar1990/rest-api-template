const replace = require('replace-in-file');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const distFileDir = './dist';
const fsExtra = require('fs-extra')
// fsExtra.emptyDirSync(distFileDir);
// fsExtra.emptyDirSync('./models');
// fsExtra.emptyDirSync('./migrations');

var arguments = process.argv.slice(2, 3);
var arguments2 = process.argv.slice(3);
const templateName = arguments[0];
const childtemplateName = arguments2[0];
const childfileName = arguments[0] + "" + arguments2[0];

// console.log("childtemplateName11-------------");
// console.log(childtemplateName);
// console.log("childfilenae-------------");
// console.log(childfileName);
// console.log();

//console.log(templateName);
const capitalTemplateName = capitalizeFirstLetter(templateName);
const capitalChildTemplateName = capitalizeFirstLetter(childtemplateName);
//console.log(capitalTemplateName);
console.log("Generating REST Template for : " + templateName);


const { exec } = require("child_process");



const templateDistDir = './dist/' + templateName;
const childtemplateDistDir = './dist/' + childfileName;
// With a callback:
const generateTemplate = async () => {
    await exec("sequelize init");
    await exec("sequelize model:generate --name " + capitalTemplateName + " --attributes name:string,type:string,description:string,createdBy:string,updatedBy:string");
    await fsExtra.ensureDir(templateDistDir);
    await fsExtra.copy('./template', templateDistDir);

    const files = await fsExtra.readdir(templateDistDir);
    for (let name of files) {
        console.log(name);
        let workingDir = templateDistDir + '/' + name;
        let destinationDir = workingDir.replace(/contact/g, templateName)
        console.log(workingDir);
        console.log(destinationDir);
        await fsExtra.rename(workingDir, destinationDir);
    };
    const options = {
        files: [
            './dist/' + templateName + '/*.*',
            './dist/' + templateName + '/*.yaml'
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
const generateChildTemplate = async () => {
    await exec("sequelize init");
    await exec("sequelize model:generate --name " + capitalTemplateName + " --attributes name:string,type:string,description:string,createdBy:string,updatedBy:string");
    await fsExtra.ensureDir(childtemplateDistDir);
    await fsExtra.copy('./childtemplate', childtemplateDistDir);

    const files = await fsExtra.readdir(childtemplateDistDir);
    for (let name of files) {
        console.log(name);
        let workingDir = childtemplateDistDir + '/' + name;
        let destinationDir = workingDir.replace(/contactactivity/g, childfileName)
        console.log(workingDir);
        console.log(destinationDir);
        await fsExtra.rename(workingDir, destinationDir);
    };
    const options = {
        files: [
            './dist/' + childfileName + '/*.*',
            './dist/' + childfileName + '/*.yaml'
        ],
        //Replacement to make (string or regex) 
        from: [/contact/g, /Contact/g, /activity/g, /Activity/g],
        to: [templateName, capitalTemplateName, childtemplateName, capitalChildTemplateName],
    };
    const options1 = {
        files: [
            './dist/' + childfileName + '/*.*',
            './dist/' + childfileName + '/*.yaml'
        ],
        //Replacement to make (string or regex) 
        from: [/activiy/g, /Activity/g],
        to: [childtemplateName, capitalChildTemplateName],
    };
    await replace(options);
    await replace(options1);
    console.log('*******************************');
    console.log('Child Template generated successfully');
    console.log('*******************************');
    console.log(childtemplateName);
    console.log(capitalChildTemplateName);
}

if (arguments2 != "false") {
    generateChildTemplate();
}
else{
    generateTemplate();
}







