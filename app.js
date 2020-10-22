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
var isChild = process.argv.slice(3, 4);

var args = process.argv.slice(3);
const templateName = arguments[0];
const childtemplateName = arguments2[0];
const childfileName = arguments[0] + "" + arguments2[0];

const capitalTemplateName = capitalizeFirstLetter(templateName);
const capitalChildTemplateName = capitalizeFirstLetter(childtemplateName);
console.log("Generating REST Template for : " + templateName);
var migrationFields = "";

const { exec } = require("child_process");



const templateDistDir = './dist/' + templateName;
const childtemplateDistDir = './dist/' + childfileName;
// With a callback:
const generateTemplate = async () => {

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

    //Adding fields to controller and yaml

    for (i = 1; i < args.length; i++) {
        var field = "field" + i;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[i] + ":string,"

        const option = {
            files: [
                './dist/' + templateName + '/*.*',
                './dist/' + templateName + '/*.yaml'
            ],
            //Replacement for  fields (string or regex) 
            from: [regex],
            to: [args[i]],
        };
        await replace(option);
    }

    migrationFields = migrationFields + "name:string,type:string,description:string,createdBy:string,updatedBy:string"

    //removing unused fields

    var dropFieldsExpression = `.*${fieldString}.*`
    var regexDropFields = new RegExp(dropFieldsExpression, 'g')

    const dropFieldsOption = {
        files: [
            './dist/' + templateName + '/*.*',
            './dist/' + templateName + '/*.yaml'
        ],
        //Remove unused fields in files to make (string or regex) 
        from: [regexDropFields],
        to: [''],
    };
    await replace(dropFieldsOption);
    

    //migration file command
    await exec("sequelize init");
    await exec("sequelize model:generate --name " + capitalTemplateName + " --attributes  " + migrationFields);


    console.log('*******************************');
    console.log('Template generated successfully');
    console.log('*******************************');

}

///////////////////////// child template

const generateChildTemplate = async () => {
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

    await replace(options);

    //Adding fields to controller and yaml

    for (i = 0; i < args.length; i++) {
        var field = "field" + i;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[i] + ":string,"

        const option = {
            files: [
                './dist/' + childfileName + '/*.*',
                './dist/' + childfileName + '/*.yaml'
            ],
            //Replacement for  fields (string or regex) 
            from: [regex],
            to: [args[i]],
        };
        await replace(option);
    }
    migrationFields = migrationFields + "name:string,type:string,description:string,createdBy:string,updatedBy:string"

    //Remove unused fields
    var dropFieldsExpression = `.*${fieldString}.*`
    var regexDropFields = new RegExp(dropFieldsExpression, 'g')

    const dropFieldsOption = {
        files: [
            './dist/' + childfileName + '/*.*',
            './dist/' + childfileName + '/*.yaml'
        ],
        //Remove unused fields to make (string or regex) 
        from: [regexDropFields],
        to: [''],
    };
    await replace(dropFieldsOption);

    //migration file command
    await exec("sequelize init");
    await exec("sequelize model:generate --name " + childfileName + " --attributes  " + migrationFields)

    console.log('*******************************');
    console.log('Child Template generated successfully');
    console.log('*******************************');

}

if (isChild != "false") {
    generateChildTemplate();
}
else {
    generateTemplate();
}







