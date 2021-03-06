const replace = require('replace-in-file');



const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const distFileDir = './dist';
const angularDistFileDir = './dist';
const modelFileDir = './models';
const migrationsFileDir = './migrations';
const fsExtra = require('fs-extra')
const fs = require("fs")
const path = require("path")
fsExtra.emptyDirSync(distFileDir);
fsExtra.emptyDirSync('./models');
fsExtra.emptyDirSync('./migrations');;

var arguments = process.argv.slice(2, 3);
var arguments2 = process.argv.slice(3);
var isChildCheck = process.argv.slice(3, 4);
var fileCheck = process.argv.slice(4, 5);
var clearDistCheck = process.argv.slice(5, 6);
var args = process.argv.slice(3);

if (args[2] == "cleardist=true") {
    fsExtra.emptyDirSync(distFileDir)
    fsExtra.emptyDirSync(angularDistFileDir)
    fsExtra.emptyDirSync(modelFileDir)
    fsExtra.emptyDirSync(migrationsFileDir)

    console.log("cleared dist")
}

var templateName = arguments[0];
const childtemplateName = arguments2[0];
const storageTemplateName = arguments2[1];
var childfileName = arguments[0] + "" + arguments2[0];
var storageFileName = arguments[0] + "" + arguments2[1];

var angularTemplateName = process.argv.slice(2, 3);

var capitalTemplateName = capitalizeFirstLetter(templateName);
const capitalChildTemplateName = capitalizeFirstLetter(childtemplateName);
const capitalStorageTemplateName = capitalizeFirstLetter(storageTemplateName);
console.log("Generating REST Template for : " + templateName);

var migrationFields = "";

const { exec } = require("child_process");

console.log("capitalTemplateName----------------")

console.log(capitalTemplateName)

// remove "s" from parent-child:
if (isChildCheck != "child=false" && (templateName.substr(-1) == 's' || templateName.substr(-1) == "S")) {
    templateName = templateName.slice(0, -1)
    capitalTemplateName = capitalTemplateName.slice(0, -1)
    childfileName = arguments[0].slice(0, -1) + "" + arguments2[0];
    var childtemplateDistDir = './dist/' + childfileName;
}
if (fileCheck != "file=false" && (templateName.substr(-1) == 's' || templateName.substr(-1) == "S")) {
    templateName = templateName.slice(0, -1)
    capitalTemplateName = capitalTemplateName.slice(0, -1)
    storageFileName = arguments[0].slice(0, -1) + "" + arguments2[1];
    var storagetemplateDistDir = './dist/' + storageFileName;
}

var templateDistDir = './dist/' + templateName;
var childtemplateDistDir = './dist/' + childfileName;
var storagetemplateDistDir = './dist/' + storageFileName;
var angulartemplateDistDir = './dist/' + angularTemplateName;



