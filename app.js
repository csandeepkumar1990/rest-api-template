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
var templateName = arguments[0];
const childtemplateName = arguments2[0];
var childfileName = arguments[0] + "" + arguments2[0];

var capitalTemplateName = capitalizeFirstLetter(templateName);
const capitalChildTemplateName = capitalizeFirstLetter(childtemplateName);
console.log("Generating REST Template for : " + templateName);


var migrationFields = "";

const { exec } = require("child_process");

// remove "s" from parent-child:
if (isChild != "child=false" && (templateName.substr(-1) == 's' || templateName.substr(-1) == "S")) {
    templateName = templateName.slice(0, -1)
    capitalTemplateName = capitalTemplateName.slice(0, -1)
    childfileName = arguments[0].slice(0, -1) + "" + arguments2[0];
    var childtemplateDistDir = './dist/' + childfileName;
}
var templateDistDir = './dist/' + templateName;
var childtemplateDistDir = './dist/' + childfileName;
var storagetemplateDistDir = './dist/' + templateName;

// With a callback:
const generateTemplate = async () => {

    await fsExtra.ensureDir(templateDistDir);
    await fsExtra.copy('./template', templateDistDir);


    const files = await fsExtra.readdir(templateDistDir);
    for (let name of files) {
        let workingDir = templateDistDir + '/' + name;
        let destinationDir = workingDir.replace(/contact/g, templateName)
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

    const fileOption = {
        files: [
            './dist/' + templateName + '/*.storage.js*',
        ],
        //Replacement to make (string or regex) 
        from: [/contact/g, /Contact/g],
        to: [templateName, capitalTemplateName],
    };

    if (process.argv.slice(4, 5) == "file=true") {
        await replace(fileOption);

    }

    else {
        await replace(options);
    }

    //Adding fields to controller and yaml

    for (i = 2; i < args.length; i++) {

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
        to: [templateName, capitalTemplateName, childtemplateName.slice(0, -1), capitalChildTemplateName.slice(0, -1)],
    };

    await replace(options);

    //Adding fields to controller and yaml

    for (i = 2; i < args.length; i++) {
        var field = "field" + i;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[i] + ":string,";

        if (i == 2 && (args[i].slice(0, -1) === 's' || args[i].slice(0, -1) === 'S')) {
            args[i] = args[i].slice(0, -1)

        }
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


// With a callback:

// Storage Template creation:

const generateStorageTemplate = async () => {

    await fsExtra.ensureDir(storagetemplateDistDir);
    await fsExtra.copy('./storagetemplate', storagetemplateDistDir);


    const files = await fsExtra.readdir(storagetemplateDistDir);
    for (let name of files) {
        let workingDir = storagetemplateDistDir + '/' + name;
        let destinationDir = workingDir.replace(/contact/g, templateName)
        await fsExtra.rename(workingDir, destinationDir);
    };



    const options = {
        files: [
            './dist/' + templateName + '/*.*'
        ],
        //Replacement to make (string or regex) 
        from: [/contact/g, /Contact/g],
        to: [templateName, capitalTemplateName],
    };

    await replace(options);

    //Adding fields to controller and yaml

    for (i = 2; i < args.length; i++) {

        var field = "field" + i;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[i] + ":string,"

        const option = {
            files: [
                './dist/' + templateName + '/*.*'
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
            './dist/' + templateName + '/*.*'
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
    console.log('Storage Template generated successfully');
    console.log('*******************************');

}

if (isChild != "child=false") {
    generateChildTemplate();
}
else if (process.argv.slice(4, 5) == "file=true") {
    generateStorageTemplate();
}
else {
    generateTemplate();
}

//parent child=false file=false
//parent child file=false

// const isChildTemplate = "child=false".split()[1]
// if(isChildTemplate === false) 