// With a callback:
const generateTemplate = async () => {

    await fsExtra.ensureDir(templateDistDir);
    await fsExtra.copy('./template', templateDistDir);


    let files = await fsExtra.readdir(templateDistDir);
    console.log("templateDistDir=-----***********888")
    console.log(templateDistDir)
    for (let name of files) {
        var workingDir = templateDistDir + '/' + name;
        var destinationDir = workingDir.replace(/contact/g, templateName)
        //await fsExtra.ensureDir(destinationDir);
        await fsExtra.rename(workingDir, destinationDir);
        console.log("------------")

        var path = require("path");
        console.log("destinationDir---------------")
        console.log(destinationDir)
        let fileName = "./dist/" + templateName + "/" + templateName + ".controller.js";

        let file = path.basename(fileName);

        console.log(file);

    };
    const options = {
        files: [
            './dist/' + templateName + '/*.*',
            './dist/' + templateName + '/*.yaml'
        ],
        //Replacement to make (string or regex) 
        from: [/contact/g, /Contact/g,],
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

    for (argument = 3; argument < args.length; argument++) {

        var field = "field" + argument;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[argument] + ":string,"

        const option = {
            files: [
                './dist/' + templateName + '/*.*',
                './dist/' + templateName + '/*.yaml'
            ],
            //Replacement for  fields (string or regex) 
            from: [regex, /whereFieldParam/g],
            to: [args[argument], args[3]],
        };
        await replace(option);
    }

    migrationFields = migrationFields + "name:string,type:string,description:string,insertedBy:string,updatedBy:string"

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

    files = await fsExtra.readdir(templateDistDir);

    for (let name of files) {
        var workingDir = templateDistDir + '/' + name;
        var destinationDir = workingDir.replace(/contact/g, templateName)
        //await fsExtra.ensureDir(destinationDir);
        await fsExtra.rename(workingDir, destinationDir);
        console.log("------------")

        var path = require("path");
        console.log("destinationDir---------------")
        console.log(destinationDir)
        let fileName = "./dist/" + templateName + "/" + templateName + ".controller.js";

        let file = path.basename(fileName);

        console.log(file);

        if (("./dist/" + templateName + "/" + templateName + ".controller.js") === destinationDir) {
            var pathToFile = path.join(__dirname, destinationDir)
            var pathToNewDestination = path.join(__dirname, "controllers", file)

            fs.copyFile(pathToFile, pathToNewDestination, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log("Successfully copied and moved the file!")
                }
            })
        }
        else if (("./dist/" + templateName + "/" + templateName + ".route.js") === destinationDir) {
            fileName = "./dist/" + templateName + "/" + templateName + ".route.js";

            file = path.basename(fileName);

            pathToFile = path.join(__dirname, destinationDir)
            pathToNewDestination = path.join(__dirname, "routes", file)
            console.log(pathToFile)
            console.log(pathToNewDestination)

            fs.copyFile(pathToFile, pathToNewDestination, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log("Successfully copied and moved the file!")
                }
            })
        }
        else if (("./dist/" + templateName + "/" + templateName + ".service.js") === destinationDir) {
            fileName = "./dist/" + templateName + "/" + templateName + ".service.js";

            file = path.basename(fileName);
            const pathToFile = path.join(__dirname, destinationDir)
            const pathToNewDestination = path.join(__dirname, "services", file)

            fs.copyFile(pathToFile, pathToNewDestination, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log("Successfully copied and moved the file!")
                }
            })
        }
        else if (("./dist/" + templateName + "/" + templateName + ".yaml") === destinationDir) {
            fileName = "./dist/" + templateName + "/" + templateName + ".yaml";

            file = path.basename(fileName);
            const pathToFile = path.join(__dirname, destinationDir)
            const pathToNewDestination = path.join(__dirname, "docs", file)

            fs.copyFile(pathToFile, pathToNewDestination, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log("Successfully copied and moved the file!")
                }
            })
        }

    };




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




    if (childtemplateName.substr(-1) == 's' || childtemplateName.substr(-1) == "S") {
        var childTemplatename = childtemplateName + "Id";
        var expression = `${childTemplatename}`
        var regex = new RegExp(expression, 'g')

        const optionsWithSlice = {
            files: [
                './dist/' + childfileName + '/*.*',
                './dist/' + childfileName + '/*.yaml'
            ],
            //Replacement to make (string or regex) 
            from: [regex],
            to: [childtemplateName.slice(0, -1)+"Id"],
        };
        await replace(optionsWithSlice);
    }

    //Adding fields to controller and yaml
    var fieldString = "field";

    for (argument = 3; argument < args.length; argument++) {
        var field = "field" + argument;
        fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[argument] + ":string,";

        if (argument == 2 && (args[argument].slice(0, -1) === 's' || args[argument].slice(0, -1) === 'S')) {
            args[argument] = args[argument].slice(0, -1)

        }

        const option = {
            files: [
                './dist/' + childfileName + '/*.*',
                './dist/' + childfileName + '/*.yaml'
            ],
            //Replacement for  fields (string or regex) 
            from: [regex],
            to: [args[argument]],
        };
        await replace(option);
    }
    migrationFields = migrationFields + "name:string,type:string,description:string,insertedBy:string,updatedBy:string"

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
    
    console.log("childfileName****************************************************************")
    console.log(childfileName)

    //migration file command
    await exec("sequelize init");
    await exec("sequelize model:generate --name " + childfileName + " --attributes  " + templateName + 'Id' + ":string," + migrationFields)

    console.log('*******************************');
    console.log('Child Template generated successfully');
    console.log('*******************************');

}

///storageTemplate

const generateStorageTemplate = async () => {
    await fsExtra.ensureDir(storagetemplateDistDir);
    await fsExtra.copy('./storagetemplate', storagetemplateDistDir);


    const files = await fsExtra.readdir(storagetemplateDistDir);
    for (let name of files) {
        console.log(name);
        let workingDir = storagetemplateDistDir + '/' + name;
        let destinationDir = workingDir.replace(/dealfile/g, storageFileName)
        console.log("workingDir-----------");
        console.log(workingDir);
        console.log("destinationDir--------------");
        console.log(destinationDir);
        await fsExtra.rename(workingDir, destinationDir);
    };


    const options = {
        files: [
            './dist/' + storageFileName + '/*.*',
            './dist/' + storageFileName + '/*.yaml'
        ],
        //Replacement to make (string or regex) 
        from: [/deal/g, /Deal/g, /file/g, /File/g],
        to: [templateName, capitalTemplateName, storageTemplateName.slice(0, -1), capitalStorageTemplateName.slice(0, -1)],
    };

    await replace(options);

    //Adding fields to controller and yaml

    for (argument = 3; argument < args.length; argument++) {
        var field = "field" + argument;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[argument] + ":string,";

        if (argument == 2 && (args[argument].slice(0, -1) === 's' || args[argument].slice(0, -1) === 'S')) {
            args[argument] = args[argument].slice(0, -1)

        }
        const option = {
            files: [
                './dist/' + storageFileName + '/*.*',
                './dist/' + storageFileName + '/*.yaml'
            ],
            //Replacement for  fields (string or regex) 
            from: [regex],
            to: [args[argument]],
        };
        await replace(option);
    }
    migrationFields = migrationFields + "name:string,type:string,description:string,insertedBy:string,updatedBy:string"

    //Remove unused fields
    var dropFieldsExpression = `.*${fieldString}.*`
    var regexDropFields = new RegExp(dropFieldsExpression, 'g')

    const dropFieldsOption = {
        files: [
            './dist/' + storageFileName + '/*.*',
            './dist/' + storageFileName + '/*.yaml'
        ],
        //Remove unused fields to make (string or regex) 
        from: [regexDropFields],
        to: [''],
    };
    await replace(dropFieldsOption);

    //migration file command
    await exec("sequelize init");
    await exec("sequelize model:generate --name " + storageFileName + " --attributes  " + migrationFields)

    console.log('*******************************');
    console.log('Storage Template generated successfully');
    console.log('*******************************');

}



// With a callback:

// Storage Template creation:

// const generateStorageTemplate = async () => {

//     await fsExtra.ensureDir(storagetemplateDistDir);
//     await fsExtra.copy('./storagetemplate', storagetemplateDistDir);

//     const files = await fsExtra.readdir(storagetemplateDistDir);

//     console.log("storagetemplateDistDir--")
//     console.log(storagetemplateDistDir)

//         let workingDir = storagetemplateDistDir + '/' + storageFileName;
//         let destinationDir = workingDir.replace(/contact/g, storageFileName)
//         await fsExtra.rename(workingDir, destinationDir);

//     const options = {
//         files: [
//             './dist/' + storageFileName + '/*.*'
//         ],
//         //Replacement to make (string or regex) 
//         from: [/contact/g, /Contact/g],
//         to: [storageFileName, capitalTemplateName],
//     };

//     await replace(options);

//     //Adding fields to controller and yaml

//     for (argument = 3; argument < args.length; argument++) {

//         var field = "field" + argument;
//         var fieldString = "field";

//         var expression = `${field}`
//         var regex = new RegExp(expression, 'g')

//         migrationFields = migrationFields + args[argument] + ":string,"

//         const option = {
//             files: [
//                 './dist/' + templateName + '/*.*'
//             ],
//             //Replacement for  fields (string or regex) 
//             from: [regex],
//             to: [args[argument]],
//         };


//         await replace(option);

//     }

//     migrationFields = migrationFields + "name:string,type:string,description:string,insertedBy:string,updatedBy:string"

//     //removing unused fields

//     var dropFieldsExpression = `.*${fieldString}.*`
//     var regexDropFields = new RegExp(dropFieldsExpression, 'g')

//     const dropFieldsOption = {
//         files: [
//             './dist/' + templateName + '/*.*'
//         ],
//         //Remove unused fields in files to make (string or regex) 
//         from: [regexDropFields],
//         to: [''],
//     };
//     await replace(dropFieldsOption);

//     //migration file command
//     await exec("sequelize init");
//     await exec("sequelize model:generate --name " + capitalTemplateName + " --attributes  " + migrationFields);


//     console.log('*******************************');
//     console.log('Storage Template generated successfully');
//     console.log('*******************************');

// }


// With a callback:
// angular template generate

const generateAngularTemplate = async () => {

    await fsExtra.ensureDir(angulartemplateDistDir);
    await fsExtra.copy('./angular-template', angulartemplateDistDir);
    const files = await fsExtra.readdir(angulartemplateDistDir);

    console.log("files---------")
    console.log(files)

    for (let name of files) {

        let isworkingDir = angulartemplateDistDir + '/' + name;

        if (fs.lstatSync(isworkingDir).isDirectory()) {
            var workingDir = angulartemplateDistDir + '/' + name;

            let destinationDir = workingDir.replace(/user/g, angularTemplateName)


            await fsExtra.rename(workingDir, destinationDir);

            const subfiles = await fsExtra.readdir(destinationDir);

            console.log("subfiles---------")
            console.log(subfiles)

            for (let subname of subfiles) {
                let subworkingDir = destinationDir + '/' + subname
                let subdestinationDir = subworkingDir.replace(/user/g, angularTemplateName)

                await fsExtra.rename(subworkingDir, subdestinationDir);
                const options = {
                    files: [
                        subdestinationDir
                    ],
                    //Replacement to make (string or regex) 
                    from: [/user/g, /User/g],
                    to: [angularTemplateName, angularTemplateName.toString().charAt(0).toUpperCase() + angularTemplateName.toString().slice(1)],
                };

                await replace(options);

            }

        }
        else {
            let remainFile = angulartemplateDistDir + '/' + name
            let destremainFile = remainFile.replace(/user/g, angularTemplateName)
            await fsExtra.rename(remainFile, destremainFile);
            const options = {
                files: [
                    destremainFile
                ],
                //Replacement to make (string or regex) 
                from: [/user/g, /User/g],
                to: [angularTemplateName, angularTemplateName.toString().charAt(0).toUpperCase() + angularTemplateName.toString().slice(1)],
            };

            await replace(options);

        }
    }


    console.log('*******************************');
    console.log('Angular Template generated successfully');
    console.log('*******************************');

}

// With a callback:
const generateMongoTemplate = async () => {

    await fsExtra.ensureDir(templateDistDir);
    await fsExtra.copy('./mongotemplate', templateDistDir);

    templateName = templateName.slice(0, -1)


    const files = await fsExtra.readdir(templateDistDir);
    for (let name of files) {
        let workingDir = templateDistDir + '/' + name;
        let destinationDir = workingDir.replace(/user/g, templateName)
        await fsExtra.rename(workingDir, destinationDir);
    };
    const options = {
        files: [
            './dist/' + templateName + 's/*.*',
            './dist/' + templateName + 's/*.yaml'
        ],
        //Replacement to make (string or regex) 
        from: [/user/g, /User/g],
        to: [templateName, capitalTemplateName],
    };

    const fileOption = {
        files: [
            './dist/' + templateName + '/*.storage.js*',
        ],
        //Replacement to make (string or regex) 
        from: [/user/g, /User/g],
        to: [templateName, capitalTemplateName],
    };

    if (process.argv.slice(4, 5) == "file=true") {
        await replace(fileOption);

    }

    else {
        await replace(options);
    }

    //Adding fields to controller and yaml

    for (argument = 3; argument < args.length; argument++) {

        var field = "field" + argument;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[argument] + ":string,"

        const option = {
            files: [
                './dist/' + templateName + 's' + '/*.*',
                './dist/' + templateName + 's' + '/*.yaml'
            ],
            //Replacement for  fields (string or regex) 
            from: [regex],
            to: [args[argument]],
        };


        await replace(option);

    }

    migrationFields = migrationFields + "name:string,type:string,description:string,insertedBy:string,updatedBy:string"

    //removing unused fields

    var dropFieldsExpression = `.*${fieldString}.*`
    var regexDropFields = new RegExp(dropFieldsExpression, 'g')

    const dropFieldsOption = {
        files: [
            './dist/' + templateName + 's/*.*',
            './dist/' + templateName + 's/*.yaml'
        ],
        //Remove unused fields in files to make (string or regex) 
        from: [regexDropFields],
        to: [''],
    };
    await replace(dropFieldsOption);


    //migration file command
    // await exec("sequelize init");
    // await exec("sequelize model:generate --name " + capitalTemplateName + " --attributes  " + migrationFields);


    console.log('*******************************');
    console.log('Mongo Template generated successfully');
    console.log('*******************************');

}

///////////////////////// child template

const generateChildMongoTemplate = async () => {
    await fsExtra.ensureDir(childtemplateDistDir);
    await fsExtra.copy('./mongochildtemplate', childtemplateDistDir);


    const files = await fsExtra.readdir(childtemplateDistDir);
    for (let name of files) {
        console.log(name);
        let workingDir = childtemplateDistDir + '/' + name;
        let destinationDir = workingDir.replace(/contactactivity/g, childfileName)
        console.log("workingDir-----------");
        console.log(workingDir);
        console.log("destinationDir--------------");
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

    for (argument = 3; argument < args.length; argument++) {
        var field = "field" + argument;
        var fieldString = "field";

        var expression = `${field}`
        var regex = new RegExp(expression, 'g')

        migrationFields = migrationFields + args[argument] + ":string,";

        if (argument == 2 && (args[argument].slice(0, -1) === 's' || args[argument].slice(0, -1) === 'S')) {
            args[argument] = args[argument].slice(0, -1)

        }
        const option = {
            files: [
                './dist/' + childfileName + '/*.*',
                './dist/' + childfileName + '/*.yaml'
            ],
            //Replacement for  fields (string or regex) 
            from: [regex],
            to: [args[argument]],
        };
        await replace(option);
    }
    migrationFields = migrationFields + "name:string,type:string,description:string,insertedBy:string,updatedBy:string"

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


if (process.argv.slice(3, 4) == "angular=true") {
    generateAngularTemplate();
}

else if (process.argv.slice(4, 5) != "file=false") {
    generateStorageTemplate();
}

else if (isChildCheck != "child=false") {
    generateChildTemplate();
}

else if ((process.argv.slice(4, 5) == "file=true-db=mongo") && ((process.argv.slice(4, 5) == "file=true-db=mongo") || (process.argv.slice(4, 5) == "file=false-db=mongo"))) {
    generateMongoTemplate();
}
else if ((process.argv.slice(4, 5) == "file=true-db=mongo") && (process.argv.slice(3, 4) != "child=false") && ((process.argv.slice(4, 5) == "file=true-db=mongo") || (process.argv.slice(4, 5) == "file=false-db=mongo"))) {
    generateChildMongoTemplate();
}

else if (isChildCheck = "child=false") {
    generateTemplate();
}

//parent child=false file=false
//parent child file=false

// const isChildTemplate = "child=false".split()[1]
// if(isChildTemplate === false) 

console.log('process.argv.slice(4, 5)')
console.log("process.argv.slice(4, 5)------------")
console.log(process.argv.slice(4, 5))









